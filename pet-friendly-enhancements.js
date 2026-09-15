"use strict";

/* =========================================================
   PETS & DOGUE — PET-FRIENDLY ENHANCEMENTS
   - broad discovery first, pet status second
   - Yes / No community voting
   - Inside / Outside detail after Yes
   - community rejection threshold
   - Booking for hotels
   - Pet Photos gallery / upload UI
   - real venue photo resolver + branded fallback
   - preserves global header, map and accessibility
========================================================= */

const PD_PHOTO_API = "/api/pet-friendly-photo";
const PD_COMMUNITY_API = "/api/pet-friendly-community";
const PD_PET_PHOTOS_API = "/api/pet-friendly-pet-photos";
const PD_VOTER_KEY = "pets_dogue_pet_voter_key";

let pdSearchSequence = 0;
let pdPetPhotoPlace = null;

const pdVoteSummaries = new Map();

const PD_TX = {

  en:{
    pf:"Pet-friendly?",
    yes:"Yes",
    no:"No",
    votes:"votes",
    petPhotos:"Pet photos",
    addPhoto:"Add photo",
    photoRuleTitle:"Pet photos only",
    photoRule:"Only photos showing an animal at this exact venue will be added. Photos without an animal will not be published.",
    animalVisible:"An animal is clearly visible",
    takenHere:"This photo was taken at this venue",
    inside:"Inside",
    outside:"Outside",
    terrace:"Terrace",
    other:"Other",
    submit:"Submit photo",
    pending:"Photo sent for review",
    noPhotos:"No approved pet photos yet.",
    booking:"Check availability on Booking",
    community:"Community",
    confirmed:"Pet-friendly confirmed",
    unknown:"Pet policy not confirmed",
    rejected:"Community says not pet-friendly",
    uploading:"Uploading…",
    galleryError:"Could not load pet photos.",
    voteError:"Could not save your vote.",
    photoError:"Could not upload this photo."
  },

  uk:{
    pf:"Pet-friendly?",
    yes:"Так",
    no:"Ні",
    votes:"голосів",
    petPhotos:"Фото з тваринами",
    addPhoto:"Додати фото",
    photoRuleTitle:"Лише фото з тваринами",
    photoRule:"Додаються лише фото, де видно тварину саме в цьому закладі. Фото без тварини не публікуються.",
    animalVisible:"Тварину чітко видно",
    takenHere:"Фото зроблено саме в цьому закладі",
    inside:"Всередині",
    outside:"Зовні",
    terrace:"Тераса",
    other:"Інше",
    submit:"Надіслати фото",
    pending:"Фото надіслано на перевірку",
    noPhotos:"Поки немає схвалених фото з тваринами.",
    booking:"Перевірити місця на Booking",
    community:"Спільнота",
    confirmed:"Pet-friendly підтверджено",
    unknown:"Правила для тварин не підтверджені",
    rejected:"Спільнота вважає місце не pet-friendly",
    uploading:"Завантаження…",
    galleryError:"Не вдалося завантажити фото.",
    voteError:"Не вдалося зберегти голос.",
    photoError:"Не вдалося завантажити фото."
  },

  ru:{
    pf:"Pet-friendly?",
    yes:"Да",
    no:"Нет",
    votes:"голосов",
    petPhotos:"Фото с животными",
    addPhoto:"Добавить фото",
    photoRuleTitle:"Только фото с животными",
    photoRule:"Добавляются только фото, где видно животное именно в этом заведении. Фото без животного не публикуются.",
    animalVisible:"Животное хорошо видно",
    takenHere:"Фото сделано именно в этом заведении",
    inside:"Внутри",
    outside:"Снаружи",
    terrace:"Терраса",
    other:"Другое",
    submit:"Отправить фото",
    pending:"Фото отправлено на проверку",
    noPhotos:"Пока нет одобренных фото с животными.",
    booking:"Проверить места на Booking",
    community:"Сообщество",
    confirmed:"Pet-friendly подтверждено",
    unknown:"Правила для животных не подтверждены",
    rejected:"Сообщество считает место не pet-friendly",
    uploading:"Загрузка…",
    galleryError:"Не удалось загрузить фото.",
    voteError:"Не удалось сохранить голос.",
    photoError:"Не удалось загрузить фото."
  },

  fr:{
    pf:"Pet-friendly ?",
    yes:"Oui",
    no:"Non",
    votes:"votes",
    petPhotos:"Photos d’animaux",
    addPhoto:"Ajouter une photo",
    photoRuleTitle:"Photos avec animaux uniquement",
    photoRule:"Seules les photos montrant un animal dans ce lieu précis seront ajoutées. Les photos sans animal ne seront pas publiées.",
    animalVisible:"Un animal est clairement visible",
    takenHere:"La photo a été prise dans ce lieu",
    inside:"Intérieur",
    outside:"Extérieur",
    terrace:"Terrasse",
    other:"Autre",
    submit:"Envoyer",
    pending:"Photo envoyée pour validation",
    noPhotos:"Aucune photo approuvée pour le moment.",
    booking:"Voir les disponibilités sur Booking",
    community:"Communauté",
    confirmed:"Pet-friendly confirmé",
    unknown:"Politique animaux non confirmée",
    rejected:"La communauté indique que ce lieu n’est pas pet-friendly",
    uploading:"Envoi…",
    galleryError:"Impossible de charger les photos.",
    voteError:"Impossible d’enregistrer le vote.",
    photoError:"Impossible d’envoyer la photo."
  },

  de:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nein",
    votes:"Stimmen",
    petPhotos:"Tierfotos",
    addPhoto:"Foto hinzufügen",
    photoRuleTitle:"Nur Fotos mit Tieren",
    photoRule:"Nur Fotos mit einem Tier an genau diesem Ort werden hinzugefügt. Fotos ohne Tier werden nicht veröffentlicht.",
    animalVisible:"Ein Tier ist deutlich sichtbar",
    takenHere:"Das Foto wurde an diesem Ort aufgenommen",
    inside:"Innen",
    outside:"Außen",
    terrace:"Terrasse",
    other:"Andere",
    submit:"Foto senden",
    pending:"Foto zur Prüfung gesendet",
    noPhotos:"Noch keine freigegebenen Tierfotos.",
    booking:"Verfügbarkeit bei Booking prüfen",
    community:"Community",
    confirmed:"Pet-friendly bestätigt",
    unknown:"Haustierregel nicht bestätigt",
    rejected:"Community meldet: nicht pet-friendly",
    uploading:"Wird hochgeladen…",
    galleryError:"Tierfotos konnten nicht geladen werden.",
    voteError:"Stimme konnte nicht gespeichert werden.",
    photoError:"Foto konnte nicht hochgeladen werden."
  },

  es:{
    pf:"¿Pet-friendly?",
    yes:"Sí",
    no:"No",
    votes:"votos",
    petPhotos:"Fotos con mascotas",
    addPhoto:"Añadir foto",
    photoRuleTitle:"Solo fotos con animales",
    photoRule:"Solo se añadirán fotos donde aparezca un animal en este lugar exacto. Las fotos sin animales no se publicarán.",
    animalVisible:"Se ve claramente un animal",
    takenHere:"La foto fue tomada en este lugar",
    inside:"Interior",
    outside:"Exterior",
    terrace:"Terraza",
    other:"Otro",
    submit:"Enviar foto",
    pending:"Foto enviada para revisión",
    noPhotos:"Aún no hay fotos aprobadas.",
    booking:"Ver disponibilidad en Booking",
    community:"Comunidad",
    confirmed:"Pet-friendly confirmado",
    unknown:"Política de mascotas no confirmada",
    rejected:"La comunidad indica que no es pet-friendly",
    uploading:"Subiendo…",
    galleryError:"No se pudieron cargar las fotos.",
    voteError:"No se pudo guardar el voto.",
    photoError:"No se pudo subir la foto."
  },

  it:{
    pf:"Pet-friendly?",
    yes:"Sì",
    no:"No",
    votes:"voti",
    petPhotos:"Foto con animali",
    addPhoto:"Aggiungi foto",
    photoRuleTitle:"Solo foto con animali",
    photoRule:"Saranno aggiunte solo foto con un animale visibile in questo luogo esatto. Le foto senza animali non saranno pubblicate.",
    animalVisible:"Un animale è chiaramente visibile",
    takenHere:"La foto è stata scattata in questo luogo",
    inside:"Interno",
    outside:"Esterno",
    terrace:"Terrazza",
    other:"Altro",
    submit:"Invia foto",
    pending:"Foto inviata per la revisione",
    noPhotos:"Nessuna foto approvata per ora.",
    booking:"Controlla disponibilità su Booking",
    community:"Community",
    confirmed:"Pet-friendly confermato",
    unknown:"Regole non confermate",
    rejected:"La community segnala che non è pet-friendly",
    uploading:"Caricamento…",
    galleryError:"Impossibile caricare le foto.",
    voteError:"Impossibile salvare il voto.",
    photoError:"Impossibile caricare la foto."
  },

  pt:{
    pf:"Pet-friendly?",
    yes:"Sim",
    no:"Não",
    votes:"votos",
    petPhotos:"Fotos com animais",
    addPhoto:"Adicionar foto",
    photoRuleTitle:"Apenas fotos com animais",
    photoRule:"Só serão adicionadas fotos com um animal visível neste local exato. Fotos sem animais não serão publicadas.",
    animalVisible:"Um animal está claramente visível",
    takenHere:"A foto foi tirada neste local",
    inside:"Interior",
    outside:"Exterior",
    terrace:"Terraço",
    other:"Outro",
    submit:"Enviar foto",
    pending:"Foto enviada para revisão",
    noPhotos:"Ainda não há fotos aprovadas.",
    booking:"Ver disponibilidade no Booking",
    community:"Comunidade",
    confirmed:"Pet-friendly confirmado",
    unknown:"Política não confirmada",
    rejected:"A comunidade indica que não é pet-friendly",
    uploading:"A enviar…",
    galleryError:"Não foi possível carregar as fotos.",
    voteError:"Não foi possível guardar o voto.",
    photoError:"Não foi possível enviar a foto."
  },

  nl:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nee",
    votes:"stemmen",
    petPhotos:"Dierenfoto’s",
    addPhoto:"Foto toevoegen",
    photoRuleTitle:"Alleen foto’s met dieren",
    photoRule:"Alleen foto’s waarop een dier op deze exacte locatie zichtbaar is worden toegevoegd. Foto’s zonder dier worden niet gepubliceerd.",
    animalVisible:"Een dier is duidelijk zichtbaar",
    takenHere:"De foto is op deze locatie gemaakt",
    inside:"Binnen",
    outside:"Buiten",
    terrace:"Terras",
    other:"Anders",
    submit:"Foto versturen",
    pending:"Foto ter beoordeling verzonden",
    noPhotos:"Nog geen goedgekeurde dierenfoto’s.",
    booking:"Beschikbaarheid op Booking bekijken",
    community:"Community",
    confirmed:"Pet-friendly bevestigd",
    unknown:"Huisdierenbeleid niet bevestigd",
    rejected:"Community zegt: niet pet-friendly",
    uploading:"Uploaden…",
    galleryError:"Foto’s konden niet worden geladen.",
    voteError:"Stem kon niet worden opgeslagen.",
    photoError:"Foto kon niet worden geüpload."
  },

  pl:{
    pf:"Pet-friendly?",
    yes:"Tak",
    no:"Nie",
    votes:"głosów",
    petPhotos:"Zdjęcia ze zwierzętami",
    addPhoto:"Dodaj zdjęcie",
    photoRuleTitle:"Tylko zdjęcia ze zwierzętami",
    photoRule:"Dodawane są tylko zdjęcia, na których widać zwierzę w tym konkretnym miejscu. Zdjęcia bez zwierząt nie będą publikowane.",
    animalVisible:"Zwierzę jest wyraźnie widoczne",
    takenHere:"Zdjęcie zrobiono w tym miejscu",
    inside:"Wewnątrz",
    outside:"Na zewnątrz",
    terrace:"Taras",
    other:"Inne",
    submit:"Wyślij zdjęcie",
    pending:"Zdjęcie wysłano do weryfikacji",
    noPhotos:"Brak zatwierdzonych zdjęć.",
    booking:"Sprawdź dostępność na Booking",
    community:"Społeczność",
    confirmed:"Pet-friendly potwierdzone",
    unknown:"Zasady niepotwierdzone",
    rejected:"Społeczność wskazuje: nie pet-friendly",
    uploading:"Wysyłanie…",
    galleryError:"Nie udało się wczytać zdjęć.",
    voteError:"Nie udało się zapisać głosu.",
    photoError:"Nie udało się wysłać zdjęcia."
  },

  cs:{
    pf:"Pet-friendly?",
    yes:"Ano",
    no:"Ne",
    votes:"hlasů",
    petPhotos:"Fotky se zvířaty",
    addPhoto:"Přidat fotku",
    photoRuleTitle:"Pouze fotky se zvířaty",
    photoRule:"Přidány budou pouze fotky, na kterých je zvíře viditelné přímo v tomto podniku. Fotky bez zvířete nebudou zveřejněny.",
    animalVisible:"Zvíře je dobře viditelné",
    takenHere:"Fotka byla pořízena v tomto podniku",
    inside:"Uvnitř",
    outside:"Venku",
    terrace:"Terasa",
    other:"Jiné",
    submit:"Odeslat fotku",
    pending:"Fotka byla odeslána ke kontrole",
    noPhotos:"Zatím nejsou schválené žádné fotky.",
    booking:"Zkontrolovat dostupnost na Booking",
    community:"Komunita",
    confirmed:"Pet-friendly potvrzeno",
    unknown:"Pravidla nejsou potvrzena",
    rejected:"Komunita uvádí, že místo není pet-friendly",
    uploading:"Nahrávání…",
    galleryError:"Fotky se nepodařilo načíst.",
    voteError:"Hlas se nepodařilo uložit.",
    photoError:"Fotku se nepodařilo nahrát."
  },

  sk:{
    pf:"Pet-friendly?",
    yes:"Áno",
    no:"Nie",
    votes:"hlasov",
    petPhotos:"Fotky so zvieratami",
    addPhoto:"Pridať fotku",
    photoRuleTitle:"Iba fotky so zvieratami",
    photoRule:"Pridané budú iba fotky, na ktorých je zviera viditeľné priamo v tomto podniku. Fotky bez zvieraťa nebudú zverejnené.",
    animalVisible:"Zviera je jasne viditeľné",
    takenHere:"Fotka bola urobená v tomto podniku",
    inside:"Vnútri",
    outside:"Vonku",
    terrace:"Terasa",
    other:"Iné",
    submit:"Odoslať fotku",
    pending:"Fotka bola odoslaná na kontrolu",
    noPhotos:"Zatiaľ nie sú schválené fotky.",
    booking:"Skontrolovať dostupnosť na Booking",
    community:"Komunita",
    confirmed:"Pet-friendly potvrdené",
    unknown:"Pravidlá nie sú potvrdené",
    rejected:"Komunita uvádza, že miesto nie je pet-friendly",
    uploading:"Nahrávanie…",
    galleryError:"Fotky sa nepodarilo načítať.",
    voteError:"Hlas sa nepodarilo uložiť.",
    photoError:"Fotku sa nepodarilo nahrať."
  },

  hu:{
    pf:"Pet-friendly?",
    yes:"Igen",
    no:"Nem",
    votes:"szavazat",
    petPhotos:"Állatos fotók",
    addPhoto:"Fotó hozzáadása",
    photoRuleTitle:"Csak állatos fotók",
    photoRule:"Csak olyan fotó kerülhet be, amelyen állat látható pontosan ezen a helyen. Állat nélküli fotó nem jelenik meg.",
    animalVisible:"Az állat jól látható",
    takenHere:"A fotó ezen a helyen készült",
    inside:"Bent",
    outside:"Kint",
    terrace:"Terasz",
    other:"Egyéb",
    submit:"Fotó küldése",
    pending:"Fotó ellenőrzésre elküldve",
    noPhotos:"Még nincs jóváhagyott fotó.",
    booking:"Elérhetőség a Bookingon",
    community:"Közösség",
    confirmed:"Pet-friendly megerősítve",
    unknown:"Állatbarát szabály nem megerősített",
    rejected:"A közösség szerint nem pet-friendly",
    uploading:"Feltöltés…",
    galleryError:"A fotók nem tölthetők be.",
    voteError:"A szavazat nem menthető.",
    photoError:"A fotó nem tölthető fel."
  },

  ro:{
    pf:"Pet-friendly?",
    yes:"Da",
    no:"Nu",
    votes:"voturi",
    petPhotos:"Poze cu animale",
    addPhoto:"Adaugă poză",
    photoRuleTitle:"Doar poze cu animale",
    photoRule:"Vor fi adăugate doar poze în care se vede un animal în această locație exactă. Pozele fără animale nu vor fi publicate.",
    animalVisible:"Un animal este clar vizibil",
    takenHere:"Poza a fost făcută în această locație",
    inside:"În interior",
    outside:"Afară",
    terrace:"Terasă",
    other:"Altele",
    submit:"Trimite poza",
    pending:"Poza a fost trimisă pentru verificare",
    noPhotos:"Nu există încă poze aprobate.",
    booking:"Verifică disponibilitatea pe Booking",
    community:"Comunitate",
    confirmed:"Pet-friendly confirmat",
    unknown:"Politica nu este confirmată",
    rejected:"Comunitatea spune că nu este pet-friendly",
    uploading:"Se încarcă…",
    galleryError:"Pozele nu au putut fi încărcate.",
    voteError:"Votul nu a putut fi salvat.",
    photoError:"Poza nu a putut fi încărcată."
  },

  bg:{
    pf:"Pet-friendly?",
    yes:"Да",
    no:"Не",
    votes:"гласа",
    petPhotos:"Снимки с животни",
    addPhoto:"Добави снимка",
    photoRuleTitle:"Само снимки с животни",
    photoRule:"Ще се добавят само снимки, на които се вижда животно точно в това място. Снимки без животни няма да се публикуват.",
    animalVisible:"Животното се вижда ясно",
    takenHere:"Снимката е направена на това място",
    inside:"Вътре",
    outside:"Навън",
    terrace:"Тераса",
    other:"Друго",
    submit:"Изпрати снимка",
    pending:"Снимката е изпратена за проверка",
    noPhotos:"Все още няма одобрени снимки.",
    booking:"Провери наличност в Booking",
    community:"Общност",
    confirmed:"Pet-friendly потвърдено",
    unknown:"Правилата не са потвърдени",
    rejected:"Общността посочва, че мястото не е pet-friendly",
    uploading:"Качване…",
    galleryError:"Снимките не могат да бъдат заредени.",
    voteError:"Гласът не може да бъде записан.",
    photoError:"Снимката не може да бъде качена."
  },

  el:{
    pf:"Pet-friendly;",
    yes:"Ναι",
    no:"Όχι",
    votes:"ψήφοι",
    petPhotos:"Φωτογραφίες με ζώα",
    addPhoto:"Προσθήκη φωτογραφίας",
    photoRuleTitle:"Μόνο φωτογραφίες με ζώα",
    photoRule:"Προστίθενται μόνο φωτογραφίες όπου φαίνεται ζώο σε αυτό ακριβώς το μέρος. Φωτογραφίες χωρίς ζώο δεν δημοσιεύονται.",
    animalVisible:"Το ζώο φαίνεται καθαρά",
    takenHere:"Η φωτογραφία τραβήχτηκε σε αυτό το μέρος",
    inside:"Μέσα",
    outside:"Έξω",
    terrace:"Βεράντα",
    other:"Άλλο",
    submit:"Υποβολή φωτογραφίας",
    pending:"Η φωτογραφία στάλθηκε για έλεγχο",
    noPhotos:"Δεν υπάρχουν ακόμη εγκεκριμένες φωτογραφίες.",
    booking:"Έλεγχος διαθεσιμότητας στο Booking",
    community:"Κοινότητα",
    confirmed:"Pet-friendly επιβεβαιωμένο",
    unknown:"Η πολιτική δεν έχει επιβεβαιωθεί",
    rejected:"Η κοινότητα λέει ότι δεν είναι pet-friendly",
    uploading:"Μεταφόρτωση…",
    galleryError:"Δεν ήταν δυνατή η φόρτωση φωτογραφιών.",
    voteError:"Δεν ήταν δυνατή η αποθήκευση ψήφου.",
    photoError:"Δεν ήταν δυνατή η μεταφόρτωση φωτογραφίας."
  },

  sv:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nej",
    votes:"röster",
    petPhotos:"Djurfoton",
    addPhoto:"Lägg till foto",
    photoRuleTitle:"Endast foton med djur",
    photoRule:"Endast foton där ett djur syns på exakt denna plats läggs till. Foton utan djur publiceras inte.",
    animalVisible:"Ett djur syns tydligt",
    takenHere:"Fotot togs på denna plats",
    inside:"Inne",
    outside:"Ute",
    terrace:"Terrass",
    other:"Annat",
    submit:"Skicka foto",
    pending:"Fotot skickades för granskning",
    noPhotos:"Inga godkända djurfoton ännu.",
    booking:"Kontrollera tillgänglighet på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekräftat",
    unknown:"Djurpolicy ej bekräftad",
    rejected:"Communityn säger att platsen inte är pet-friendly",
    uploading:"Laddar upp…",
    galleryError:"Kunde inte ladda foton.",
    voteError:"Kunde inte spara rösten.",
    photoError:"Kunde inte ladda upp fotot."
  },

  da:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nej",
    votes:"stemmer",
    petPhotos:"Dyrefotos",
    addPhoto:"Tilføj foto",
    photoRuleTitle:"Kun fotos med dyr",
    photoRule:"Kun fotos med et dyr på dette præcise sted bliver tilføjet. Fotos uden dyr bliver ikke offentliggjort.",
    animalVisible:"Et dyr er tydeligt synligt",
    takenHere:"Fotoet blev taget på dette sted",
    inside:"Inde",
    outside:"Ude",
    terrace:"Terrasse",
    other:"Andet",
    submit:"Send foto",
    pending:"Foto sendt til gennemgang",
    noPhotos:"Ingen godkendte dyrefotos endnu.",
    booking:"Se tilgængelighed på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekræftet",
    unknown:"Dyrepolitik ikke bekræftet",
    rejected:"Community siger: ikke pet-friendly",
    uploading:"Uploader…",
    galleryError:"Kunne ikke indlæse fotos.",
    voteError:"Kunne ikke gemme stemmen.",
    photoError:"Kunne ikke uploade fotoet."
  },

  no:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nei",
    votes:"stemmer",
    petPhotos:"Dyrebilder",
    addPhoto:"Legg til bilde",
    photoRuleTitle:"Kun bilder med dyr",
    photoRule:"Bare bilder der et dyr er synlig på akkurat dette stedet blir lagt til. Bilder uten dyr publiseres ikke.",
    animalVisible:"Et dyr er tydelig synlig",
    takenHere:"Bildet ble tatt på dette stedet",
    inside:"Inne",
    outside:"Ute",
    terrace:"Terrasse",
    other:"Annet",
    submit:"Send bilde",
    pending:"Bildet er sendt til vurdering",
    noPhotos:"Ingen godkjente dyrebilder ennå.",
    booking:"Sjekk tilgjengelighet på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekreftet",
    unknown:"Dyrepolicy ikke bekreftet",
    rejected:"Community sier at stedet ikke er pet-friendly",
    uploading:"Laster opp…",
    galleryError:"Kunne ikke laste bilder.",
    voteError:"Kunne ikke lagre stemmen.",
    photoError:"Kunne ikke laste opp bildet."
  },

  fi:{
    pf:"Pet-friendly?",
    yes:"Kyllä",
    no:"Ei",
    votes:"ääntä",
    petPhotos:"Eläinkuvat",
    addPhoto:"Lisää kuva",
    photoRuleTitle:"Vain eläinkuvat",
    photoRule:"Vain kuvat, joissa eläin näkyy juuri tässä paikassa, lisätään. Kuvia ilman eläintä ei julkaista.",
    animalVisible:"Eläin näkyy selvästi",
    takenHere:"Kuva on otettu tässä paikassa",
    inside:"Sisällä",
    outside:"Ulkona",
    terrace:"Terassi",
    other:"Muu",
    submit:"Lähetä kuva",
    pending:"Kuva lähetettiin tarkistettavaksi",
    noPhotos:"Ei vielä hyväksyttyjä eläinkuvia.",
    booking:"Tarkista saatavuus Bookingissa",
    community:"Yhteisö",
    confirmed:"Pet-friendly vahvistettu",
    unknown:"Lemmikkikäytäntöä ei vahvistettu",
    rejected:"Yhteisön mukaan paikka ei ole pet-friendly",
    uploading:"Ladataan…",
    galleryError:"Kuvia ei voitu ladata.",
    voteError:"Ääntä ei voitu tallentaa.",
    photoError:"Kuvaa ei voitu ladata."
  },

  tr:{
    pf:"Pet-friendly?",
    yes:"Evet",
    no:"Hayır",
    votes:"oy",
    petPhotos:"Hayvan fotoğrafları",
    addPhoto:"Fotoğraf ekle",
    photoRuleTitle:"Yalnızca hayvanlı fotoğraflar",
    photoRule:"Yalnızca bu mekânda bir hayvanın açıkça göründüğü fotoğraflar eklenir. Hayvansız fotoğraflar yayımlanmaz.",
    animalVisible:"Bir hayvan açıkça görünüyor",
    takenHere:"Fotoğraf bu mekânda çekildi",
    inside:"İçeride",
    outside:"Dışarıda",
    terrace:"Teras",
    other:"Diğer",
    submit:"Fotoğraf gönder",
    pending:"Fotoğraf incelemeye gönderildi",
    noPhotos:"Henüz onaylı hayvan fotoğrafı yok.",
    booking:"Booking’de müsaitliği kontrol et",
    community:"Topluluk",
    confirmed:"Pet-friendly doğrulandı",
    unknown:"Evcil hayvan politikası doğrulanmadı",
    rejected:"Topluluk buranın pet-friendly olmadığını söylüyor",
    uploading:"Yükleniyor…",
    galleryError:"Fotoğraflar yüklenemedi.",
    voteError:"Oy kaydedilemedi.",
    photoError:"Fotoğraf yüklenemedi."
  },

  ar:{
    pf:"هل المكان صديق للحيوانات؟",
    yes:"نعم",
    no:"لا",
    votes:"أصوات",
    petPhotos:"صور الحيوانات",
    addPhoto:"إضافة صورة",
    photoRuleTitle:"صور الحيوانات فقط",
    photoRule:"تُضاف فقط الصور التي يظهر فيها حيوان في هذا المكان بالتحديد. الصور من دون حيوان لن تُنشر.",
    animalVisible:"الحيوان ظاهر بوضوح",
    takenHere:"التُقطت الصورة في هذا المكان",
    inside:"بالداخل",
    outside:"بالخارج",
    terrace:"التراس",
    other:"أخرى",
    submit:"إرسال الصورة",
    pending:"أُرسلت الصورة للمراجعة",
    noPhotos:"لا توجد صور حيوانات معتمدة بعد.",
    booking:"تحقق من التوفر على Booking",
    community:"المجتمع",
    confirmed:"تم تأكيد ملاءمة المكان للحيوانات",
    unknown:"سياسة الحيوانات غير مؤكدة",
    rejected:"المجتمع يقول إن المكان غير ملائم للحيوانات",
    uploading:"جارٍ الرفع…",
    galleryError:"تعذر تحميل الصور.",
    voteError:"تعذر حفظ التصويت.",
    photoError:"تعذر رفع الصورة."
  },

  hi:{
    pf:"Pet-friendly?",
    yes:"हाँ",
    no:"नहीं",
    votes:"वोट",
    petPhotos:"पालतू जानवरों की तस्वीरें",
    addPhoto:"फोटो जोड़ें",
    photoRuleTitle:"केवल जानवर वाली तस्वीरें",
    photoRule:"सिर्फ वही तस्वीरें जो इसी जगह पर किसी जानवर को स्पष्ट दिखाती हैं, जोड़ी जाएंगी। बिना जानवर वाली तस्वीरें प्रकाशित नहीं होंगी।",
    animalVisible:"जानवर साफ़ दिखाई दे रहा है",
    takenHere:"फोटो इसी जगह पर ली गई है",
    inside:"अंदर",
    outside:"बाहर",
    terrace:"टेरेस",
    other:"अन्य",
    submit:"फोटो भेजें",
    pending:"फोटो समीक्षा के लिए भेजी गई",
    noPhotos:"अभी कोई स्वीकृत फोटो नहीं है।",
    booking:"Booking पर उपलब्धता देखें",
    community:"कम्युनिटी",
    confirmed:"Pet-friendly की पुष्टि",
    unknown:"पेट पॉलिसी की पुष्टि नहीं",
    rejected:"कम्युनिटी के अनुसार यह pet-friendly नहीं है",
    uploading:"अपलोड हो रहा है…",
    galleryError:"फोटो लोड नहीं हो सकीं।",
    voteError:"वोट सेव नहीं हो सका।",
    photoError:"फोटो अपलोड नहीं हो सकी।"
  }

};

