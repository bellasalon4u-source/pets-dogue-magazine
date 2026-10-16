'use strict';
const {createHash,createHmac,randomUUID}=require('node:crypto');
const sharp=require('sharp');
const hash=v=>createHash('sha256').update(v).digest('hex');
// Only ordinary, non-fragmented MP4 files with a video track and finite duration.
function mp4Duration(buffer){
 let count=0,video=false,ftyp=false;const durations=[];
 function walk(start,end,depth=0){
  if(depth>8)throw Error('invalid_video');
  for(let p=start;p<end;){
   if(++count>5000||p+8>end)throw Error('invalid_video');
   let size=buffer.readUInt32BE(p),head=8;const type=buffer.toString('ascii',p+4,p+8);
   if(size===1){if(p+16>end)throw Error('invalid_video');const big=buffer.readBigUInt64BE(p+8);if(big>BigInt(buffer.length))throw Error('invalid_video');size=Number(big);head=16;}
   if(size===0)size=end-p;
   if(size<head||p+size>end)throw Error('invalid_video');
   const q=p+head,z=p+size;
   if(type==='ftyp')ftyp=true;
   if(type==='moof')throw Error('invalid_video');
   if(['moov','trak','mdia'].includes(type))walk(q,z,depth+1);
   if(type==='hdlr'&&q+12<=z&&buffer.toString('ascii',q+8,q+12)==='vide')video=true;
   if(type==='mvhd'||type==='mdhd'){
    if(q+20>z)throw Error('invalid_video');
    const version=buffer[q];let scale,duration;
    if(version===0){scale=buffer.readUInt32BE(q+12);duration=buffer.readUInt32BE(q+16);}
    else if(version===1&&q+32<=z){scale=buffer.readUInt32BE(q+20);const big=buffer.readBigUInt64BE(q+24);if(big>BigInt(Number.MAX_SAFE_INTEGER))throw Error('invalid_video');duration=Number(big);}
    else throw Error('invalid_video');
    if(!scale||!duration)throw Error('invalid_video');durations.push(duration/scale);
   }
   p=z;
  }
 }
 walk(0,buffer.length);
 const duration=Math.max(...durations);
 if(!ftyp||!video||!Number.isFinite(duration)||duration<=0||duration>5)throw Error('invalid_video');
 return duration;
}
module.exports=async function(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const reply=(s,b)=>res.status(s).json(b);
 if(req.method!=='POST'){res.setHeader('Allow','POST');return reply(405,{error:'method_not_allowed'});}
 const base=(process.env.SUPABASE_URL||'').replace(/\/$/,''),key=process.env.SUPABASE_SECRET_KEY;
 if(!base||!key)return reply(503,{error:'unavailable'});
 if(req.headers.origin&&!['https://www.petsanddogue.com','https://petsanddogue.com'].includes(req.headers.origin))return reply(403,{error:'forbidden'});
 if(!(req.headers['content-type']||'').startsWith('application/json'))return reply(415,{error:'invalid_format'});
 let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return reply(400,{error:'invalid_request'});}
 if(!body||body.consent!==true||!['photos-2026-10-15','photos-2026-10-16'].includes(body.consentVersion))return reply(400,{error:'consent_required'});
 const items=body.media||(body.image?[{type:'image',data:body.image}]:null);
 if(!Array.isArray(items)||items.length<1||items.length>2||items.some(x=>!x||!['image','video'].includes(x.type))||items.some(x=>x.type==='video')&&items.length!==1)return reply(400,{error:'invalid_media'});
 const token=body.receipt;
 if(typeof token!=='string'||! /^[a-f0-9]{64}$/.test(token))return reply(400,{error:'invalid_receipt'});
 const receiptHash=hash(token),headers={apikey:key,'Content-Type':'application/json'};
 if(key.startsWith('eyJ'))headers.Authorization=`Bearer ${key}`;
 const db=async(path,options={})=>{const r=await fetch(`${base}/rest/v1/${path}`,{...options,headers:{...headers,...options.headers},signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('database');const s=await r.text();return s?JSON.parse(s):null;};
 const stored=[];let committed=false,insertAttempted=false;
 try{
  const retry=await db(`pd_public_photos?receipt_hash=eq.${receiptHash}&select=status&limit=2`);
  if(retry.length)return reply(200,{status:'pending',received:retry.length,retry:true});
  const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'').split(',')[0].trim();
  if(!ip)return reply(503,{error:'unavailable'});
  const reserved=await db('rpc/pd_reserve_photo_upload',{method:'POST',body:JSON.stringify({p_actor:createHmac('sha256',key).update(`photos:${ip}`).digest('hex')})});
  if(reserved!==true)return reply(429,{error:'daily_limit'});
  const prepared=[];
  for(const item of items){
   const video=item.type==='video',prefix=video?'data:video/mp4;base64,':'data:image/jpeg;base64,';
   if(typeof item.data!=='string'||item.data.length>(video?2666700:1350000)||!item.data.startsWith(prefix)||! /^[A-Za-z0-9+/]+={0,2}$/.test(item.data.slice(prefix.length)))return reply(400,{error:video?'invalid_video':'invalid_image'});
   let buffer=Buffer.from(item.data.slice(prefix.length),'base64'),duration=null;
   if(buffer.length<100||buffer.length>(video?2000000:1000000))return reply(400,{error:video?'invalid_video':'invalid_image'});
   try{if(video)duration=mp4Duration(buffer);else buffer=await sharp(buffer,{limitInputPixels:12000000,failOn:'warning'}).rotate().resize(1600,1600,{fit:'inside',withoutEnlargement:true}).jpeg({quality:78}).toBuffer();}
   catch{return reply(400,{error:video?'invalid_video':'invalid_image'});}
   if(buffer.length>(video?2000000:1000000))return reply(400,{error:'invalid_image'});
   const digest=hash(buffer);
   if(prepared.some(x=>x.digest===digest))return reply(409,{error:'duplicate'});
   const previous=await db(`pd_public_photos?image_hash=eq.${digest}&select=status&limit=1`);
   if(previous.length)return reply(409,{error:previous[0].status==='blocked'?'photo_not_allowed':'duplicate'});
   prepared.push({buffer,duration,digest,type:item.type,ext:video?'mp4':'jpg',mime:video?'video/mp4':'image/jpeg'});
  }
  const rows=[];
  for(const item of prepared){
   const path=`${randomUUID()}.${item.ext}`;
   const r=await fetch(`${base}/storage/v1/object/pd-photos-review/${path}`,{method:'POST',headers:{...headers,'Content-Type':item.mime},body:item.buffer,signal:AbortSignal.timeout(20000)});
   if(!r.ok)throw Error('storage');stored.push(path);
   rows.push({source:'community',issue_id:null,image_url:`${base}/storage/v1/object/pd-photos-review/${path}`,image_hash:item.digest,status:'pending',consent_version:body.consentVersion,media_type:item.type,media_duration:item.duration,storage_path:path,receipt_hash:receiptHash});
  }
  insertAttempted=true;
  await db('pd_public_photos',{method:'POST',body:JSON.stringify(rows)});committed=true;
  return reply(201,{status:'pending',received:rows.length});
 }catch(error){console.error('photos-upload:',['database','storage'].includes(error.message)?error.message:'unavailable');return reply(503,{error:'unavailable'});}
 finally{if(insertAttempted&&!committed){try{const rows=await db(`pd_public_photos?receipt_hash=eq.${receiptHash}&select=id&limit=1`);committed=rows.length>0;}catch{committed=true;console.error('photos-upload: uncertain_insert_retained_private');}}if(!committed&&stored.length){try{await fetch(`${base}/storage/v1/object/pd-photos-review`,{method:'DELETE',headers,body:JSON.stringify({prefixes:stored}),signal:AbortSignal.timeout(10000)});}catch{console.error('photos-upload: cleanup_failed');}}}
};
