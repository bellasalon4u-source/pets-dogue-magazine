(()=>{
"use strict";

const copy={
en:["BECOME THE NEXT STAR","Fill in your application →","All countries","All animals","Newest first","Home","Back to participants","Show more","Participants will appear here after approval.","Could not load. Try again."],
ru:["СТАНЬ СЛЕДУЮЩЕЙ ЗВЕЗДОЙ","Заполни заявку →","Все страны","Все животные","Сначала новые","На главную","К участникам","Показать ещё","Участники появятся здесь после одобрения заявок.","Не удалось загрузить. Попробуйте снова."],
uk:["СТАНЬ НАСТУПНОЮ ЗІРКОЮ","Заповни заявку →","Усі країни","Усі тварини","Спочатку нові","На головну","До учасників","Показати ще","Учасники з’являться після схвалення заявок.","Не вдалося завантажити. Спробуйте знову."],
fr:["DEVENEZ LA PROCHAINE STAR","Remplissez votre candidature →","Tous les pays","Tous les animaux","Les plus récents","Accueil","Retour aux participants","Afficher plus","Les participants apparaîtront après validation.","Chargement impossible. Réessayez."],
de:["WERDE DER NÄCHSTE STAR","Bewerbung ausfüllen →","Alle Länder","Alle Tiere","Neueste zuerst","Startseite","Zu den Teilnehmern","Mehr anzeigen","Teilnehmer erscheinen nach Freigabe.","Laden fehlgeschlagen. Erneut versuchen."],
es:["SÉ LA PRÓXIMA ESTRELLA","Completa tu candidatura →","Todos los países","Todos los animales","Más recientes","Inicio","Volver a participantes","Mostrar más","Los participantes aparecerán tras la aprobación.","No se pudo cargar. Inténtalo de nuevo."],
it:["DIVENTA LA PROSSIMA STAR","Compila la candidatura →","Tutti i paesi","Tutti gli animali","Più recenti","Home","Torna ai partecipanti","Mostra altro","I partecipanti appariranno dopo l’approvazione.","Caricamento non riuscito. Riprova."],
pt:["SEJA A PRÓXIMA ESTRELA","Preencha a candidatura →","Todos os países","Todos os animais","Mais recentes","Início","Voltar aos participantes","Mostrar mais","Os participantes aparecerão após aprovação.","Não foi possível carregar. Tente novamente."],
nl:["WORD DE VOLGENDE STER","Vul je aanmelding in →","Alle landen","Alle dieren","Nieuwste eerst","Home","Terug naar deelnemers","Meer tonen","Deelnemers verschijnen na goedkeuring.","Laden mislukt. Probeer opnieuw."],
pl:["ZOSTAŃ NASTĘPNĄ GWIAZDĄ","Wypełnij zgłoszenie →","Wszystkie kraje","Wszystkie zwierzęta","Najnowsze","Strona główna","Do uczestników","Pokaż więcej","Uczestnicy pojawią się po zatwierdzeniu.","Nie udało się wczytać. Spróbuj ponownie."],
cs:["STAŇ SE DALŠÍ HVĚZDOU","Vyplň přihlášku →","Všechny země","Všechna zvířata","Nejnovější","Domů","Zpět k účastníkům","Zobrazit více","Účastníci se objeví po schválení.","Načtení se nezdařilo. Zkuste znovu."],
sk:["STAŇ SA ĎALŠOU HVIEZDOU","Vyplň prihlášku →","Všetky krajiny","Všetky zvieratá","Najnovšie","Domov","Späť k účastníkom","Zobraziť viac","Účastníci sa zobrazia po schválení.","Načítanie zlyhalo. Skúste znova."],
hu:["LÉGY A KÖVETKEZŐ SZTÁR","Töltsd ki a jelentkezést →","Minden ország","Minden állat","Legújabbak","Kezdőlap","Vissza a résztvevőkhöz","Továbbiak","A résztvevők jóváhagyás után jelennek meg.","Sikertelen betöltés. Próbálja újra."],
ro:["DEVINO URMĂTOAREA VEDETĂ","Completează candidatura →","Toate țările","Toate animalele","Cele mai noi","Acasă","Înapoi la participanți","Arată mai mult","Participanții apar după aprobare.","Încărcarea a eșuat. Încearcă din nou."],
bg:["СТАНИ СЛЕДВАЩАТА ЗВЕЗДА","Попълни заявката →","Всички държави","Всички животни","Най-новите","Начало","Към участниците","Покажи още","Участниците се появяват след одобрение.","Неуспешно зареждане. Опитайте отново."],
el:["ΓΙΝΕ ΤΟ ΕΠΟΜΕΝΟ ΑΣΤΕΡΙ","Συμπλήρωσε την αίτηση →","Όλες οι χώρες","Όλα τα ζώα","Πιο πρόσφατα","Αρχική","Πίσω στους συμμετέχοντες","Περισσότερα","Οι συμμετέχοντες εμφανίζονται μετά την έγκριση.","Αποτυχία φόρτωσης. Δοκιμάστε ξανά."],
sv:["BLI NÄSTA STJÄRNA","Fyll i din ansökan →","Alla länder","Alla djur","Nyaste först","Startsida","Till deltagarna","Visa fler","Deltagare visas efter godkännande.","Kunde inte ladda. Försök igen."],
da:["BLIV DEN NÆSTE STJERNE","Udfyld din ansøgning →","Alle lande","Alle dyr","Nyeste først","Forside","Til deltagerne","Vis flere","Deltagere vises efter godkendelse.","Kunne ikke indlæse. Prøv igen."],
no:["BLI DEN NESTE STJERNEN","Fyll ut søknaden →","Alle land","Alle dyr","Nyeste først","Hjem","Til deltakerne","Vis flere","Deltakere vises etter godkjenning.","Kunne ikke laste. Prøv igjen."],
fi:["OLE SEURAAVA TÄHTI","Täytä hakemus →","Kaikki maat","Kaikki eläimet","Uusimmat ensin","Etusivu","Takaisin osallistujiin","Näytä lisää","Osallistujat näkyvät hyväksymisen jälkeen.","Lataus epäonnistui. Yritä uudelleen."],
tr:["SIRADAKİ YILDIZ SEN OL","Başvurunu doldur →","Tüm ülkeler","Tüm hayvanlar","Önce en yeniler","Ana sayfa","Katılımcılara dön","Daha fazla","Katılımcılar onaydan sonra görünür.","Yüklenemedi. Tekrar deneyin."],
ar:["كن النجم القادم","املأ طلبك ←","كل البلدان","كل الحيوانات","الأحدث أولاً","الرئيسية","العودة إلى المشاركين","عرض المزيد","سيظهر المشاركون بعد الموافقة على الطلبات.","تعذر التحميل. حاول مرة أخرى."],
hi:["अगला सितारा बनें","अपना आवेदन भरें →","सभी देश","सभी जानवर","सबसे नए पहले","मुख्य पृष्ठ","प्रतिभागियों पर वापस जाएँ","और दिखाएँ","स्वीकृति के बाद प्रतिभागी यहाँ दिखाई देंगे।","लोड नहीं हो सका। दोबारा प्रयास करें।"]
};

const animals={
en:["Dog","Cat","Bird","Rabbit","Rodent","Reptile","Horse","Other"],
ru:["Собака","Кошка","Птица","Кролик","Грызун","Рептилия","Лошадь","Другое"],
uk:["Собака","Кіт","Птах","Кролик","Гризун","Рептилія","Кінь","Інше"],
fr:["Chien","Chat","Oiseau","Lapin","Rongeur","Reptile","Cheval","Autre"],
de:["Hund","Katze","Vogel","Kaninchen","Nagetier","Reptil","Pferd","Andere"],
es:["Perro","Gato","Ave","Conejo","Roedor","Reptil","Caballo","Otro"],
it:["Cane","Gatto","Uccello","Coniglio","Roditore","Rettile","Cavallo","Altro"],
pt:["Cão","Gato","Ave","Coelho","Roedor","Réptil","Cavalo","Outro"],
nl:["Hond","Kat","Vogel","Konijn","Knaagdier","Reptiel","Paard","Andere"],
pl:["Pies","Kot","Ptak","Królik","Gryzoń","Gad","Koń","Inne"],
cs:["Pes","Kočka","Pták","Králík","Hlodavec","Plaz","Kůň","Jiné"],
sk:["Pes","Mačka","Vták","Králik","Hlodavec","Plaz","Kôň","Iné"],
hu:["Kutya","Macska","Madár","Nyúl","Rágcsáló","Hüllő","Ló","Más"],
ro:["Câine","Pisică","Pasăre","Iepure","Rozător","Reptilă","Cal","Altul"],
bg:["Куче","Котка","Птица","Заек","Гризач","Влечуго","Кон","Друго"],
el:["Σκύλος","Γάτα","Πουλί","Κουνέλι","Τρωκτικό","Ερπετό","Άλογο","Άλλο"],
sv:["Hund","Katt","Fågel","Kanin","Gnagare","Reptil","Häst","Annat"],
da:["Hund","Kat","Fugl","Kanin","Gnaver","Krybdyr","Hest","Andet"],
no:["Hund","Katt","Fugl","Kanin","Gnager","Reptil","Hest","Annet"],
fi:["Koira","Kissa","Lintu","Kani","Jyrsijä","Matelija","Hevonen","Muu"],
tr:["Köpek","Kedi","Kuş","Tavşan","Kemirgen","Sürüngen","At","Diğer"],
ar:["كلب","قط","طائر","أرنب","قارض","زاحف","حصان","آخر"],
hi:["कुत्ता","बिल्ली","पक्षी","खरगोश","कृंतक","सरीसृप","घोड़ा","अन्य"]
};

const types="dog cat bird rabbit rodent reptile horse other".split(" ");
const el=(tag,cls,text)=>{
const n=document.createElement(tag);
if(cls)n.className=cls;
if(text!==undefined)n.textContent=text;
return n;
};
const language=()=>currentLanguage();
const words=()=>copy[language()]||copy.en;
const animalName=code=>
(animals[language()]||animals.en)[types.indexOf(code)]||code;

const region=code=>{
try{
return new Intl.DisplayNames([language()],{type:"region"}).of(code)||code;
}catch{
return code;
}
};

const flag=code=>/^[A-Z]{2}$/.test(code)
?String.fromCodePoint(...[...code].map(c=>127397+c.charCodeAt(0)))
:"";

const image=value=>
/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(value||"")
?value:safeImage(value);

const castingHash=()=>
location.hash==="#casting"||
location.hash==="#coverApplication"||
new URLSearchParams(location.hash.slice(1)).has("invite");

let items=[],countries=[],availableAnimals=[];
let offset=0,more=false,error=false,loading=false;
let controller,revision=0;
let gallery,panel,title,cta,ctaTitle,ctaText;
let country,animal,order,home,back,grid,status;
let loadMore,listen,dialog,profileRevision=0;

function showCasting(show,write=true){
panel.hidden=!show;
gallery.hidden=show;

if(write&&!new URLSearchParams(location.hash.slice(1)).has("invite")){
history.pushState(null,"",
show?"#casting":location.pathname+location.search);
}

(show?back:cta).focus({preventScroll:true});
(show?panel:gallery).scrollIntoView({block:"start"});
}

function filters(){
const savedCountry=country.value;
const savedAnimal=animal.value;
const w=words();

country.replaceChildren(
new Option(w[2],""),
...countries.map(c=>({code:c,name:region(c)}))
.sort((a,b)=>a.name.localeCompare(b.name))
.map(c=>new Option(flag(c.code)+" "+c.name,c.code))
);

animal.replaceChildren(
new Option(w[3],""),
...availableAnimals.map(c=>new Option(animalName(c),c))
);

country.value=savedCountry;
animal.value=savedAnimal;
country.setAttribute("aria-label",w[2]);
animal.setAttribute("aria-label",w[3]);
}

function render(){
grid.replaceChildren();

for(const pet of items){
const card=el("article","star-card");
const open=el("button","star-open");
const img=el("img");

open.type="button";
open.setAttribute("aria-label",pet.name);
img.src=image(pet.image);
img.alt=pet.name;
img.loading="lazy";
open.append(img);
open.onclick=()=>profile(pet.id);

const details=el("div","star-details");
const name=el("button","star-name",pet.name);
name.type="button";
name.onclick=open.onclick;

const meta=el("p","star-country",
flag(pet.country)+" "+region(pet.country));

const heart=el("button","star-heart","❤️ "+pet.votes);
heart.type="button";
heart.setAttribute("aria-label",pet.name+" ❤️ "+pet.votes);
heart.disabled=pendingVotes.has(pet.id)||votedIds.has(pet.id);
heart.setAttribute("aria-pressed",String(votedIds.has(pet.id)));
heart.onclick=()=>vote(pet.id);

details.append(name,meta,heart);
card.append(open,details);
grid.append(card);
}

status.textContent=error
?words()[9]
:!loading&&!items.length?words()[8]:"";

loadMore.hidden=!more&&!error;
loadMore.disabled=loading;
}

function update(){
const w=words();

title.textContent=tr("hero.title")===""
?"PETS & DOGUE"
:document.querySelector(
'[data-i18n="common.navigation.coverStars"]'
)?.textContent||"Cover Stars";

ctaTitle.textContent=w[0];
ctaText.textContent=w[1];
order.textContent=w[4];
home.textContent="⌂ "+w[5];
back.textContent="← "+w[6];
loadMore.textContent=w[7];
listen.textContent="🔊 "+ui()[3];
listen.setAttribute("aria-label",ui()[3]);

filters();
render();
}

async function load(reset=false){
if(reset){
controller?.abort();
offset=0;
items=[];
more=false;
revision++;
}else if(loading){
return;
}

const generation=revision;
controller=new AbortController();
loading=true;
error=false;
render();

const params=new URLSearchParams({offset:String(offset)});
if(country.value)params.set("country",country.value);
if(animal.value)params.set("animal",animal.value);

try{
const r=await fetch("/api/cover-gallery?"+params,{
cache:"no-store",
signal:controller.signal
});
const data=await r.json();

if(!r.ok||!data.ok||!Array.isArray(data.participants)){
throw Error();
}
if(generation!==revision)return;

items.push(...data.participants.filter(
p=>!items.some(x=>x.id===p.id)
));

offset+=data.participants.length;
more=data.hasMore===true;
countries=data.countries||[];
availableAnimals=data.animals||[];
filters();

}catch(e){
if(generation===revision&&e.name!=="AbortError")error=true;
}finally{
if(generation===revision){
loading=false;
render();
}
}
}

async function vote(id){
if(pendingVotes.has(id)||votedIds.has(id))return;

pendingVotes.add(id);
render();

try{
const r=await fetch("/api/vote-cover-star",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({candidateId:id})
});
const data=await r.json();

if(!r.ok||!data.ok||!Number.isFinite(Number(data.votes))){
throw Error();
}

const pet=items.find(p=>p.id===id);
if(pet)pet.votes=Math.max(0,Number(data.votes));
votedIds.add(id);

}catch{
error=true;
}finally{
pendingVotes.delete(id);
render();
}
}

async function profile(id){
const request=++profileRevision;
dialog.replaceChildren();

const close=el("button","star-close","×");
close.type="button";
close.setAttribute("aria-label",words()[6]);
close.onclick=()=>{
profileRevision++;
dialog.close();
};

const body=el("div","star-profile-body");
dialog.append(close,body);
dialog.showModal();

try{
const r=await fetch(
"/api/cover-gallery?id="+encodeURIComponent(id),
{cache:"no-store"}
);
const data=await r.json();

if(request!==profileRevision||!dialog.open)return;
if(!r.ok||!data.ok||!data.profile)throw Error();

const pet=data.profile;
const img=el("img","star-profile-image");
img.src=image(pet.photos[pet.mainPhoto]||pet.photos[0]);
img.alt=pet.name;

const heading=el("h2",null,pet.name);
const info=el("p",null,
flag(pet.country)+" "+region(pet.country)+" · "+
animalName(pet.animal)
);
const story=el("p","star-story",pet.story);
const quote=el("p","star-story",pet.quote);
const thumbs=el("div","star-profile-thumbs");

pet.photos.forEach((src,i)=>{
const b=el("button"),t=el("img");
b.type="button";
b.setAttribute("aria-label",pet.name+" "+(i+1));
t.src=image(src);
t.alt=pet.name;
t.loading="lazy";
b.append(t);
b.onclick=()=>img.src=image(src);
thumbs.append(b);
});

const speak=el("button","btn","🔊 "+ui()[3]);
speak.type="button";
speak.onclick=()=>speakSection("starProfile");

body.append(img,heading,info,speak,story,quote,thumbs);

}catch{
if(request===profileRevision)body.textContent=words()[9];
}
}

function setup(){
if(document.getElementById("starsGallery"))return;

const hero=document.getElementById("coverHero");
const main=document.getElementById("coverMain");
if(!hero||!main)return;

panel=el("div","casting-page");
panel.id="castingPage";
hero.before(panel);
panel.append(hero,main);

back=el("button","btn casting-back");
back.type="button";
back.onclick=()=>showCasting(false);
panel.prepend(back);

gallery=el("main","stars-gallery");
gallery.id="starsGallery";
panel.before(gallery);

title=el("h1");
listen=el("button","stars-listen");
listen.type="button";
listen.onclick=()=>speakSection("starsGallery");

cta=el("button","stars-cta");
cta.type="button";
ctaTitle=el("strong");
ctaText=el("span");
cta.append(ctaTitle,ctaText);
cta.onclick=()=>showCasting(true);

const bar=el("div","stars-filters");
country=el("select");
animal=el("select");
country.onchange=animal.onchange=()=>load(true);
bar.append(country,animal);

const tools=el("div","stars-tools");
order=el("span");
home=el("a");
home.href="/";
tools.append(order,home);

grid=el("div","stars-grid");
status=el("p","stars-status");
status.setAttribute("role","status");

loadMore=el("button","btn stars-more");
loadMore.type="button";
loadMore.onclick=()=>load();

gallery.append(
title,listen,cta,bar,tools,grid,status,loadMore
);

dialog=el("dialog","star-dialog");
dialog.id="starProfile";
dialog.addEventListener("close",()=>{
profileRevision++;
window.speechSynthesis?.cancel();
});
document.body.append(dialog);

update();
panel.hidden=!castingHash();
gallery.hidden=!panel.hidden;

window.addEventListener("popstate",()=>{
showCasting(castingHash(),false);
});

new MutationObserver(()=>{
window.speechSynthesis?.cancel();
if(dialog.open)dialog.close();
update();
}).observe(document.documentElement,{
attributes:true,
attributeFilter:["lang"]
});

load(true);
}

const style=el("style");
style.textContent=`
.casting-page[hidden],.stars-gallery[hidden]{
display:none!important
}
.casting-page,.stars-gallery{
scroll-margin-top:180px
}
.casting-back{margin:12px 18px}
.stars-gallery{
max-width:1100px;padding:18px 12px 36px;
margin:auto;color:#111
}
.stars-gallery h1{
font:normal clamp(32px,6vw,60px)/1.1 Georgia,serif;
text-align:center;margin:6px 0
}
.stars-listen{
display:block;margin:8px auto 14px;
border:1px solid #999;border-radius:24px;
background:transparent;padding:7px 14px;color:#111
}
.stars-cta{
width:100%;background:#ed101b;border:0;
border-radius:8px;color:white;
padding:18px 12px;margin-bottom:14px
}
.stars-cta strong,.stars-cta span{display:block}
.stars-cta strong{
font-size:clamp(17px,3vw,26px);line-height:1.3
}
.stars-cta span{font-size:16px;margin-top:7px}
.stars-filters{
display:grid;grid-template-columns:1fr 1fr;gap:10px
}
.stars-filters select{
min-width:0;border:1px solid #222;border-radius:6px;
font-size:16px;padding:12px 8px
}
.stars-tools{
display:flex;justify-content:space-between;
gap:12px;margin:16px 0;font-size:14px
}
.stars-grid{columns:2;column-gap:10px}
.star-card{
break-inside:avoid;margin:0 0 10px;
background:#fffaf2;border-radius:7px;overflow:hidden
}
.star-open{
display:block;border:0;padding:0;background:#eee;width:100%
}
.star-open img{width:100%;height:auto}
.star-details{
position:relative;padding:10px 9px 12px;
padding-inline-end:65px
}
.star-name{
display:block;background:transparent;border:0;padding:0;
text-align:start;font:normal 25px Georgia,serif;
overflow-wrap:anywhere
}
.star-country{font-size:12px;margin-top:4px;line-height:1.4}
.star-heart{
position:absolute;inset-inline-end:6px;bottom:13px;
border:0;background:transparent;color:#bd0912;
font-size:15px;padding:8px 0;min-height:44px
}
.stars-status{margin:18px 0;line-height:1.6}
.stars-more{display:block;margin:20px auto}
.star-dialog{
width:min(780px,95vw);max-height:90svh;border:0;
padding:0;background:#f4efe5;color:#111
}
.star-dialog::backdrop{background:#000b}
.star-close{
position:sticky;top:8px;float:right;z-index:2;
border:0;border-radius:50%;font-size:28px;
width:44px;height:44px;margin:8px;
background:white;color:#111
}
.star-profile-body{padding:16px}
.star-profile-image{
max-height:60svh;object-fit:contain;background:#111
}
.star-profile-body h2{
font:normal 38px Georgia,serif;margin:14px 0
}
.star-profile-body p{line-height:1.6}
.star-story{white-space:pre-wrap;margin:16px 0}
.star-profile-thumbs{
display:grid;grid-template-columns:repeat(3,1fr);gap:8px
}
.star-profile-thumbs button{padding:0;border:0}
.star-profile-thumbs img{aspect-ratio:1;object-fit:cover}
.stars-gallery button:focus-visible,
.stars-gallery select:focus-visible{
outline:3px solid #65e51f;outline-offset:3px
}
@media(min-width:800px){
.stars-grid{columns:3;column-gap:14px}
}
`;

document.head.append(style);

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",setup);
}else{
setup();
}
})();