function pdT(key){

  return (
    PD_TX[lang] ||
    PD_TX.en
  )[key] ||
  PD_TX.en[key] ||
  key;

}

function pdVoterKey(){

  try{

    let key =
      localStorage.getItem(
        PD_VOTER_KEY
      );

    if(!key){

      key =
        "pdv-" +
        (
          crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now() +
              "-" +
              Math.random()
                .toString(36)
                .slice(2)
        );

      localStorage.setItem(
        PD_VOTER_KEY,
        key
      );

    }

    return key;

  }catch{

    return (
      "pdv-session-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2)
    );

  }

}

function pdVoteInfo(place){

  return (
    pdVoteSummaries.get(
      communityKey(place)
    ) ||
    {
      yes:0,
      no:0,
      total:0,
      yesPercent:0,
      noPercent:0,
      communityPetFriendly:false,
      communityRejected:false
    }
  );

}

function pdInstallStyles(){

  if(
    document.getElementById(
      "pdCommunityStyles"
    )
  ){
    return;
  }

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "pdCommunityStyles";

  style.textContent = `

    .pd-vote-row{
      margin-top:11px;
      padding:10px 11px;
      border-radius:15px;
      background:rgba(255,255,255,.92);
      color:#111;
      display:flex;
      align-items:center;
      gap:8px;
      flex-wrap:wrap;
      font-size:12px;
      font-weight:850;
    }

    .pd-vote-row strong{
      margin-right:auto;
    }

    .pd-vote-btn{
      border:1px solid #111!important;
      background:#fff!important;
      color:#111!important;
      min-height:33px!important;
      padding:0 12px!important;
      border-radius:999px!important;
      font-weight:900!important;
    }

    .pd-vote-btn.yes{
      border-color:#3f9b16!important;
      background:#e6ffd8!important;
    }

    .pd-vote-btn.no{
      border-color:#a64b4b!important;
      background:#fff0f0!important;
    }

    .pd-vote-count{
      font-size:10px;
      color:#69645c;
      font-weight:800;
    }

    .pd-community-state{
      margin-top:7px;
      font-size:10px;
      font-weight:850;
      color:#676158;
    }

    .pd-community-state.good{
      color:#2d7215;
    }

    .pd-community-state.bad{
      color:#9d3131;
    }

    .pd-pet-photo-btn{
      border-color:#65e51f!important;
    }

    .pd-modal-backdrop{
      position:fixed;
      inset:0;
      z-index:100000;
      background:rgba(0,0,0,.72);
      display:none;
      align-items:center;
      justify-content:center;
      padding:18px;
    }

    .pd-modal-backdrop.open{
      display:flex;
    }

    .pd-modal{
      width:min(680px,100%);
      max-height:88vh;
      overflow:auto;
      background:#f6f1e7;
      color:#111;
      border-radius:28px;
      padding:24px;
      box-shadow:0 25px 80px rgba(0,0,0,.35);
    }

    .pd-modal-head{
      display:flex;
      align-items:flex-start;
      gap:14px;
    }

    .pd-modal-head h2{
      font:500 clamp(34px,8vw,54px)/.95 Georgia,serif;
      margin:0;
      flex:1;
    }

    .pd-modal-close{
      width:52px;
      height:52px;
      border:0;
      border-radius:50%;
      background:#111;
      color:#fff;
      font-size:28px;
    }

    .pd-gallery{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
      margin-top:18px;
    }

    .pd-gallery img{
      width:100%;
      aspect-ratio:1/1;
      object-fit:cover;
      border-radius:16px;
      background:#ddd;
    }

    .pd-photo-empty{
      padding:22px 0;
      color:#6f6a62;
    }

    .pd-upload-box{
      margin-top:20px;
      padding-top:18px;
      border-top:1px solid #cfc7bb;
    }

    .pd-upload-box h3{
      margin:0 0 6px;
    }

    .pd-upload-box p{
      color:#6b665f;
      line-height:1.45;
    }

    .pd-check{
      display:flex;
      gap:10px;
      align-items:flex-start;
      margin:10px 0;
      font-weight:800;
    }

    .pd-check input{
      width:21px;
      height:21px;
      flex:0 0 auto;
    }

    .pd-file{
      display:block;
      width:100%;
      padding:14px;
      border:1px solid #bdb5a8;
      border-radius:14px;
      background:#fff;
      margin:12px 0;
    }

    .pd-area{
      width:100%;
      min-height:46px;
      border:1px solid #bdb5a8;
      border-radius:14px;
      background:#fff;
      padding:0 12px;
      margin-bottom:12px;
    }

    .pd-submit{
      width:100%;
      min-height:52px;
      border:0;
      border-radius:16px;
      background:#65e51f;
      color:#071102;
      font-weight:950;
      font-size:16px;
    }

    .pd-submit:disabled{
      opacity:.5;
    }

    .pd-photo-note{
      margin-top:10px;
      font-size:12px;
      font-weight:800;
    }

    .pd-branded-fallback{
      position:absolute;
      inset:0;
      display:grid;
      place-items:center;
      background:
        radial-gradient(
          circle at 30% 25%,
          rgba(101,229,31,.28),
          transparent 30%
        ),
        linear-gradient(
          145deg,
          #111,
          #292929
        );
      color:#fff;
      text-align:center;
      padding:20px;
      font-family:Georgia,serif;
    }

    .pd-branded-fallback span{
      display:block;
      font:900 11px/1.2 Arial,sans-serif;
      letter-spacing:1.5px;
      color:#efd47c;
      margin-top:7px;
    }

  `;

  document.head.appendChild(
    style
  );

}function pdInstallPhotoModal(){

  if(
    document.getElementById(
      "pdPetPhotosOverlay"
    )
  ){
    return;
  }

  const wrap =
    document.createElement(
      "div"
    );

  wrap.id =
    "pdPetPhotosOverlay";

  wrap.className =
    "pd-modal-backdrop";

  wrap.innerHTML = `

    <section
      class="pd-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdPetPhotosTitle"
    >

      <div class="pd-modal-head">

        <h2 id="pdPetPhotosTitle"></h2>

        <button
          class="pd-modal-close"
          id="pdPetPhotosClose"
          type="button"
          aria-label="Close"
        >
          ×
        </button>

      </div>

      <div
        id="pdPetPhotoGallery"
        class="pd-gallery"
      ></div>

      <div
        id="pdPetPhotoEmpty"
        class="pd-photo-empty"
      ></div>

      <div class="pd-upload-box">

        <h3 id="pdPhotoRuleTitle"></h3>

        <p id="pdPhotoRule"></p>

        <input
          class="pd-file"
          id="pdPhotoFile"
          type="file"
          accept="image/*"
        >

        <select
          class="pd-area"
          id="pdPhotoArea"
        ></select>

        <label class="pd-check">

          <input
            id="pdAnimalVisible"
            type="checkbox"
          >

          <span id="pdAnimalVisibleText"></span>

        </label>

        <label class="pd-check">

          <input
            id="pdTakenHere"
            type="checkbox"
          >

          <span id="pdTakenHereText"></span>

        </label>

        <button
          class="pd-submit"
          id="pdPhotoSubmit"
          type="button"
        ></button>

        <div
          id="pdPhotoNote"
          class="pd-photo-note"
        ></div>

      </div>

    </section>

  `;

  document.body.appendChild(
    wrap
  );

  document
    .getElementById(
      "pdPetPhotosClose"
    )
    .onclick =
      ()=>pdClosePetPhotos();

  wrap.onclick =
    event=>{

      if(
        event.target ===
        wrap
      ){

        pdClosePetPhotos();

      }

    };

  document
    .getElementById(
      "pdPhotoSubmit"
    )
    .onclick =
      pdSubmitPetPhoto;

}

