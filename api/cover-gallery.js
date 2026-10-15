"use strict";

function send(res,status,data){
res.statusCode=status;
res.setHeader("Content-Type","application/json; charset=utf-8");
res.setHeader("Cache-Control","no-store");
res.setHeader("X-Content-Type-Options","nosniff");
res.end(JSON.stringify(data));
}

module.exports=async(req,res)=>{
if(req.method!=="GET"){
res.setHeader("Allow","GET");
return send(res,405,{ok:false});
}

const url=(process.env.SUPABASE_URL||"").replace(/\/+$/,"");
const key=process.env.SUPABASE_SECRET_KEY;
if(!url||!key)return send(res,503,{ok:false});

const params=new URL(
req.url,
"https://www.petsanddogue.com"
).searchParams;

const country=params.get("country")||null;
const animal=params.get("animal")||null;
const id=params.get("id");
const offset=Number(params.get("offset")||0);

if(
(country&&!/^[A-Z]{2}$/.test(country))||
(animal&&![
"dog","cat","bird","rabbit",
"rodent","reptile","horse","other"
].includes(animal))||
!Number.isInteger(offset)||
offset<0||
offset>100000||
(id&&!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))
){
return send(res,400,{ok:false});
}

const headers={
apikey:key,
"Content-Type":"application/json"
};

if(key.startsWith("eyJ")){
headers.Authorization="Bearer "+key;
}

try{
const endpoint=id
?"pd_public_cover_profile"
:"pd_public_cover_gallery";

const body=id?{
p_id:id,
p_contest:"cover-star-2026"
}:{
p_contest:"cover-star-2026",
p_country:country,
p_animal:animal,
p_offset:offset
};

const response=await fetch(
url+"/rest/v1/rpc/"+endpoint,
{
method:"POST",
headers,
body:JSON.stringify(body),
signal:AbortSignal.timeout(15000)
}
);

if(!response.ok){
return send(res,502,{ok:false});
}

const data=await response.json();

if(id&&!data){
return send(res,404,{ok:false});
}

return send(res,200,{
ok:true,
...(id?{profile:data}:data)
});
}catch{
return send(res,502,{ok:false});
}
};
