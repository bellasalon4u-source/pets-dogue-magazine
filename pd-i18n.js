"use strict";

(function () {

const SUPPORTED=[
"en","ru","uk","fr","de","es","it","pt","nl","pl","cs","sk",
"hu","ro","bg","el","sv","da","no","fi","tr","ar","hi"
];

const LANGUAGE_NAMES={
english:"en",
russian:"ru",
русский:"ru",
рус:"ru",
ukrainian:"uk",
українська:"uk",
украинский:"uk",
french:"fr",
français:"fr",
german:"de",
deutsch:"de",
spanish:"es",
español:"es",
italian:"it",
italiano:"it",
portuguese:"pt",
português:"pt",
dutch:"nl",
nederlands:"nl",
polish:"pl",
polski:"pl",
czech:"cs",
čeština:"cs",
slovak:"sk",
slovenčina:"sk",
hungarian:"hu",
magyar:"hu",
romanian:"ro",
română:"ro",
bulgarian:"bg",
български:"bg",
greek:"el",
ελληνικά:"el",
swedish:"sv",
svenska:"sv",
danish:"da",
dansk:"da",
norwegian:"no",
norsk:"no",
finnish:"fi",
suomi:"fi",
turkish:"tr",
türkçe:"tr",
arabic:"ar",
العربية:"ar",
hindi:"hi",
हिन्दी:"hi"
};

const STORAGE_KEYS=[
"petsDogueLanguage",
"pdLanguage",
"pets_dogue_language",
"pets-dogue-language",
"selectedLanguage",
"selected_language",
"siteLanguage",
"site_language",
"language",
"lang",
"locale"
];

function normalize(value){

if(value===null || value===undefined){
return null;
}

let raw=String(value).trim();

if(!raw){
return null;
}

try{
raw=decodeURIComponent(raw);
}catch(error){}

const lower=raw.toLowerCase();

if(LANGUAGE_NAMES[lower]){
return LANGUAGE_NAMES[lower];
}

const clean=
lower
.replace("_","-")
.replace(/\s+/g,"");

const base=clean.split("-")[0];

if(SUPPORTED.includes(base)){
return base;
}

return null;
}

function scanObject(value,depth){

if(depth>4 || value===null || value===undefined){
return null;
}

if(typeof value==="string"){
return normalize(value);
}

if(typeof value!=="object"){
return null;
}

if(Array.isArray(value)){

for(const item of value){

const result=scanObject(item,depth+1);

if(result){
return result;
}

}

return null;
}

const preferredKeys=[
"language",
"lang",
"locale",
"selectedLanguage",
"selected_language",
"siteLanguage",
"site_language"
];

for(const key of preferredKeys){

if(Object.prototype.hasOwnProperty.call(value,key)){

const result=scanObject(value[key],depth+1);

if(result){
return result;
}

}

}

for(const key of Object.keys(value)){

if(
key.toLowerCase().includes("lang") ||
key.toLowerCase().includes("locale")
){

const result=scanObject(value[key],depth+1);

if(result){
return result;
}

}

}

return null;
}

function scanStorage(storage){

if(!storage){
return null;
}

for(const key of STORAGE_KEYS){

try{

const result=normalize(storage.getItem(key));

if(result){
return result;
}

}catch(error){}

}

try{

for(let i=0;i<storage.length;i++){

const key=storage.key(i);

if(!key){
continue;
}

const value=storage.getItem(key);

if(
key.toLowerCase().includes("lang") ||
key.toLowerCase().includes("locale")
){

const direct=normalize(value);

if(direct){
return direct;
}

}

if(value && (value.startsWith("{") || value.startsWith("["))){

try{

const json=JSON.parse(value);
const result=scanObject(json,0);

if(result){
return result;
}

}catch(error){}

}

}

}catch(error){}

return null;
}

function scanCookies(){

if(!document.cookie){
return null;
}

const parts=document.cookie.split(";");

for(const part of parts){

const index=part.indexOf("=");

if(index<0){
continue;
}

const key=part.slice(0,index).trim().toLowerCase();
const value=part.slice(index+1).trim();

if(
key.includes("lang") ||
key.includes("locale")
){

const result=normalize(value);

if(result){
return result;
}

}

}

return null;
}

function getLanguage(){

const params=new URLSearchParams(location.search);

for(const key of ["lang","language","locale"]){

const fromUrl=normalize(params.get(key));

if(fromUrl){
return fromUrl;
}

}

const local=scanStorage(window.localStorage);

if(local){
return local;
}

const session=scanStorage(window.sessionStorage);

if(session){
return session;
}

const cookie=scanCookies();

if(cookie){
return cookie;
}

const htmlLang=normalize(document.documentElement.lang);

if(htmlLang && htmlLang!=="en"){
return htmlLang;
}

const browser=normalize(
navigator.language ||
(navigator.languages && navigator.languages[0])
);

return browser || "en";
}

function persist(code){

code=normalize(code)||"en";

for(const key of STORAGE_KEYS){

try{
localStorage.setItem(key,code);
}catch(error){}

try{
sessionStorage.setItem(key,code);
}catch(error){}

}

try{
document.cookie=
"petsDogueLanguage="+encodeURIComponent(code)+
";path=/;max-age=31536000;SameSite=Lax";
}catch(error){}

return code;
}

let channel=null;

try{
channel=new BroadcastChannel("pets-dogue-language");
}catch(error){}

function setLanguage(code){

code=persist(code);

document.documentElement.lang=code;
document.documentElement.dir=code==="ar"?"rtl":"ltr";

window.dispatchEvent(
new CustomEvent(
"petsdogue:languagechange",
{detail:{language:code}}
)
);

if(channel){

try{
channel.postMessage({language:code});
}catch(error){}

}

return code;
}

function init(){

const code=persist(getLanguage());

document.documentElement.lang=code;
document.documentElement.dir=code==="ar"?"rtl":"ltr";

return code;
}

window.addEventListener("storage",function(event){

if(!event.key){
return;
}

if(
event.key.toLowerCase().includes("lang") ||
event.key.toLowerCase().includes("locale")
){

const code=normalize(event.newValue);

if(code){

document.documentElement.lang=code;
document.documentElement.dir=code==="ar"?"rtl":"ltr";

window.dispatchEvent(
new CustomEvent(
"petsdogue:languagechange",
{detail:{language:code}}
)
);

}

}

});

if(channel){

channel.addEventListener("message",function(event){

const code=
event.data &&
normalize(event.data.language);

if(code){

persist(code);

document.documentElement.lang=code;
document.documentElement.dir=code==="ar"?"rtl":"ltr";

window.dispatchEvent(
new CustomEvent(
"petsdogue:languagechange",
{detail:{language:code}}
)
);

}

});

}

window.PDI18N={
supported:SUPPORTED.slice(),
normalize,
getLanguage,
setLanguage,
init
};

})();