function pdUpdatePhotoModalText(){

  const q =
    id=>
      document.getElementById(
        id
      );

  if(
    !q(
      "pdPetPhotosOverlay"
    )
  ){
    return;
  }

  q(
    "pdPhotoRuleTitle"
  ).textContent =
    pdT(
      "photoRuleTitle"
    );

  q(
    "pdPhotoRule"
  ).textContent =
    pdT(
      "photoRule"
    );

  q(
    "pdAnimalVisibleText"
  ).textContent =
    pdT(
      "animalVisible"
    );

  q(
    "pdTakenHereText"
  ).textContent =
    pdT(
      "takenHere"
    );

  q(
    "pdPhotoSubmit"
  ).textContent =
    pdT(
      "submit"
    );

  q(
    "pdPhotoArea"
  ).innerHTML = `

    <option value="inside">
      ${esc(pdT("inside"))}
    </option>

    <option value="outside">
      ${esc(pdT("outside"))}
    </option>

    <option value="terrace">
      ${esc(pdT("terrace"))}
    </option>

    <option value="other">
      ${esc(pdT("other"))}
    </option>

  `;

}

async function pdOpenPetPhotos(
  place
){

  pdPetPhotoPlace =
    place;

  pdInstallPhotoModal();

  pdUpdatePhotoModalText();

  document
    .getElementById(
      "pdPetPhotosTitle"
    )
    .textContent =
      place.name +
      " · " +
      pdT(
        "petPhotos"
      );

  document
    .getElementById(
      "pdPetPhotoGallery"
    )
    .innerHTML =
      "";

  document
    .getElementById(
      "pdPetPhotoEmpty"
    )
    .textContent =
      "";

  document
    .getElementById(
      "pdPhotoNote"
    )
    .textContent =
      "";

  document
    .getElementById(
      "pdPetPhotosOverlay"
    )
    .classList
    .add(
      "open"
    );

  document.body
    .classList
    .add(
      "lock"
    );

  try{

    const url =
      new URL(
        PD_PET_PHOTOS_API,
        location.origin
      );

    url.searchParams.set(
      "placeKey",
      communityKey(
        place
      )
    );

    const response =
      await fetch(
        url,
        {
          headers:{
            Accept:
              "application/json"
          }
        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(
      !response.ok ||
      data.ok !== true
    ){

      throw new Error(
        data.error ||
        pdT(
          "galleryError"
        )
      );

    }

    const photos =
      Array.isArray(
        data.photos
      )
        ? data.photos
        : [];

    const gallery =
      document.getElementById(
        "pdPetPhotoGallery"
      );

    gallery.innerHTML =
      photos
        .map(
          item=>`

            <img
              src="${esc(
                item.imageUrl ||
                item.image_url ||
                ""
              )}"
              alt="${esc(
                place.name
              )}"
              loading="lazy"
            >

          `
        )
        .join("");

    document
      .getElementById(
        "pdPetPhotoEmpty"
      )
      .textContent =
        photos.length
          ? ""
          : pdT(
              "noPhotos"
            );

  }catch(error){

    document
      .getElementById(
        "pdPetPhotoEmpty"
      )
      .textContent =
        pdT(
          "galleryError"
        );

  }

}

function pdClosePetPhotos(){

  const overlay =
    document.getElementById(
      "pdPetPhotosOverlay"
    );

  if(overlay){

    overlay
      .classList
      .remove(
        "open"
      );

  }

  if(
    !document.querySelector(
      ".overlay.open,.pd-modal-backdrop.open"
    )
  ){

    document.body
      .classList
      .remove(
        "lock"
      );

  }

}

async function pdImageData(
  file
){

  const bitmap =
    await createImageBitmap(
      file
    );

  const max =
    1600;

  const scale =
    Math.min(
      1,
      max /
      Math.max(
        bitmap.width,
        bitmap.height
      )
    );

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    Math.max(
      1,
      Math.round(
        bitmap.width *
        scale
      )
    );

  canvas.height =
    Math.max(
      1,
      Math.round(
        bitmap.height *
        scale
      )
    );

  const context =
    canvas.getContext(
      "2d"
    );

  context.drawImage(
    bitmap,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if(
    bitmap.close
  ){

    bitmap.close();

  }

  return canvas
    .toDataURL(
      "image/jpeg",
      .82
    );

}

async function pdSubmitPetPhoto(){

  const place =
    pdPetPhotoPlace;

  const file =
    document
      .getElementById(
        "pdPhotoFile"
      )
      ?.files?.[0];

  const animal =
    document
      .getElementById(
        "pdAnimalVisible"
      )
      ?.checked;

  const here =
    document
      .getElementById(
        "pdTakenHere"
      )
      ?.checked;

  const note =
    document.getElementById(
      "pdPhotoNote"
    );

  const button =
    document.getElementById(
      "pdPhotoSubmit"
    );

  if(
    !place ||
    !file ||
    !animal ||
    !here
  ){

    return;

  }

  button.disabled =
    true;

  note.textContent =
    pdT(
      "uploading"
    );

  try{

    const imageData =
      await pdImageData(
        file
      );

    const response =
      await fetch(
        PD_PET_PHOTOS_API,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body:
            JSON.stringify({

              placeKey:
                communityKey(
                  place
                ),

              placeName:
                place.name,

              address:
                place.address,

              area:
                document
                  .getElementById(
                    "pdPhotoArea"
                  )
                  .value,

              animalVisible:
                true,

              takenAtVenue:
                true,

              uploaderKey:
                pdVoterKey(),

              imageData

            })

        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(
      !response.ok ||
      data.ok !== true
    ){

      throw new Error(
        data.error ||
        pdT(
          "photoError"
        )
      );

    }

    note.textContent =
      pdT(
        "pending"
      );

    document
      .getElementById(
        "pdPhotoFile"
      )
      .value =
        "";

    document
      .getElementById(
        "pdAnimalVisible"
      )
      .checked =
        false;

    document
      .getElementById(
        "pdTakenHere"
      )
      .checked =
        false;

  }catch(error){

    note.textContent =
      error.message ||
      pdT(
        "photoError"
      );

  }finally{

    button.disabled =
      false;

  }

}


/* =========================================================
   CATEGORY FIX
========================================================= */

window.normCat =
function(value){

  const text =
    String(
      value ||
      ""
    )
    .toLowerCase();

  if(
    text.includes(
      "pizzeria"
    ) ||
    text.includes(
      "pizza"
    )
  ){
    return "pizzeria";
  }

  if(
    text.includes(
      "cafe"
    ) ||
    text.includes(
      "coffee"
    )
  ){
    return "cafe";
  }

  if(
    text.includes(
      "restaurant"
    )
  ){
    return "restaurant";
  }

  if(
    text.includes(
      "pub"
    ) ||
    text.includes(
      "bar"
    ) ||
    text.includes(
      "biergarten"
    )
  ){
    return "pub";
  }

  if(
    text.includes(
      "hotel"
    ) ||
    text.includes(
      "hostel"
    ) ||
    text.includes(
      "guest"
    ) ||
    text.includes(
      "motel"
    ) ||
    text.includes(
      "apartment"
    ) ||
    text.includes(
      "accommodation"
    )
  ){
    return "hotel";
  }

  if(
    text.includes(
      "dog_park"
    ) ||
    text.includes(
      "park"
    )
  ){
    return "park";
  }

  if(
    text.includes(
      "beach"
    )
  ){
    return "beach";
  }

  if(
    text.includes(
      "veter"
    )
  ){
    return "veterinary";
  }

  if(
    text.includes(
      "pet-shop"
    ) ||
    text.includes(
      "pet shop"
    ) ||
    text === "pet" ||
    text.includes(
      "pet_store"
    )
  ){
    return "pet-shop";
  }

  if(
    text.includes(
      "groom"
    )
  ){
    return "grooming";
  }

  if(
    text.includes(
      "event"
    )
  ){
    return "events";
  }

  return "other";

};


/* =========================================================
   VENUE PHOTO RESOLVER
========================================================= */

window.loadPhoto =
async function(place){

  const identity =
    communityKey(
      place
    );

  if(
    photoFor(place) ||
    photoTried.has(
      identity
    )
  ){

    return;

  }

  photoTried.add(
    identity
  );

  try{

    const response =
      await fetch(
        PD_PHOTO_API,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body:
            JSON.stringify({

              name:
                place.name,

              address:
                place.address,

              website:
                place.website ||
                "",

              latitude:
                place.location
                  ?.lat ??
                null,

              longitude:
                place.location
                  ?.lng ??
                null

            })

        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(
      !response.ok ||
      data.ok !== true ||
      !data.photo
    ){

      return;

    }

    photoMemory.set(
      identity,
      data.photo
    );

    const cache =
      photoCache();

    cache[identity] =
      data.photo;

    write(
      PHOTO_CACHE,
      Object.fromEntries(
        Object.entries(
          cache
        )
        .slice(
          -250
        )
      )
    );

    render();

  }catch(error){

    console.warn(
      "PETS & DOGUE photo:",
      error
    );

  }

};


/* =========================================================
   COMMUNITY DATA
========================================================= */

window.loadCommunity =
async function(){

  try{

    const response =
      await fetch(
        PD_COMMUNITY_API,
        {
          headers:{
            Accept:
              "application/json"
          }
        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(
      !response.ok ||
      data.ok !== true
    ){

      return;

    }

    sharedPolicies.clear();

    pdVoteSummaries.clear();

    (
      data.policies ||
      []
    )
    .forEach(
      policy=>{

        if(
          policy.placeKey
        ){

          sharedPolicies.set(
            policy.placeKey,
            policy
          );

        }

      }
    );

    (
      data.votes ||
      []
    )
    .forEach(
      summary=>{

        if(
          summary.placeKey
        ){

          pdVoteSummaries.set(
            summary.placeKey,
            summary
          );

        }

      }
    );

    render();

  }catch(error){

    console.warn(
      "Community data:",
      error
    );

  }

};


window.policyInfo =
function(place){

  const vote =
    pdVoteInfo(
      place
    );

  if(
    vote.communityRejected
  ){

    return{
      confirmed:false,
      rejected:true,
      value:"rejected",
      text:
        pdT(
          "rejected"
        )
    };

  }

  const shared =
    communityPolicy(
      place
    );

  if(shared){

    if(
      shared.inside &&
      shared.outside
    ){

      return{
        confirmed:true,
        value:
          "inside_outside",
        text:
          t(
            "insideOutside"
          )
      };

    }

    if(
      shared.inside
    ){

      return{
        confirmed:true,
        value:"inside",
        text:
          t(
            "inside"
          )
      };

    }

    if(
      shared.outside
    ){

      return{
        confirmed:true,
        value:"outside",
        text:
          t(
            "outside"
          )
      };

    }

  }

  if(
    vote.communityPetFriendly
  ){

    return{
      confirmed:true,
      value:"community",
      text:
        pdT(
          "confirmed"
        )
    };

  }

  if(
    place.allowsDogs ===
    true
  ){

    return{
      confirmed:true,
      value:"confirmed",
      text:
        t(
          "policyConfirmed"
        )
    };

  }

  return{
    confirmed:false,
    value:"unknown",
    text:
      t(
        "policyUnknown"
      )
  };

};


window.current =
function(){

  let list;

  if(
    cat ===
    "saved"
  ){

    const all = [
      ...places,
      ...snapshots()
    ];

    const saved =
      savedSet();

    list =
      all
        .filter(
          (
            place,
            index,
            array
          )=>
            array.findIndex(
              candidate=>
                localKey(
                  candidate
                ) ===
                localKey(
                  place
                )
            ) ===
            index
        )
        .filter(
          place=>
            saved.has(
              localKey(
                place
              )
            )
        );

  }else{

    list =
      places.filter(
        place=>
          cat === "all" ||
          place.category ===
          cat
      );

  }

  list =
    list.filter(
      place=>
        !pdVoteInfo(
          place
        )
        .communityRejected
    );

  const mode =
    document
      .getElementById(
        "sort"
      )
      ?.value ||
    "distance";

  list.sort(
    (a,b)=>{

      const ap =
        policyInfo(a);

      const bp =
        policyInfo(b);

      if(
        ap.confirmed !==
        bp.confirmed
      ){

        return ap.confirmed
          ? -1
          : 1;

      }

      if(
        mode ===
        "rating"
      ){

        const difference =
          (
            b.rating ||
            0
          ) -
          (
            a.rating ||
            0
          );

        if(difference){

          return difference;

        }

      }

      return (
        (
          a.distance ??
          999999
        ) -
        (
          b.distance ??
          999999
        )
      );

    }
  );

  return list;

};


async function pdSaveVote(
  place,
  vote
){

  const response =
    await fetch(
      PD_COMMUNITY_API,
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json",

          Accept:
            "application/json"
        },

        body:
          JSON.stringify({

            action:
              "vote",

            placeKey:
              communityKey(
                place
              ),

            voterKey:
              pdVoterKey(),

            vote

          })

      }
    );

  const data =
    await response
      .json()
      .catch(
        ()=>({})
      );

  if(
    !response.ok ||
    data.ok !== true
  ){

    throw new Error(
      data.error ||
      pdT(
        "voteError"
      )
    );

  }

  if(
    data.summary
      ?.placeKey
  ){

    pdVoteSummaries.set(
      data.summary.placeKey,
      data.summary
    );

  }

  return data.summary;

}


async function pdVoteYes(
  place
){

  try{

    await pdSaveVote(
      place,
      "yes"
    );

    render();

    openPolicy(
      place
    );

  }catch(error){

    setStatus(
      error.message ||
      pdT(
        "voteError"
      )
    );

    setTimeout(
      ()=>setStatus(""),
      3000
    );

  }

}


async function pdVoteNo(
  place
){

  try{

    await pdSaveVote(
      place,
      "no"
    );

    render();

  }catch(error){

    setStatus(
      error.message ||
      pdT(
        "voteError"
      )
    );

    setTimeout(
      ()=>setStatus(""),
      3000
    );

  }

}


function pdFallbackMarkup(
  place
){

  return `

    <div class="pd-branded-fallback">

      <div>

        ${categoryIcon(
          place.category
        )}

        <span>
          PETS & DOGUE
        </span>

      </div>

    </div>

  `;

}/* =========================================================
   CARD RENDER
========================================================= */

window.render =
function(){

  const box =
    document.getElementById(
      "cards"
    );

  if(!box){
    return;
  }

  const list =
    current();

  const saved =
    savedSet();

  document
    .getElementById(
      "count"
    )
    .textContent =
      `${t("found")}: ${list.length} ${t("places")}`;

  if(
    !list.length
  ){

    box.innerHTML = `

      <div class="empty">

        <h2>
          ${esc(
            cat === "saved"
              ? t("savedEmpty")
              : t("noPlaces")
          )}
        </h2>

        <p>
          ${esc(
            t(
              "tryAnother"
            )
          )}
        </p>

      </div>

    `;

    document
      .getElementById(
        "more"
      )
      .hidden =
        true;

    drawMarkers([]);

    return;

  }

  const visible =
    list.slice(
      0,
      limit
    );

  box.innerHTML =
    visible
      .map(
        place=>{

          const identity =
            localKey(
              place
            );

          const photo =
            photoFor(
              place
            );

          const policy =
            policyInfo(
              place
            );

          const vote =
            pdVoteInfo(
              place
            );

          const meta = [];

          if(
            Number.isFinite(
              place.distance
            )
          ){

            meta.push(
              `${place.distance.toFixed(
                place.distance < 10
                  ? 1
                  : 0
              )} km`
            );

          }

          if(
            place.rating
          ){

            meta.push(
              `★ ${Number(
                place.rating
              ).toFixed(1)}`
            );

          }

          meta.push(
            sourceLabel(
              place
            )
          );

          const communityText =
            vote.total
              ? (
                  `${pdT("community")}: ` +
                  `✓ ${vote.yes} · ` +
                  `✕ ${vote.no}`
                )
              : "";

          return `

            <article
              class="card"
              data-category="${esc(
                place.category
              )}"
              data-open="${esc(
                identity
              )}"
            >

              <div class="card-bg">

                ${pdFallbackMarkup(
                  place
                )}

              </div>

              ${
                photo
                  ? `

                    <img
                      class="card-photo"
                      src="${esc(photo)}"
                      alt="${esc(place.name)}"
                      loading="lazy"
                      onerror="this.style.display='none'"
                    >

                  `
                  : ""
              }

              <button
                class="heart ${
                  saved.has(
                    identity
                  )
                    ? "on"
                    : ""
                }"
                data-save="${esc(
                  identity
                )}"
                type="button"
                aria-label="Save"
              >
                ${
                  saved.has(
                    identity
                  )
                    ? "♥"
                    : "♡"
                }
              </button>

              <div class="card-body">

                <div class="card-top">

                  <span class="badge">
                    ${esc(
                      catLabel(
                        place.category
                      )
                    )}
                  </span>

                </div>

                <h2>
                  ${esc(
                    place.name
                  )}
                </h2>

                <p class="address">
                  ${esc(
                    place.address
                  )}
                </p>

                <div class="pet-row">

                  <span
                    class="pet ${
                      policy.value ===
                      "unknown"
                        ? "unknown"
                        : policy.value ===
                          "outside"
                          ? "outside"
                          : ""
                    }"
                  >
                    ${esc(
                      policy.text
                    )}
                  </span>

                </div>

                <div class="pd-vote-row">

                  <strong>
                    ${esc(
                      pdT(
                        "pf"
                      )
                    )}
                  </strong>

                  <button
                    class="pd-vote-btn yes"
                    data-vote-yes="${esc(
                      identity
                    )}"
                    type="button"
                  >
                    ✓ ${esc(
                      pdT(
                        "yes"
                      )
                    )}
                  </button>

                  <button
                    class="pd-vote-btn no"
                    data-vote-no="${esc(
                      identity
                    )}"
                    type="button"
                  >
                    ✕ ${esc(
                      pdT(
                        "no"
                      )
                    )}
                  </button>

                  <span class="pd-vote-count">

                    ${
                      vote.total
                        ? esc(
                            `${vote.total} ${pdT("votes")}`
                          )
                        : ""
                    }

                  </span>

                </div>

                ${
                  communityText
                    ? `

                      <div
                        class="pd-community-state ${
                          vote.communityPetFriendly
                            ? "good"
                            : ""
                        }"
                      >
                        ${esc(
                          communityText
                        )}
                      </div>

                    `
                    : ""
                }

                <div class="meta">
                  ${esc(
                    meta.join(
                      " · "
                    )
                  )}
                </div>

                <div class="actions">

                  <button
                    class="pd-pet-photo-btn"
                    data-pet-photos="${esc(
                      identity
                    )}"
                    type="button"
                  >
                    🐾 ${esc(
                      pdT(
                        "petPhotos"
                      )
                    )}
                  </button>

                  <button
                    data-route="${esc(
                      identity
                    )}"
                    type="button"
                  >
                    ${esc(
                      t(
                        "route"
                      )
                    )}
                  </button>

                  <button
                    data-site="${esc(
                      identity
                    )}"
                    type="button"
                  >
                    ${esc(
                      place.website
                        ? t("website")
                        : "Google Maps"
                    )}
                  </button>

                  ${
                    place.category ===
                    "hotel"
                      ? `

                        <button
                          class="booking"
                          data-book="${esc(
                            identity
                          )}"
                          type="button"
                        >
                          Booking
                        </button>

                      `
                      : ""
                  }

                  ${
                    place.phone
                      ? `

                        <button
                          data-call="${esc(
                            identity
                          )}"
                          type="button"
                        >
                          ${esc(
                            t(
                              "call"
                            )
                          )}
                        </button>

                      `
                      : ""
                  }

                </div>

              </div>

            </article>

          `;

        }
      )
      .join("");

  document
    .getElementById(
      "more"
    )
    .hidden =
      visible.length >=
      list.length;

  bindCards();

  drawMarkers(
    list
  );

  hydratePhotos(
    visible
  );

};


