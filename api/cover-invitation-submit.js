"use strict";
const crypto=require("crypto");
const MAX_BODY=3000000;

function reply(res,status,code,extra={}){
res.statusCode=status;
res.setHeader("Content-Type","application/json; charset=utf-8");
res.setHeader("Cache-Control","no-store");
res.setHeader("X-Content-Type-Options","nosniff");
res.end(JSON.stringify({ok:status<300,code,...extra}));
}

function text(value,max,required=false){
if(typeof value!=="string"||value.length>max||required&&!value.trim())throw Error("INVALID_FIELDS");
return value.trim();
}

function application(body){
const a=body.application;
if(!a||typeof a!=="object"||Array.isArray(a))throw Error("INVALID_FIELDS");

const pet=text(a.pet_name,120,true);
const email=text(a.owner_email,254,true).toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error("INVALID_FIELDS");

const country=text(a.country_code,2,true);
const animal=text(a.animal_type,30,true);
if(!/^[A-Z]{2}$/.test(country)||!["dog","cat","bird","rabbit","rodent","reptile","horse","other"].includes(animal))throw Error("INVALID_FIELDS");

if(a.rights_confirmed!==true||a.rules_accepted!==true)throw Error("CONSENT_REQUIRED");
if(!Array.isArray(a.photos)||a.photos.length<5||a.photos.length>10)throw Error("INVALID_PHOTOS");
if(!Number.isInteger(a.main_photo)||a.main_photo<0||a.main_photo>=a.photos.length)throw Error("INVALID_PHOTOS");

const photos=a.photos.map(value=>{
if(typeof value!=="string"||value.length>280000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value))throw Error("INVALID_PHOTOS");
const bytes=Buffer.from(value.slice(23),"base64");
if(bytes.length<100||bytes[0]!==255||bytes[1]!==216||bytes[2]!==255||bytes.at(-2)!==255||bytes.at(-1)!==217)throw Error("INVALID_PHOTOS");
return value;
});

if(!a.answers||typeof a.answers!=="object"||Array.isArray(a.answers))throw Error("INVALID_FIELDS");

const allowed=[
"ownerName","breed","age","gender","city","pronunciation",
"instagram","contactPermission","story","threeWords","lovesMost",
"funnyHabit","familyStory","unforgettable","taughtYou","whyStar",
"petQuote","favourites","scene","starPersona","visualStyle",
"season","coverLocation","accessories","coverColors",
"identityFeatures","doNotAdd","dreamCover",
"agreeLicense","agreeEditorial","agreeCreative"
];

const answers={};
for(const name of allowed){
if(a.answers[name]===undefined)continue;
if(name.startsWith("agree")){
if(typeof a.answers[name]!=="boolean")throw Error("INVALID_FIELDS");
answers[name]=a.answers[name];
}else if(name==="accessories"){
if(!Array.isArray(a.answers[name])||a.answers[name].length>20)throw Error("INVALID_FIELDS");
answers[name]=a.answers[name].map(v=>text(v,120));
}else{
answers[name]=text(a.answers[name],3000);
}
}

if(!answers.ownerName)throw Error("INVALID_FIELDS");

return {
pet_name:pet,
owner_email:email,
country_code:country,
animal_type:animal,
answers,
photos,
main_photo:a.main_photo,
consent_version:"cover-star-2026-10-14",
rights_confirmed:true,
rules_accepted:true
};
}

module.exports=async(req,res)=>{
if(req.method!=="POST"){
res.setHeader("Allow","POST");
return reply(res,405,"METHOD_NOT_ALLOWED");
}

const url=(process.env.SUPABASE_URL||"").replace(/\/+$/,"");
const key=process.env.SUPABASE_SECRET_KEY;
if(!url||!key)return reply(res,503,"NOT_CONFIGURED");

let body,data;
try{
if(Number(req.headers?.["content-length"]||0)>MAX_BODY)return reply(res,413,"PHOTOS_TOO_LARGE");

body=typeof req.body==="string"?JSON.parse(req.body):req.body;
if(!body||Buffer.byteLength(JSON.stringify(body))>MAX_BODY)return reply(res,413,"PHOTOS_TOO_LARGE");

if(typeof body.token!=="string"||!/^[A-Za-z0-9_-]{43}$/.test(body.token))return reply(res,400,"INVALID_INVITATION");
if(typeof body.contestKey!=="string"||!/^[a-z0-9][a-z0-9_-]{0,99}$/.test(body.contestKey))return reply(res,400,"INVALID_CONTEST");

data=application(body);
}catch(e){
return reply(res,400,["INVALID_FIELDS","INVALID_PHOTOS","CONSENT_REQUIRED"].includes(e.message)?e.message:"INVALID_REQUEST");
}

try{
const response=await fetch(url+"/rest/v1/rpc/pd_redeem_cover_invitation",{
method:"POST",
headers:{
apikey:key,
Authorization:"Bearer "+key,
"Content-Type":"application/json"
},
body:JSON.stringify({
p_hash:crypto.createHash("sha256").update(body.token).digest("hex"),
p_contest:body.contestKey,
p_application:data
}),
signal:AbortSignal.timeout(20000)
});

const result=await response.json();
if(!response.ok)return reply(
res,
result?.code==="P0001"?410:502,
result?.code==="P0001"?"INVITATION_UNAVAILABLE":"SUBMISSION_FAILED"
);

if(typeof result!=="string"||!/^[0-9a-f-]{36}$/i.test(result))return reply(res,502,"SUBMISSION_FAILED");

return reply(res,201,"SUBMITTED",{
applicationId:result,
status:"pending"
});
}catch{
return reply(res,502,"SUBMISSION_FAILED");
}
};
