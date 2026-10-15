(()=>{
"use strict";

const cover={
id:"cover-star-2026",
status:"Open",
titleKey:"fallback.cover.title",
image:"/file_00000000a9d471fda9b4629589be22a9.png",
joinLink:"/members-gallery.html#coverApplication"
};

function linkFor(contest){
try{
const url=new URL(contest.joinLink||"",location.origin);
return url.origin===location.origin&&url.pathname!=="/contests.html"
?url.pathname+url.search+url.hash:"";
}catch{
return "";
}
}

function active(contest){
if(effectiveStatus(contest)!=="Open")return false;
if(contest.start){
const start=new Date(contest.start+"T00:00:00");
if(!Number.isFinite(start.getTime())||start>Date.now())return false;
}
return !!linkFor(contest);
}

function isCover(contest){
if(String(contest.id)===cover.id)return true;
try{
return new URL(contest.joinLink||"",location.origin).pathname
==="/members-gallery.html";
}catch{
return false;
}
}

getFilteredContests=function(){
const saved=publicContests.filter(isCover);
const coverEntry=saved.length?{
...cover,
...saved[0],
titleKey:cover.titleKey,
image:cover.image,
joinLink:cover.joinLink
}:cover;

const entries=[
coverEntry,
...publicContests.filter(c=>!isCover(c))
];

const query=contestSearch.value.toLocaleLowerCase().trim();

return entries.filter(active).filter(
c=>!query||getContestTitle(c).toLocaleLowerCase().includes(query)
);
};

renderContests=function(){
const entries=getFilteredContests();
contestGrid.replaceChildren();
emptyMessage.style.display=entries.length?"none":"block";

entries.forEach((contest,index)=>{
const title=getContestTitle(contest);
const article=document.createElement("article");
article.className="active-contest";
article.id="activeContest"+index;

const link=document.createElement("a");
link.className="active-contest-link";
link.href=isCover(contest)?cover.joinLink:linkFor(contest);
link.setAttribute("aria-label",title);

const image=document.createElement("img");
image.src=contest.image||cover.image;
image.alt=title;
image.loading="lazy";
image.decoding="async";

const overlay=document.createElement("div");
overlay.className="active-contest-copy";

const heading=document.createElement("h3");
heading.textContent=title;

const action=document.createElement("p");
action.textContent=contestT(
"dynamic.joinCompetition",
"Join Competition"
)+" →";

overlay.append(heading,action);
link.append(image,overlay);

const speak=document.createElement("button");
speak.type="button";
speak.className="speak-button dark active-contest-speak";
speak.setAttribute("aria-label",localWords().read);
speak.title=localWords().read;
speak.innerHTML=speakerSvg();
speak.onclick=()=>speakTarget(article.id,speak);

article.append(link,speak);
contestGrid.append(article);
});

localizeSpeakButtons();
};

function setup(){
document.body.classList.add("active-contests-page");

document.querySelectorAll(
"#heroSpeech,main>.intro-grid,main>.filters,"+
"main>.prize-box,main>.rules,main>.cover-cta,"+
"#contestStatusFilter"
).forEach(e=>e.hidden=true);

document.querySelectorAll("#currentSpeech p")
.forEach(e=>e.hidden=true);

renderContests();
}

const style=document.createElement("style");
style.textContent=`
.active-contests-page main{
max-width:1100px;margin:auto;padding:20px 16px 36px
}
.active-contests-page #currentSpeech{
margin:0 0 18px;padding:0
}
.active-contests-page #currentSpeech h2{
font:normal clamp(32px,5vw,48px)/1.15 Georgia,serif
}
.active-contests-page .contest-toolbar{
grid-template-columns:minmax(0,1fr) auto;margin-bottom:18px
}
.active-contests-page #contestGrid{
display:grid;
grid-template-columns:repeat(2,minmax(0,1fr));
gap:16px
}
.active-contest{
position:relative;min-width:0;background:#111;
overflow:hidden;border-radius:8px
}
.active-contest-link{
position:relative;display:block;
aspect-ratio:4/5;max-height:480px;color:white
}
.active-contest-link:after{
content:"";position:absolute;inset:0;
background:linear-gradient(transparent 40%,rgba(0,0,0,.88))
}
.active-contest-link>img{
width:100%;height:100%;
object-fit:cover;object-position:center
}
.active-contest-copy{
position:absolute;inset-inline:20px;bottom:22px;
z-index:1;padding-inline-end:42px
}
.active-contest-copy h3{
font:normal clamp(30px,4vw,44px)/1.1 Georgia,serif;
color:white;overflow-wrap:anywhere
}
.active-contest-copy p{
font-size:16px;line-height:1.4;
margin-top:12px;color:#f1d783
}
.active-contest-speak{
position:absolute;bottom:20px;
inset-inline-end:14px;z-index:2
}
.active-contest-link:focus-visible{
outline:4px solid #65e51f;outline-offset:-4px
}
@media(max-width:650px){
.active-contests-page #contestGrid{
grid-template-columns:1fr
}
.active-contest-link{
aspect-ratio:5/4;max-height:390px
}
.active-contests-page main{
padding:18px 12px 30px
}
}
`;

document.head.append(style);

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",setup);
}else{
setup();
}
})();