/* =========================================================
   CARD ACTIONS
========================================================= */

window.bindCards =
function(){

  document
    .querySelectorAll(
      "[data-save]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.save
              );

            if(place){

              toggleSave(
                place
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-vote-yes]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.voteYes
              );

            if(place){

              pdVoteYes(
                place
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-vote-no]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.voteNo
              );

            if(place){

              pdVoteNo(
                place
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-pet-photos]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.petPhotos
              );

            if(place){

              pdOpenPetPhotos(
                place
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-route]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.route
              );

            if(place){

              openRoute(
                place
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-site]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.site
              );

            if(!place){
              return;
            }

            window.open(
              place.website ||
              mapsPlaceUrl(
                place
              ),
              "_blank",
              "noopener"
            );

          };

      }
    );


  document
    .querySelectorAll(
      "[data-book]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.book
              );

            if(place){

              window.open(
                bookingUrl(
                  place
                ),
                "_blank",
                "noopener"
              );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-call]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.stopPropagation();

            const place =
              findPlace(
                button.dataset.call
              );

            if(
              place?.phone
            ){

              location.href =
                "tel:" +
                place.phone.replace(
                  /[^+0-9]/g,
                  ""
                );

            }

          };

      }
    );


  document
    .querySelectorAll(
      "[data-open]"
    )
    .forEach(
      card=>{

        card.onclick =
          event=>{

            if(
              event.target.closest(
                "button"
              )
            ){

              return;

            }

            const place =
              findPlace(
                card.dataset.open
              );

            if(place){

              openDetail(
                place
              );

            }

          };

      }
    );

};


