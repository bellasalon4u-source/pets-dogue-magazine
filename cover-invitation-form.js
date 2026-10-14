(()=>{
"use strict";
const labels={
en:["Free entry by invitation. No payment or subscription required.","Submit application","Application received for review.","Could not submit. Check your invitation and try again.","Dog|Cat|Bird|Rabbit|Rodent|Reptile|Horse|Other"],
ru:["Бесплатное участие по приглашению. Оплата и подписка не нужны.","Отправить заявку","Заявка получена и ожидает проверки.","Не удалось отправить. Проверьте приглашение и повторите попытку.","Собака|Кошка|Птица|Кролик|Грызун|Рептилия|Лошадь|Другое"],
uk:["Безкоштовна участь за запрошенням. Оплата й підписка не потрібні.","Надіслати заявку","Заявку отримано для перевірки.","Не вдалося надіслати. Перевірте запрошення та спробуйте знову.","Собака|Кіт|Птах|Кролик|Гризун|Рептилія|Кінь|Інше"],
fr:["Participation gratuite sur invitation. Aucun paiement ni abonnement requis.","Envoyer la candidature","Candidature reçue pour examen.","Envoi impossible. Vérifiez votre invitation et réessayez.","Chien|Chat|Oiseau|Lapin|Rongeur|Reptile|Cheval|Autre"],
de:["Kostenlose Teilnahme auf Einladung. Keine Zahlung oder Mitgliedschaft erforderlich.","Bewerbung senden","Bewerbung zur Prüfung erhalten.","Senden fehlgeschlagen. Einladung prüfen und erneut versuchen.","Hund|Katze|Vogel|Kaninchen|Nagetier|Reptil|Pferd|Andere"],
es:["Participación gratuita por invitación. Sin pago ni suscripción.","Enviar candidatura","Candidatura recibida para revisión.","No se pudo enviar. Comprueba la invitación e inténtalo de nuevo.","Perro|Gato|Ave|Conejo|Roedor|Reptil|Caballo|Otro"],
it:["Partecipazione gratuita su invito. Nessun pagamento o abbonamento richiesto.","Invia candidatura","Candidatura ricevuta per la verifica.","Invio non riuscito. Controlla l’invito e riprova.","Cane|Gatto|Uccello|Coniglio|Roditore|Rettile|Cavallo|Altro"],
pt:["Participação gratuita por convite. Sem pagamento ou assinatura.","Enviar candidatura","Candidatura recebida para análise.","Não foi possível enviar. Verifique o convite e tente novamente.","Cão|Gato|Ave|Coelho|Roedor|Réptil|Cavalo|Outro"],
nl:["Gratis deelname op uitnodiging. Geen betaling of abonnement nodig.","Aanmelding verzenden","Aanmelding ontvangen ter beoordeling.","Verzenden mislukt. Controleer de uitnodiging en probeer opnieuw.","Hond|Kat|Vogel|Konijn|Knaagdier|Reptiel|Paard|Andere"],
pl:["Bezpłatny udział na zaproszenie. Bez opłaty i subskrypcji.","Wyślij zgłoszenie","Zgłoszenie otrzymano do weryfikacji.","Nie udało się wysłać. Sprawdź zaproszenie i spróbuj ponownie.","Pies|Kot|Ptak|Królik|Gryzoń|Gad|Koń|Inne"],
cs:["Účast zdarma na pozvání. Bez platby a předplatného.","Odeslat přihlášku","Přihláška přijata ke kontrole.","Odeslání se nezdařilo. Zkontrolujte pozvánku a zkuste to znovu.","Pes|Kočka|Pták|Králík|Hlodavec|Plaz|Kůň|Jiné"],
sk:["Bezplatná účasť na pozvanie. Bez platby a predplatného.","Odoslať prihlášku","Prihláška prijatá na kontrolu.","Odoslanie zlyhalo. Skontrolujte pozvánku a skúste znova.","Pes|Mačka|Vták|Králik|Hlodavec|Plaz|Kôň|Iné"],
hu:["Ingyenes részvétel meghívóval. Fizetés és előfizetés nélkül.","Jelentkezés elküldése","A jelentkezés ellenőrzésre megérkezett.","Sikertelen küldés. Ellenőrizze a meghívót, és próbálja újra.","Kutya|Macska|Madár|Nyúl|Rágcsáló|Hüllő|Ló|Más"],
ro:["Participare gratuită prin invitație. Fără plată sau abonament.","Trimite candidatura","Candidatura a fost primită pentru verificare.","Trimiterea a eșuat. Verifică invitația și încearcă din nou.","Câine|Pisică|Pasăre|Iepure|Rozător|Reptilă|Cal|Altul"],
bg:["Безплатно участие с покана. Без плащане или абонамент.","Изпрати заявката","Заявката е получена за проверка.","Неуспешно изпращане. Проверете поканата и опитайте отново.","Куче|Котка|Птица|Заек|Гризач|Влечуго|Кон|Друго"],
el:["Δωρεάν συμμετοχή με πρόσκληση. Χωρίς πληρωμή ή συνδρομή.","Υποβολή αίτησης","Η αίτηση παραλήφθηκε για έλεγχο.","Η αποστολή απέτυχε. Ελέγξτε την πρόσκληση και δοκιμάστε ξανά.","Σκύλος|Γάτα|Πουλί|Κουνέλι|Τρωκτικό|Ερπετό|Άλογο|Άλλο"],
sv:["Gratis deltagande med inbjudan. Ingen betalning eller prenumeration krävs.","Skicka ansökan","Ansökan mottagen för granskning.","Kunde inte skicka. Kontrollera inbjudan och försök igen.","Hund|Katt|Fågel|Kanin|Gnagare|Reptil|Häst|Annat"],
da:["Gratis deltagelse med invitation. Ingen betaling eller abonnement kræves.","Send ansøgning","Ansøgning modtaget til gennemgang.","Kunne ikke sende. Kontrollér invitationen og prøv igen.","Hund|Kat|Fugl|Kanin|Gnaver|Krybdyr|Hest|Andet"],
no:["Gratis deltakelse med invitasjon. Ingen betaling eller abonnement kreves.","Send søknad","Søknaden er mottatt for vurdering.","Kunne ikke sende. Kontroller invitasjonen og prøv igjen.","Hund|Katt|Fugl|Kanin|Gnager|Reptil|Hest|Annet"],
fi:["Ilmainen osallistuminen kutsulla. Ei maksua tai tilausta.","Lähetä hakemus","Hakemus vastaanotettu tarkistettavaksi.","Lähetys epäonnistui. Tarkista kutsu ja yritä uudelleen.","Koira|Kissa|Lintu|Kani|Jyrsijä|Matelija|Hevonen|Muu"],
tr:["Davetle ücretsiz katılım. Ödeme veya abonelik gerekmez.","Başvuruyu gönder","Başvuru inceleme için alındı.","Gönderilemedi. Daveti kontrol edip tekrar deneyin.","Köpek|Kedi|Kuş|Tavşan|Kemirgen|Sürüngen|At|Diğer"],
ar:["مشاركة مجانية بدعوة. لا يلزم دفع أو اشتراك.","إرسال الطلب","تم استلام الطلب للمراجعة.","تعذر الإرسال. تحقق من الدعوة وحاول مرة أخرى.","كلب|قط|طائر|أرنب|قارض|زاحف|حصان|آخر"],
hi:["निमंत्रण से निःशुल्क भागीदारी। भुगतान या सदस्यता आवश्यक नहीं है।","आवेदन भेजें","आवेदन समीक्षा के लिए प्राप्त हुआ।","भेजना संभव नहीं हुआ। निमंत्रण जाँचें और दोबारा प्रयास करें।","कुत्ता|बिल्ली|पक्षी|खरगोश|कृंतक|सरीसृप|घोड़ा|अन्य"]
};

const token=new URLSearchParams(location.hash.slice(1)).get("invite");
if(!token)return;

const get=id=>document.getElementById(id);
const lang=()=>currentLanguage();
const words=()=>labels[lang()]||labels.en;
let invitation=null,busy=false,done=false,message=-1;

const countryCodes="AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
const animalCodes="dog cat bird rabbit rodent reptile horse other".split(" ");

function select(id){
const old=get(id),node=document.createElement("select");
node.id=id;
node.required=true;
old.replaceWith(node);
return node;
}

function update(){
const w=words(),button=get("saveApplication");
button.textContent=w[1];
button.disabled=busy||done||!invitation;
get("applicationNotice").textContent=message===3?w[3]:w[0];
get("draftStatus").textContent=message<0?"":w[message];

const country=get("country"),saved=country.value;
let names;
try{
names=new Intl.DisplayNames([lang()],{type:"region"});
}catch{
names=new Intl.DisplayNames(["en"],{type:"region"});
}
country.replaceChildren(
new Option(tr("application.pet.choose"),""),
...countryCodes.map(code=>({code,name:names.of(code)}))
.sort((a,b)=>a.name.localeCompare(b.name,lang()))
.map(c=>new Option(c.name,c.code))
);
country.value=saved;

const animal=get("animalType"),chosen=animal.value;
animal.replaceChildren(
new Option(tr("application.pet.choose"),""),
...w[4].split("|").map((name,i)=>new Option(name,animalCodes[i]))
);
animal.value=chosen;
}

async function request(path,body){
const r=await fetch(path,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(body),
cache:"no-store"
});
const data=await r.json();
if(!r.ok||!data.ok)throw Error(data.code||"FAILED");
return data;
}

async function shrink(src){
const image=new Image();
image.src=src;
await image.decode();
let scale=Math.min(1,1600/Math.max(image.naturalWidth,image.naturalHeight));

for(let attempt=0;attempt<8;attempt++){
const canvas=document.createElement("canvas");
canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));
canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
const ctx=canvas.getContext("2d");
ctx.fillStyle="#fff";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.drawImage(image,0,0,canvas.width,canvas.height);
const result=canvas.toDataURL("image/jpeg",.82);
canvas.width=canvas.height=0;
if(result.length<=260000)return result;
scale*=.8;
}
throw Error("PHOTOS_TOO_LARGE");
}

