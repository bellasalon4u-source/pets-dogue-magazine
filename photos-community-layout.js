(() => {
'use strict';
const texts = {
en:['Add your photo','Free. No subscription needed.','Photos from the magazine','Community photos','Issue','Back','More photos','Choose photo','Take a photo','Publish photo','I own this photo or have permission to share it, and agree to its public display and the photo rules.','An animal must be visible. No pornography, violence or animal cruelty. Photos are checked before publication.','Checking photo…','Your photo is published.','Your photo is awaiting review and is not public yet.','Unable to complete this action. Please try again later.','This photo does not meet the animal photo rules.','Community photos will appear here.','Listen'],
uk:['Додай своє фото','Безкоштовно. Підписка не потрібна.','Фото з журналу','Фото спільноти','Випуск','Назад','Ще фото','Вибрати фото','Зробити знімок','Опублікувати фото','Це моє фото або я маю дозвіл ним поділитися. Погоджуюся з публічним показом і правилами фотографій.','На фото має бути тварина. Без порнографії, насильства та жорстокості до тварин. Перед публікацією фото перевіряються.','Перевіряємо фото…','Фото опубліковано.','Фото очікує перевірки й поки не є публічним.','Не вдалося виконати дію. Спробуйте пізніше.','Фото не відповідає правилам фотографій тварин.','Тут з’являться фото спільноти.','Слухати'],
ru:['Добавь своё фото','Бесплатно. Подписка не нужна.','Фото из журнала','Фото пользователей','Выпуск','Назад','Ещё фото','Выбрать фото','Сделать снимок','Опубликовать фото','Это моё фото или у меня есть разрешение им поделиться. Я соглашаюсь с публичным показом и правилами фотографий.','На фото должно быть животное. Без порнографии, насилия и жестокости к животным. Перед публикацией фото проверяются.','Проверяем фото…','Фото опубликовано.','Фото ожидает проверки и пока не опубликовано.','Не удалось выполнить действие. Попробуйте позже.','Фото не соответствует правилам фотографий животных.','Здесь появятся фотографии пользователей.','Слушать'],
fr:['Ajoutez votre photo','Gratuit. Aucun abonnement requis.','Photos du magazine','Photos de la communauté','Numéro','Retour','Plus de photos','Choisir une photo','Prendre une photo','Publier la photo','Cette photo m’appartient ou j’ai la permission de la partager. J’accepte son affichage public et les règles des photos.','Un animal doit être visible. Aucune pornographie, violence ou cruauté animale. Les photos sont vérifiées avant publication.','Vérification de la photo…','Votre photo est publiée.','Votre photo attend une vérification et n’est pas encore publique.','Impossible de terminer cette action. Réessayez plus tard.','Cette photo ne respecte pas les règles des photos d’animaux.','Les photos de la communauté apparaîtront ici.','Écouter'],
de:['Füge dein Foto hinzu','Kostenlos. Kein Abo nötig.','Fotos aus dem Magazin','Fotos der Community','Ausgabe','Zurück','Weitere Fotos','Foto auswählen','Foto aufnehmen','Foto veröffentlichen','Dieses Foto gehört mir oder ich darf es teilen. Ich stimme der öffentlichen Anzeige und den Fotoregeln zu.','Ein Tier muss sichtbar sein. Keine Pornografie, Gewalt oder Tierquälerei. Fotos werden vor der Veröffentlichung geprüft.','Foto wird geprüft…','Dein Foto ist veröffentlicht.','Dein Foto wartet auf Prüfung und ist noch nicht öffentlich.','Die Aktion konnte nicht abgeschlossen werden. Bitte später erneut versuchen.','Dieses Foto entspricht nicht den Regeln für Tierfotos.','Hier erscheinen Fotos der Community.','Anhören'],
es:['Añade tu foto','Gratis. Sin suscripción.','Fotos de la revista','Fotos de la comunidad','Número','Volver','Más fotos','Elegir foto','Hacer una foto','Publicar foto','Soy propietario de esta foto o tengo permiso para compartirla. Acepto su publicación y las normas de fotos.','Debe verse un animal. Sin pornografía, violencia ni maltrato animal. Las fotos se revisan antes de publicarse.','Revisando foto…','Tu foto está publicada.','Tu foto está pendiente de revisión y aún no es pública.','No se pudo completar la acción. Inténtalo más tarde.','Esta foto no cumple las normas de fotos de animales.','Aquí aparecerán las fotos de la comunidad.','Escuchar'],
it:['Aggiungi la tua foto','Gratis. Nessun abbonamento richiesto.','Foto della rivista','Foto della comunità','Numero','Indietro','Altre foto','Scegli foto','Scatta una foto','Pubblica foto','La foto è mia o ho il permesso di condividerla. Accetto la visualizzazione pubblica e le regole delle foto.','Deve essere visibile un animale. Niente pornografia, violenza o crudeltà sugli animali. Le foto vengono controllate prima della pubblicazione.','Controllo della foto…','La tua foto è pubblicata.','La foto è in attesa di verifica e non è ancora pubblica.','Impossibile completare l’azione. Riprova più tardi.','Questa foto non rispetta le regole delle foto di animali.','Qui appariranno le foto della comunità.','Ascolta'],
pt:['Adiciona a tua foto','Grátis. Não é necessária subscrição.','Fotos da revista','Fotos da comunidade','Edição','Voltar','Mais fotos','Escolher foto','Tirar uma foto','Publicar foto','A foto é minha ou tenho autorização para a partilhar. Aceito a sua exibição pública e as regras das fotos.','Deve ser visível um animal. Sem pornografia, violência ou crueldade animal. As fotos são verificadas antes da publicação.','A verificar a foto…','A tua foto foi publicada.','A foto aguarda revisão e ainda não é pública.','Não foi possível concluir a ação. Tenta mais tarde.','Esta foto não cumpre as regras das fotos de animais.','As fotos da comunidade aparecerão aqui.','Ouvir'],
nl:['Voeg je foto toe','Gratis. Geen abonnement nodig.','Foto’s uit het magazine','Foto’s van de community','Nummer','Terug','Meer foto’s','Foto kiezen','Foto maken','Foto publiceren','Deze foto is van mij of ik mag deze delen. Ik ga akkoord met openbare weergave en de fotoregels.','Er moet een dier zichtbaar zijn. Geen pornografie, geweld of dierenmishandeling. Foto’s worden voor publicatie gecontroleerd.','Foto controleren…','Je foto is gepubliceerd.','Je foto wacht op beoordeling en is nog niet openbaar.','De actie is niet voltooid. Probeer het later opnieuw.','Deze foto voldoet niet aan de regels voor dierenfoto’s.','Hier verschijnen foto’s van de community.','Luisteren'],
pl:['Dodaj swoje zdjęcie','Bezpłatnie. Bez subskrypcji.','Zdjęcia z magazynu','Zdjęcia społeczności','Numer','Wstecz','Więcej zdjęć','Wybierz zdjęcie','Zrób zdjęcie','Opublikuj zdjęcie','To moje zdjęcie lub mam zgodę na udostępnienie. Akceptuję publiczne wyświetlanie i zasady zdjęć.','Na zdjęciu musi być zwierzę. Bez pornografii, przemocy i znęcania się nad zwierzętami. Zdjęcia są sprawdzane przed publikacją.','Sprawdzanie zdjęcia…','Zdjęcie zostało opublikowane.','Zdjęcie czeka na sprawdzenie i nie jest jeszcze publiczne.','Nie udało się wykonać działania. Spróbuj później.','Zdjęcie nie spełnia zasad zdjęć zwierząt.','Tutaj pojawią się zdjęcia społeczności.','Słuchaj'],
cs:['Přidejte svou fotku','Zdarma. Bez předplatného.','Fotky z časopisu','Fotky komunity','Číslo','Zpět','Další fotky','Vybrat fotku','Vyfotit','Zveřejnit fotku','Fotka je moje nebo mám svolení ji sdílet. Souhlasím s veřejným zobrazením a pravidly fotek.','Na fotce musí být zvíře. Žádná pornografie, násilí ani týrání zvířat. Fotky se před zveřejněním kontrolují.','Kontrola fotky…','Fotka byla zveřejněna.','Fotka čeká na kontrolu a zatím není veřejná.','Akci se nepodařilo dokončit. Zkuste to později.','Fotka nesplňuje pravidla fotek zvířat.','Zde se objeví fotky komunity.','Poslouchat'],
sk:['Pridajte svoju fotku','Zadarmo. Bez predplatného.','Fotky z časopisu','Fotky komunity','Číslo','Späť','Ďalšie fotky','Vybrať fotku','Odfotiť','Zverejniť fotku','Fotka je moja alebo mám povolenie ju zdieľať. Súhlasím s verejným zobrazením a pravidlami fotiek.','Na fotke musí byť zviera. Žiadna pornografia, násilie ani týranie zvierat. Fotky sa pred zverejnením kontrolujú.','Kontrola fotky…','Fotka bola zverejnená.','Fotka čaká na kontrolu a zatiaľ nie je verejná.','Akciu sa nepodarilo dokončiť. Skúste to neskôr.','Fotka nespĺňa pravidlá fotiek zvierat.','Tu sa objavia fotky komunity.','Počúvať'],
hu:['Töltsd fel a fotódat','Ingyenes. Előfizetés nélkül.','Fotók a magazinból','Közösségi fotók','Lapszám','Vissza','További fotók','Fotó kiválasztása','Fotó készítése','Fotó közzététele','A fotó az enyém, vagy engedélyem van megosztani. Elfogadom a nyilvános megjelenítést és a fotószabályokat.','A fotón állatnak kell szerepelnie. Pornográfia, erőszak és állatkínzás tilos. A fotókat közzététel előtt ellenőrizzük.','Fotó ellenőrzése…','A fotód megjelent.','A fotód ellenőrzésre vár, még nem nyilvános.','A művelet nem sikerült. Próbáld újra később.','A fotó nem felel meg az állatfotók szabályainak.','Itt jelennek meg a közösség fotói.','Meghallgatás'],
ro:['Adaugă fotografia ta','Gratuit. Fără abonament.','Fotografii din revistă','Fotografiile comunității','Număr','Înapoi','Mai multe fotografii','Alege o fotografie','Fă o fotografie','Publică fotografia','Fotografia îmi aparține sau am permisiunea să o distribui. Accept afișarea publică și regulile fotografiilor.','Trebuie să fie vizibil un animal. Fără pornografie, violență sau cruzime față de animale. Fotografiile sunt verificate înainte de publicare.','Verificăm fotografia…','Fotografia a fost publicată.','Fotografia așteaptă verificarea și nu este încă publică.','Acțiunea nu a putut fi finalizată. Încearcă mai târziu.','Fotografia nu respectă regulile pentru fotografii cu animale.','Aici vor apărea fotografiile comunității.','Ascultă'],
bg:['Добави своя снимка','Безплатно. Без абонамент.','Снимки от списанието','Снимки на общността','Брой','Назад','Още снимки','Избери снимка','Направи снимка','Публикувай снимка','Снимката е моя или имам разрешение да я споделя. Съгласен съм с публичното показване и правилата за снимки.','На снимката трябва да има животно. Без порнография, насилие или жестокост към животни. Снимките се проверяват преди публикуване.','Проверяваме снимката…','Снимката е публикувана.','Снимката чака проверка и все още не е публична.','Действието не бе завършено. Опитай по-късно.','Снимката не отговаря на правилата за снимки на животни.','Тук ще се появят снимките на общността.','Слушай'],
el:['Πρόσθεσε τη φωτογραφία σου','Δωρεάν. Χωρίς συνδρομή.','Φωτογραφίες του περιοδικού','Φωτογραφίες της κοινότητας','Τεύχος','Πίσω','Περισσότερες φωτογραφίες','Επιλογή φωτογραφίας','Λήψη φωτογραφίας','Δημοσίευση φωτογραφίας','Η φωτογραφία είναι δική μου ή έχω άδεια να τη μοιραστώ. Συμφωνώ με τη δημόσια προβολή και τους κανόνες φωτογραφιών.','Πρέπει να φαίνεται ζώο. Όχι πορνογραφία, βία ή κακοποίηση ζώων. Οι φωτογραφίες ελέγχονται πριν δημοσιευτούν.','Έλεγχος φωτογραφίας…','Η φωτογραφία δημοσιεύτηκε.','Η φωτογραφία αναμένει έλεγχο και δεν είναι ακόμη δημόσια.','Η ενέργεια δεν ολοκληρώθηκε. Δοκίμασε αργότερα.','Η φωτογραφία δεν πληροί τους κανόνες φωτογραφιών ζώων.','Εδώ θα εμφανίζονται οι φωτογραφίες της κοινότητας.','Ακρόαση'],
sv:['Lägg till ditt foto','Gratis. Ingen prenumeration krävs.','Foton från tidningen','Communityns foton','Nummer','Tillbaka','Fler foton','Välj foto','Ta ett foto','Publicera foto','Fotot är mitt eller jag har tillåtelse att dela det. Jag godkänner offentlig visning och fotoreglerna.','Ett djur måste synas. Ingen pornografi, våld eller djurplågeri. Foton granskas före publicering.','Granskar fotot…','Ditt foto är publicerat.','Fotot väntar på granskning och är inte offentligt än.','Åtgärden kunde inte slutföras. Försök senare.','Fotot uppfyller inte reglerna för djurfoton.','Här visas communityns foton.','Lyssna'],
da:['Tilføj dit foto','Gratis. Intet abonnement nødvendigt.','Fotos fra magasinet','Fællesskabets fotos','Nummer','Tilbage','Flere fotos','Vælg foto','Tag et foto','Udgiv foto','Fotoet er mit, eller jeg har tilladelse til at dele det. Jeg accepterer offentlig visning og fotoreglerne.','Et dyr skal være synligt. Ingen pornografi, vold eller dyremishandling. Fotos kontrolleres før udgivelse.','Kontrollerer foto…','Dit foto er udgivet.','Fotoet afventer kontrol og er endnu ikke offentligt.','Handlingen kunne ikke gennemføres. Prøv senere.','Fotoet opfylder ikke reglerne for dyrefotos.','Her vises fællesskabets fotos.','Lyt'],
no:['Legg til bildet ditt','Gratis. Ingen abonnement nødvendig.','Bilder fra magasinet','Bilder fra fellesskapet','Utgave','Tilbake','Flere bilder','Velg bilde','Ta et bilde','Publiser bilde','Bildet er mitt, eller jeg har tillatelse til å dele det. Jeg godtar offentlig visning og bildereglene.','Et dyr må være synlig. Ingen pornografi, vold eller dyremishandling. Bilder kontrolleres før publisering.','Kontrollerer bildet…','Bildet ditt er publisert.','Bildet venter på kontroll og er ikke offentlig ennå.','Handlingen kunne ikke fullføres. Prøv senere.','Bildet oppfyller ikke reglene for dyrebilder.','Her vises bilder fra fellesskapet.','Lytt'],
fi:['Lisää kuvasi','Ilmainen. Tilausta ei tarvita.','Lehden kuvat','Yhteisön kuvat','Numero','Takaisin','Lisää kuvia','Valitse kuva','Ota kuva','Julkaise kuva','Omistan kuvan tai minulla on lupa jakaa se. Hyväksyn julkisen näyttämisen ja kuvasäännöt.','Kuvassa on näyttävä eläin. Ei pornografiaa, väkivaltaa tai eläinrääkkäystä. Kuvat tarkistetaan ennen julkaisua.','Kuvaa tarkistetaan…','Kuvasi on julkaistu.','Kuvasi odottaa tarkistusta eikä ole vielä julkinen.','Toimintoa ei voitu suorittaa. Yritä myöhemmin uudelleen.','Kuva ei täytä eläinkuvien sääntöjä.','Yhteisön kuvat näkyvät täällä.','Kuuntele'],
tr:['Fotoğrafını ekle','Ücretsiz. Abonelik gerekmez.','Dergiden fotoğraflar','Topluluk fotoğrafları','Sayı','Geri','Daha fazla fotoğraf','Fotoğraf seç','Fotoğraf çek','Fotoğrafı yayımla','Fotoğraf bana ait veya paylaşma iznim var. Herkese açık gösterimi ve fotoğraf kurallarını kabul ediyorum.','Bir hayvan görünmelidir. Pornografi, şiddet veya hayvanlara eziyet yasaktır. Fotoğraflar yayımlanmadan önce kontrol edilir.','Fotoğraf kontrol ediliyor…','Fotoğrafın yayımlandı.','Fotoğrafın incelenmeyi bekliyor ve henüz herkese açık değil.','İşlem tamamlanamadı. Daha sonra tekrar dene.','Fotoğraf, hayvan fotoğrafı kurallarına uymuyor.','Topluluk fotoğrafları burada görünecek.','Dinle'],
ar:['أضف صورتك','مجاناً. لا يلزم اشتراك.','صور المجلة','صور المستخدمين','العدد','رجوع','المزيد من الصور','اختر صورة','التقط صورة','انشر الصورة','أملك هذه الصورة أو لدي إذن بمشاركتها، وأوافق على عرضها علناً وعلى قواعد الصور.','يجب أن يظهر حيوان في الصورة. يُمنع المحتوى الإباحي والعنف وإساءة معاملة الحيوانات. تُفحص الصور قبل نشرها.','جارٍ فحص الصورة…','تم نشر صورتك.','صورتك بانتظار المراجعة ولم تُنشر علناً بعد.','تعذر إكمال الإجراء. حاول لاحقاً.','هذه الصورة لا تستوفي قواعد صور الحيوانات.','ستظهر صور المستخدمين هنا.','استمع'],
hi:['अपनी फ़ोटो जोड़ें','मुफ़्त। सदस्यता की ज़रूरत नहीं।','पत्रिका की तस्वीरें','समुदाय की तस्वीरें','अंक','वापस','और तस्वीरें','फ़ोटो चुनें','फ़ोटो लें','फ़ोटो प्रकाशित करें','यह फ़ोटो मेरी है या मुझे इसे साझा करने की अनुमति है। मैं इसके सार्वजनिक प्रदर्शन और फ़ोटो के नियमों से सहमत हूँ।','फ़ोटो में जानवर दिखना चाहिए। अश्लीलता, हिंसा या पशु क्रूरता की अनुमति नहीं है। प्रकाशन से पहले फ़ोटो जाँची जाती हैं।','फ़ोटो की जाँच हो रही है…','आपकी फ़ोटो प्रकाशित हो गई है।','आपकी फ़ोटो समीक्षा की प्रतीक्षा में है और अभी सार्वजनिक नहीं है।','कार्रवाई पूरी नहीं हो सकी। बाद में फिर कोशिश करें।','यह फ़ोटो जानवरों की फ़ोटो के नियमों के अनुरूप नहीं है।','समुदाय की तस्वीरें यहाँ दिखाई देंगी।','सुनें']
};
const aliases={ua:'uk',cz:'cs',gr:'el',se:'sv',dk:'da'};
const lang=()=>{let v='en';try{v=typeof getPhotoLanguage==='function'?getPhotoLanguage():document.documentElement.lang;}catch{}v=String(v||'en').toLowerCase().split('-')[0];return aliases[v]||v;};
const t=i=>(texts[lang()]||texts.en)[i];
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const label=(node,i)=>{node.dataset.pcText=i;return node;};
const button=(i,fn,cls='pc-button')=>{const b=label(el('button',cls),i);b.type='button';b.onclick=fn;return b;};
const safeURL=s=>{try{const u=new URL(s,location.origin);return u.protocol==='https:'||u.origin===location.origin?u.href:'';}catch{return '';}};
let root,grid,title,note,more,back,issueCard,uploadDialog,viewer,preview,consent,publish,file,camera,uploadStatus;
let mode='community',issue=null,rows=[],offset=0,busy=false,hasMore=false,revision=0,selected=null,sending=false,statusKey=null,choiceRevision=0;
const update=()=>{
 if(!root)return;
 grid.classList.toggle('pc-issues',mode==='issues');
 const home=root.querySelector('.pc-home');if(home&&typeof photoT==='function')home.setAttribute('aria-label',photoT('footer.home','Home'));
 document.querySelectorAll('[data-pc-text]').forEach(n=>{n.textContent=t(Number(n.dataset.pcText));});
 title.textContent=mode==='community'?t(3):mode==='issues'?t(2):`${t(4)} ${issue?.number||''}`;
 back.hidden=mode==='community';issueCard.hidden=mode!=='community';
 more.hidden=!hasMore||mode==='issues';more.disabled=busy;
 if(note.dataset.pcMessage)note.textContent=t(Number(note.dataset.pcMessage));
 if(statusKey!==null)uploadStatus.textContent=t(statusKey);
 publish.disabled=sending||!selected||!consent.checked;
 publish.textContent=t(sending?12:9);
 file.setAttribute('aria-label',t(7));camera.setAttribute('aria-label',t(8));preview.alt=t(7);
 viewer.setAttribute('aria-label',t(3));uploadDialog.setAttribute('aria-label',t(0));
 root.querySelectorAll('[data-pc-issue]').forEach(n=>{n.textContent=`${t(4)} ${n.dataset.pcIssue}`;});
 root.querySelectorAll('.pc-tile img').forEach(n=>n.alt=t(3));
};
const message=i=>{note.dataset.pcMessage=i;note.textContent=t(i);};
async function api(params){const r=await fetch('/api/photos-community?'+new URLSearchParams(params),{cache:'no-store'});if(!r.ok)throw Error();return r.json();}
function photo(src){const image=el('img');image.src=safeURL(src);image.alt=t(3);image.loading='lazy';image.decoding='async';return image;}
function openPhoto(row){viewer.replaceChildren();viewer.append(button(5,()=>viewer.close()),photo(row.image_url));viewer.showModal();}
function appendPhotos(items){const seen=new Set(rows.map(p=>p.id));for(const row of items){if(seen.has(row.id)||!safeURL(row.image_url))continue;seen.add(row.id);rows.push(row);const b=el('button','pc-tile');b.type='button';b.append(photo(row.image_url));b.onclick=()=>openPhoto(row);grid.append(b);}}
async function load(reset=true){
 const rev=reset?++revision:revision;
 if(reset){rows=[];offset=0;grid.replaceChildren();hasMore=false;}
 busy=true;note.textContent='';delete note.dataset.pcMessage;update();
 try{
  if(mode==='issues'){
   const data=await api({mode:'issues'});if(rev!==revision)return;
   for(const item of data.issues){const b=el('button','pc-issue');b.type='button';const name=el('span');name.dataset.pcIssue=item.number;name.textContent=`${t(4)} ${item.number}`;b.append(photo(item.cover_url),name);b.onclick=()=>{issue=item;mode='magazine';load();};grid.append(b);}
   if(!data.issues.length)message(17);
  }else{
   const data=await api({mode,offset:String(offset),...(issue&&mode==='magazine'?{issue:issue.id}:{})});
   if(rev!==revision)return;appendPhotos(data.photos);offset+=data.photos.length;hasMore=data.hasMore===true;if(!rows.length)message(17);
  }
 }catch{if(rev===revision)message(15);}finally{if(rev===revision){busy=false;update();}}
}
async function choose(input){
 const chosen=input.files?.[0];input.value='';if(!chosen||sending)return;const choice=++choiceRevision;
 statusKey=null;selected=null;publish.disabled=true;preview.removeAttribute('src');
 let objectURL;
 try{
  if(chosen.size>20000000||!chosen.type.startsWith('image/'))throw Error();
  objectURL=URL.createObjectURL(chosen);const image=new Image();image.src=objectURL;await image.decode();
  const scale=Math.min(1,1600/image.naturalWidth,1600/image.naturalHeight);const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  let data=canvas.toDataURL('image/jpeg',0.8);if(data.length>1300000)data=canvas.toDataURL('image/jpeg',0.55);if(data.length>1300000)throw Error();
  if(choice!==choiceRevision)return;selected=data;preview.src=data;
 }catch{if(choice===choiceRevision)statusKey=15;}finally{if(objectURL)URL.revokeObjectURL(objectURL);uploadStatus.textContent=statusKey===null?'':t(statusKey);update();}
}
async function submit(){
 if(sending||!selected||!consent.checked)return;
 sending=true;statusKey=12;file.disabled=camera.disabled=true;update();
 try{
  const r=await fetch('/api/photos-upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:selected,consent:true,consentVersion:'photos-2026-10-15'}),signal:AbortSignal.timeout(120000)});
  const data=await r.json();if(!r.ok){statusKey=data.error==='photo_not_allowed'?16:15;return;}
  if(!['approved','pending'].includes(data.status))throw Error();
  statusKey=data.status==='approved'?13:14;selected=null;consent.checked=false;preview.removeAttribute('src');
  if(data.status==='approved'){mode='community';issue=null;await load();}
 }catch{statusKey=15;}finally{sending=false;file.disabled=camera.disabled=false;update();}
}
function listen(){
 if(!window.speechSynthesis)return;window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance([t(0),t(1),t(11)].join('. '));u.lang=lang();
 const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().split('-')[0]===lang());if(voice)u.voice=voice;window.speechSynthesis.speak(u);
}
function setup(){
 if(document.getElementById('pcPhotos'))return;
 const oldHero=document.querySelector('body > .hero'),oldSection=document.querySelector('body > .section');
 if(!oldHero||!oldSection)return;
 const style=el('style');style.textContent=`
body.pc-ready > .hero,body.pc-ready > .section{display:none!important}
#pcPhotos{max-width:1280px;margin:0 auto;padding:12px;background:#f4f0e5;color:#111}
#pcPhotos *,dialog.pc-dialog *{box-sizing:border-box}
.pc-banner{background:#db1629;color:white;overflow:hidden;border-radius:12px;margin-bottom:14px}
.pc-banner img{display:block;width:100%;height:clamp(160px,32vw,300px);object-fit:cover}
.pc-banner-text{padding:18px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.pc-banner h1{font:700 clamp(25px,5vw,42px)/1.12 Arial,sans-serif;margin:0 0 6px;color:white}
.pc-banner p{font:16px/1.4 Arial,sans-serif;margin:0;color:white}
.pc-button{border:1px solid #111;border-radius:999px;padding:12px 20px;background:#111;color:white;font:700 16px/1.3 Arial,sans-serif;cursor:pointer;min-height:46px}
.pc-button:disabled{opacity:.5;cursor:wait}
.pc-banner .pc-button{background:white;color:#b80016;border:0}
.pc-tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:12px 0}
.pc-magazine{display:flex;align-items:center;gap:14px;width:100%;background:#111;color:#f1d989;padding:12px;border:1px solid #c3a453;text-align:start;cursor:pointer;font:700 22px/1.25 Georgia,serif}
.pc-magazine img{width:54px;height:72px;object-fit:cover}
.pc-heading{font:400 clamp(25px,5vw,40px)/1.2 Georgia,serif;margin:20px 0 12px}
.pc-grid{columns:2;column-gap:8px}
.pc-tile{display:block;break-inside:avoid;width:100%;margin:0 0 8px;padding:0;border:0;background:#e6dfd0;cursor:zoom-in;border-radius:8px;overflow:hidden}
.pc-tile img{display:block;width:100%;height:auto}
.pc-issue{display:block;width:min(100%,540px);margin:0 auto 18px;border:0;background:#111;color:white;padding:0;overflow:hidden;border-radius:10px;cursor:pointer}
.pc-issue img{display:block;width:100%;height:auto}.pc-issue span{display:block;padding:14px;font:700 22px Georgia,serif}
.pc-grid.pc-issues{columns:auto}
.pc-note{font:16px/1.5 Arial,sans-serif;margin:14px 0}
dialog.pc-dialog{border:1px solid #b99b55;border-radius:14px;width:min(94vw,700px);max-height:90dvh;overflow:auto;padding:20px;background:#f4f0e5;color:#111}
dialog.pc-dialog::backdrop{background:#000b}
dialog.pc-dialog img{display:block;max-width:100%;max-height:65dvh;object-fit:contain;margin:14px auto}
dialog.pc-dialog p,dialog.pc-dialog label{font:16px/1.5 Arial,sans-serif}
dialog.pc-dialog h2{font:32px/1.2 Georgia,serif;margin:18px 0}
.pc-consent{display:flex;align-items:flex-start;gap:10px;margin:18px 0}.pc-consent input{width:22px;height:22px;flex-shrink:0;accent-color:#d51428}
.pc-upload{background:#d51428;border-color:#d51428;width:100%}.pc-status{min-height:24px}
.pc-button:focus-visible,.pc-tile:focus-visible,.pc-magazine:focus-visible,.pc-issue:focus-visible{outline:3px solid #0783ff;outline-offset:3px}
@media(min-width:760px){.pc-grid{columns:3}#pcPhotos{padding:20px}}
@media(min-width:1100px){.pc-grid{columns:4}}
`;
 document.head.append(style);root=el('main');root.id='pcPhotos';
 const banner=el('section','pc-banner'),art=photo('/photos-community-banner.png');art.alt='';art.loading='eager';
 art.onerror=()=>{art.hidden=true;};const copy=el('div','pc-banner-text'),words=el('div');words.append(label(el('h1'),0),label(el('p'),1));
 const launch=()=>{statusKey=null;uploadStatus.textContent='';update();uploadDialog.showModal();};
 copy.append(words,button(0,launch));banner.append(art,copy);root.append(banner);
 const tools=el('div','pc-tools');back=button(5,()=>{mode=mode==='magazine'?'issues':'community';issue=null;load();});const home=el('a','pc-button pc-home','⌂');home.href='/index.html';home.setAttribute('aria-label',typeof photoT==='function'?photoT('footer.home','Home'):'Home');tools.append(back,home,button(18,listen));root.append(tools);
 issueCard=el('button','pc-magazine');issueCard.type='button';const cover=photo('/file_00000000a9d471fda9b4629589be22a9.png');cover.alt='PETS & DOGUE';issueCard.append(cover,label(el('span'),2),el('span','','→'));issueCard.onclick=()=>{mode='issues';issue=null;load();};root.append(issueCard);
 title=el('h2','pc-heading');grid=el('div','pc-grid');note=el('p','pc-note');note.setAttribute('role','status');more=button(6,()=>{if(!busy)load(false);});root.append(title,grid,note,more);
 uploadDialog=el('dialog','pc-dialog');const close=button(5,()=>uploadDialog.close()),heading=label(el('h2'),0),rules=label(el('p'),11);
 file=el('input');file.type='file';file.accept='image/*';file.hidden=true;file.onchange=()=>choose(file);
 camera=el('input');camera.type='file';camera.accept='image/*';camera.setAttribute('capture','environment');camera.hidden=true;camera.onchange=()=>choose(camera);
 const picks=el('div','pc-tools');picks.append(button(8,()=>{if(!sending)camera.click();}),button(7,()=>{if(!sending)file.click();}));
 preview=el('img');consent=el('input');consent.type='checkbox';consent.onchange=update;const check=el('label','pc-consent');check.append(consent,label(el('span'),10));
 publish=button(9,submit,'pc-button pc-upload');uploadStatus=el('p','pc-status');uploadStatus.setAttribute('role','status');uploadStatus.setAttribute('aria-live','polite');uploadDialog.append(close,heading,rules,file,camera,picks,preview,check,publish,uploadStatus);
 viewer=el('dialog','pc-dialog');document.body.append(uploadDialog,viewer);document.body.insertBefore(root,oldHero);document.body.classList.add('pc-ready');
 const originalUpdate=update;
 const refresh=()=>{grid.classList.toggle('pc-issues',mode==='issues');originalUpdate();};
 if(typeof renderPhotos==='function')renderPhotos=refresh;
 if(typeof loadPhotos==='function')loadPhotos=()=>{};
 if(typeof refreshPhotoLanguage==='function')refreshPhotoLanguage=()=>{
  const code=lang(),dir=code==='ar'?'rtl':'ltr';
  if(document.documentElement.lang!==code)document.documentElement.lang=code;
  if(document.documentElement.dir!==dir)document.documentElement.dir=dir;
  refresh();if(typeof updatePhotoMeta==='function')updatePhotoMeta();
 };
 const observer=new MutationObserver(()=>refresh());observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
 for(const ev of ['languagechange','petsdogue:languagechange'])window.addEventListener(ev,refresh);
 root.addEventListener('click',()=>grid.classList.toggle('pc-issues',mode==='issues'));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')window.speechSynthesis?.cancel();});
 refresh();load();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