/* =========================================================
   DETAIL POPUP
========================================================= */

const pdOriginalOpenDetail =
  window.openDetail;

window.openDetail =
function(place){

  pdOriginalOpenDetail(
    place
  );

  const actions =
    document.getElementById(
      "detailActions"
    );

  if(!actions){
    return;
  }

  const petButton =
    document.createElement(
      "button"
    );

  petButton.textContent =
    "🐾 " +
    pdT(
      "petPhotos"
    );

  petButton.onclick =
    ()=>pdOpenPetPhotos(
      place
    );

  actions.appendChild(
    petButton
  );


  if(
    place.category ===
    "hotel"
  ){

    const booking =
      document.createElement(
        "button"
      );

    booking.className =
      "dark";

    booking.textContent =
      pdT(
        "booking"
      );

    booking.onclick =
      ()=>window.open(
        bookingUrl(
          place
        ),
        "_blank",
        "noopener"
      );

    actions.appendChild(
      booking
    );

  }


  const vote =
    document.createElement(
      "div"
    );

  vote.className =
    "pd-vote-row";

  const summary =
    pdVoteInfo(
      place
    );

  vote.innerHTML = `

    <strong>
      ${esc(
        pdT(
          "pf"
        )
      )}
    </strong>

    <button
      class="pd-vote-btn yes"
      type="button"
    >
      ✓ ${esc(
        pdT(
          "yes"
        )
      )}
    </button>

    <button
      class="pd-vote-btn no"
      type="button"
    >
      ✕ ${esc(
        pdT(
          "no"
        )
      )}
    </button>

    <span class="pd-vote-count">
      ${
        summary.total
          ? esc(
              `${summary.total} ${pdT("votes")}`
            )
          : ""
      }
    </span>

  `;

  vote
    .querySelector(
      ".yes"
    )
    .onclick =
      ()=>pdVoteYes(
        place
      );

  vote
    .querySelector(
      ".no"
    )
    .onclick =
      ()=>pdVoteNo(
        place
      );

  actions.appendChild(
    vote
  );

};


