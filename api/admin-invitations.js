"use strict";
const crypto=require("crypto");
const clean=(v,n=200)=>typeof v==="string"?v.trim().slice(0,n):"";
const hash=v=>crypto.createHash("sha256").update(v).digest("hex");

function config(){
return {
url:clean(process.env.SUPABASE_URL,500).replace(/\/+$/,""),
db:clean(process.env.SUPABASE_SECRET_KEY,1000),
admin:clean(process.env.PETS_DOGUE_ADMIN_KEY,1000),
site:process.env.PUBLIC_SITE_URL||process.env.SITE_URL||"https://www.petsanddogue.com"
};
}
function key(c){
return crypto.createHash("sha256")
.update("PETS-DOGUE-INVITATIONS-v1\0"+c.admin).digest();
}
function encrypt(token,c){
const iv=crypto.randomBytes(12);
const cipher=crypto.createCipheriv("aes-256-gcm",key(c),iv);
const data=Buffer.concat([cipher.update(token,"utf8"),cipher.final()]);
return [iv,cipher.getAuthTag(),data]
.map(x=>x.toString("base64url")).join(".");
}
function decrypt(value,c){
const [iv,tag,data]=value.split(".")
.map(x=>Buffer.from(x,"base64url"));
const cipher=crypto.createDecipheriv("aes-256-gcm",key(c),iv);
cipher.setAuthTag(tag);
return Buffer.concat([cipher.update(data),cipher.final()]).toString("utf8");
}
function authorized(req,c){
const supplied=clean(req.headers?.["x-pets-dogue-admin-key"],1000);
return !!supplied&&crypto.timingSafeEqual(
Buffer.from(hash(supplied)),Buffer.from(hash(c.admin))
);
}
function reply(res,status,data){
res.statusCode=status;
res.setHeader("Content-Type","application/json; charset=utf-8");
res.setHeader("Cache-Control","no-store");
res.setHeader("X-Content-Type-Options","nosniff");
res.end(JSON.stringify(data));
}
async function db(c,path,method="GET",body){
const r=await fetch(c.url+"/rest/v1/"+path,{
method,
headers:{
apikey:c.db,
Authorization:"Bearer "+c.db,
"Content-Type":"application/json",
Prefer:"return=representation"
},
...(body?{body:JSON.stringify(body)}:{}),
signal:AbortSignal.timeout(15000)
});
if(!r.ok)throw Error("DATABASE_ERROR");
return r.status===204?[]:r.json();
}
function status(row){
return row.revoked_at?"revoked":
row.used_at?"used":
Date.parse(row.expires_at)<=Date.now()?"expired":"available";
}
function publicInfo(row){
return {
kind:row.kind,
contestKey:row.contest_key,
status:status(row),
expiresAt:row.expires_at
};
}
function adminInfo(row,c){
let link=null;
try{
const token=decrypt(row.token_encrypted,c);
const url=new URL(
row.kind==="cover_star"?"/members-gallery.html":"/gift-invitation.html",
c.site
);
url.hash="invite="+token;
link=url.href;
}catch{}
return {
id:row.id,title:row.title,note:row.note,
createdAt:row.created_at,...publicInfo(row),link
};
}

module.exports=async function(req,res){
if(req.method!=="POST"){
res.setHeader("Allow","POST");
return reply(res,405,{ok:false,code:"METHOD_NOT_ALLOWED"});
}
const c=config();
if(!c.url||!c.db||!c.admin)
return reply(res,503,{ok:false,code:"NOT_CONFIGURED"});

let body;
try{
body=typeof req.body==="string"?JSON.parse(req.body):req.body;
if(!body||typeof body!=="object"||Array.isArray(body)
||Buffer.byteLength(JSON.stringify(body))>4096)throw Error();
}catch{
return reply(res,400,{ok:false,code:"INVALID_REQUEST"});
}
const action=clean(body.action,30);
if(action!=="check"&&!authorized(req,c))
return reply(res,401,{ok:false,code:"UNAUTHORIZED"});

try{
if(action==="check"){
const token=clean(body.token,100);
if(!/^[A-Za-z0-9_-]{43}$/.test(token))
return reply(res,400,{ok:false,code:"INVALID_INVITATION"});
const rows=await db(c,
"pd_admin_invitations?token_hash=eq."+hash(token)
+"&select=kind,contest_key,expires_at,revoked_at,used_at&limit=1"
);
if(!rows[0]||status(rows[0])!=="available")
return reply(res,410,{ok:false,code:"INVITATION_UNAVAILABLE"});
return reply(res,200,{ok:true,invitation:publicInfo(rows[0])});
}

if(action==="list"){
const rows=await db(c,
"pd_admin_invitations?select=*&order=created_at.desc&limit=200"
);
return reply(res,200,{
ok:true,invitations:rows.map(r=>adminInfo(r,c))
});
}

if(action==="create"){
const title=clean(body.title,120),note=clean(body.note,1000);
const kind=clean(body.kind,30),days=Number(body.days??30);
if(!title||!["cover_star","club_year"].includes(kind)
||!Number.isInteger(days)||days<1||days>365)
return reply(res,400,{ok:false,code:"INVALID_FIELDS"});

const contest=kind==="cover_star"?clean(body.contestKey,100):null;
if(kind==="cover_star"
&&(!contest||!/^[a-z0-9][a-z0-9_-]{0,99}$/.test(contest)))
return reply(res,400,{ok:false,code:"INVALID_CONTEST"});

const token=crypto.randomBytes(32).toString("base64url");
const rows=await db(c,"pd_admin_invitations","POST",{
title,note,kind,contest_key:contest,
token_hash:hash(token),
token_encrypted:encrypt(token,c),
expires_at:new Date(Date.now()+days*86400000).toISOString()
});
return reply(res,201,{
ok:true,invitation:adminInfo(rows[0],c)
});
}

if(action==="revoke"){
const id=clean(body.id,50);
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))
return reply(res,400,{ok:false,code:"INVALID_ID"});

const rows=await db(c,
"pd_admin_invitations?id=eq."+id
+"&used_at=is.null&revoked_at=is.null",
"PATCH",{revoked_at:new Date().toISOString()}
);
if(!rows[0])
return reply(res,409,{ok:false,code:"NOT_REVOCABLE"});
return reply(res,200,{
ok:true,invitation:adminInfo(rows[0],c)
});
}

return reply(res,400,{ok:false,code:"INVALID_ACTION"});
}catch{
return reply(res,502,{ok:false,code:"DATABASE_ERROR"});
}
};