async function submit(){
if(busy||done||!invitation||photoBusy)return;

for(const id of ["petName","ownerName","ownerEmail","country","animalType"]){
get(id).required=true;
if(!get(id).reportValidity()){
showStep(1);
get(id).reportValidity();
return;
}
}

if(photos.length<5||photos.length>10){
get("draftStatus").textContent=tr("alerts.photos");
showStep(2);
return;
}

if(!get("agreeRights").checked||!get("agreeRules").checked){
get("draftStatus").textContent=tr("alerts.permissions");
get("permissions").classList.add("open");
get("permissionSymbol").textContent="−";
return;
}

busy=true;
message=-1;
update();

const savedPhotos=[...photos],savedMain=mainPhoto,answers={};
document.querySelectorAll(".apply input[id],.apply textarea[id],.apply select[id]")
.forEach(e=>{
if(e.type!=="file")answers[e.id]=e.type==="checkbox"?e.checked:e.value;
});
answers.scene=selectedScene;
answers.accessories=[...document.querySelectorAll('input[name="accessory"]:checked')]
.map(e=>e.value);

try{
const compressed=[];
for(const src of savedPhotos)compressed.push(await shrink(src));

await request("/api/cover-invitation-submit",{
token,
contestKey:invitation.contestKey,
application:{
pet_name:answers.petName,
owner_email:answers.ownerEmail,
country_code:answers.country,
animal_type:answers.animalType,
answers,
photos:compressed,
main_photo:savedMain,
rights_confirmed:true,
rules_accepted:true
}
});

done=true;
message=2;
}catch{
message=3;
}finally{
busy=false;
update();
}
}

async function setup(){
select("country");
select("animalType");
get("draftStatus").setAttribute("role","status");

const originalRefresh=refreshDynamic;
refreshDynamic=function(){
originalRefresh();
update();
};

publishEntry=submit;

const originalClear=clearApplication;
clearApplication=function(){
if(busy||done)return;
originalClear();
message=-1;
update();
};

update();

try{
const data=await request("/api/admin-invitations",{action:"check",token});
if(data.invitation.kind!=="cover_star")throw Error();

invitation=data.invitation;
document.querySelector(".club")?.setAttribute("hidden","");
showStep(1);
get("coverApplication")?.scrollIntoView({block:"start"});
}catch{
message=3;
}
update();

new MutationObserver(update).observe(document.documentElement,{
attributes:true,
attributeFilter:["lang"]
});
}

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",setup);
}else{
setup();
}
})();