/* =========================================================
   SEARCH
   Broad discovery first.
   Pet-friendly is a STATUS,
   not a requirement for discovery.
========================================================= */

function pdSearchSnapshot(){

  return{
    category:
      cat,

    latitude:
      Number(
        center.lat
      ),

    longitude:
      Number(
        center.lng
      ),

    radiusKm:
      Number(
        radius
      ),

    language:
      lang
  };

}


async function pdProviderSearch(
  snapshot
){

  if(
    snapshot.category ===
    "saved"
  ){

    return [];

  }

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      ()=>controller.abort(),
      8500
    );

  try{

    const response =
      await fetch(
        API,
        {
          method:"POST",

          signal:
            controller.signal,

          headers:{
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body:
            JSON.stringify({

              latitude:
                snapshot.latitude,

              longitude:
                snapshot.longitude,

              radius:
                Math.round(
                  snapshot.radiusKm *
                  1000
                ),

              category:
                snapshot.category,

              maxResults:
                60,

              language:
                snapshot.language

            })

        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(
      !response.ok ||
      data.ok !== true
    ){

      throw new Error(
        data.error ||
        "Search error"
      );

    }

    return (
      data.places ||
      []
    )
    .map(
      place=>
        norm(
          place,
          place.source ||
          "geoapify",
          snapshot.category ===
          "all"
            ? (
                place.category ||
                ""
              )
            : snapshot.category
        )
    )
    .filter(Boolean);

  }finally{

    clearTimeout(
      timer
    );

  }

}


function pdAround(
  snapshot,
  meters
){

  return (
    `(around:${Math.round(
      meters
    )},${snapshot.latitude},${snapshot.longitude})`
  );

}


function pdOsmQuery(
  snapshot
){

  const full =
    pdAround(
      snapshot,
      snapshot.radiusKm *
      1000
    );

  const broad =
    pdAround(
      snapshot,
      Math.min(
        snapshot.radiusKm *
        1000,
        15000
      )
    );

  const dog =
    '["dog"~"^(yes|leashed|designated|permissive|outside|limited|conditional|customers)$",i]';


  const queries = {

    cafe:[

      `nwr["amenity"="cafe"]${dog}${full};`,

      `nwr["amenity"="cafe"]${broad};`

    ],

    restaurant:[

      `nwr["amenity"="restaurant"]${dog}${full};`,

      `nwr["amenity"="restaurant"]${broad};`

    ],

    pub:[

      `nwr["amenity"="pub"]${dog}${full};`,

      `nwr["amenity"="bar"]${dog}${full};`,

      `nwr["amenity"="pub"]${broad};`,

      `nwr["amenity"="bar"]${broad};`

    ],

    pizzeria:[

      `nwr["amenity"="restaurant"]["cuisine"~"pizza",i]${dog}${full};`,

      `nwr["amenity"="fast_food"]["cuisine"~"pizza",i]${dog}${full};`,

      `nwr["amenity"="restaurant"]["cuisine"~"pizza",i]${broad};`,

      `nwr["amenity"="fast_food"]["cuisine"~"pizza",i]${broad};`,

      `nwr["amenity"~"^(restaurant|fast_food)$"]["name"~"pizza|pizzeria|pizz",i]${broad};`

    ],

    hotel:[

      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment)$"]${dog}${full};`,

      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment)$"]${broad};`

    ],

    park:[

      `nwr["leisure"="dog_park"]${full};`,

      `nwr["leisure"="park"]${dog}${full};`,

      `nwr["leisure"="park"]${broad};`

    ],

    beach:[

      `nwr["natural"="beach"]${dog}${full};`,

      `nwr["natural"="beach"]${broad};`

    ],

    veterinary:[

      `nwr["amenity"="veterinary"]${broad};`

    ],

    "pet-shop":[

      `nwr["shop"="pet"]${broad};`,

      `nwr["shop"="pet_food"]${broad};`

    ],

    grooming:[

      `nwr["shop"="pet_grooming"]${broad};`,

      `nwr["name"~"groom|grooming|dog wash|pet salon",i]${broad};`

    ],

    events:[

      `nwr["amenity"="events_venue"]${dog}${full};`,

      `nwr["amenity"="events_venue"]${broad};`

    ]

  };


  let lines;


  if(
    snapshot.category ===
    "all"
  ){

    lines = [

      `nwr["amenity"="cafe"]${dog}${full};`,

      `nwr["amenity"="restaurant"]${dog}${full};`,

      `nwr["amenity"="pub"]${dog}${full};`,

      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment)$"]${dog}${full};`,

      `nwr["leisure"="dog_park"]${full};`,

      `nwr["amenity"="veterinary"]${broad};`,

      `nwr["shop"="pet"]${broad};`,

      `nwr["shop"="pet_grooming"]${broad};`

    ];

  }else{

    lines =
      queries[
        snapshot.category
      ] ||
      [];

  }

  return lines.length
    ? (
        "[out:json][timeout:18];(" +
        lines.join("") +
        ");out center tags 350;"
      )
    : "";

}


