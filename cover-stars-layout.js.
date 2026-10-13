(()=>{
"use strict";
const cameraLabels={en:"Take a photo",ru:"Сделать снимок",uk:"Зробити знімок",fr:"Prendre une photo",de:"Foto aufnehmen",es:"Tomar una foto",it:"Scatta una foto",pt:"Tirar uma fotografia",nl:"Maak een foto",pl:"Zrób zdjęcie",cs:"Pořídit fotografii",sk:"Odfotiť",hu:"Fénykép készítése",ro:"Fă o fotografie",bg:"Направете снимка",el:"Λήψη φωτογραφίας",sv:"Ta ett foto",da:"Tag et billede",no:"Ta et bilde",fi:"Ota kuva",tr:"Fotoğraf çek",ar:"التقاط صورة",hi:"फ़ोटो लें"};
const galleryLabels={en:"Choose photos",ru:"Выбрать фото",uk:"Вибрати фото",fr:"Choisir des photos",de:"Fotos auswählen",es:"Elegir fotos",it:"Scegli foto",pt:"Escolher fotografias",nl:"Foto’s kiezen",pl:"Wybierz zdjęcia",cs:"Vybrat fotografie",sk:"Vybrať fotografie",hu:"Fotók kiválasztása",ro:"Alege fotografii",bg:"Изберете снимки",el:"Επιλογή φωτογραφιών",sv:"Välj foton",da:"Vælg billeder",no:"Velg bilder",fi:"Valitse kuvat",tr:"Fotoğraf seç",ar:"اختيار الصور",hi:"फ़ोटो चुनें"};
const language=()=>typeof currentLanguage==="function"?currentLanguage():"en";
function photoTiles(){
const grid=document.getElementById("thumbs");if(!grid)return;
grid.querySelectorAll(".photo-choice").forEach(x=>x.remove());
const lang=language(),camera=document.createElement("button");
camera.type="button";camera.className="photo-choice";
camera.textContent="📷 "+(cameraLabels[lang]||cameraLabels.en);
camera.disabled=typeof photos!=="undefined"&&photos.length>=10;
camera.onclick=()=>document.getElementById("cameraInput").click();
const gallery=document.createElement("button");
gallery.type="button";gallery.className="photo-choice";
gallery.textContent="+ "+(galleryLabels[lang]||galleryLabels.en);
gallery.disabled=camera.disabled;
gallery.onclick=()=>document.getElementById("photoInput").click();
grid.prepend(camera,gallery);
}
if(typeof renderCandidates==="function")renderCandidates=()=>{};
if(typeof loadCandidates==="function")loadCandidates=async()=>{};
if(typeof renderPhotos==="function"){
const original=renderPhotos;
renderPhotos=function(){original();photoTiles();};
}
function update(){
const title=document.querySelector("#coverHero h1");
if(title){title.dataset.i18n="membersGallery.casting.title";title.textContent=tr("casting.title");}
photoTiles();
}
function setup(){
const hero=document.querySelector(".hero-copy");
if(hero){
const link=document.createElement("a");
link.className="btn gold";link.href="#coverApplication";
link.dataset.i18n="membersGallery.application.title";
link.textContent=tr("application.title");
hero.insertBefore(link,hero.querySelector(".listen"));
}
const casting=document.querySelector(".casting");
if(casting){
casting.querySelector(".casting-copy")?.remove();
const img=casting.querySelector("img");
if(img){img.src="/cover-star.jpg";img.alt="PETS & DOGUE — Little Royalty";}
}
const layout=document.querySelector(".club-rules");
const rules=layout?.querySelector(".rules");
if(rules)layout.prepend(rules);
const apply=document.querySelector(".apply");
if(apply)apply.id="coverApplication";
document.querySelector(".apply-hero>img")?.remove();
document.querySelectorAll(".winner,.title-row,.gallery,.top").forEach(x=>x.remove());
const status=document.getElementById("voteStatus");if(status)status.hidden=true;
const input=document.getElementById("photoInput");
if(input){
input.hidden=true;
const camera=document.createElement("input");
camera.type="file";camera.id="cameraInput";
camera.accept="image/*";camera.setAttribute("capture","environment");
camera.hidden=true;camera.onchange=handlePhotos;input.after(camera);
}
update();
new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
}
const style=document.createElement("style");
style.textContent=`
.hero-copy{padding:24px 20px!important}
.hero-copy h1{font-size:clamp(30px,5vw,54px)!important;line-height:1.12!important;margin:12px 0!important}
.hero-copy p{font-size:clamp(17px,2vw,21px)!important;line-height:1.5!important;margin:12px auto 18px!important;max-width:760px}
.hero-copy .btn,.hero-copy .listen{margin:4px 6px!important}
.casting{height:auto!important;min-height:0!important;background:#080808!important}
.casting>img{position:static!important;display:block!important;width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;filter:none!important;opacity:1!important}
.casting::before,.casting::after{display:none!important}
.club-rules{display:flex!important;flex-direction:column!important;gap:12px!important}
.club-rules>.rules,.club-rules>.club{width:100%!important;box-sizing:border-box}
.club,.rules,.flow{padding:24px 20px!important}
.club h2,.rules h2,.flow h2,.apply-hero h2{font-size:clamp(30px,5vw,48px)!important;line-height:1.15!important}
.plan{padding:18px!important}
.plan h3{font-size:clamp(23px,4vw,34px)!important}
.plan .price{font-size:42px!important}
.plan p{font-size:16px!important;line-height:1.5!important}
.plan .btn{font-size:16px!important;padding:12px!important}
.apply-hero{height:auto!important;min-height:0!important;background:#080808!important;border:1px solid #b39754}
.apply-hero::before,.apply-hero::after{display:none!important}
.apply-hero-copy{position:static!important;padding:24px 20px!important;transform:none!important;background:none!important;color:#fff!important}
.apply-hero h2{color:#e4cc87!important;margin:12px 0!important}
.apply-hero p{font-size:18px!important;line-height:1.5!important}
.apply{scroll-margin-top:190px}
.thumbs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important}
.photo-choice{aspect-ratio:1;min-width:0;border:1px solid #d9bc72;background:#17130d;color:#fff;font:inherit;font-size:15px;padding:10px;cursor:pointer}
.photo-choice:disabled{opacity:.45;cursor:default}
.photo-choice:focus-visible{outline:3px solid #65e619;outline-offset:2px}
@media(max-width:380px){
.thumbs{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.plans{gap:8px!important}.plan{padding:12px!important}
}`;
document.head.append(style);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);
else setup();
})();
