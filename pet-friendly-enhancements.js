"use strict";

/* =========================================================
   PETS & DOGUE — PET-FRIENDLY ENHANCEMENTS
   - broad discovery first, pet status second
   - compact editorial community voting
   - Yes / No community voting
   - Inside / Outside detail after Yes
   - community rejection threshold
   - Booking for hotels
   - modern Pet Photos mobile picker
   - up to 10 photos with preview + remove
   - real venue photo resolver + branded fallback
   - preserves global header, menu, map and accessibility
========================================================= */

const PD_PHOTO_API = "/api/pet-friendly-photo";
const PD_COMMUNITY_API = "/api/pet-friendly-community";
const PD_PET_PHOTOS_API = "/api/pet-friendly-pet-photos";
const PD_VOTER_KEY = "pets_dogue_pet_voter_key";
const PD_MAX_SELECTED_PHOTOS = 10;

let pdSearchSequence = 0;
let pdPetPhotoPlace = null;
let pdSelectedPhotos = [];

const pdVoteSummaries = new Map();

const PD_TX = {

  en:{
    pf:"Pet-friendly?",
    yes:"Yes",
    no:"No",
    votes:"votes",
    petPhotos:"Pet photos",
    addPhoto:"Add photos",
    photoRuleTitle:"Pet photos only",
    photoRule:"Only photos showing an animal at this exact venue will be added. Photos without an animal will not be published.",
    animalVisible:"An animal is clearly visible",
    takenHere:"These photos were taken at this venue",
    inside:"Inside",
    outside:"Outside",
    terrace:"Terrace",
    other:"Other",
    submit:"Submit photos",
    pending:"Photos sent for review",
    noPhotos:"No approved pet photos yet.",
    booking:"Check availability on Booking",
    community:"Community",
    confirmed:"Pet-friendly confirmed",
    unknown:"Pet policy not confirmed",
    rejected:"Community says not pet-friendly",
    uploading:"Uploading…",
    galleryError:"Could not load pet photos.",
    voteError:"Could not save your vote.",
    photoError:"Could not upload this photo.",
    camera:"Camera",
    chooseFiles:"Choose photos",
    gallery:"Gallery",
    selected:"selected",
    maxPhotos:"Up to 10 photos",
    removePhoto:"Remove photo",
    chooseFirst:"Choose at least one photo",
    confirmRules:"Please confirm both photo rules",
    uploadProgress:"Uploading photo",
    of:"of"
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
    takenHere:"Ці фото зроблено саме в цьому закладі",
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
    photoError:"Не вдалося завантажити фото.",
    camera:"Камера",
    chooseFiles:"Вибрати фото",
    gallery:"Галерея",
    selected:"вибрано",
    maxPhotos:"До 10 фото",
    removePhoto:"Видалити фото",
    chooseFirst:"Виберіть хоча б одне фото",
    confirmRules:"Підтвердьте обидва правила для фото",
    uploadProgress:"Завантаження фото",
    of:"з"
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
    takenHere:"Эти фото сделаны именно в этом заведении",
    inside:"Внутри",
    outside:"Снаружи",
    terrace:"Терраса",
    other:"Другое",
    submit:"Отправить фото",
    pending:"Фото отправлены на проверку",
    noPhotos:"Пока нет одобренных фото с животными.",
    booking:"Проверить места на Booking",
    community:"Сообщество",
    confirmed:"Pet-friendly подтверждено",
    unknown:"Правила для животных не подтверждены",
    rejected:"Сообщество считает место не pet-friendly",
    uploading:"Загрузка…",
    galleryError:"Не удалось загрузить фото.",
    voteError:"Не удалось сохранить голос.",
    photoError:"Не удалось загрузить фото.",
    camera:"Камера",
    chooseFiles:"Выбрать фото",
    gallery:"Галерея",
    selected:"выбрано",
    maxPhotos:"До 10 фото",
    removePhoto:"Удалить фото",
    chooseFirst:"Выберите хотя бы одно фото",
    confirmRules:"Подтвердите оба правила для фото",
    uploadProgress:"Загрузка фото",
    of:"из"
  },

  fr:{
    pf:"Pet-friendly ?",
    yes:"Oui",
    no:"Non",
    votes:"votes",
    petPhotos:"Photos d’animaux",
    addPhoto:"Ajouter des photos",
    photoRuleTitle:"Photos avec animaux uniquement",
    photoRule:"Seules les photos montrant un animal dans ce lieu précis seront ajoutées. Les photos sans animal ne seront pas publiées.",
    animalVisible:"Un animal est clairement visible",
    takenHere:"Ces photos ont été prises dans ce lieu",
    inside:"Intérieur",
    outside:"Extérieur",
    terrace:"Terrasse",
    other:"Autre",
    submit:"Envoyer les photos",
    pending:"Photos envoyées pour validation",
    noPhotos:"Aucune photo approuvée pour le moment.",
    booking:"Voir les disponibilités sur Booking",
    community:"Communauté",
    confirmed:"Pet-friendly confirmé",
    unknown:"Politique animaux non confirmée",
    rejected:"La communauté indique que ce lieu n’est pas pet-friendly",
    uploading:"Envoi…",
    galleryError:"Impossible de charger les photos.",
    voteError:"Impossible d’enregistrer le vote.",
    photoError:"Impossible d’envoyer cette photo.",
    camera:"Appareil photo",
    chooseFiles:"Choisir des photos",
    gallery:"Galerie",
    selected:"sélectionnées",
    maxPhotos:"Jusqu’à 10 photos",
    removePhoto:"Supprimer la photo",
    chooseFirst:"Choisissez au moins une photo",
    confirmRules:"Veuillez confirmer les deux règles",
    uploadProgress:"Envoi de la photo",
    of:"sur"
  },

  de:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nein",
    votes:"Stimmen",
    petPhotos:"Tierfotos",
    addPhoto:"Fotos hinzufügen",
    photoRuleTitle:"Nur Fotos mit Tieren",
    photoRule:"Nur Fotos mit einem Tier an genau diesem Ort werden hinzugefügt. Fotos ohne Tier werden nicht veröffentlicht.",
    animalVisible:"Ein Tier ist deutlich sichtbar",
    takenHere:"Diese Fotos wurden an diesem Ort aufgenommen",
    inside:"Innen",
    outside:"Außen",
    terrace:"Terrasse",
    other:"Andere",
    submit:"Fotos senden",
    pending:"Fotos zur Prüfung gesendet",
    noPhotos:"Noch keine freigegebenen Tierfotos.",
    booking:"Verfügbarkeit bei Booking prüfen",
    community:"Community",
    confirmed:"Pet-friendly bestätigt",
    unknown:"Haustierregel nicht bestätigt",
    rejected:"Community meldet: nicht pet-friendly",
    uploading:"Wird hochgeladen…",
    galleryError:"Tierfotos konnten nicht geladen werden.",
    voteError:"Stimme konnte nicht gespeichert werden.",
    photoError:"Foto konnte nicht hochgeladen werden.",
    camera:"Kamera",
    chooseFiles:"Fotos auswählen",
    gallery:"Galerie",
    selected:"ausgewählt",
    maxPhotos:"Bis zu 10 Fotos",
    removePhoto:"Foto entfernen",
    chooseFirst:"Wähle mindestens ein Foto",
    confirmRules:"Bitte beide Fotoregeln bestätigen",
    uploadProgress:"Foto wird hochgeladen",
    of:"von"
  },

  es:{
    pf:"¿Pet-friendly?",
    yes:"Sí",
    no:"No",
    votes:"votos",
    petPhotos:"Fotos con mascotas",
    addPhoto:"Añadir fotos",
    photoRuleTitle:"Solo fotos con animales",
    photoRule:"Solo se añadirán fotos donde aparezca un animal en este lugar exacto. Las fotos sin animales no se publicarán.",
    animalVisible:"Se ve claramente un animal",
    takenHere:"Estas fotos fueron tomadas en este lugar",
    inside:"Interior",
    outside:"Exterior",
    terrace:"Terraza",
    other:"Otro",
    submit:"Enviar fotos",
    pending:"Fotos enviadas para revisión",
    noPhotos:"Aún no hay fotos aprobadas.",
    booking:"Ver disponibilidad en Booking",
    community:"Comunidad",
    confirmed:"Pet-friendly confirmado",
    unknown:"Política de mascotas no confirmada",
    rejected:"La comunidad indica que no es pet-friendly",
    uploading:"Subiendo…",
    galleryError:"No se pudieron cargar las fotos.",
    voteError:"No se pudo guardar el voto.",
    photoError:"No se pudo subir esta foto.",
    camera:"Cámara",
    chooseFiles:"Elegir fotos",
    gallery:"Galería",
    selected:"seleccionadas",
    maxPhotos:"Hasta 10 fotos",
    removePhoto:"Eliminar foto",
    chooseFirst:"Elige al menos una foto",
    confirmRules:"Confirma las dos reglas",
    uploadProgress:"Subiendo foto",
    of:"de"
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
    takenHere:"Queste foto sono state scattate in questo luogo",
    inside:"Interno",
    outside:"Esterno",
    terrace:"Terrazza",
    other:"Altro",
    submit:"Invia foto",
    pending:"Foto inviate per la revisione",
    noPhotos:"Nessuna foto approvata per ora.",
    booking:"Controlla disponibilità su Booking",
    community:"Community",
    confirmed:"Pet-friendly confermato",
    unknown:"Regole non confermate",
    rejected:"La community segnala che non è pet-friendly",
    uploading:"Caricamento…",
    galleryError:"Impossibile caricare le foto.",
    voteError:"Impossibile salvare il voto.",
    photoError:"Impossibile caricare questa foto.",
    camera:"Fotocamera",
    chooseFiles:"Scegli foto",
    gallery:"Galleria",
    selected:"selezionate",
    maxPhotos:"Fino a 10 foto",
    removePhoto:"Rimuovi foto",
    chooseFirst:"Scegli almeno una foto",
    confirmRules:"Conferma entrambe le regole",
    uploadProgress:"Caricamento foto",
    of:"di"
  },

  pt:{
    pf:"Pet-friendly?",
    yes:"Sim",
    no:"Não",
    votes:"votos",
    petPhotos:"Fotos com animais",
    addPhoto:"Adicionar fotos",
    photoRuleTitle:"Apenas fotos com animais",
    photoRule:"Só serão adicionadas fotos com um animal visível neste local exato. Fotos sem animais não serão publicadas.",
    animalVisible:"Um animal está claramente visível",
    takenHere:"Estas fotos foram tiradas neste local",
    inside:"Interior",
    outside:"Exterior",
    terrace:"Terraço",
    other:"Outro",
    submit:"Enviar fotos",
    pending:"Fotos enviadas para revisão",
    noPhotos:"Ainda não há fotos aprovadas.",
    booking:"Ver disponibilidade no Booking",
    community:"Comunidade",
    confirmed:"Pet-friendly confirmado",
    unknown:"Política não confirmada",
    rejected:"A comunidade indica que não é pet-friendly",
    uploading:"A enviar…",
    galleryError:"Não foi possível carregar as fotos.",
    voteError:"Não foi possível guardar o voto.",
    photoError:"Não foi possível enviar esta foto.",
    camera:"Câmara",
    chooseFiles:"Escolher fotos",
    gallery:"Galeria",
    selected:"selecionadas",
    maxPhotos:"Até 10 fotos",
    removePhoto:"Remover foto",
    chooseFirst:"Escolha pelo menos uma foto",
    confirmRules:"Confirme as duas regras",
    uploadProgress:"A enviar foto",
    of:"de"
  },

  nl:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nee",
    votes:"stemmen",
    petPhotos:"Dierenfoto’s",
    addPhoto:"Foto’s toevoegen",
    photoRuleTitle:"Alleen foto’s met dieren",
    photoRule:"Alleen foto’s waarop een dier op deze exacte locatie zichtbaar is worden toegevoegd. Foto’s zonder dier worden niet gepubliceerd.",
    animalVisible:"Een dier is duidelijk zichtbaar",
    takenHere:"Deze foto’s zijn op deze locatie gemaakt",
    inside:"Binnen",
    outside:"Buiten",
    terrace:"Terras",
    other:"Anders",
    submit:"Foto’s versturen",
    pending:"Foto’s ter beoordeling verzonden",
    noPhotos:"Nog geen goedgekeurde dierenfoto’s.",
    booking:"Beschikbaarheid op Booking bekijken",
    community:"Community",
    confirmed:"Pet-friendly bevestigd",
    unknown:"Huisdierenbeleid niet bevestigd",
    rejected:"Community zegt: niet pet-friendly",
    uploading:"Uploaden…",
    galleryError:"Foto’s konden niet worden geladen.",
    voteError:"Stem kon niet worden opgeslagen.",
    photoError:"Foto kon niet worden geüpload.",
    camera:"Camera",
    chooseFiles:"Foto’s kiezen",
    gallery:"Galerij",
    selected:"geselecteerd",
    maxPhotos:"Maximaal 10 foto’s",
    removePhoto:"Foto verwijderen",
    chooseFirst:"Kies minimaal één foto",
    confirmRules:"Bevestig beide fotoregels",
    uploadProgress:"Foto uploaden",
    of:"van"
  },

  pl:{
    pf:"Pet-friendly?",
    yes:"Tak",
    no:"Nie",
    votes:"głosów",
    petPhotos:"Zdjęcia ze zwierzętami",
    addPhoto:"Dodaj zdjęcia",
    photoRuleTitle:"Tylko zdjęcia ze zwierzętami",
    photoRule:"Dodawane są tylko zdjęcia, na których widać zwierzę w tym konkretnym miejscu. Zdjęcia bez zwierząt nie będą publikowane.",
    animalVisible:"Zwierzę jest wyraźnie widoczne",
    takenHere:"Te zdjęcia zrobiono w tym miejscu",
    inside:"Wewnątrz",
    outside:"Na zewnątrz",
    terrace:"Taras",
    other:"Inne",
    submit:"Wyślij zdjęcia",
    pending:"Zdjęcia wysłano do weryfikacji",
    noPhotos:"Brak zatwierdzonych zdjęć.",
    booking:"Sprawdź dostępność na Booking",
    community:"Społeczność",
    confirmed:"Pet-friendly potwierdzone",
    unknown:"Zasady niepotwierdzone",
    rejected:"Społeczność wskazuje: nie pet-friendly",
    uploading:"Wysyłanie…",
    galleryError:"Nie udało się wczytać zdjęć.",
    voteError:"Nie udało się zapisać głosu.",
    photoError:"Nie udało się wysłać zdjęcia.",
    camera:"Aparat",
    chooseFiles:"Wybierz zdjęcia",
    gallery:"Galeria",
    selected:"wybrano",
    maxPhotos:"Do 10 zdjęć",
    removePhoto:"Usuń zdjęcie",
    chooseFirst:"Wybierz co najmniej jedno zdjęcie",
    confirmRules:"Potwierdź obie zasady",
    uploadProgress:"Wysyłanie zdjęcia",
    of:"z"
  },

  cs:{
    pf:"Pet-friendly?",
    yes:"Ano",
    no:"Ne",
    votes:"hlasů",
    petPhotos:"Fotky se zvířaty",
    addPhoto:"Přidat fotky",
    photoRuleTitle:"Pouze fotky se zvířaty",
    photoRule:"Přidány budou pouze fotky, na kterých je zvíře viditelné přímo v tomto podniku. Fotky bez zvířete nebudou zveřejněny.",
    animalVisible:"Zvíře je dobře viditelné",
    takenHere:"Tyto fotky byly pořízeny v tomto podniku",
    inside:"Uvnitř",
    outside:"Venku",
    terrace:"Terasa",
    other:"Jiné",
    submit:"Odeslat fotky",
    pending:"Fotky byly odeslány ke kontrole",
    noPhotos:"Zatím nejsou schválené žádné fotky.",
    booking:"Zkontrolovat dostupnost na Booking",
    community:"Komunita",
    confirmed:"Pet-friendly potvrzeno",
    unknown:"Pravidla nejsou potvrzena",
    rejected:"Komunita uvádí, že místo není pet-friendly",
    uploading:"Nahrávání…",
    galleryError:"Fotky se nepodařilo načíst.",
    voteError:"Hlas se nepodařilo uložit.",
    photoError:"Fotku se nepodařilo nahrát.",
    camera:"Fotoaparát",
    chooseFiles:"Vybrat fotky",
    gallery:"Galerie",
    selected:"vybráno",
    maxPhotos:"Až 10 fotek",
    removePhoto:"Odstranit fotku",
    chooseFirst:"Vyberte alespoň jednu fotku",
    confirmRules:"Potvrďte obě pravidla",
    uploadProgress:"Nahrávání fotky",
    of:"z"
  },

  sk:{
    pf:"Pet-friendly?",
    yes:"Áno",
    no:"Nie",
    votes:"hlasov",
    petPhotos:"Fotky so zvieratami",
    addPhoto:"Pridať fotky",
    photoRuleTitle:"Iba fotky so zvieratami",
    photoRule:"Pridané budú iba fotky, na ktorých je zviera viditeľné priamo v tomto podniku. Fotky bez zvieraťa nebudú zverejnené.",
    animalVisible:"Zviera je jasne viditeľné",
    takenHere:"Tieto fotky boli urobené v tomto podniku",
    inside:"Vnútri",
    outside:"Vonku",
    terrace:"Terasa",
    other:"Iné",
    submit:"Odoslať fotky",
    pending:"Fotky boli odoslané na kontrolu",
    noPhotos:"Zatiaľ nie sú schválené fotky.",
    booking:"Skontrolovať dostupnosť na Booking",
    community:"Komunita",
    confirmed:"Pet-friendly potvrdené",
    unknown:"Pravidlá nie sú potvrdené",
    rejected:"Komunita uvádza, že miesto nie je pet-friendly",
    uploading:"Nahrávanie…",
    galleryError:"Fotky sa nepodarilo načítať.",
    voteError:"Hlas sa nepodarilo uložiť.",
    photoError:"Fotku sa nepodarilo nahrať.",
    camera:"Fotoaparát",
    chooseFiles:"Vybrať fotky",
    gallery:"Galéria",
    selected:"vybrané",
    maxPhotos:"Až 10 fotiek",
    removePhoto:"Odstrániť fotku",
    chooseFirst:"Vyberte aspoň jednu fotku",
    confirmRules:"Potvrďte obe pravidlá",
    uploadProgress:"Nahrávanie fotky",
    of:"z"
  },

  hu:{
    pf:"Pet-friendly?",
    yes:"Igen",
    no:"Nem",
    votes:"szavazat",
    petPhotos:"Állatos fotók",
    addPhoto:"Fotók hozzáadása",
    photoRuleTitle:"Csak állatos fotók",
    photoRule:"Csak olyan fotó kerülhet be, amelyen állat látható pontosan ezen a helyen. Állat nélküli fotó nem jelenik meg.",
    animalVisible:"Az állat jól látható",
    takenHere:"Ezek a fotók ezen a helyen készültek",
    inside:"Bent",
    outside:"Kint",
    terrace:"Terasz",
    other:"Egyéb",
    submit:"Fotók küldése",
    pending:"Fotók ellenőrzésre elküldve",
    noPhotos:"Még nincs jóváhagyott fotó.",
    booking:"Elérhetőség a Bookingon",
    community:"Közösség",
    confirmed:"Pet-friendly megerősítve",
    unknown:"Állatbarát szabály nem megerősített",
    rejected:"A közösség szerint nem pet-friendly",
    uploading:"Feltöltés…",
    galleryError:"A fotók nem tölthetők be.",
    voteError:"A szavazat nem menthető.",
    photoError:"A fotó nem tölthető fel.",
    camera:"Kamera",
    chooseFiles:"Fotók kiválasztása",
    gallery:"Galéria",
    selected:"kiválasztva",
    maxPhotos:"Legfeljebb 10 fotó",
    removePhoto:"Fotó eltávolítása",
    chooseFirst:"Válassz legalább egy fotót",
    confirmRules:"Erősítsd meg mindkét szabályt",
    uploadProgress:"Fotó feltöltése",
    of:"/"
  },

  ro:{
    pf:"Pet-friendly?",
    yes:"Da",
    no:"Nu",
    votes:"voturi",
    petPhotos:"Poze cu animale",
    addPhoto:"Adaugă poze",
    photoRuleTitle:"Doar poze cu animale",
    photoRule:"Vor fi adăugate doar poze în care se vede un animal în această locație exactă. Pozele fără animale nu vor fi publicate.",
    animalVisible:"Un animal este clar vizibil",
    takenHere:"Aceste poze au fost făcute în această locație",
    inside:"În interior",
    outside:"Afară",
    terrace:"Terasă",
    other:"Altele",
    submit:"Trimite pozele",
    pending:"Pozele au fost trimise pentru verificare",
    noPhotos:"Nu există încă poze aprobate.",
    booking:"Verifică disponibilitatea pe Booking",
    community:"Comunitate",
    confirmed:"Pet-friendly confirmat",
    unknown:"Politica nu este confirmată",
    rejected:"Comunitatea spune că nu este pet-friendly",
    uploading:"Se încarcă…",
    galleryError:"Pozele nu au putut fi încărcate.",
    voteError:"Votul nu a putut fi salvat.",
    photoError:"Poza nu a putut fi încărcată.",
    camera:"Cameră",
    chooseFiles:"Alege poze",
    gallery:"Galerie",
    selected:"selectate",
    maxPhotos:"Până la 10 poze",
    removePhoto:"Șterge poza",
    chooseFirst:"Alege cel puțin o poză",
    confirmRules:"Confirmă ambele reguli",
    uploadProgress:"Se încarcă poza",
    of:"din"
  },

  bg:{
    pf:"Pet-friendly?",
    yes:"Да",
    no:"Не",
    votes:"гласа",
    petPhotos:"Снимки с животни",
    addPhoto:"Добави снимки",
    photoRuleTitle:"Само снимки с животни",
    photoRule:"Ще се добавят само снимки, на които се вижда животно точно в това място. Снимки без животни няма да се публикуват.",
    animalVisible:"Животното се вижда ясно",
    takenHere:"Тези снимки са направени на това място",
    inside:"Вътре",
    outside:"Навън",
    terrace:"Тераса",
    other:"Друго",
    submit:"Изпрати снимките",
    pending:"Снимките са изпратени за проверка",
    noPhotos:"Все още няма одобрени снимки.",
    booking:"Провери наличност в Booking",
    community:"Общност",
    confirmed:"Pet-friendly потвърдено",
    unknown:"Правилата не са потвърдени",
    rejected:"Общността посочва, че мястото не е pet-friendly",
    uploading:"Качване…",
    galleryError:"Снимките не могат да бъдат заредени.",
    voteError:"Гласът не може да бъде записан.",
    photoError:"Снимката не може да бъде качена.",
    camera:"Камера",
    chooseFiles:"Избери снимки",
    gallery:"Галерия",
    selected:"избрани",
    maxPhotos:"До 10 снимки",
    removePhoto:"Премахни снимката",
    chooseFirst:"Изберете поне една снимка",
    confirmRules:"Потвърдете и двете правила",
    uploadProgress:"Качване на снимка",
    of:"от"
  },

  el:{
    pf:"Pet-friendly;",
    yes:"Ναι",
    no:"Όχι",
    votes:"ψήφοι",
    petPhotos:"Φωτογραφίες με ζώα",
    addPhoto:"Προσθήκη φωτογραφιών",
    photoRuleTitle:"Μόνο φωτογραφίες με ζώα",
    photoRule:"Προστίθενται μόνο φωτογραφίες όπου φαίνεται ζώο σε αυτό ακριβώς το μέρος. Φωτογραφίες χωρίς ζώο δεν δημοσιεύονται.",
    animalVisible:"Το ζώο φαίνεται καθαρά",
    takenHere:"Οι φωτογραφίες τραβήχτηκαν σε αυτό το μέρος",
    inside:"Μέσα",
    outside:"Έξω",
    terrace:"Βεράντα",
    other:"Άλλο",
    submit:"Υποβολή φωτογραφιών",
    pending:"Οι φωτογραφίες στάλθηκαν για έλεγχο",
    noPhotos:"Δεν υπάρχουν ακόμη εγκεκριμένες φωτογραφίες.",
    booking:"Έλεγχος διαθεσιμότητας στο Booking",
    community:"Κοινότητα",
    confirmed:"Pet-friendly επιβεβαιωμένο",
    unknown:"Η πολιτική δεν έχει επιβεβαιωθεί",
    rejected:"Η κοινότητα λέει ότι δεν είναι pet-friendly",
    uploading:"Μεταφόρτωση…",
    galleryError:"Δεν ήταν δυνατή η φόρτωση φωτογραφιών.",
    voteError:"Δεν ήταν δυνατή η αποθήκευση ψήφου.",
    photoError:"Δεν ήταν δυνατή η μεταφόρτωση φωτογραφίας.",
    camera:"Κάμερα",
    chooseFiles:"Επιλογή φωτογραφιών",
    gallery:"Συλλογή",
    selected:"επιλεγμένες",
    maxPhotos:"Έως 10 φωτογραφίες",
    removePhoto:"Αφαίρεση φωτογραφίας",
    chooseFirst:"Επιλέξτε τουλάχιστον μία φωτογραφία",
    confirmRules:"Επιβεβαιώστε και τους δύο κανόνες",
    uploadProgress:"Μεταφόρτωση φωτογραφίας",
    of:"από"
  },

  sv:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nej",
    votes:"röster",
    petPhotos:"Djurfoton",
    addPhoto:"Lägg till foton",
    photoRuleTitle:"Endast foton med djur",
    photoRule:"Endast foton där ett djur syns på exakt denna plats läggs till. Foton utan djur publiceras inte.",
    animalVisible:"Ett djur syns tydligt",
    takenHere:"Dessa foton togs på denna plats",
    inside:"Inne",
    outside:"Ute",
    terrace:"Terrass",
    other:"Annat",
    submit:"Skicka foton",
    pending:"Foton skickades för granskning",
    noPhotos:"Inga godkända djurfoton ännu.",
    booking:"Kontrollera tillgänglighet på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekräftat",
    unknown:"Djurpolicy ej bekräftad",
    rejected:"Communityn säger att platsen inte är pet-friendly",
    uploading:"Laddar upp…",
    galleryError:"Kunde inte ladda foton.",
    voteError:"Kunde inte spara rösten.",
    photoError:"Kunde inte ladda upp fotot.",
    camera:"Kamera",
    chooseFiles:"Välj foton",
    gallery:"Galleri",
    selected:"valda",
    maxPhotos:"Upp till 10 foton",
    removePhoto:"Ta bort foto",
    chooseFirst:"Välj minst ett foto",
    confirmRules:"Bekräfta båda reglerna",
    uploadProgress:"Laddar upp foto",
    of:"av"
  },

  da:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nej",
    votes:"stemmer",
    petPhotos:"Dyrefotos",
    addPhoto:"Tilføj fotos",
    photoRuleTitle:"Kun fotos med dyr",
    photoRule:"Kun fotos med et dyr på dette præcise sted bliver tilføjet. Fotos uden dyr bliver ikke offentliggjort.",
    animalVisible:"Et dyr er tydeligt synligt",
    takenHere:"Disse fotos blev taget på dette sted",
    inside:"Inde",
    outside:"Ude",
    terrace:"Terrasse",
    other:"Andet",
    submit:"Send fotos",
    pending:"Fotos sendt til gennemgang",
    noPhotos:"Ingen godkendte dyrefotos endnu.",
    booking:"Se tilgængelighed på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekræftet",
    unknown:"Dyrepolitik ikke bekræftet",
    rejected:"Community siger: ikke pet-friendly",
    uploading:"Uploader…",
    galleryError:"Kunne ikke indlæse fotos.",
    voteError:"Kunne ikke gemme stemmen.",
    photoError:"Kunne ikke uploade fotoet.",
    camera:"Kamera",
    chooseFiles:"Vælg fotos",
    gallery:"Galleri",
    selected:"valgt",
    maxPhotos:"Op til 10 fotos",
    removePhoto:"Fjern foto",
    chooseFirst:"Vælg mindst ét foto",
    confirmRules:"Bekræft begge regler",
    uploadProgress:"Uploader foto",
    of:"af"
  },

  no:{
    pf:"Pet-friendly?",
    yes:"Ja",
    no:"Nei",
    votes:"stemmer",
    petPhotos:"Dyrebilder",
    addPhoto:"Legg til bilder",
    photoRuleTitle:"Kun bilder med dyr",
    photoRule:"Bare bilder der et dyr er synlig på akkurat dette stedet blir lagt til. Bilder uten dyr publiseres ikke.",
    animalVisible:"Et dyr er tydelig synlig",
    takenHere:"Disse bildene ble tatt på dette stedet",
    inside:"Inne",
    outside:"Ute",
    terrace:"Terrasse",
    other:"Annet",
    submit:"Send bilder",
    pending:"Bildene er sendt til vurdering",
    noPhotos:"Ingen godkjente dyrebilder ennå.",
    booking:"Sjekk tilgjengelighet på Booking",
    community:"Community",
    confirmed:"Pet-friendly bekreftet",
    unknown:"Dyrepolicy ikke bekreftet",
    rejected:"Community sier at stedet ikke er pet-friendly",
    uploading:"Laster opp…",
    galleryError:"Kunne ikke laste bilder.",
    voteError:"Kunne ikke lagre stemmen.",
    photoError:"Kunne ikke laste opp bildet.",
    camera:"Kamera",
    chooseFiles:"Velg bilder",
    gallery:"Galleri",
    selected:"valgt",
    maxPhotos:"Opptil 10 bilder",
    removePhoto:"Fjern bilde",
    chooseFirst:"Velg minst ett bilde",
    confirmRules:"Bekreft begge reglene",
    uploadProgress:"Laster opp bilde",
    of:"av"
  },

  fi:{
    pf:"Pet-friendly?",
    yes:"Kyllä",
    no:"Ei",
    votes:"ääntä",
    petPhotos:"Eläinkuvat",
    addPhoto:"Lisää kuvia",
    photoRuleTitle:"Vain eläinkuvat",
    photoRule:"Vain kuvat, joissa eläin näkyy juuri tässä paikassa, lisätään. Kuvia ilman eläintä ei julkaista.",
    animalVisible:"Eläin näkyy selvästi",
    takenHere:"Nämä kuvat on otettu tässä paikassa",
    inside:"Sisällä",
    outside:"Ulkona",
    terrace:"Terassi",
    other:"Muu",
    submit:"Lähetä kuvat",
    pending:"Kuvat lähetettiin tarkistettavaksi",
    noPhotos:"Ei vielä hyväksyttyjä eläinkuvia.",
    booking:"Tarkista saatavuus Bookingissa",
    community:"Yhteisö",
    confirmed:"Pet-friendly vahvistettu",
    unknown:"Lemmikkikäytäntöä ei vahvistettu",
    rejected:"Yhteisön mukaan paikka ei ole pet-friendly",
    uploading:"Ladataan…",
    galleryError:"Kuvia ei voitu ladata.",
    voteError:"Ääntä ei voitu tallentaa.",
    photoError:"Kuvaa ei voitu ladata.",
    camera:"Kamera",
    chooseFiles:"Valitse kuvat",
    gallery:"Galleria",
    selected:"valittu",
    maxPhotos:"Enintään 10 kuvaa",
    removePhoto:"Poista kuva",
    chooseFirst:"Valitse vähintään yksi kuva",
    confirmRules:"Vahvista molemmat säännöt",
    uploadProgress:"Ladataan kuvaa",
    of:"/"
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
    takenHere:"Bu fotoğraflar bu mekânda çekildi",
    inside:"İçeride",
    outside:"Dışarıda",
    terrace:"Teras",
    other:"Diğer",
    submit:"Fotoğrafları gönder",
    pending:"Fotoğraflar incelemeye gönderildi",
    noPhotos:"Henüz onaylı hayvan fotoğrafı yok.",
    booking:"Booking’de müsaitliği kontrol et",
    community:"Topluluk",
    confirmed:"Pet-friendly doğrulandı",
    unknown:"Evcil hayvan politikası doğrulanmadı",
    rejected:"Topluluk buranın pet-friendly olmadığını söylüyor",
    uploading:"Yükleniyor…",
    galleryError:"Fotoğraflar yüklenemedi.",
    voteError:"Oy kaydedilemedi.",
    photoError:"Fotoğraf yüklenemedi.",
    camera:"Kamera",
    chooseFiles:"Fotoğraf seç",
    gallery:"Galeri",
    selected:"seçildi",
    maxPhotos:"En fazla 10 fotoğraf",
    removePhoto:"Fotoğrafı kaldır",
    chooseFirst:"En az bir fotoğraf seçin",
    confirmRules:"Her iki kuralı da onaylayın",
    uploadProgress:"Fotoğraf yükleniyor",
    of:"/"
  },

  ar:{
    pf:"هل المكان صديق للحيوانات؟",
    yes:"نعم",
    no:"لا",
    votes:"أصوات",
    petPhotos:"صور الحيوانات",
    addPhoto:"إضافة صور",
    photoRuleTitle:"صور الحيوانات فقط",
    photoRule:"تُضاف فقط الصور التي يظهر فيها حيوان في هذا المكان بالتحديد. الصور من دون حيوان لن تُنشر.",
    animalVisible:"الحيوان ظاهر بوضوح",
    takenHere:"التُقطت هذه الصور في هذا المكان",
    inside:"بالداخل",
    outside:"بالخارج",
    terrace:"التراس",
    other:"أخرى",
    submit:"إرسال الصور",
    pending:"أُرسلت الصور للمراجعة",
    noPhotos:"لا توجد صور حيوانات معتمدة بعد.",
    booking:"تحقق من التوفر على Booking",
    community:"المجتمع",
    confirmed:"تم تأكيد ملاءمة المكان للحيوانات",
    unknown:"سياسة الحيوانات غير مؤكدة",
    rejected:"المجتمع يقول إن المكان غير ملائم للحيوانات",
    uploading:"جارٍ الرفع…",
    galleryError:"تعذر تحميل الصور.",
    voteError:"تعذر حفظ التصويت.",
    photoError:"تعذر رفع الصورة.",
    camera:"الكاميرا",
    chooseFiles:"اختيار الصور",
    gallery:"المعرض",
    selected:"تم الاختيار",
    maxPhotos:"حتى 10 صور",
    removePhoto:"إزالة الصورة",
    chooseFirst:"اختر صورة واحدة على الأقل",
    confirmRules:"يرجى تأكيد القاعدتين",
    uploadProgress:"جارٍ رفع الصورة",
    of:"من"
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
    takenHere:"ये तस्वीरें इसी जगह पर ली गई हैं",
    inside:"अंदर",
    outside:"बाहर",
    terrace:"टेरेस",
    other:"अन्य",
    submit:"फोटो भेजें",
    pending:"फोटो समीक्षा के लिए भेजी गईं",
    noPhotos:"अभी कोई स्वीकृत फोटो नहीं है।",
    booking:"Booking पर उपलब्धता देखें",
    community:"कम्युनिटी",
    confirmed:"Pet-friendly की पुष्टि",
    unknown:"पेट पॉलिसी की पुष्टि नहीं",
    rejected:"कम्युनिटी के अनुसार यह pet-friendly नहीं है",
    uploading:"अपलोड हो रहा है…",
    galleryError:"फोटो लोड नहीं हो सकीं।",
    voteError:"वोट सेव नहीं हो सका।",
    photoError:"फोटो अपलोड नहीं हो सकी।",
    camera:"कैमरा",
    chooseFiles:"फोटो चुनें",
    gallery:"गैलरी",
    selected:"चुनी गईं",
    maxPhotos:"अधिकतम 10 फोटो",
    removePhoto:"फोटो हटाएँ",
    chooseFirst:"कम से कम एक फोटो चुनें",
    confirmRules:"दोनों नियमों की पुष्टि करें",
    uploadProgress:"फोटो अपलोड हो रही है",
    of:"में से"
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

/* =========================================================
   EDITORIAL CARD + PET PHOTOS STYLES
   Scoped to Pet-Friendly enhancements.
   Global header / navigation / side menu are untouched.
========================================================= */

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

    /* ---------- CARD ---------- */

    #cards .card{
      overflow:hidden;
      border:1px solid rgba(17,17,17,.12);
      border-radius:22px;
      background:#fff;
      box-shadow:
        0 16px 42px rgba(0,0,0,.07);
      transition:
        transform .22s ease,
        box-shadow .22s ease;
    }

    @media (hover:hover){

      #cards .card:hover{
        transform:translateY(-3px);
        box-shadow:
          0 22px 54px rgba(0,0,0,.11);
      }

    }

    #cards .card-body{
      padding:17px 18px 18px;
    }

    #cards .card-body h2{
      margin:8px 0 6px;
      font-family:Georgia,"Times New Roman",serif;
      font-weight:500;
      line-height:1.03;
      letter-spacing:-.025em;
    }

    #cards .address{
      margin-bottom:10px;
      color:#716c63;
      line-height:1.35;
    }

    #cards .pet-row{
      margin-top:7px;
    }

    #cards .pet{
      display:inline-flex;
      align-items:center;
      min-height:25px;
      padding:4px 9px;
      border-radius:999px;
      font-size:10px;
      font-weight:900;
      letter-spacing:.015em;
    }

    /* ---------- COMPACT COMMUNITY LINE ---------- */

    .pd-vote-row{
      width:100%;
      margin-top:11px;
      padding:8px 0 7px;
      border-top:1px solid rgba(17,17,17,.11);
      border-bottom:1px solid rgba(17,17,17,.11);
      background:transparent;
      color:#111;
      display:flex;
      align-items:center;
      gap:5px;
      min-width:0;
      font-size:11px;
      font-weight:800;
    }

    .pd-vote-row strong{
      margin:0 auto 0 0;
      min-width:0;
      font-family:Arial,Helvetica,sans-serif;
      font-size:11px;
      font-weight:900;
      white-space:nowrap;
    }

    .pd-vote-btn{
      appearance:none;
      -webkit-appearance:none;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:4px!important;
      min-width:0!important;
      min-height:27px!important;
      height:27px!important;
      padding:0 8px!important;
      border:1px solid rgba(17,17,17,.18)!important;
      border-radius:999px!important;
      background:transparent!important;
      color:#111!important;
      box-shadow:none!important;
      font-size:10px!important;
      line-height:1!important;
      font-weight:900!important;
      white-space:nowrap;
    }

    .pd-vote-btn.yes{
      border-color:rgba(55,142,20,.36)!important;
      background:rgba(101,229,31,.09)!important;
      color:#245e10!important;
    }

    .pd-vote-btn.no{
      border-color:rgba(153,57,57,.24)!important;
      background:rgba(160,50,50,.035)!important;
      color:#7e3434!important;
    }

    .pd-vote-number{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-width:15px;
      height:15px;
      padding:0 4px;
      border-radius:999px;
      background:rgba(0,0,0,.07);
      font-size:8px;
      line-height:1;
      font-weight:950;
    }

    .pd-vote-btn.yes .pd-vote-number{
      background:rgba(75,170,30,.15);
    }

    .pd-vote-btn.no .pd-vote-number{
      background:rgba(160,50,50,.10);
    }

    .pd-vote-count{
      flex:0 0 auto;
      margin-left:1px;
      color:#89837a;
      font-size:8px;
      font-weight:800;
      white-space:nowrap;
    }

    .pd-community-state{
      margin-top:6px;
      padding:0;
      color:#716b62;
      font-size:9px;
      line-height:1.25;
      font-weight:800;
    }

    .pd-community-state.good{
      color:#317516;
    }

    .pd-community-state.bad{
      color:#963a3a;
    }

    /* ---------- META ---------- */

    #cards .meta{
      margin-top:9px;
      color:#625d55;
      font-size:10px;
      line-height:1.4;
      font-weight:750;
    }

    /* ---------- ACTIONS ---------- */

    #cards .actions{
      display:flex;
      align-items:center;
      gap:6px;
      flex-wrap:wrap;
      margin-top:11px;
    }

    #cards .actions button{
      min-height:32px;
      padding:0 10px;
      border-radius:999px;
      font-size:10px;
      font-weight:850;
    }

    .pd-pet-photo-btn{
      border-color:rgba(72,174,25,.5)!important;
    }

    #cards .actions .booking{
      background:#111!important;
      border-color:#111!important;
      color:#fff!important;
      font-weight:950!important;
    }

    /* ---------- BRANDED PHOTO FALLBACK ---------- */

    .pd-branded-fallback{
      position:absolute;
      inset:0;
      display:grid;
      place-items:center;
      background:
        radial-gradient(
          circle at 28% 22%,
          rgba(101,229,31,.26),
          transparent 31%
        ),
        radial-gradient(
          circle at 78% 78%,
          rgba(201,151,41,.16),
          transparent 34%
        ),
        linear-gradient(
          145deg,
          #101010,
          #292929
        );
      color:#fff;
      text-align:center;
      padding:20px;
      font-family:Georgia,serif;
    }

    .pd-branded-fallback span{
      display:block;
      margin-top:7px;
      color:#efd47c;
      font:900 11px/1.2 Arial,sans-serif;
      letter-spacing:1.5px;
    }

    /* ---------- PET PHOTOS MODAL ---------- */

    .pd-modal-backdrop{
      position:fixed;
      inset:0;
      z-index:100000;
      display:none;
      align-items:center;
      justify-content:center;
      padding:
        max(14px,env(safe-area-inset-top))
        14px
        max(14px,env(safe-area-inset-bottom));
      background:rgba(0,0,0,.74);
      backdrop-filter:blur(5px);
      -webkit-backdrop-filter:blur(5px);
    }

    .pd-modal-backdrop.open{
      display:flex;
    }

    .pd-modal{
      width:min(700px,100%);
      max-height:min(90vh,850px);
      overflow:auto;
      overscroll-behavior:contain;
      background:#f6f1e7;
      color:#111;
      border-radius:28px;
      padding:22px;
      box-shadow:
        0 30px 90px rgba(0,0,0,.42);
      -webkit-overflow-scrolling:touch;
    }

    .pd-modal-head{
      display:flex;
      align-items:flex-start;
      gap:14px;
    }

    .pd-modal-head h2{
      flex:1;
      margin:0;
      font:500 clamp(30px,7vw,50px)/.96 Georgia,serif;
      letter-spacing:-.035em;
    }

    .pd-modal-close{
      flex:0 0 48px;
      width:48px;
      height:48px;
      border:0;
      border-radius:50%;
      background:#111;
      color:#fff;
      font-size:27px;
      line-height:1;
    }

    /* approved community gallery */

    .pd-gallery{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:8px;
      margin-top:18px;
    }

    .pd-gallery-item{
      position:relative;
      overflow:hidden;
      border-radius:14px;
      background:#ddd;
      aspect-ratio:1/1;
    }

    .pd-gallery img{
      width:100%;
      height:100%;
      display:block;
      object-fit:cover;
    }

    .pd-photo-empty{
      padding:18px 0 4px;
      color:#716c64;
      font-size:13px;
    }

    /* uploader */

    .pd-upload-box{
      margin-top:20px;
      padding-top:18px;
      border-top:1px solid #cfc7bb;
    }

    .pd-upload-box h3{
      margin:0 0 7px;
      font:600 22px/1.05 Georgia,serif;
    }

    .pd-upload-box > p{
      margin:0;
      color:#69645c;
      font-size:13px;
      line-height:1.48;
    }

    .pd-picker{
      margin:17px 0 13px;
    }

    .pd-picker-actions{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:8px;
    }

    .pd-picker-action{
      min-width:0;
      min-height:72px;
      padding:9px 6px;
      border:1px solid #c8c0b3;
      border-radius:17px;
      background:#fff;
      color:#111;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:6px;
      text-align:center;
      font-size:10px;
      line-height:1.1;
      font-weight:900;
    }

    .pd-picker-action:active{
      transform:scale(.98);
    }

    .pd-picker-icon{
      display:block;
      font-size:23px;
      line-height:1;
    }

    .pd-native-file{
      position:absolute!important;
      width:1px!important;
      height:1px!important;
      overflow:hidden!important;
      clip:rect(0 0 0 0)!important;
      clip-path:inset(50%)!important;
      white-space:nowrap!important;
    }

    .pd-picker-meta{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      margin-top:9px;
      color:#777168;
      font-size:10px;
      line-height:1.25;
      font-weight:850;
    }

    .pd-selected-count{
      color:#111;
    }

    /* selected photos preview */

    .pd-preview{
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:7px;
      margin-top:11px;
    }

    .pd-preview:empty{
      display:none;
    }

    .pd-preview-item{
      position:relative;
      overflow:hidden;
      aspect-ratio:1/1;
      border-radius:13px;
      background:#ddd;
    }

    .pd-preview-item img{
      width:100%;
      height:100%;
      display:block;
      object-fit:cover;
    }

    .pd-preview-remove{
      position:absolute;
      top:5px;
      right:5px;
      width:25px;
      height:25px;
      padding:0;
      border:1px solid rgba(255,255,255,.65);
      border-radius:50%;
      background:rgba(0,0,0,.76);
      color:#fff;
      display:grid;
      place-items:center;
      font-size:16px;
      line-height:1;
      font-weight:800;
      box-shadow:0 2px 9px rgba(0,0,0,.22);
    }

    .pd-area-label{
      display:block;
      margin:14px 0 6px;
      color:#37332e;
      font-size:11px;
      font-weight:900;
    }

    .pd-area{
      width:100%;
      min-height:48px;
      margin:0 0 13px;
      padding:0 12px;
      border:1px solid #bdb5a8;
      border-radius:14px;
      background:#fff;
      color:#111;
    }

    .pd-check{
      display:flex;
      align-items:flex-start;
      gap:10px;
      margin:10px 0;
      color:#24211d;
      font-size:12px;
      line-height:1.35;
      font-weight:800;
    }

    .pd-check input{
      flex:0 0 auto;
      width:21px;
      height:21px;
      margin:0;
      accent-color:#65e51f;
    }

    .pd-submit{
      width:100%;
      min-height:52px;
      margin-top:8px;
      border:0;
      border-radius:16px;
      background:#65e51f;
      color:#071102;
      font-size:15px;
      font-weight:950;
    }

    .pd-submit:disabled{
      opacity:.45;
      cursor:default;
    }

    .pd-photo-note{
      min-height:16px;
      margin-top:10px;
      color:#504b44;
      font-size:11px;
      line-height:1.4;
      font-weight:850;
    }

    /* ---------- MOBILE ---------- */

    @media(max-width:640px){

      .pd-modal-backdrop{
        align-items:flex-end;
        padding:
          8px
          8px
          max(8px,env(safe-area-inset-bottom));
      }

      .pd-modal{
        width:100%;
        max-height:92dvh;
        border-radius:25px 25px 18px 18px;
        padding:18px 16px 20px;
      }

      .pd-modal-head h2{
        font-size:32px;
      }

      .pd-modal-close{
        flex-basis:44px;
        width:44px;
        height:44px;
      }

      .pd-gallery{
        grid-template-columns:repeat(3,minmax(0,1fr));
      }

      .pd-picker-action{
        min-height:68px;
      }

      .pd-preview{
        grid-template-columns:repeat(3,minmax(0,1fr));
      }

      #cards .card-body{
        padding:15px 15px 16px;
      }

      .pd-vote-row{
        gap:4px;
      }

      .pd-vote-row strong{
        font-size:10px;
      }

      .pd-vote-btn{
        height:26px!important;
        min-height:26px!important;
        padding:0 7px!important;
        font-size:9px!important;
      }

      .pd-vote-count{
        display:none;
      }

    }

    @media(max-width:390px){

      .pd-picker-action{
        min-height:64px;
        font-size:9px;
      }

      .pd-picker-icon{
        font-size:21px;
      }

      .pd-vote-row strong{
        max-width:86px;
        overflow:hidden;
        text-overflow:ellipsis;
      }

    }

  `;

  document.head.appendChild(
    style
  );

}/* =========================================================
   PET PHOTOS MODAL + MOBILE PICKER
========================================================= */

function pdInstallPhotoModal(){

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

        <div class="pd-picker">

          <div class="pd-picker-actions">

            <button
              class="pd-picker-action"
              id="pdCameraButton"
              type="button"
            >
              <span
                class="pd-picker-icon"
                aria-hidden="true"
              >
                📷
              </span>

              <span id="pdCameraText"></span>
            </button>

            <button
              class="pd-picker-action"
              id="pdChooseButton"
              type="button"
            >
              <span
                class="pd-picker-icon"
                aria-hidden="true"
              >
                ＋
              </span>

              <span id="pdChooseText"></span>
            </button>

            <button
              class="pd-picker-action"
              id="pdGalleryButton"
              type="button"
            >
              <span
                class="pd-picker-icon"
                aria-hidden="true"
              >
                ▦
              </span>

              <span id="pdGalleryText"></span>
            </button>

          </div>

          <input
            class="pd-native-file"
            id="pdPhotoCamera"
            type="file"
            accept="image/*"
            capture="environment"
          >

          <input
            class="pd-native-file"
            id="pdPhotoFiles"
            type="file"
            accept="image/*"
            multiple
          >

          <input
            class="pd-native-file"
            id="pdPhotoGalleryInput"
            type="file"
            accept="image/*"
            multiple
          >

          <div class="pd-picker-meta">

            <span
              id="pdSelectedCount"
              class="pd-selected-count"
            ></span>

            <span id="pdMaxPhotosText"></span>

          </div>

          <div
            id="pdPhotoPreview"
            class="pd-preview"
          ></div>

        </div>

        <label
          class="pd-area-label"
          id="pdPhotoAreaLabel"
          for="pdPhotoArea"
        ></label>

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
          role="status"
          aria-live="polite"
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

  const camera =
    document.getElementById(
      "pdPhotoCamera"
    );

  const files =
    document.getElementById(
      "pdPhotoFiles"
    );

  const gallery =
    document.getElementById(
      "pdPhotoGalleryInput"
    );

  document
    .getElementById(
      "pdCameraButton"
    )
    .onclick =
      ()=>{

        camera.value = "";

        camera.click();

      };

  document
    .getElementById(
      "pdChooseButton"
    )
    .onclick =
      ()=>{

        files.value = "";

        files.click();

      };

  /*
     Browsers do not expose an embedded system photo gallery
     to websites.

     "Gallery" therefore opens the browser / OS image picker.
     On supported mobile devices this presents the native
     gallery / photo-library experience.

     No false promise is made that PETS & DOGUE can read or
     display the user's complete device gallery itself.
  */

  document
    .getElementById(
      "pdGalleryButton"
    )
    .onclick =
      ()=>{

        gallery.value = "";

        gallery.click();

      };

  camera.onchange =
    ()=>pdAddSelectedPhotos(
      camera.files
    );

  files.onchange =
    ()=>pdAddSelectedPhotos(
      files.files
    );

  gallery.onchange =
    ()=>pdAddSelectedPhotos(
      gallery.files
    );

  document
    .getElementById(
      "pdPhotoSubmit"
    )
    .onclick =
      pdSubmitPetPhotos;

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
    "pdCameraText"
  ).textContent =
    pdT(
      "camera"
    );

  q(
    "pdChooseText"
  ).textContent =
    pdT(
      "chooseFiles"
    );

  q(
    "pdGalleryText"
  ).textContent =
    pdT(
      "gallery"
    );

  q(
    "pdMaxPhotosText"
  ).textContent =
    pdT(
      "maxPhotos"
    );

  q(
    "pdPhotoAreaLabel"
  ).textContent =
    pdT(
      "addPhoto"
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

  pdRenderSelectedPhotos();

}


function pdPhotoSignature(
  file
){

  return [
    file.name,
    file.size,
    file.lastModified,
    file.type
  ].join(
    "::"
  );

}


function pdAddSelectedPhotos(
  fileList
){

  const incoming =
    Array.from(
      fileList ||
      []
    )
    .filter(
      file=>
        String(
          file.type ||
          ""
        )
        .toLowerCase()
        .startsWith(
          "image/"
        )
    );

  if(
    !incoming.length
  ){
    return;
  }

  const known =
    new Set(
      pdSelectedPhotos.map(
        item=>
          pdPhotoSignature(
            item.file
          )
      )
    );

  for(
    const file of incoming
  ){

    if(
      pdSelectedPhotos.length >=
      PD_MAX_SELECTED_PHOTOS
    ){
      break;
    }

    const signature =
      pdPhotoSignature(
        file
      );

    if(
      known.has(
        signature
      )
    ){
      continue;
    }

    known.add(
      signature
    );

    pdSelectedPhotos.push({

      id:
        "pd-photo-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .slice(2),

      file,

      preview:
        URL.createObjectURL(
          file
        )

    });

  }

  pdRenderSelectedPhotos();

}


function pdRemoveSelectedPhoto(
  id
){

  const index =
    pdSelectedPhotos.findIndex(
      item=>
        item.id === id
    );

  if(
    index === -1
  ){
    return;
  }

  const [
    removed
  ] =
    pdSelectedPhotos.splice(
      index,
      1
    );

  if(
    removed?.preview
  ){

    try{

      URL.revokeObjectURL(
        removed.preview
      );

    }catch{}

  }

  pdRenderSelectedPhotos();

}


function pdClearSelectedPhotos(){

  pdSelectedPhotos.forEach(
    item=>{

      if(
        item.preview
      ){

        try{

          URL.revokeObjectURL(
            item.preview
          );

        }catch{}

      }

    }
  );

  pdSelectedPhotos = [];

  [
    "pdPhotoCamera",
    "pdPhotoFiles",
    "pdPhotoGalleryInput"
  ]
  .forEach(
    id=>{

      const input =
        document.getElementById(
          id
        );

      if(input){

        input.value = "";

      }

    }
  );

  pdRenderSelectedPhotos();

}


function pdRenderSelectedPhotos(){

  const preview =
    document.getElementById(
      "pdPhotoPreview"
    );

  const count =
    document.getElementById(
      "pdSelectedCount"
    );

  if(
    !preview ||
    !count
  ){
    return;
  }

  count.textContent =
    `${pdSelectedPhotos.length}/${PD_MAX_SELECTED_PHOTOS} ${pdT("selected")}`;

  preview.innerHTML =
    pdSelectedPhotos
      .map(
        item=>`

          <div
            class="pd-preview-item"
            data-preview-id="${esc(
              item.id
            )}"
          >

            <img
              src="${esc(
                item.preview
              )}"
              alt=""
            >

            <button
              class="pd-preview-remove"
              data-remove-preview="${esc(
                item.id
              )}"
              type="button"
              aria-label="${esc(
                pdT(
                  "removePhoto"
                )
              )}"
            >
              ×
            </button>

          </div>

        `
      )
      .join("");

  preview
    .querySelectorAll(
      "[data-remove-preview]"
    )
    .forEach(
      button=>{

        button.onclick =
          event=>{

            event.preventDefault();

            event.stopPropagation();

            pdRemoveSelectedPhoto(
              button.dataset
                .removePreview
            );

          };

      }
    );

}


async function pdLoadApprovedPetPhotos(
  place
){

  const gallery =
    document.getElementById(
      "pdPetPhotoGallery"
    );

  const empty =
    document.getElementById(
      "pdPetPhotoEmpty"
    );

  if(
    !gallery ||
    !empty
  ){
    return;
  }

  gallery.innerHTML = "";
  empty.textContent = "";

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

    gallery.innerHTML =
      photos
        .map(
          item=>{

            const image =
              item.imageUrl ||
              item.image_url ||
              "";

            if(!image){
              return "";
            }

            return `

              <div class="pd-gallery-item">

                <img
                  src="${esc(
                    image
                  )}"
                  alt="${esc(
                    place.name
                  )}"
                  loading="lazy"
                >

              </div>

            `;

          }
        )
        .join("");

    empty.textContent =
      photos.length
        ? ""
        : pdT(
            "noPhotos"
          );

  }catch(error){

    console.warn(
      "PETS & DOGUE pet photos:",
      error
    );

    empty.textContent =
      pdT(
        "galleryError"
      );

  }

}


async function pdOpenPetPhotos(
  place
){

  pdPetPhotoPlace =
    place;

  pdInstallPhotoModal();

  pdUpdatePhotoModalText();

  pdClearSelectedPhotos();

  const title =
    document.getElementById(
      "pdPetPhotosTitle"
    );

  const note =
    document.getElementById(
      "pdPhotoNote"
    );

  const animal =
    document.getElementById(
      "pdAnimalVisible"
    );

  const here =
    document.getElementById(
      "pdTakenHere"
    );

  const area =
    document.getElementById(
      "pdPhotoArea"
    );

  title.textContent =
    place.name +
    " · " +
    pdT(
      "petPhotos"
    );

  note.textContent = "";

  animal.checked = false;
  here.checked = false;

  if(area){

    area.value =
      "inside";

  }

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

  await pdLoadApprovedPetPhotos(
    place
  );

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

  pdClearSelectedPhotos();

  pdPetPhotoPlace =
    null;

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

  let bitmap;

  try{

    bitmap =
      await createImageBitmap(
        file
      );

  }catch{

    return await new Promise(
      (
        resolve,
        reject
      )=>{

        const reader =
          new FileReader();

        reader.onload =
          ()=>resolve(
            reader.result
          );

        reader.onerror =
          ()=>reject(
            new Error(
              pdT(
                "photoError"
              )
            )
          );

        reader.readAsDataURL(
          file
        );

      }
    );

  }

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

  if(!context){

    if(
      bitmap.close
    ){
      bitmap.close();
    }

    throw new Error(
      pdT(
        "photoError"
      )
    );

  }

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


async function pdUploadSinglePetPhoto(
  place,
  file,
  area
){

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

            area,

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

  return data;

}


async function pdSubmitPetPhotos(){

  const place =
    pdPetPhotoPlace;

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
    !note ||
    !button
  ){
    return;
  }

  if(
    !pdSelectedPhotos.length
  ){

    note.textContent =
      pdT(
        "chooseFirst"
      );

    return;

  }

  if(
    !animal ||
    !here
  ){

    note.textContent =
      pdT(
        "confirmRules"
      );

    return;

  }

  const queue =
    pdSelectedPhotos.slice(
      0,
      PD_MAX_SELECTED_PHOTOS
    );

  const area =
    document
      .getElementById(
        "pdPhotoArea"
      )
      ?.value ||
    "inside";

  button.disabled =
    true;

  try{

    for(
      let index = 0;
      index < queue.length;
      index += 1
    ){

      note.textContent =
        `${pdT("uploadProgress")} ${index + 1} ${pdT("of")} ${queue.length}…`;

      await pdUploadSinglePetPhoto(
        place,
        queue[index].file,
        area
      );

    }

    note.textContent =
      pdT(
        "pending"
      );

    pdClearSelectedPhotos();

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

};/* =========================================================
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

}


/* =========================================================
   CARD RENDER
   Compact editorial layout.
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

  const countElement =
    document.getElementById(
      "count"
    );

  if(countElement){

    countElement.textContent =
      `${t("found")}: ${list.length} ${t("places")}`;

  }

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

    const more =
      document.getElementById(
        "more"
      );

    if(more){

      more.hidden =
        true;

    }

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

          if(
            typeof place.openNow ===
            "boolean"
          ){

            meta.push(
              place.openNow
                ? "Open"
                : "Closed"
            );

          }else if(
            typeof place.isOpen ===
            "boolean"
          ){

            meta.push(
              place.isOpen
                ? "Open"
                : "Closed"
            );

          }

          const source =
            sourceLabel(
              place
            );

          if(source){

            meta.push(
              source
            );

          }

          const yesCount =
            Number(
              vote.yes ||
              0
            );

          const noCount =
            Number(
              vote.no ||
              0
            );

          let communityText = "";

          if(
            vote.communityPetFriendly
          ){

            communityText =
              pdT(
                "confirmed"
              );

          }else if(
            vote.total
          ){

            communityText =
              `${pdT("community")}: ✓ ${yesCount} · ✕ ${noCount}`;

          }

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
                    aria-label="${esc(
                      pdT(
                        "yes"
                      )
                    )}"
                  >
                    <span aria-hidden="true">
                      ✓
                    </span>

                    <span>
                      ${esc(
                        pdT(
                          "yes"
                        )
                      )}
                    </span>

                    ${
                      yesCount
                        ? `

                          <span class="pd-vote-number">
                            ${yesCount}
                          </span>

                        `
                        : ""
                    }

                  </button>

                  <button
                    class="pd-vote-btn no"
                    data-vote-no="${esc(
                      identity
                    )}"
                    type="button"
                    aria-label="${esc(
                      pdT(
                        "no"
                      )
                    )}"
                  >
                    <span aria-hidden="true">
                      ✕
                    </span>

                    <span>
                      ${esc(
                        pdT(
                          "no"
                        )
                      )}
                    </span>

                    ${
                      noCount
                        ? `

                          <span class="pd-vote-number">
                            ${noCount}
                          </span>

                        `
                        : ""
                    }

                  </button>

                  ${
                    vote.total
                      ? `

                        <span class="pd-vote-count">
                          ${Number(
                            vote.total
                          )}
                        </span>

                      `
                      : ""
                  }

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

                ${
                  meta.length
                    ? `

                      <div class="meta">
                        ${esc(
                          meta.join(
                            " · "
                          )
                        )}
                      </div>

                    `
                    : ""
                }

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

  const more =
    document.getElementById(
      "more"
    );

  if(more){

    more.hidden =
      visible.length >=
      list.length;

  }

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

  if(
    typeof pdOriginalOpenDetail ===
    "function"
  ){

    pdOriginalOpenDetail(
      place
    );

  }

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

  const yesCount =
    Number(
      summary.yes ||
      0
    );

  const noCount =
    Number(
      summary.no ||
      0
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
      <span aria-hidden="true">
        ✓
      </span>

      <span>
        ${esc(
          pdT(
            "yes"
          )
        )}
      </span>

      ${
        yesCount
          ? `

            <span class="pd-vote-number">
              ${yesCount}
            </span>

          `
          : ""
      }

    </button>

    <button
      class="pd-vote-btn no"
      type="button"
    >
      <span aria-hidden="true">
        ✕
      </span>

      <span>
        ${esc(
          pdT(
            "no"
          )
        )}
      </span>

      ${
        noCount
          ? `

            <span class="pd-vote-number">
              ${noCount}
            </span>

          `
          : ""
      }

    </button>

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

};/* =========================================================
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

    /*
       Keep the "All" discovery broad enough to surface useful
       venue types, while OSM dog tags still give stronger
       pet-policy evidence when available.
    */

    lines = [

      `nwr["amenity"="cafe"]${dog}${full};`,

      `nwr["amenity"="restaurant"]${dog}${full};`,

      `nwr["amenity"="pub"]${dog}${full};`,

      `nwr["amenity"="bar"]${dog}${full};`,

      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment)$"]${dog}${full};`,

      `nwr["leisure"="dog_park"]${full};`,

      `nwr["natural"="beach"]${dog}${full};`,

      `nwr["amenity"="cafe"]${broad};`,

      `nwr["amenity"="restaurant"]${broad};`,

      `nwr["amenity"="pub"]${broad};`,

      `nwr["amenity"="bar"]${broad};`,

      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment)$"]${broad};`,

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
     Geoapify and OSM start together.

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