async function pdOsmSearch(
  snapshot
){

  const query =
    pdOsmQuery(
      snapshot
    );

  if(!query){

    return [];

  }

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      ()=>controller.abort(),
      8000
    );

  try{

    const response =
      await fetch(
        OVP,
        {
          method:"POST",

          signal:
            controller.signal,

          headers:{
            "Content-Type":
              "application/x-www-form-urlencoded;charset=UTF-8"
          },

          body:
            new URLSearchParams({
              data:
                query
            })

        }
      );

    if(
      !response.ok
    ){

      throw new Error(
        "OpenStreetMap error"
      );

    }

    const data =
      await response.json();

    return (
      data.elements ||
      []
    )
    .map(
      element=>{

        const place =
          normOsm(
            element
          );

        if(
          place &&
          snapshot.category !==
          "all" &&
          snapshot.category !==
          "saved" &&
          [
            "cafe",
            "restaurant",
            "pub",
            "pizzeria",
            "hotel"
          ]
          .includes(
            snapshot.category
          )
        ){

          place.category =
            snapshot.category;

        }

        return place;

      }
    )
    .filter(Boolean)
    .filter(
      place=>
        place.allowsDogs !==
        false
    );

  }finally{

    clearTimeout(
      timer
    );

  }

}


function pdStillCurrent(
  sequence,
  snapshot
){

  return (
    sequence ===
      pdSearchSequence
    &&
    cat ===
      snapshot.category
    &&
    Number(
      center.lat
    ) ===
      snapshot.latitude
    &&
    Number(
      center.lng
    ) ===
      snapshot.longitude
    &&
    Number(
      radius
    ) ===
      snapshot.radiusKm
  );

}


window.search =
async function(){

  const sequence =
    ++pdSearchSequence;

  const snapshot =
    pdSearchSnapshot();

  limit =
    12;


  if(
    snapshot.category ===
    "saved"
  ){

    render();

    setStatus("");

    return;

  }


  setStatus(
    t(
      "searching"
    )
  );


  /*
     Geoapify and OSM now start together.

     Geoapify broad results can appear immediately.
     OSM cannot block the whole search.
  */

  const providerPromise =
    pdProviderSearch(
      snapshot
    )
    .catch(
      error=>{

        console.warn(
          "Geoapify:",
          error
        );

        return [];

      }
    );


  const osmPromise =
    pdOsmSearch(
      snapshot
    )
    .catch(
      error=>{

        console.warn(
          "OSM:",
          error
        );

        return [];

      }
    );


  const providerPlaces =
    await providerPromise;


  if(
    !pdStillCurrent(
      sequence,
      snapshot
    )
  ){

    return;

  }


  places =
    merge([
      providerPlaces
    ]);


  render();


  setStatus(
    t(
      "osm"
    )
  );


  const osmPlaces =
    await osmPromise;


  if(
    !pdStillCurrent(
      sequence,
      snapshot
    )
  ){

    return;

  }


  places =
    merge([
      providerPlaces,
      osmPlaces
    ]);


  render();

  setStatus("");

};


/* =========================================================
   INITIALISE
========================================================= */

function pdBoot(){

  pdInstallStyles();

  pdInstallPhotoModal();

  pdUpdatePhotoModalText();

  loadCommunity();

}


if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    pdBoot,
    {
      once:true
    }
  );

}else{

  pdBoot();

}


window.addEventListener(
  "petsdogue:languagechange",
  ()=>{

    setTimeout(
      ()=>{

        pdUpdatePhotoModalText();

        render();

      },
      0
    );

  }
);
