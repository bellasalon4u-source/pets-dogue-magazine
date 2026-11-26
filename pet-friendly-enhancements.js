"use strict";

/* PD_APPROVED_CARD_LAYOUT_REVISION_2026_11 — three-state photo cards */

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
let pdSearchPending = false;
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
    rejected:"Pets not allowed",
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
    rejected:"Тварини заборонені",
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
    rejected:"С животными нельзя",
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
    rejected:"Animaux interdits",
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
    rejected:"Haustiere nicht erlaubt",
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
    rejected:"No se permiten mascotas",
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
    rejected:"Animali non ammessi",
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
    rejected:"Animais não permitidos",
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
    rejected:"Huisdieren niet toegestaan",
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
    rejected:"Zwierzęta niedozwolone",
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
    rejected:"Zvířata nejsou povolena",
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
    rejected:"Zvieratá nie sú povolené",
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
    rejected:"Állatok nem engedélyezettek",
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
    rejected:"Animalele nu sunt permise",
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
    rejected:"Животни не се допускат",
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
    rejected:"Δεν επιτρέπονται κατοικίδια",
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
    rejected:"Husdjur är inte tillåtna",
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
    rejected:"Kæledyr ikke tilladt",
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
    rejected:"Kjæledyr ikke tillatt",
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
    rejected:"Lemmikit eivät ole sallittuja",
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
    rejected:"Evcil hayvanlara izin verilmiyor",
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
    rejected:"الحيوانات الأليفة غير مسموح بها",
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
    rejected:"पालतू जानवरों की अनुमति नहीं है",
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
const PD_EVENT_ADD_LABELS = {
  en:"＋ Add event",
  uk:"＋ Додати подію",
  ru:"＋ Добавить событие",
  fr:"＋ Ajouter un événement",
  de:"＋ Veranstaltung hinzufügen",
  es:"＋ Añadir evento",
  it:"＋ Aggiungi evento",
  pt:"＋ Adicionar evento",
  nl:"＋ Evenement toevoegen",
  pl:"＋ Dodaj wydarzenie",
  cs:"＋ Přidat událost",
  sk:"＋ Pridať udalosť",
  hu:"＋ Esemény hozzáadása",
  ro:"＋ Adaugă un eveniment",
  bg:"＋ Добави събитие",
  el:"＋ Προσθήκη εκδήλωσης",
  sv:"＋ Lägg till evenemang",
  da:"＋ Tilføj begivenhed",
  no:"＋ Legg til arrangement",
  fi:"＋ Lisää tapahtuma",
  tr:"＋ Etkinlik ekle",
  ar:"＋ إضافة فعالية",
  hi:"＋ कार्यक्रम जोड़ें"
};
const PD_ADD_PLACE_LABELS = {
  en:"＋ Add place",uk:"＋ Додати місце",ru:"＋ Добавить место",fr:"＋ Ajouter un lieu",de:"＋ Ort hinzufügen",es:"＋ Añadir lugar",it:"＋ Aggiungi luogo",pt:"＋ Adicionar lugar",nl:"＋ Plaats toevoegen",pl:"＋ Dodaj miejsce",cs:"＋ Přidat místo",sk:"＋ Pridať miesto",hu:"＋ Hely hozzáadása",ro:"＋ Adaugă un loc",bg:"＋ Добави място",el:"＋ Προσθήκη μέρους",sv:"＋ Lägg till plats",da:"＋ Tilføj sted",no:"＋ Legg til sted",fi:"＋ Lisää paikka",tr:"＋ Yer ekle",ar:"＋ إضافة مكان",hi:"＋ जगह जोड़ें"
};
const PD_MAP_UX = {
  en:{all:"All",food:"Food & drinks",beauty:"Beauty & care",outdoors:"Stay & outdoors",pet:"Pet services",community:"Events & saved",title:"Suggest a place",name:"Place name",category:"Category",address:"Address or location",policy:"Official pet-policy link (optional)",pending:"A suggestion is not a confirmed pet-friendly place.",localOnly:"This is saved as a draft on this device only. It has not been sent for review or published.",save:"Save draft",cancel:"Cancel",required:"Enter a place name and address.",saved:"Draft saved on this device.",done:"Done",back:"Back to the map"},
  uk:{all:"Усі",food:"Їжа та напої",beauty:"Краса й догляд",outdoors:"Проживання й прогулянки",pet:"Послуги для тварин",community:"Події та збережене",title:"Запропонувати місце",name:"Назва місця",category:"Категорія",address:"Адреса або місце",policy:"Посилання на офіційні правила (необов’язково)",pending:"Пропозиція не підтверджує, що місце дружнє до тварин.",localOnly:"Чернетку збережено лише на цьому пристрої. Її не надіслано на перевірку й не опубліковано.",save:"Зберегти чернетку",cancel:"Скасувати",required:"Введіть назву й адресу місця.",saved:"Чернетку збережено на цьому пристрої.",done:"Готово",back:"Назад до карти"},
  ru:{all:"Все",food:"Еда и напитки",beauty:"Красота и уход",outdoors:"Отели и прогулки",pet:"Услуги для животных",community:"События и сохранённое",title:"Предложить место",name:"Название места",category:"Категория",address:"Адрес или место",policy:"Ссылка на официальные правила (необязательно)",pending:"Предложение не означает, что место разрешает животных.",localOnly:"Черновик сохранён только на этом устройстве. Он не отправлен на проверку и не опубликован.",save:"Сохранить черновик",cancel:"Отмена",required:"Укажите название и адрес места.",saved:"Черновик сохранён на этом устройстве.",done:"Готово",back:"Назад к карте"},
  fr:{all:"Tout",food:"Boissons et restauration",beauty:"Beauté et soins",outdoors:"Hébergement et plein air",pet:"Services pour animaux",community:"Événements et favoris",title:"Suggérer un lieu",name:"Nom du lieu",category:"Catégorie",address:"Adresse ou lieu",policy:"Lien vers la politique officielle (facultatif)",pending:"Une suggestion ne confirme pas l’accueil des animaux.",localOnly:"Brouillon enregistré uniquement sur cet appareil. Il n’a pas été envoyé ni publié.",save:"Enregistrer le brouillon",cancel:"Annuler",required:"Saisissez le nom et l’adresse.",saved:"Brouillon enregistré sur cet appareil.",done:"Terminé",back:"Retour à la carte"},
  de:{all:"Alle",food:"Essen & Trinken",beauty:"Schönheit & Pflege",outdoors:"Unterkünfte & draußen",pet:"Haustierservices",community:"Events & gespeichert",title:"Ort vorschlagen",name:"Name des Ortes",category:"Kategorie",address:"Adresse oder Ort",policy:"Link zu offiziellen Haustierregeln (optional)",pending:"Ein Vorschlag bestätigt keine Haustierfreundlichkeit.",localOnly:"Entwurf nur auf diesem Gerät gespeichert. Nicht zur Prüfung gesendet oder veröffentlicht.",save:"Entwurf speichern",cancel:"Abbrechen",required:"Name und Adresse eingeben.",saved:"Entwurf auf diesem Gerät gespeichert.",done:"Fertig",back:"Zurück zur Karte"},
  es:{all:"Todo",food:"Comida y bebida",beauty:"Belleza y cuidado",outdoors:"Alojamiento y aire libre",pet:"Servicios para mascotas",community:"Eventos y guardados",title:"Sugerir un lugar",name:"Nombre del lugar",category:"Categoría",address:"Dirección o ubicación",policy:"Enlace a la política oficial (opcional)",pending:"La sugerencia no confirma que se admitan mascotas.",localOnly:"Borrador guardado solo en este dispositivo. No se ha enviado ni publicado.",save:"Guardar borrador",cancel:"Cancelar",required:"Escribe el nombre y la dirección.",saved:"Borrador guardado en este dispositivo.",done:"Listo",back:"Volver al mapa"},
  it:{all:"Tutti",food:"Cibo e bevande",beauty:"Bellezza e cura",outdoors:"Soggiorni e attività all’aperto",pet:"Servizi per animali",community:"Eventi e salvati",title:"Suggerisci un luogo",name:"Nome del luogo",category:"Categoria",address:"Indirizzo o luogo",policy:"Link alle regole ufficiali (facoltativo)",pending:"Il suggerimento non conferma l’accesso agli animali.",localOnly:"Bozza salvata solo su questo dispositivo. Non è stata inviata né pubblicata.",save:"Salva bozza",cancel:"Annulla",required:"Inserisci nome e indirizzo.",saved:"Bozza salvata su questo dispositivo.",done:"Fatto",back:"Torna alla mappa"},
  pt:{all:"Todos",food:"Comida e bebidas",beauty:"Beleza e cuidados",outdoors:"Estadias e ar livre",pet:"Serviços para animais",community:"Eventos e guardados",title:"Sugerir um local",name:"Nome do local",category:"Categoria",address:"Morada ou local",policy:"Ligação às regras oficiais (opcional)",pending:"A sugestão não confirma a entrada de animais.",localOnly:"Rascunho guardado apenas neste dispositivo. Não foi enviado nem publicado.",save:"Guardar rascunho",cancel:"Cancelar",required:"Introduza o nome e a morada.",saved:"Rascunho guardado neste dispositivo.",done:"Concluído",back:"Voltar ao mapa"},
  nl:{all:"Alles",food:"Eten en drinken",beauty:"Beauty en verzorging",outdoors:"Verblijf en buiten",pet:"Huisdierenservices",community:"Evenementen en bewaard",title:"Een plek voorstellen",name:"Naam van de plek",category:"Categorie",address:"Adres of locatie",policy:"Link naar officieel huisdierenbeleid (optioneel)",pending:"Een voorstel bevestigt niet dat huisdieren welkom zijn.",localOnly:"Concept alleen op dit apparaat opgeslagen. Niet verzonden of gepubliceerd.",save:"Concept opslaan",cancel:"Annuleren",required:"Vul de naam en het adres in.",saved:"Concept opgeslagen op dit apparaat.",done:"Klaar",back:"Terug naar de kaart"},
  pl:{all:"Wszystkie",food:"Jedzenie i napoje",beauty:"Uroda i pielęgnacja",outdoors:"Noclegi i plener",pet:"Usługi dla zwierząt",community:"Wydarzenia i zapisane",title:"Zaproponuj miejsce",name:"Nazwa miejsca",category:"Kategoria",address:"Adres lub lokalizacja",policy:"Link do oficjalnych zasad (opcjonalnie)",pending:"Sugestia nie potwierdza, że miejsce przyjmuje zwierzęta.",localOnly:"Szkic zapisano tylko na tym urządzeniu. Nie został wysłany ani opublikowany.",save:"Zapisz szkic",cancel:"Anuluj",required:"Podaj nazwę i adres.",saved:"Szkic zapisano na tym urządzeniu.",done:"Gotowe",back:"Wróć do mapy"},
  cs:{all:"Vše",food:"Jídlo a nápoje",beauty:"Krása a péče",outdoors:"Ubytování a venku",pet:"Služby pro mazlíčky",community:"Události a uložené",title:"Navrhnout místo",name:"Název místa",category:"Kategorie",address:"Adresa nebo místo",policy:"Odkaz na oficiální pravidla (volitelné)",pending:"Návrh nepotvrzuje, že jsou zde mazlíčci vítáni.",localOnly:"Koncept je uložen pouze v tomto zařízení. Nebyl odeslán ani zveřejněn.",save:"Uložit koncept",cancel:"Zrušit",required:"Zadejte název a adresu.",saved:"Koncept uložen v tomto zařízení.",done:"Hotovo",back:"Zpět na mapu"},
  sk:{all:"Všetky",food:"Jedlo a nápoje",beauty:"Krása a starostlivosť",outdoors:"Ubytovanie a vonku",pet:"Služby pre zvieratá",community:"Podujatia a uložené",title:"Navrhnúť miesto",name:"Názov miesta",category:"Kategória",address:"Adresa alebo miesto",policy:"Odkaz na oficiálne pravidlá (voliteľné)",pending:"Návrh nepotvrdzuje, že sú tu zvieratá vítané.",localOnly:"Koncept je uložený iba v tomto zariadení. Nebol odoslaný ani zverejnený.",save:"Uložiť koncept",cancel:"Zrušiť",required:"Zadajte názov a adresu.",saved:"Koncept uložený v tomto zariadení.",done:"Hotovo",back:"Späť na mapu"},
  hu:{all:"Összes",food:"Étel és ital",beauty:"Szépség és ápolás",outdoors:"Szállás és szabadtér",pet:"Kisállat-szolgáltatások",community:"Események és mentettek",title:"Hely javaslása",name:"Hely neve",category:"Kategória",address:"Cím vagy hely",policy:"Hivatalos szabályzat linkje (nem kötelező)",pending:"A javaslat nem igazolja, hogy a hely állatbarát.",localOnly:"Piszkozat csak ezen az eszközön mentve. Nem lett elküldve vagy közzétéve.",save:"Piszkozat mentése",cancel:"Mégse",required:"Add meg a nevet és a címet.",saved:"Piszkozat mentve ezen az eszközön.",done:"Kész",back:"Vissza a térképhez"},
  ro:{all:"Toate",food:"Mâncare și băuturi",beauty:"Frumusețe și îngrijire",outdoors:"Cazare și exterior",pet:"Servicii pentru animale",community:"Evenimente și salvate",title:"Sugerează un loc",name:"Numele locului",category:"Categorie",address:"Adresă sau locație",policy:"Link către regulile oficiale (opțional)",pending:"Sugestia nu confirmă accesul animalelor.",localOnly:"Ciornă salvată doar pe acest dispozitiv. Nu a fost trimisă sau publicată.",save:"Salvează ciorna",cancel:"Anulează",required:"Introdu numele și adresa.",saved:"Ciornă salvată pe acest dispozitiv.",done:"Gata",back:"Înapoi la hartă"},
  bg:{all:"Всички",food:"Храна и напитки",beauty:"Красота и грижа",outdoors:"Настаняване и навън",pet:"Услуги за любимци",community:"Събития и запазени",title:"Предложи място",name:"Име на мястото",category:"Категория",address:"Адрес или местоположение",policy:"Връзка към официалните правила (незадължително)",pending:"Предложението не потвърждава, че мястото приема животни.",localOnly:"Черновата е запазена само на това устройство. Не е изпратена или публикувана.",save:"Запази черновата",cancel:"Отказ",required:"Въведете име и адрес.",saved:"Черновата е запазена на това устройство.",done:"Готово",back:"Назад към картата"},
  el:{all:"Όλα",food:"Φαγητό και ποτό",beauty:"Ομορφιά και φροντίδα",outdoors:"Διαμονή και ύπαιθρος",pet:"Υπηρεσίες κατοικιδίων",community:"Εκδηλώσεις και αποθηκευμένα",title:"Πρότεινε ένα μέρος",name:"Όνομα μέρους",category:"Κατηγορία",address:"Διεύθυνση ή τοποθεσία",policy:"Σύνδεσμος επίσημων κανόνων (προαιρετικά)",pending:"Η πρόταση δεν επιβεβαιώνει ότι επιτρέπονται κατοικίδια.",localOnly:"Το πρόχειρο αποθηκεύτηκε μόνο σε αυτή τη συσκευή. Δεν στάλθηκε ούτε δημοσιεύτηκε.",save:"Αποθήκευση προχείρου",cancel:"Ακύρωση",required:"Συμπλήρωσε όνομα και διεύθυνση.",saved:"Το πρόχειρο αποθηκεύτηκε σε αυτή τη συσκευή.",done:"Έγινε",back:"Πίσω στον χάρτη"},
  sv:{all:"Alla",food:"Mat och dryck",beauty:"Skönhet och vård",outdoors:"Boende och utomhus",pet:"Husdjurstjänster",community:"Evenemang och sparade",title:"Föreslå en plats",name:"Platsens namn",category:"Kategori",address:"Adress eller plats",policy:"Länk till officiella regler (valfritt)",pending:"Ett förslag bekräftar inte att husdjur är välkomna.",localOnly:"Utkastet sparades bara på den här enheten. Det har inte skickats eller publicerats.",save:"Spara utkast",cancel:"Avbryt",required:"Ange namn och adress.",saved:"Utkast sparat på den här enheten.",done:"Klart",back:"Tillbaka till kartan"},
  da:{all:"Alle",food:"Mad og drikke",beauty:"Skønhed og pleje",outdoors:"Ophold og udendørs",pet:"Kæledyrsservice",community:"Begivenheder og gemte",title:"Foreslå et sted",name:"Stedets navn",category:"Kategori",address:"Adresse eller sted",policy:"Link til officielle regler (valgfrit)",pending:"Et forslag bekræfter ikke, at kæledyr er velkomne.",localOnly:"Udkastet er kun gemt på denne enhed. Det er ikke sendt eller offentliggjort.",save:"Gem udkast",cancel:"Annuller",required:"Indtast navn og adresse.",saved:"Udkast gemt på denne enhed.",done:"Færdig",back:"Tilbage til kortet"},
  no:{all:"Alle",food:"Mat og drikke",beauty:"Skjønnhet og pleie",outdoors:"Overnatting og ute",pet:"Kjæledyrtjenester",community:"Arrangementer og lagret",title:"Foreslå et sted",name:"Stedets navn",category:"Kategori",address:"Adresse eller sted",policy:"Lenke til offisielle regler (valgfritt)",pending:"Et forslag bekrefter ikke at kjæledyr er velkomne.",localOnly:"Utkastet er bare lagret på denne enheten. Det er ikke sendt eller publisert.",save:"Lagre utkast",cancel:"Avbryt",required:"Skriv inn navn og adresse.",saved:"Utkast lagret på denne enheten.",done:"Ferdig",back:"Tilbake til kartet"},
  fi:{all:"Kaikki",food:"Ruoka ja juoma",beauty:"Kauneus ja hoito",outdoors:"Majoitus ja ulkoilu",pet:"Lemmikkipalvelut",community:"Tapahtumat ja tallennetut",title:"Ehdota paikkaa",name:"Paikan nimi",category:"Kategoria",address:"Osoite tai sijainti",policy:"Linkki virallisiin sääntöihin (valinnainen)",pending:"Ehdotus ei vahvista lemmikkiystävällisyyttä.",localOnly:"Luonnos tallennettiin vain tälle laitteelle. Sitä ei lähetetty eikä julkaistu.",save:"Tallenna luonnos",cancel:"Peruuta",required:"Lisää nimi ja osoite.",saved:"Luonnos tallennettu tälle laitteelle.",done:"Valmis",back:"Takaisin karttaan"},
  tr:{all:"Tümü",food:"Yeme içme",beauty:"Güzellik ve bakım",outdoors:"Konaklama ve açık hava",pet:"Evcil hayvan hizmetleri",community:"Etkinlikler ve kaydedilenler",title:"Yer öner",name:"Yer adı",category:"Kategori",address:"Adres veya konum",policy:"Resmî kurallar bağlantısı (isteğe bağlı)",pending:"Öneri, evcil hayvan kabulünü doğrulamaz.",localOnly:"Taslak yalnızca bu cihaza kaydedildi. İncelemeye gönderilmedi veya yayımlanmadı.",save:"Taslağı kaydet",cancel:"İptal",required:"Yer adını ve adresini girin.",saved:"Taslak bu cihaza kaydedildi.",done:"Tamam",back:"Haritaya dön"},
  ar:{all:"الكل",food:"الطعام والشراب",beauty:"الجمال والعناية",outdoors:"الإقامة والأنشطة الخارجية",pet:"خدمات الحيوانات الأليفة",community:"الفعاليات والمحفوظات",title:"اقترح مكانًا",name:"اسم المكان",category:"الفئة",address:"العنوان أو الموقع",policy:"رابط سياسة الحيوانات الرسمية (اختياري)",pending:"الاقتراح لا يؤكد السماح بالحيوانات الأليفة.",localOnly:"حُفظت المسودة على هذا الجهاز فقط. لم تُرسل للمراجعة ولم تُنشر.",save:"حفظ المسودة",cancel:"إلغاء",required:"أدخل اسم المكان وعنوانه.",saved:"حُفظت المسودة على هذا الجهاز.",done:"تم",back:"العودة إلى الخريطة"},
  hi:{all:"सभी",food:"खाना और पेय",beauty:"सौंदर्य और देखभाल",outdoors:"ठहरने और बाहर की जगहें",pet:"पालतू सेवाएँ",community:"कार्यक्रम और सहेजे गए",title:"जगह सुझाएँ",name:"जगह का नाम",category:"श्रेणी",address:"पता या स्थान",policy:"आधिकारिक पालतू नीति का लिंक (वैकल्पिक)",pending:"सुझाव से यह पुष्टि नहीं होती कि पालतू जानवरों की अनुमति है।",localOnly:"ड्राफ़्ट केवल इस डिवाइस पर सहेजा गया है। इसे समीक्षा के लिए भेजा या प्रकाशित नहीं किया गया।",save:"ड्राफ़्ट सहेजें",cancel:"रद्द करें",required:"जगह का नाम और पता भरें।",saved:"ड्राफ़्ट इस डिवाइस पर सहेजा गया।",done:"हो गया",back:"मैप पर वापस जाएँ"}
};
const PD_PLACE_SUGGESTION_KEY = "pets_dogue_place_suggestions_draft_v1";
function pdUx(key){
  const language = (aliases[lang] || lang || "en").toLowerCase();
  return (PD_MAP_UX[language] || PD_MAP_UX.en)[key] || PD_MAP_UX.en[key] || key;
}
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
    /* PETS & DOGUE card redesign */
    #cards .card:not(.event-card){
      position:relative;min-height:410px;overflow:hidden;isolation:isolate;
      border:1px solid rgba(201,151,41,.46);border-radius:24px;
      background:#080808;color:#fff;box-shadow:0 16px 36px rgba(0,0,0,.2)
    }
    #cards .card:not(.event-card)::after{
      z-index:-2;background:linear-gradient(to bottom,
      rgba(0,0,0,.02) 8%,rgba(0,0,0,.05) 30%,
      rgba(0,0,0,.58) 53%,rgba(0,0,0,.96) 100%)
    }
    #cards .card:not(.event-card) .card-photo{
      position:absolute;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover
    }
    #cards .card:not(.event-card) .card-body{
      position:absolute;inset:0;display:flex;flex-direction:column;
      justify-content:flex-end;gap:8px;max-height:100%;overflow:hidden;
      padding:58px 14px 16px;color:#fff
    }
    #cards .card:not(.event-card) .card-top{
      position:absolute;top:14px;inset-inline-start:14px
    }
    #cards .card:not(.event-card) .card-body h2{
      order:1;margin:0;color:#fff;
      font:400 clamp(22px,3.2vw,31px)/1 Georgia,"Times New Roman",serif;
      overflow-wrap:anywhere
    }
    #cards .card:not(.event-card) .address{
      order:2;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;
      -webkit-line-clamp:3;margin:0;color:rgba(255,255,255,.94);
      font-size:12px;line-height:1.35
    }
    #cards .card:not(.event-card) .meta{
      order:3;margin:0;color:rgba(255,255,255,.9);font-size:10px;font-weight:850
    }
    #cards .card:not(.event-card) .pet-row{order:4;margin:2px 0 0}
    #cards .card:not(.event-card) .pet{
      min-height:42px;padding:7px 13px;border-radius:999px;
      background:#54ef0b;color:#071007;font-size:12px;line-height:1.2;white-space:normal
    }
    #cards .card:not(.event-card) .pet.unknown{background:#f3f3f3;color:#171717}
    #cards .card:not(.event-card) .pet.partial{background:#ffd75b;color:#17120a}
    #cards .card:not(.event-card) .pet.rejected{background:#ff5264;color:#19070a}
    #cards .card:not(.event-card) .pd-vote-row{
      order:5;display:flex;gap:8px;margin:0;padding:0;border:0
    }
    #cards .card:not(.event-card) .pd-vote-row strong,
    #cards .card:not(.event-card) .pd-vote-count{display:none}
    #cards .card:not(.event-card) .pd-vote-btn{
      flex:1 1 0;min-height:44px!important;height:44px!important;
      border-radius:999px!important;background:rgba(0,0,0,.55)!important;
      font-size:13px!important
    }
    #cards .card:not(.event-card) .pd-vote-btn.yes{
      border:1px solid #54ef0b!important;color:#8dff5e!important
    }
    #cards .card:not(.event-card) .pd-vote-btn.no{
      border:1px solid #ff6371!important;color:#ff7a86!important
    }
    #cards .card:not(.event-card) .pd-community-state{order:6;margin:0;color:#f4efe4}
    #cards .card:not(.event-card) .pd-community-state.good{color:#72f13c}
    #cards .card:not(.event-card) .pd-community-state.bad{color:#ff6470}
    #cards .card:not(.event-card) .actions{order:7;gap:7px;margin-top:1px}
    #cards .card:not(.event-card) .actions button{
      min-height:42px;padding:0 11px;border:1px solid rgba(255,255,255,.82);
      border-radius:999px;background:rgba(0,0,0,.46);color:#fff;
      font-size:11px;font-weight:900
    }
    #cards .card:not(.event-card) .actions .pd-pet-photo-btn{
      flex:0 0 100%;min-height:48px;border-color:#54ef0b!important;color:#fff!important
    }
    #cards .card:not(.event-card) .badge{
      min-height:34px;padding:0 14px;background:#d4a32e;color:#17120a;font-size:12px
    }
    #cards .card:not(.event-card) .heart{
      width:46px;height:46px;border:1px solid rgba(255,255,255,.3);
      background:rgba(0,0,0,.7);color:#fff
    }

    .pd-gallery-add{
      display:grid;place-items:center;width:100%;height:100%;min-height:92px;
      border:1px dashed #54ef0b;border-radius:14px;
      background:rgba(84,239,11,.1);color:#54ef0b;font-size:42px
    }
    .pd-picker-actions{display:none}
    .pd-picker.is-open .pd-picker-actions{
      display:grid;grid-template-columns:repeat(2,minmax(0,1fr))
    }
    #pdChooseButton{display:none}

    @media(max-width:610px){
      #cards .card:not(.event-card){min-height:clamp(500px,88vw,640px)}
      #cards .card:not(.event-card) .card-body{padding:55px 11px 14px;gap:7px}
      #cards .card:not(.event-card) .address{font-size:11px}
      #cards .card:not(.event-card) .pd-vote-btn{
        min-height:40px!important;height:40px!important;font-size:12px!important
      }
      #cards .card:not(.event-card) .actions button{
        min-height:39px;padding:0 9px;font-size:10px
      }
    }
        /* PETS & DOGUE editorial mobile layout */

    #addTop{
      display:none!important;
    }

    .pd-event-add-wrap[hidden]{
      display:none!important;
    }

    .pd-event-add-wrap{
      grid-column:1/-1;
      min-width:0;
    }

    .pd-event-add-wrap .map-add{
      position:static!important;
      inset:auto!important;
      z-index:auto!important;
      display:flex;
      width:100%;
      min-height:54px;
      align-items:center;
      justify-content:center;
      padding:10px 16px;
      border:1px solid #c99729;
      border-radius:16px;
      background:#111;
      color:#f4efe4;
      box-shadow:0 8px 20px rgba(0,0,0,.12);
      font-size:16px;
      font-weight:900;
    }

    #locBtn{
      border:1px solid #64b8ed!important;
      background:#8bd5ff!important;
      color:#111!important;
    }

    #radius{
      accent-color:#c99729!important;
    }

    .marker{
      border-color:#d4a32e!important;
      background:#111!important;
      color:#f4efe4!important;
    }

    .categories .cat{
      border-color:#d8c9a8;
      background:#f8f4eb;
      color:#17130e;
      white-space:nowrap;
    }

    .categories .cat.active{
      border-color:#c99729;
      background:#111;
      color:#f4efe4;
      box-shadow:inset 0 -3px 0 #c99729;
    }

    .categories .cat.saved{
      background:#eee5d2;
      color:#17130e;
    }

    .categories .cat.saved.active{
      border-color:#c99729;
      background:#111;
      color:#f4efe4;
    }

    #cards .card:not(.event-card) .pet{
      background:#d8f4a5!important;
      color:#18210d!important;
    }

    #cards .card:not(.event-card) .pet.unknown{
      border:1px solid #e3bd00;
      background:#ffe500!important;
      color:#17130e!important;
      box-shadow:0 0 12px rgba(255,229,0,.38);
    }

    #cards .card:not(.event-card) .heart{
      color:#ff2638!important;
      text-shadow:0 0 8px rgba(255,38,56,.35);
    }

    #cards .card:not(.event-card) .heart.on{
      border-color:#ff1f36!important;
      background:#ff1f36!important;
      color:#fff!important;
      box-shadow:0 0 14px rgba(255,31,54,.45);
    }

    #cards .card:not(.event-card) .pd-vote-btn.yes{
      border:2px solid #69eb16!important;
      color:#a5ff67!important;
    }

    #cards .card:not(.event-card) .pd-vote-btn.no{
      border:2px solid #ff5969!important;
      color:#ff7884!important;
    }

    @media(max-width:850px){
      .discovery{
        display:grid;
        grid-template-columns:minmax(0,1fr);
        grid-template-areas:
          "hero"
          "search"
          "location"
          "radius"
          "categories"
          "eventadd"
          "map";
        gap:14px;
      }

      .discovery>div:first-child{
        display:contents;
      }

      .copy{grid-area:hero}
      .search{grid-area:search}
      .location-ok{grid-area:location}
      .radius{grid-area:radius}
      .categories{
        grid-area:categories;
        display:flex;
        width:100%;
        gap:8px;
        overflow-x:auto;
        overscroll-behavior-inline:contain;
        padding:2px 1px 8px;
        scrollbar-width:none;
      }

      .categories::-webkit-scrollbar{
        display:none;
      }

      .categories .cat{
        flex:0 0 auto;
        width:auto;
        min-height:48px;
        padding:0 15px;
        gap:8px;
      }

      .pd-event-add-wrap{grid-area:eventadd}
      .map-shell{
        grid-area:map;
        margin-top:0;
      }

      .copy h1{
        max-width:620px;
        font-size:clamp(40px,10vw,54px);
        line-height:.95;
      }

      .copy p{
        font-size:15px;
      }

      #map{
        height:235px;
      }

      .location-ok:empty{
        display:none;
      }

      #cards .card:not(.event-card){
        min-height:clamp(370px,100vw,460px);
      }
    }

    @media(max-width:390px){
      .categories .cat{
        min-height:44px;
        padding:0 12px;
        font-size:12px;
      }

      #cards .card:not(.event-card) .card-body{
        padding-right:9px;
        padding-left:9px;
      }
    }

    /* Venue card visual override. Scoped to #cards; the map, help panel and page layout remain untouched. */
    main.page.pd-final-page #cards .card.pd-venue-card{
      position:relative!important;display:flex!important;flex-direction:column!important;
      width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;
      overflow:hidden!important;isolation:isolate!important;box-sizing:border-box!important;
      border:4px solid #138b43!important;border-radius:23px!important;
      background:#f6f0e5!important;color:#171717!important;
      box-shadow:0 0 0 1px #111,0 5px 0 rgba(0,0,0,.18),0 10px 22px rgba(0,0,0,.13)!important;
      transition:transform .18s ease,box-shadow .18s ease!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="yes"]{
      border-color:#138b43!important;box-shadow:0 0 0 1px #111,0 0 0 2px #138b43,0 5px 0 rgba(19,139,67,.3),0 10px 22px rgba(0,0,0,.13)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="unknown"]{
      border-color:#e5b500!important;box-shadow:0 0 0 1px #111,0 0 0 2px #e5b500,0 5px 0 rgba(229,181,0,.28),0 10px 22px rgba(0,0,0,.13)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="no"]{
      border-color:#ed172b!important;box-shadow:0 0 0 1px #111,0 0 0 2px #ed172b,0 5px 0 rgba(237,23,43,.3),0 10px 22px rgba(0,0,0,.13)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card::before,
    main.page.pd-final-page #cards .card.pd-venue-card::after{content:none!important;display:none!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media{
      position:relative!important;display:block!important;flex:0 0 auto!important;
      width:calc(100% - 12px)!important;height:auto!important;min-height:0!important;max-height:none!important;
      aspect-ratio:1.06/1!important;margin:6px auto 0!important;overflow:hidden!important;isolation:isolate!important;
      border:2px solid #111!important;border-radius:16px!important;background:#171717!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 3px 8px rgba(0,0,0,.2)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media .card-bg{
      position:absolute!important;inset:0!important;z-index:0!important;display:block!important;
      width:100%!important;height:100%!important;min-height:0!important;max-height:none!important;
      flex:none!important;overflow:hidden!important;border-radius:13px!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media .pd-branded-fallback{
      position:absolute!important;inset:0!important;width:100%!important;height:100%!important;
      display:grid!important;place-items:center!important;border-radius:0!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media .card-photo{
      position:absolute!important;z-index:1!important;inset:0!important;display:block!important;
      width:100%!important;height:100%!important;min-height:0!important;max-height:none!important;
      object-fit:cover!important;border:0!important;border-radius:0!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-policy-chip{
      position:absolute!important;z-index:4!important;top:10px!important;left:10px!important;
      display:inline-flex!important;align-items:center!important;gap:7px!important;
      max-width:calc(100% - 86px)!important;min-height:38px!important;padding:5px 12px 5px 7px!important;
      overflow:hidden!important;border:1px solid rgba(17,17,17,.18)!important;border-radius:999px!important;
      background:rgba(255,253,247,.97)!important;color:#111!important;
      box-shadow:0 2px 8px rgba(0,0,0,.22)!important;
      font:800 clamp(10px,2.8vw,14px)/1.15 Arial,Helvetica,sans-serif!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-policy-chip>span:last-child{
      overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-policy-icon{
      flex:0 0 25px!important;width:25px!important;height:25px!important;
      display:inline-grid!important;place-items:center!important;border-radius:50%!important;
      background:#138b43!important;color:#fff!important;font:bold 17px/1 Arial,sans-serif!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="unknown"] .pd-policy-icon{background:#ed9e00!important;color:#fff!important}
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="no"] .pd-policy-icon{background:#ed172b!important;color:#fff!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media .heart{
      position:absolute!important;z-index:5!important;top:10px!important;right:10px!important;
      inset-inline-start:auto!important;width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;
      display:grid!important;place-items:center!important;border:1px solid #d5d0c5!important;border-radius:50%!important;
      background:#fffdf7!important;color:#e51f3a!important;font-size:30px!important;
      box-shadow:0 2px 0 rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.2)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="no"] .pd-card-media .heart{right:62px!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-no-pets-corner{
      position:absolute!important;z-index:6!important;top:0!important;right:0!important;
      width:68px!important;height:68px!important;display:grid!important;place-items:start end!important;
      padding:7px 4px 0 0!important;overflow:hidden!important;clip-path:polygon(0 0,100% 0,100% 100%)!important;
      background:linear-gradient(145deg,#ff3a4a 0%,#d50018 75%)!important;color:#fff!important;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.28))!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-no-pets-corner span{
      display:block!important;transform:rotate(15deg)!important;font:900 19px/1 Arial,sans-serif!important;
      filter:grayscale(1) brightness(0) invert(1)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-gallery{
      position:absolute!important;z-index:3!important;left:0!important;right:0!important;bottom:0!important;
      min-height:42px!important;padding:7px 10px!important;display:flex!important;align-items:center!important;
      justify-content:space-between!important;gap:8px!important;
      background:linear-gradient(transparent,rgba(0,0,0,.78))!important;color:#fff!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-dots{display:flex!important;align-items:center!important;gap:7px!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-dot{
      appearance:none!important;flex:0 0 10px!important;width:10px!important;height:10px!important;
      min-width:10px!important;min-height:10px!important;padding:0!important;border:0!important;border-radius:50%!important;
      background:rgba(255,255,255,.7)!important;box-shadow:0 1px 2px rgba(0,0,0,.35)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-dot.active{background:#fff!important;transform:scale(1.2)!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-card-count{
      display:inline-flex!important;align-items:center!important;padding:4px 9px!important;
      border:1px solid rgba(255,255,255,.9)!important;border-radius:999px!important;      background:rgba(20,20,20,.62)!important;color:#fff!important;
      font:800 12px/1.2 Arial,Helvetica,sans-serif!important;white-space:nowrap!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .card-body{
      position:relative!important;inset:auto!important;z-index:2!important;display:flex!important;
      flex:1 1 auto!important;flex-direction:column!important;justify-content:flex-start!important;gap:8px!important;
      width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;
      overflow:visible!important;padding:12px 13px 14px!important;background:#f6f0e5!important;color:#171717!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .card-top{
      position:static!important;inset:auto!important;display:flex!important;justify-content:flex-start!important;
      align-items:flex-start!important;min-height:0!important;margin:0!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .badge{
      position:static!important;display:inline-flex!important;align-items:center!important;
      width:max-content!important;max-width:100%!important;min-height:32px!important;padding:5px 13px!important;
      border:1px solid rgba(132,92,17,.28)!important;border-radius:999px!important;
      background:linear-gradient(180deg,#f4d466,#d8a733)!important;color:#15120b!important;
      box-shadow:0 2px 0 rgba(115,77,12,.2),0 3px 7px rgba(0,0,0,.11)!important;
      font:900 13px/1.1 Arial,Helvetica,sans-serif!important;white-space:normal!important;text-align:center!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .card-body h2{
      position:static!important;order:0!important;margin:0!important;color:#153c27!important;
      font:900 clamp(21px,5.5vw,30px)/1.05 Arial,Helvetica,sans-serif!important;letter-spacing:-.025em!important;
      overflow-wrap:anywhere!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .address{
      display:flex!important;align-items:flex-start!important;gap:8px!important;min-width:0!important;
      margin:0!important;padding:0!important;color:#20201d!important;font:400 14px/1.32 Arial,Helvetica,sans-serif!important;
      overflow:visible!important;white-space:normal!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .address span{display:block!important;min-width:0!important;overflow-wrap:anywhere!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-address-pin{
      flex:0 0 19px!important;width:19px!important;height:19px!important;margin-top:1px!important;
      fill:none!important;stroke:#111!important;stroke-width:2!important;stroke-linecap:round!important;stroke-linejoin:round!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .meta{
      display:flex!important;align-items:center!important;gap:7px!important;min-width:0!important;
      margin:0!important;padding:0!important;color:#171717!important;font:850 13px/1.2 Arial,Helvetica,sans-serif!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pet-row{display:block!important;min-width:0!important;margin:0!important;padding:0!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pet{
      display:flex!important;align-items:center!important;gap:8px!important;width:100%!important;max-width:100%!important;
      min-height:0!important;padding:0!important;border:0!important;border-radius:0!important;
      background:transparent!important;color:#143c27!important;box-shadow:none!important;
      font:750 14px/1.25 Arial,Helvetica,sans-serif!important;white-space:normal!important;overflow-wrap:anywhere!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="unknown"] .pet{color:#735600!important}
    main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="no"] .pet{color:#bd0018!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pet .pd-policy-icon{flex-basis:23px!important;width:23px!important;height:23px!important;font-size:15px!important}
    main.page.pd-final-page #cards .card.pd-venue-card .actions{
      display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-items:stretch!important;
      gap:9px!important;min-width:0!important;margin:2px 0 0!important;padding:0!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .actions button{
      display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;
      width:100%!important;min-width:0!important;min-height:54px!important;height:auto!important;margin:0!important;
      padding:7px 8px!important;border:1px solid #c7c7c7!important;border-radius:12px!important;
      background:#fff!important;color:#171717!important;box-shadow:0 2px 0 rgba(0,0,0,.07)!important;
      font:850 13px/1.1 Arial,Helvetica,sans-serif!important;text-align:center!important;
      white-space:normal!important;overflow-wrap:anywhere!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .actions [data-route]{
      border-color:#075ed3!important;background:linear-gradient(180deg,#1675ec,#0755c4)!important;color:#fff!important;
      box-shadow:0 3px 0 rgba(0,52,133,.26)!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-google-pin{font-size:17px!important}
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-row{
      display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-items:stretch!important;
      gap:9px!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-btn{
      display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;
      width:100%!important;min-width:0!important;min-height:54px!important;height:auto!important;margin:0!important;
      padding:7px 8px!important;border:2px solid!important;border-radius:14px!important;
      background:#e8f6e7!important;color:#075d2b!important;box-shadow:0 2px 0 rgba(0,0,0,.08)!important;
      font:850 14px/1.1 Arial,Helvetica,sans-serif!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-btn.yes{
      border-color:#128143!important;background:#e7f5e7!important;color:#075d2b!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-btn.no{
      border-color:#de2337!important;background:#ffebec!important;color:#b3091f!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-number{
      display:inline-grid!important;place-items:center!important;min-width:19px!important;height:19px!important;
      padding:0 5px!important;border-radius:999px!important;background:rgba(0,0,0,.08)!important;
      color:inherit!important;font-size:11px!important
    }
    main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-count{display:none!important}
    @media(max-width:600px){
      main.page.pd-final-page #cards .card.pd-venue-card .pd-card-media{aspect-ratio:1/1!important}
      main.page.pd-final-page #cards .card.pd-venue-card .card-body{gap:7px!important;padding:10px!important}
      main.page.pd-final-page #cards .card.pd-venue-card .badge{font-size:12px!important}
      main.page.pd-final-page #cards .card.pd-venue-card .card-body h2{font-size:clamp(16px,5vw,23px)!important}
      main.page.pd-final-page #cards .card.pd-venue-card .actions button,
      main.page.pd-final-page #cards .card.pd-venue-card .pd-vote-btn{min-height:48px!important;font-size:12px!important}
      main.page.pd-final-page #cards .card.pd-venue-card .pd-policy-chip{top:8px!important;left:8px!important}
      main.page.pd-final-page #cards .card.pd-venue-card[data-policy-state="no"] .heart{right:57px!important}
    }
    @media(prefers-reduced-motion:reduce){
      main.page.pd-final-page #cards .card.pd-venue-card{transition:none!important}
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
    const addTile = document.createElement("button");
    addTile.type = "button";
    addTile.className = "pd-gallery-add";
    addTile.setAttribute("aria-label", pdT("addPhoto"));
    addTile.textContent = "+";

    addTile.onclick = () => {
      const picker = document.querySelector(
        "#pdPetPhotosOverlay .pd-picker"
      );

      if (!picker) return;

      picker.classList.add("is-open");
      picker.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    };

    gallery.appendChild(addTile);
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
  const photoPicker =
    document.querySelector(
      "#pdPetPhotosOverlay .pd-picker"
    );

  if (photoPicker) {
    photoPicker.classList.remove("is-open");
  }
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

  if(
    place.allowsDogs ===
    false
  ){
    return{confirmed:false,rejected:true,value:"rejected",text:pdT("rejected")};
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

function pdSaveLabel(){
  const labels={
    en:"Save place",uk:"Зберегти місце",ru:"Сохранить место",fr:"Enregistrer le lieu",de:"Ort speichern",es:"Guardar lugar",it:"Salva luogo",pt:"Guardar local",nl:"Locatie opslaan",pl:"Zapisz miejsce",cs:"Uložit místo",sk:"Uložiť miesto",hu:"Hely mentése",ro:"Salvează locul",bg:"Запази мястото",el:"Αποθήκευση μέρους",sv:"Spara plats",da:"Gem sted",no:"Lagre sted",fi:"Tallenna paikka",tr:"Mekânı kaydet",ar:"حفظ المكان",hi:"स्थान सहेजें"
  };
  return labels[lang] || labels.en;
}

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
      pdSearchPending
        ? t("searching")
        : `${t("found")}: ${list.length} ${t("places")}`;

  }

  if(
    !list.length
  ){

    box.innerHTML = `

      <div class="empty">

        <h2>
          ${esc(
            pdSearchPending
              ? t("searching")
              : cat === "saved"
                ? t("savedEmpty")
                : t("noPlaces")
          )}
        </h2>

        ${pdSearchPending ? "" : `
          <p>
            ${esc(
              t(
                "tryAnother"
              )
            )}
          </p>
        `}

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

          const photoList = Array.from(new Set([
            photo,
            ...(Array.isArray(place.photos)
              ? place.photos.map(item => typeof item === "string" ? item : item && (item.url || item.photo_url || item.src))
              : [])
          ].filter(value => typeof value === "string" && (value.toLowerCase().startsWith("http://") || value.toLowerCase().startsWith("https://")))));

          const policy =
            policyInfo(
              place
            );

          const vote =
            pdVoteInfo(
              place
            );

          const policyIcon = policy.rejected ? "×" : policy.confirmed ? "✓" : "?";

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

          if (vote.communityRejected) {
            communityText = pdT("rejected");
          } else if (vote.communityPetFriendly) {
            communityText = pdT("confirmed");
          } else if (vote.total) {
            communityText = `${pdT("community")}: ✓ ${yesCount} · ✕ ${noCount}`;
          }

          return `

            <article
              class="card pd-venue-card"
              data-policy-state="${policy.rejected ? "no" : policy.confirmed ? "yes" : "unknown"}"
              data-category="${esc(
                place.category
              )}"
              data-open="${esc(
                identity
              )}"
            >

              <div class="pd-card-media" data-gallery-count="${photoList.length}" data-gallery-sources="${esc(JSON.stringify(photoList))}">
                <div class="card-bg">${pdFallbackMarkup(place)}</div>
                ${photoList.length ? `
                  <img class="card-photo pd-card-hero" src="${esc(photoList[0])}" alt="${esc(place.name)}" loading="lazy" onerror="this.style.display='none'">
                  <div class="pd-card-gallery" aria-label="${esc(pdT("gallery"))}">
                    <div class="pd-card-dots" role="group" aria-label="${esc(pdT("gallery"))}">
                      ${photoList.map((_, index) => `<button class="pd-card-dot${index === 0 ? " active" : ""}" type="button" data-gallery-index="${index}" aria-label="${esc(pdT("gallery"))} ${index + 1}" aria-pressed="${index === 0 ? "true" : "false"}"></button>`).join("")}
                    </div>
                    <span class="pd-card-count" aria-live="polite">▧ 1 / ${photoList.length}</span>
                  </div>
                ` : ""}
                <div class="pd-policy-chip" data-policy-state="${policy.rejected ? "no" : policy.confirmed ? "yes" : "unknown"}">
                  <span class="pd-policy-icon" aria-hidden="true">${policyIcon}</span>
                  <span>${esc(policy.text)}</span>
                </div>
                <button class="heart ${saved.has(identity) ? "on" : ""}" data-save="${esc(identity)}" type="button" aria-label="${esc(pdSaveLabel())}">${saved.has(identity) ? "♥" : "♡"}</button>
                ${policy.rejected ? `<span class="pd-no-pets-corner" role="img" aria-label="${esc(policy.text)}"><span aria-hidden="true">🚫🐕</span></span>` : ""}
              </div>

              <div class="card-body">
                <div class="card-top">
                  <span class="badge">${esc(catLabel(place.category))}</span>
                </div>
                <h2>${esc(place.name)}</h2>
                <p class="address">
                  <svg class="pd-address-pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.2-8 12-8 12S4 15.2 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
                  <span>${esc(place.address)}</span>
                </p>
                ${meta.length ? `<div class="meta"><span aria-hidden="true">➤</span> ${esc(meta.slice(0, 1).join(" · "))}</div>` : ""}
                <div class="pet-row">
                  <span class="pet ${policy.value === "unknown" ? "unknown" : policy.rejected ? "rejected" : policy.value === "inside" || policy.value === "outside" ? "partial" : ""}">
                    <span class="pd-policy-icon" aria-hidden="true">${policyIcon}</span>
                    <span>${esc(policy.text)}</span>
                  </span>
                </div>
                <div class="actions">
                  <button data-route="${esc(identity)}" type="button"><span aria-hidden="true">➤</span> ${esc(t("route"))}</button>
                  <button data-google-maps="${esc(identity)}" type="button"><span class="pd-google-pin" aria-hidden="true">📍</span> Google Maps</button>
                </div>
                <div class="pd-vote-row">
                  <button class="pd-vote-btn yes" data-vote-yes="${esc(identity)}" type="button" aria-label="${esc(pdT("yes"))}">
                    <span aria-hidden="true">✓</span><span>${esc(pdT("yes"))}</span>
                    ${yesCount ? `<span class="pd-vote-number">${yesCount}</span>` : ""}
                  </button>
                  <button class="pd-vote-btn no" data-vote-no="${esc(identity)}" type="button" aria-label="${esc(pdT("no"))}">
                    <span aria-hidden="true">✕</span><span>${esc(pdT("no"))}</span>
                    ${noCount ? `<span class="pd-vote-number">${noCount}</span>` : ""}
                  </button>
                  ${vote.total ? `<span class="pd-vote-count">${Number(vote.total)}</span>` : ""}
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
  bindCardGallery(box);

  drawMarkers(
    list
  );

  hydratePhotos(
    visible
  );

};


function bindCardGallery(box){
  if(!box || box.dataset.pdGalleryBound === "true") return;
  box.dataset.pdGalleryBound = "true";
  box.addEventListener("click", event=>{
    const button = event.target.closest("[data-gallery-index]");
    if(!button || !box.contains(button)) return;
    event.preventDefault();
    event.stopPropagation();
    const media = button.closest(".pd-card-media");
    if(!media) return;
    const index = Number(button.dataset.galleryIndex);
    const images = JSON.parse(media.dataset.gallerySources || "[]");
    if(!Number.isInteger(index) || !images[index]) return;
    const hero = media.querySelector(".pd-card-hero");
    if(hero) hero.src = images[index];
    media.querySelectorAll(".pd-card-dot").forEach((dot, dotIndex)=>{
      const active = dotIndex === index;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const count = media.querySelector(".pd-card-count");
    if(count) count.textContent = `▧ ${index + 1} / ${images.length}`;
  });
}

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
      "[data-google-maps]"
    )
    .forEach(
      button=>{
        button.onclick = event=>{
          event.stopPropagation();
          const place = findPlace(button.dataset.googleMaps);
          if(place){
            window.open(mapsPlaceUrl(place), "_blank", "noopener");
          }
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

const pdBaseMerge = window.merge;
window.merge = function(groups){
  const sourcePlaces = Array.isArray(groups) ? groups.flat().filter(Boolean) : [];
  const explicitlyNotAllowed = sourcePlaces.filter(place => place.allowsDogs === false);
  const broadPlaces = sourcePlaces.filter(place => place.allowsDogs !== false);
  const merged = typeof pdBaseMerge === "function" ? pdBaseMerge([broadPlaces]) : [];
  const byIdentity = new Map(merged.map(place => [localKey(place), place]));
  explicitlyNotAllowed.forEach(rawPlace => {
    const place = withDist(rawPlace);
    if(!Number.isFinite(place.distance) || place.distance > radius + 1) return;
    const key = localKey(place);
    const existing = byIdentity.get(key);
    byIdentity.set(key, existing ? {...existing, allowsDogs:false} : place);
  });
  return [...byIdentity.values()];
};

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

    pdSearchPending = false;

    render();

    setStatus("");

    return;

  }


  /* Clear the previous category immediately. Keep the UI in a
     loading state until this request returns fresh results. */
  pdSearchPending = true;
  places = [];
  render();


    if (snapshot.category === "events") {
    setStatus(t("searching"));

    try {
      const data = await requestEvents();

      if (!pdStillCurrent(sequence, snapshot)) {
        return;
      }

      pdSearchPending = false;
      renderEvents(data.events || []);
      setStatus("");
    } catch (error) {
      if (!pdStillCurrent(sequence, snapshot)) {
        return;
      }

      console.error("Events loading failed:", error);
      pdSearchPending = false;
      renderEvents([]);
      setStatus(t("error"));
    }

    return;
  }

  setStatus(
    t(
      "searching"
    )
  );


  /*
     The server endpoint already combines Geoapify and the
     server-side OpenStreetMap/Overpass results. Do not make a
     second Overpass request from the visitor's browser: public
     Overpass instances can rate-limit or reject cross-origin
     requests, and the duplicate request can produce console errors.
  */

  const providerPlaces =
    await pdProviderSearch(
      snapshot
    )
    .catch(
      error=>{

        console.warn(
          "Place search:",
          error
        );

        return [];

      }
    );


  if(
    !pdStillCurrent(
      sequence,
      snapshot
    )
  ){

    return;

  }


  pdSearchPending = false;

  places =
    merge([
      providerPlaces
    ]);

  render();

  setStatus("");

};


/* PET-FRIENDLY PLACES PAGE LAYOUT */

function pdInstallPlacesLayout(){
  const discovery = document.querySelector(".discovery");
  const categories = discovery?.querySelector(".categories");
  const addButton = document.getElementById("addMap");
  const addTop = document.getElementById("addTop");

  if(!discovery || !categories || !addButton){
    return;
  }

  if(addTop){
    addTop.hidden = true;
  }

  let eventAction = document.getElementById("pdEventAddWrap");

  if(!eventAction){
    eventAction = document.createElement("div");
    eventAction.id = "pdEventAddWrap";
    eventAction.className = "pd-event-add-wrap";
    categories.insertAdjacentElement("afterend", eventAction);
  }

  eventAction.appendChild(addButton);
  addButton.removeAttribute("data-t");
  addButton.classList.add("pd-event-add-button");

  const updateEventAction = ()=>{
    const selectedCategory =
      typeof cat !== "undefined"
        ? cat
        : document.querySelector(".cat.active")?.dataset.cat;

    const isEvents = selectedCategory === "events";
    const label = isEvents
      ? (PD_EVENT_ADD_LABELS[lang] || PD_EVENT_ADD_LABELS.en)
      : (PD_ADD_PLACE_LABELS[lang] || PD_ADD_PLACE_LABELS.en);

    eventAction.hidden = false;
    addButton.textContent = label;
    addButton.setAttribute("aria-label", label);
  };

  document.addEventListener("click", event=>{
    if(event.target.closest(".cat")){
      setTimeout(updateEventAction, 0);
    }
  });

  window.addEventListener(
    "petsdogue:languagechange",
    ()=>setTimeout(updateEventAction, 0)
  );

  updateEventAction();
}

const PD_CATEGORY_GROUP_CONFIG = [
  {key:"all",ids:["all","cafe","restaurant","pub","pizzeria","hotel","park","beach","veterinary","pet-shop","grooming","barber","beauty","events","saved"]},
  {key:"food",ids:["cafe","restaurant","pub","pizzeria"]},
  {key:"beauty",ids:["barber","beauty"]},
  {key:"outdoors",ids:["hotel","park","beach"]},
  {key:"pet",ids:["veterinary","pet-shop","grooming"]},
  {key:"community",ids:["events","saved"]}
];

const PD_MAP_TAP_LABELS = {
  en:"Tap the map to open it full screen",uk:"Торкніться карти, щоб відкрити на весь екран",ru:"Нажмите на карту, чтобы открыть на весь экран",fr:"Touchez la carte pour l’ouvrir en plein écran",de:"Karte antippen, um sie im Vollbild zu öffnen",es:"Toca el mapa para abrirlo a pantalla completa",it:"Tocca la mappa per aprirla a schermo intero",pt:"Toque no mapa para o abrir em ecrã inteiro",nl:"Tik op de kaart om deze schermvullend te openen",pl:"Dotknij mapy, aby otworzyć ją na pełnym ekranie",cs:"Klepnutím na mapu ji otevřete přes celou obrazovku",sk:"Ťuknutím na mapu ju otvoríte na celú obrazovku",hu:"Koppints a térképre a teljes képernyős megnyitáshoz",ro:"Atinge harta pentru a o deschide pe tot ecranul",bg:"Докоснете картата, за да я отворите на цял екран",el:"Πατήστε τον χάρτη για πλήρη οθόνη",sv:"Tryck på kartan för att öppna den i helskärm",da:"Tryk på kortet for at åbne det i fuld skærm",no:"Trykk på kartet for å åpne det i fullskjerm",fi:"Avaa kartta koko näytölle napauttamalla",tr:"Haritayı tam ekranda açmak için dokunun",ar:"اضغط على الخريطة لفتحها بملء الشاشة",hi:"मैप को पूरी स्क्रीन में खोलने के लिए टैप करें"
};

function pdInstallCategoryGroups(){
  const discovery = document.querySelector(".discovery");
  const categories = discovery?.querySelector(".categories");
  if(!discovery || !categories || document.getElementById("pdCategoryGroups")) return;

  const originals = [...categories.querySelectorAll(".cat[data-cat]")];
  if(!originals.length) return;

  const root = document.createElement("section");
  root.id = "pdCategoryGroups";
  root.className = "pd-category-groups";
  root.setAttribute("aria-label", "Place categories");

  const tabs = document.createElement("div");
  tabs.className = "pd-category-group-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Category groups");

  const subfilters = document.createElement("div");
  subfilters.className = "pd-category-group-subfilters";
  subfilters.setAttribute("role", "group");

  root.append(tabs, subfilters);
  categories.insertAdjacentElement("beforebegin", root);
  categories.hidden = true;
  categories.setAttribute("aria-hidden", "true");
  const dots = discovery.querySelector(".pd-category-dots");
  if(dots) dots.hidden = true;

  let activeGroup = "all";
  const activeCategory = typeof cat !== "undefined" ? cat : "all";
  const categoryGroup = PD_CATEGORY_GROUP_CONFIG.find(group=>group.ids.includes(activeCategory));
  if(categoryGroup && activeCategory !== "all") activeGroup = categoryGroup.key;

  function render(){
    tabs.replaceChildren();
    PD_CATEGORY_GROUP_CONFIG.forEach(group=>{
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pd-category-group-tab";
      button.textContent = pdUx(group.key);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(group.key === activeGroup));
      button.addEventListener("click", ()=>{
        activeGroup = group.key;
        render();
      });
      tabs.appendChild(button);
    });

    const selectedGroup = PD_CATEGORY_GROUP_CONFIG.find(group=>group.key === activeGroup) || PD_CATEGORY_GROUP_CONFIG[0];
    const visible = originals.filter(button=>selectedGroup.ids.includes(button.dataset.cat));
    subfilters.replaceChildren();
    visible.forEach(original=>{
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pd-category-group-subfilter";
      button.innerHTML = original.innerHTML;
      button.setAttribute("aria-pressed", String(original.classList.contains("active")));
      button.addEventListener("click", ()=>{
        const nextGroup = PD_CATEGORY_GROUP_CONFIG.find(group=>group.key !== "all" && group.ids.includes(original.dataset.cat));
        if(nextGroup) activeGroup = nextGroup.key;
        original.click();
        render();
      });
      subfilters.appendChild(button);
    });
  }

  render();
  window.addEventListener("petsdogue:languagechange", ()=>setTimeout(render, 0));
}

function pdInstallFullMapBack(){
  const openButton = document.getElementById("mapFull");
  const closeButton = document.getElementById("fullClose");
  const overlay = document.getElementById("fullOverlay");
  const mapCanvas = document.getElementById("map");
  if(!openButton || !closeButton || !overlay || openButton.dataset.pdBackReady === "true") return;

  openButton.dataset.pdBackReady = "true";
  const openOriginal = openButton.onclick;
  const closeOriginal = closeButton.onclick;
  let fullMapWasOpen = false;

  function closeFromHistory(){
    if(!overlay.classList.contains("open")) return;
    if(typeof closeOriginal === "function") closeOriginal.call(closeButton);
    else{
      overlay.classList.remove("open");
      document.body.classList.remove("lock");
    }
    fullMapWasOpen = false;
  }

  openButton.onclick = function(event){
    if(typeof openOriginal === "function") openOriginal.call(openButton, event);
    setTimeout(()=>{
      if(!overlay.classList.contains("open")) return;
      if(!history.state?.pdPetsDogueFullMap){
        history.pushState(Object.assign({}, history.state || {}, {pdPetsDogueFullMap:true}), "", location.href);
      }
      fullMapWasOpen = true;
      closeButton.setAttribute("aria-label", pdUx("back"));
      closeButton.title = pdUx("back");
    }, 0);
  };

  closeButton.onclick = function(event){
    if(history.state?.pdPetsDogueFullMap){
      event?.preventDefault();
      history.back();
      return;
    }
    closeFromHistory();
  };

  window.addEventListener("popstate", ()=>{
    if(fullMapWasOpen && !history.state?.pdPetsDogueFullMap) closeFromHistory();
  });

  document.addEventListener("keydown", event=>{
    if(event.key === "Escape" && overlay.classList.contains("open")){
      if(history.state?.pdPetsDogueFullMap) history.back();
      else closeFromHistory();
    }
  });

  if(mapCanvas && mapCanvas.dataset.pdTapHandlerInstalled !== "true"){
    mapCanvas.dataset.pdTapHandlerInstalled = "true";
    mapCanvas.dataset.pdTapToExpand = "true";
    mapCanvas.removeAttribute("role");
    const language = (aliases[lang] || lang || "en").toLowerCase();
    mapCanvas.setAttribute("aria-label", PD_MAP_TAP_LABELS[language] || PD_MAP_TAP_LABELS.en);
    mapCanvas.setAttribute("tabindex", "0");
    mapCanvas.addEventListener("click", event=>{
      if(event.target.closest(".leaflet-control,.leaflet-marker-icon,.leaflet-popup,.leaflet-interactive,button,a,[role=button]")) return;
      openButton.click();
    });
    mapCanvas.addEventListener("keydown", event=>{
      if((event.key === "Enter" || event.key === " ") && event.target === mapCanvas){
        event.preventDefault();
        openButton.click();
      }
    });
    window.addEventListener("petsdogue:languagechange", ()=>{
      const nextLanguage = (aliases[lang] || lang || "en").toLowerCase();
      mapCanvas.setAttribute("aria-label", PD_MAP_TAP_LABELS[nextLanguage] || PD_MAP_TAP_LABELS.en);
    });
  }
}

function pdInstallPolicyDone(){
  const button = document.getElementById("policySave");
  if(!button) return;
  button.removeAttribute("data-t");

  const update = ()=>{
    button.textContent = pdUx("done");
    button.setAttribute("aria-label", pdUx("done"));
    button.classList.add("pd-policy-done");
  };

  update();
  window.addEventListener("petsdogue:languagechange", ()=>setTimeout(update, 0));

  const originalVoteYes = window.pdVoteYes;
  if(typeof originalVoteYes === "function" && !originalVoteYes.__pdDoneLabelWrapped){
    const wrapped = async function(place){
      const result = await originalVoteYes.call(this, place);
      setTimeout(update, 0);
      return result;
    };
    wrapped.__pdDoneLabelWrapped = true;
    window.pdVoteYes = wrapped;
  }
}

function pdInstallSortControl(){
  const select = document.getElementById("sort");
  if(!select || select.dataset.pdCustomSort === "true") return;
  select.dataset.pdCustomSort = "true";
  select.classList.add("pd-sort-native-hidden");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  const root = document.createElement("div");
  root.className = "pd-sort-control";
  root.id = "pdSortControl";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "pd-sort-trigger";
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");

  const chevron = document.createElement("span");
  chevron.className = "pd-sort-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = "⌄";
  trigger.append(document.createElement("span"), chevron);

  const triggerLabel = trigger.firstElementChild;
  const menu = document.createElement("div");
  menu.className = "pd-sort-menu";
  menu.setAttribute("role", "menu");
  menu.hidden = true;

  root.append(trigger, menu);
  select.insertAdjacentElement("beforebegin", root);

  function close(){
    menu.hidden = true;
    root.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  function render(){
    const selected = [...select.options].find(option=>option.value === select.value) || select.options[0];
    triggerLabel.textContent = selected?.textContent.trim() || "Sort places";
    menu.replaceChildren();

    [...select.options].forEach(option=>{
      const item = document.createElement("button");
      item.type = "button";
      item.className = "pd-sort-option";
      item.setAttribute("role", "menuitemradio");
      item.setAttribute("aria-checked", String(option.value === select.value));
      item.textContent = option.textContent.trim();
      item.addEventListener("click", ()=>{
        select.value = option.value;
        select.dispatchEvent(new Event("change", {bubbles:true}));
        render();
        close();
        trigger.focus();
      });
      menu.appendChild(item);
    });
  }

  trigger.addEventListener("click", ()=>{
    const opening = menu.hidden;
    menu.hidden = !opening;
    root.classList.toggle("open", opening);
    trigger.setAttribute("aria-expanded", String(opening));
  });

  document.addEventListener("click", event=>{
    if(!root.contains(event.target)) close();
  });

  document.addEventListener("keydown", event=>{
    if(event.key === "Escape" && !menu.hidden){
      close();
      trigger.focus();
    }
  });

  window.addEventListener("petsdogue:languagechange", ()=>setTimeout(render, 0));
  select.addEventListener("change", render);
  render();
}

function pdInstallAddPlaceDraft(){
  const addButton = document.getElementById("addMap");
  if(!addButton || addButton.dataset.pdDraftReady === "true") return;
  addButton.dataset.pdDraftReady = "true";

  let overlay = document.getElementById("pdPlaceSuggestionOverlay");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.id = "pdPlaceSuggestionOverlay";
    overlay.className = "pd-place-suggestion-overlay";
    overlay.setAttribute("role", "presentation");

    const dialog = document.createElement("section");
    dialog.className = "pd-place-suggestion-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "pdPlaceSuggestionTitle");

    const header = document.createElement("div");
    header.className = "pd-place-suggestion-header";
    const title = document.createElement("h2");
    title.id = "pdPlaceSuggestionTitle";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "pd-place-suggestion-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close");
    header.append(title, close);

    const form = document.createElement("form");
    form.className = "pd-place-suggestion-form";
    const field = (labelText, name, type)=>{
      const label = document.createElement("label");
      label.className = "pd-place-suggestion-field";
      const caption = document.createElement("span");
      caption.textContent = labelText;
      const input = document.createElement(type === "select" ? "select" : "input");
      input.name = name;
      if(type !== "select") input.type = type || "text";
      label.append(caption, input);
      return {label,input};
    };
    const nameField = field("", "name", "text");
    nameField.input.required = true;
    nameField.input.maxLength = 120;
    nameField.input.autocomplete = "organization";
    const categoryField = field("", "category", "select");
    categoryField.input.required = true;
    const addressField = field("", "address", "text");
    addressField.input.required = true;
    addressField.input.maxLength = 300;
    addressField.input.autocomplete = "street-address";
    const policyField = field("", "policy", "url");
    policyField.input.maxLength = 500;
    policyField.input.placeholder = "https://";

    const note = document.createElement("p");
    note.className = "pd-place-suggestion-note";
    const localOnly = document.createElement("p");
    localOnly.className = "pd-place-suggestion-local-only";
    const message = document.createElement("p");
    message.className = "pd-place-suggestion-message";
    message.setAttribute("aria-live", "polite");

    const actions = document.createElement("div");
    actions.className = "pd-place-suggestion-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "pd-place-suggestion-cancel";
    const save = document.createElement("button");
    save.type = "submit";
    save.className = "pd-place-suggestion-save";
    actions.append(cancel, save);

    form.append(nameField.label, categoryField.label, addressField.label, policyField.label, note, localOnly, message, actions);
    dialog.append(header, form);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function closeForm(){
      overlay.classList.remove("open");
      document.body.classList.remove("pd-place-suggestion-open");
      message.textContent = "";
    }
    close.onclick = closeForm;
    cancel.onclick = closeForm;
    overlay.addEventListener("click", event=>{ if(event.target === overlay) closeForm(); });
    document.addEventListener("keydown", event=>{
      if(event.key === "Escape" && overlay.classList.contains("open")) closeForm();
    });

    function updateText(){
      title.textContent = pdUx("title");
      nameField.label.firstChild.textContent = pdUx("name");
      categoryField.label.firstChild.textContent = pdUx("category");
      addressField.label.firstChild.textContent = pdUx("address");
      policyField.label.firstChild.textContent = pdUx("policy");
      note.textContent = pdUx("pending");
      localOnly.textContent = pdUx("localOnly");
      cancel.textContent = pdUx("cancel");
      save.textContent = pdUx("save");
      close.setAttribute("aria-label", pdUx("cancel"));
    }

    function updateOptions(){
      const originals = [...document.querySelectorAll(".categories .cat[data-cat]")]
        .filter(button=>!["all","events","saved"].includes(button.dataset.cat));
      const current = typeof cat !== "undefined" ? cat : "cafe";
      categoryField.input.replaceChildren();
      originals.forEach(original=>{
        const option = document.createElement("option");
        option.value = original.dataset.cat;
        option.textContent = original.textContent.trim().replace(/^\S+\s*/, "");
        option.selected = original.dataset.cat === current;
        categoryField.input.appendChild(option);
      });
    }

    form.addEventListener("submit", event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;

      const suggestion = {
        id:"draft-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,8),
        name:nameField.input.value.trim(),
        category:categoryField.input.value,
        address:addressField.input.value.trim(),
        policySource:policyField.input.value.trim(),
        petPolicy:"unconfirmed",
        status:"local-draft",
        createdAt:new Date().toISOString()
      };

      try{
        const previous = JSON.parse(localStorage.getItem(PD_PLACE_SUGGESTION_KEY) || "[]");
        const drafts = Array.isArray(previous) ? previous.slice(-49) : [];
        drafts.push(suggestion);
        localStorage.setItem(PD_PLACE_SUGGESTION_KEY, JSON.stringify(drafts));
        message.textContent = pdUx("saved") + " " + pdUx("localOnly");
        form.reset();
        updateOptions();
        setTimeout(closeForm, 2600);
      }catch(error){
        console.warn("Could not save local place draft:", error);
        message.textContent = pdUx("required");
      }
    });

    overlay._pdUpdateText = updateText;
    overlay._pdUpdateOptions = updateOptions;
    overlay._pdOpen = ()=>{
      updateText();
      updateOptions();
      overlay.classList.add("open");
      document.body.classList.add("pd-place-suggestion-open");
      nameField.input.focus();
    };
  }

  const originalClick = addButton.onclick;
  addButton.onclick = function(event){
    const selectedCategory = typeof cat !== "undefined" ? cat : document.querySelector(".cat.active")?.dataset.cat;
    if(selectedCategory === "events"){
      if(typeof originalClick === "function") return originalClick.call(addButton, event);
      return;
    }
    event?.preventDefault();
    overlay._pdOpen?.();
  };

  window.addEventListener("petsdogue:languagechange", ()=>{
    overlay._pdUpdateText?.();
    overlay._pdUpdateOptions?.();
  });
}

function pdInstallAddPlaceDraft(){
  const addButton = document.getElementById("addMap");
  if(!addButton || addButton.dataset.pdDraftReady === "true") return;
  addButton.dataset.pdDraftReady = "true";

  let overlay = document.getElementById("pdPlaceSuggestionOverlay");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.id = "pdPlaceSuggestionOverlay";
    overlay.className = "pd-place-suggestion-overlay";
    overlay.setAttribute("role", "presentation");

    const dialog = document.createElement("section");
    dialog.className = "pd-place-suggestion-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "pdPlaceSuggestionTitle");

    const header = document.createElement("div");
    header.className = "pd-place-suggestion-header";
    const title = document.createElement("h2");
    title.id = "pdPlaceSuggestionTitle";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "pd-place-suggestion-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close");
    header.append(title, close);

    const form = document.createElement("form");
    form.className = "pd-place-suggestion-form";
    const field = (labelText, name, type)=>{
      const label = document.createElement("label");
      label.className = "pd-place-suggestion-field";
      const caption = document.createElement("span");
      caption.textContent = labelText;
      const input = document.createElement(type === "select" ? "select" : "input");
      input.name = name;
      if(type !== "select") input.type = type || "text";
      label.append(caption, input);
      return {label,input};
    };
    const nameField = field("", "name", "text");
    nameField.input.required = true;
    nameField.input.maxLength = 120;
    nameField.input.autocomplete = "organization";
    const categoryField = field("", "category", "select");
    categoryField.input.required = true;
    const addressField = field("", "address", "text");
    addressField.input.required = true;
    addressField.input.maxLength = 300;
    addressField.input.autocomplete = "street-address";
    const policyField = field("", "policy", "url");
    policyField.input.maxLength = 500;
    policyField.input.placeholder = "https://";

    const note = document.createElement("p");
    note.className = "pd-place-suggestion-note";
    const localOnly = document.createElement("p");
    localOnly.className = "pd-place-suggestion-local-only";
    const message = document.createElement("p");
    message.className = "pd-place-suggestion-message";
    message.setAttribute("aria-live", "polite");

    const actions = document.createElement("div");
    actions.className = "pd-place-suggestion-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "pd-place-suggestion-cancel";
    const save = document.createElement("button");
    save.type = "submit";
    save.className = "pd-place-suggestion-save";
    actions.append(cancel, save);

    form.append(nameField.label, categoryField.label, addressField.label, policyField.label, note, localOnly, message, actions);
    dialog.append(header, form);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function closeForm(){
      overlay.classList.remove("open");
      document.body.classList.remove("pd-place-suggestion-open");
      message.textContent = "";
    }
    close.onclick = closeForm;
    cancel.onclick = closeForm;
    overlay.addEventListener("click", event=>{ if(event.target === overlay) closeForm(); });
    document.addEventListener("keydown", event=>{
      if(event.key === "Escape" && overlay.classList.contains("open")) closeForm();
    });

    function updateText(){
      title.textContent = pdUx("title");
      nameField.label.firstChild.textContent = pdUx("name");
      categoryField.label.firstChild.textContent = pdUx("category");
      addressField.label.firstChild.textContent = pdUx("address");
      policyField.label.firstChild.textContent = pdUx("policy");
      note.textContent = pdUx("pending");
      localOnly.textContent = pdUx("localOnly");
      cancel.textContent = pdUx("cancel");
      save.textContent = pdUx("save");
      close.setAttribute("aria-label", pdUx("cancel"));
    }

    function updateOptions(){
      const originals = [...document.querySelectorAll(".categories .cat[data-cat]")]
        .filter(button=>!["all","events","saved"].includes(button.dataset.cat));
      const current = typeof cat !== "undefined" ? cat : "cafe";
      categoryField.input.replaceChildren();
      originals.forEach(original=>{
        const option = document.createElement("option");
        option.value = original.dataset.cat;
        option.textContent = original.textContent.trim().replace(/^\S+\s*/, "");
        option.selected = original.dataset.cat === current;
        categoryField.input.appendChild(option);
      });
    }

    form.addEventListener("submit", event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;

      const suggestion = {
        id:"draft-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,8),
        name:nameField.input.value.trim(),
        category:categoryField.input.value,
        address:addressField.input.value.trim(),
        policySource:policyField.input.value.trim(),
        petPolicy:"unconfirmed",
        status:"local-draft",
        createdAt:new Date().toISOString()
      };

      try{
        const previous = JSON.parse(localStorage.getItem(PD_PLACE_SUGGESTION_KEY) || "[]");
        const drafts = Array.isArray(previous) ? previous.slice(-49) : [];
        drafts.push(suggestion);
        localStorage.setItem(PD_PLACE_SUGGESTION_KEY, JSON.stringify(drafts));
        message.textContent = pdUx("saved") + " " + pdUx("localOnly");
        form.reset();
        updateOptions();
        setTimeout(closeForm, 2600);
      }catch(error){
        console.warn("Could not save local place draft:", error);
        message.textContent = pdUx("required");
      }
    });

    overlay._pdUpdateText = updateText;
    overlay._pdUpdateOptions = updateOptions;
    overlay._pdOpen = ()=>{
      updateText();
      updateOptions();
      overlay.classList.add("open");
      document.body.classList.add("pd-place-suggestion-open");
      nameField.input.focus();
    };
  }

  const originalClick = addButton.onclick;
  addButton.onclick = function(event){
    const selectedCategory = typeof cat !== "undefined" ? cat : document.querySelector(".cat.active")?.dataset.cat;
    if(selectedCategory === "events"){
      if(typeof originalClick === "function") return originalClick.call(addButton, event);
      return;
    }
    event?.preventDefault();
    overlay._pdOpen?.();
  };

  window.addEventListener("petsdogue:languagechange", ()=>{
    overlay._pdUpdateText?.();
    overlay._pdUpdateOptions?.();
  });
}

function pdInstallCompactFilterBar(){
  const root = document.getElementById("pdCategoryGroups");
  const tabs = root?.querySelector(".pd-category-group-tabs");
  const subfilters = root?.querySelector(".pd-category-group-subfilters");
  const policyFilters = document.getElementById("petPolicyFilters");
  const sortControl = document.getElementById("pdSortControl");
  if(!root || !tabs || !subfilters || !policyFilters || !sortControl || root.dataset.pdCompactReady === "true") return;

  root.dataset.pdCompactReady = "true";
  root.classList.add("pd-compact-filter-bar");
  const labels = {
    en:{category:"Category",policy:"Pet rules",all:"All",nearest:"Nearest",rating:"Top rated",popular:"Popular"},
    uk:{category:"Категорії",policy:"Правила",all:"Усі",nearest:"Поруч",rating:"Рейтинг",popular:"Популярні"},
    ru:{category:"Категории",policy:"Правила",all:"Все",nearest:"Рядом",rating:"Рейтинг",popular:"Популярные"},
    fr:{category:"Catégories",policy:"Règles",all:"Tout",nearest:"Proches",rating:"Mieux notés",popular:"Populaires"},
    de:{category:"Kategorien",policy:"Tierregeln",all:"Alle",nearest:"Nächste",rating:"Top bewertet",popular:"Beliebt"},
    es:{category:"Categorías",policy:"Normas",all:"Todo",nearest:"Cerca",rating:"Mejor valorados",popular:"Populares"},
    it:{category:"Categorie",policy:"Regole",all:"Tutti",nearest:"Vicini",rating:"Più votati",popular:"Popolari"},
    pt:{category:"Categorias",policy:"Regras",all:"Todos",nearest:"Perto",rating:"Mais bem avaliados",popular:"Populares"},
    nl:{category:"Categorieën",policy:"Regels",all:"Alles",nearest:"Dichtbij",rating:"Best beoordeeld",popular:"Populair"},
    pl:{category:"Kategorie",policy:"Zasady",all:"Wszystkie",nearest:"Najbliższe",rating:"Najwyżej oceniane",popular:"Popularne"},
    cs:{category:"Kategorie",policy:"Pravidla",all:"Vše",nearest:"Nejbližší",rating:"Nejlépe hodnocené",popular:"Oblíbené"},
    sk:{category:"Kategórie",policy:"Pravidlá",all:"Všetky",nearest:"Najbližšie",rating:"Najlepšie hodnotené",popular:"Obľúbené"},
    hu:{category:"Kategóriák",policy:"Szabályok",all:"Összes",nearest:"Közelben",rating:"Legjobbra értékelt",popular:"Népszerű"},
    ro:{category:"Categorii",policy:"Reguli",all:"Toate",nearest:"Aproape",rating:"Cele mai apreciate",popular:"Populare"},
    bg:{category:"Категории",policy:"Правила",all:"Всички",nearest:"Наблизо",rating:"Най-висок рейтинг",popular:"Популярни"},
    el:{category:"Κατηγορίες",policy:"Κανόνες",all:"Όλα",nearest:"Κοντά",rating:"Κορυφαία",popular:"Δημοφιλή"},
    sv:{category:"Kategorier",policy:"Regler",all:"Alla",nearest:"Närmast",rating:"Högst betyg",popular:"Populära"},
    da:{category:"Kategorier",policy:"Regler",all:"Alle",nearest:"Nærmest",rating:"Bedst vurderet",popular:"Populære"},
    no:{category:"Kategorier",policy:"Regler",all:"Alle",nearest:"Nærmest",rating:"Best vurdert",popular:"Populære"},
    fi:{category:"Kategoriat",policy:"Säännöt",all:"Kaikki",nearest:"Lähin",rating:"Parhaat arviot",popular:"Suositut"},
    tr:{category:"Kategoriler",policy:"Kurallar",all:"Tümü",nearest:"Yakında",rating:"En yüksek puan",popular:"Popüler"},
    ar:{category:"الفئات",policy:"قواعد الحيوانات",all:"الكل",nearest:"الأقرب",rating:"الأعلى تقييمًا",popular:"الأكثر شيوعًا"},
    hi:{category:"श्रेणियाँ",policy:"पालतू नियम",all:"सभी",nearest:"नज़दीकी",rating:"सबसे अच्छी रेटिंग",popular:"लोकप्रिय"}
  };
  const locale = ()=>labels[(aliases[lang] || lang || "en").toLowerCase()] || labels.en;
  const makeControl = (kind, icon, ariaLabel)=>{
    const control = document.createElement("div");
    control.className = `pd-compact-control pd-compact-${kind}`;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "pd-compact-trigger";
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", ariaLabel);
    const iconNode = document.createElement("span");
    iconNode.className = "pd-compact-icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    const labelNode = document.createElement("span");
    labelNode.className = "pd-compact-label";
    const chevron = document.createElement("span");
    chevron.className = "pd-compact-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "⌄";
    trigger.append(iconNode, labelNode, chevron);
    const menu = document.createElement("div");
    menu.className = "pd-compact-menu";
    menu.hidden = true;
    control.append(trigger, menu);
    trigger.addEventListener("click", ()=>{
      const opening = menu.hidden;
      closeMenus();
      menu.hidden = !opening;
      trigger.setAttribute("aria-expanded", String(opening));
      control.classList.toggle("open", opening);
    });
    return {control,trigger,labelNode,menu};
  };

  const category = makeControl("category", "▦", "Choose a category");
  const policy = makeControl("policy", "🐾", "Choose pet rules");
  const row = document.createElement("div");
  row.className = "pd-compact-filter-row";
  category.menu.classList.add("pd-category-menu");
  policy.menu.classList.add("pd-policy-menu");
  category.menu.append(tabs, subfilters);
  policy.menu.append(policyFilters);
  root.replaceChildren(row);
  row.append(category.control, policy.control, sortControl);
  sortControl.classList.add("pd-compact-control", "pd-compact-sort");

  function closeMenus(){
    root.querySelectorAll(".pd-compact-menu").forEach(menu=>{menu.hidden=true;});
    root.querySelectorAll(".pd-compact-trigger").forEach(button=>button.setAttribute("aria-expanded","false"));
    root.querySelectorAll(".pd-compact-control.open").forEach(control=>control.classList.remove("open"));
    const sortMenu = sortControl.querySelector(".pd-sort-menu");
    const sortTrigger = sortControl.querySelector(".pd-sort-trigger");
    if(sortMenu){sortMenu.hidden=true;sortControl.classList.remove("open");}
    if(sortTrigger) sortTrigger.setAttribute("aria-expanded","false");
  }

  function updateLabels(){
    const text = locale();
    const selectedGroup = tabs.querySelector('[role="tab"][aria-selected="true"]');
    const current = [...document.querySelectorAll(".categories .cat[data-cat]")].find(button=>button.classList.contains("active"));
    const categoryName = selectedGroup?.textContent.trim() || current?.querySelector("span")?.textContent.trim() || text.all;
    category.labelNode.textContent = `${text.category} · ${categoryName}`;
    const activePolicy = policyFilters.querySelector(".pet-policy-filter.active");
    const policyName = activePolicy?.textContent.trim() || text.all;
    policy.labelNode.textContent = `${text.policy} · ${policyName}`;
    category.trigger.setAttribute("aria-label", `${text.category}: ${categoryName}`);
    policy.trigger.setAttribute("aria-label", `${text.policy}: ${policyName}`);
    const select = document.getElementById("sort");
    const sortTrigger = sortControl.querySelector(".pd-sort-trigger");
    const sortLabel = sortTrigger?.firstElementChild;
    if(select && sortLabel){
      const key = select.value === "rating" ? "rating" : select.value === "popular" ? "popular" : "nearest";
      sortLabel.textContent = text[key];
      sortTrigger.setAttribute("aria-label", text[key]);
    }
  }

  document.addEventListener("click", event=>{if(!root.contains(event.target)) closeMenus();});
  document.addEventListener("keydown", event=>{if(event.key === "Escape") closeMenus();});
  policyFilters.addEventListener("click", event=>{if(event.target.closest(".pet-policy-filter")) setTimeout(updateLabels,0);});
  document.addEventListener("click", event=>{
    if(event.target.closest(".categories .cat[data-cat]") || event.target.closest(".pd-category-group-subfilter")) setTimeout(updateLabels,0);
    if(event.target.closest(".pd-category-group-tab")) setTimeout(updateLabels,0);
  });
  sortControl.querySelector(".pd-sort-trigger")?.addEventListener("click", ()=>{
    category.menu.hidden = true;
    policy.menu.hidden = true;
    category.trigger.setAttribute("aria-expanded","false");
    policy.trigger.setAttribute("aria-expanded","false");
    category.control.classList.remove("open");
    policy.control.classList.remove("open");
  });
  document.addEventListener("petsdogue:languagechange", ()=>setTimeout(updateLabels,0));
  document.getElementById("sort")?.addEventListener("change", ()=>setTimeout(updateLabels,0));
  updateLabels();
}

function pdInstallNextControlsStyles(){
  if(document.getElementById("pd-map-next-controls-style")) return;
  const style = document.createElement("style");
  style.id = "pd-map-next-controls-style";
  style.textContent = [
    ".pd-category-groups{display:grid;gap:6px;width:100%;margin:5px 0 2px;min-width:0}",
    ".pd-category-group-tabs,.pd-category-group-subfilters{display:flex;gap:7px;align-items:center;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:2px 1px 5px}",
    ".pd-category-group-tabs::-webkit-scrollbar,.pd-category-group-subfilters::-webkit-scrollbar{display:none}",
    ".pd-category-group-tab,.pd-category-group-subfilter{flex:0 0 auto;min-height:36px;border:1px solid #cfc5b4;border-radius:999px;background:#fffdf8;color:#171717;padding:0 12px;font-size:12px;font-weight:800;white-space:nowrap}",
    ".pd-category-group-tab[aria-selected=true],.pd-category-group-subfilter[aria-pressed=true]{background:#111;color:#f1d384;border-color:#111;box-shadow:0 3px 8px rgba(0,0,0,.18)}",
    ".pd-category-group-subfilter{min-height:34px;background:#f8f4eb}",
    ".pd-event-add-wrap .map-add{min-height:46px!important;border-radius:999px!important}",
    ".pd-compact-filter-bar{display:block!important;width:100%;margin:7px 0 2px!important;padding:0!important;min-width:0;position:relative;z-index:1100}",
    ".pd-compact-filter-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;align-items:start}",
    ".pd-compact-control{position:relative;min-width:0;flex:initial!important}",
    ".pd-compact-trigger{display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;width:100%!important;min-width:0!important;min-height:46px!important;padding:0 9px!important;border:1.5px solid #171717!important;border-radius:16px!important;background:#fffdf8!important;color:#111!important;box-shadow:0 2px 5px rgba(0,0,0,.08)!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important;overflow:hidden!important}",
    ".pd-compact-trigger:focus-visible{outline:3px solid #1d78f2!important;outline-offset:2px!important}",
    ".pd-compact-control.open>.pd-compact-trigger{background:#111!important;color:#f3cf63!important;border-color:#111!important}",
    ".pd-compact-icon{flex:0 0 auto;font-size:16px;line-height:1}",
    ".pd-compact-label{min-width:0;overflow:hidden;text-overflow:ellipsis}",
    ".pd-compact-chevron{flex:0 0 auto;font-size:16px;line-height:1;color:#8a6418}",
    ".pd-compact-menu{position:absolute;top:calc(100% + 7px);left:0;right:auto;z-index:20000;width:min(440px,calc(100vw - 28px));max-height:min(56vh,440px);overflow:auto;padding:12px;border:1px solid #d8d0c1;border-radius:18px;background:#fffdf8;box-shadow:0 16px 38px rgba(0,0,0,.22)}",
    ".pd-compact-menu[hidden]{display:none!important}",
    ".pd-compact-policy .pd-compact-menu{left:50%;transform:translateX(-50%)}",
    ".pd-compact-category .pd-category-group-tabs{border:0;padding:0 0 9px;margin:0 0 8px}",
    ".pd-compact-category .pd-category-group-subfilters{display:flex;flex-wrap:wrap;overflow:visible;padding:0;gap:7px}",
    ".pd-compact-category .pd-category-group-tab,.pd-compact-category .pd-category-group-subfilter{min-height:40px;font-size:13px}",
    ".pd-compact-policy .pet-policy-filters{display:flex!important;flex-wrap:wrap!important;overflow:visible!important;gap:8px!important;padding:0!important;margin:0!important}",
    ".pd-compact-policy .pet-policy-filter-label{width:100%;margin:0 0 3px;font-size:12px!important}",
    ".pd-compact-policy .pet-policy-filter{min-height:42px!important;padding:0 14px!important;font-size:12px!important}",
    ".pd-compact-sort .pd-sort-trigger{min-height:46px;max-width:none;width:100%;border:0;border-radius:0;background:transparent;box-shadow:none;padding:0;color:#111;font-size:12px;font-weight:900}",
    ".pd-compact-sort .pd-sort-chevron{display:none}",
    ".pd-compact-sort .pd-sort-trigger:before{content:'↕';font-size:16px;color:#111}",
    ".pd-compact-sort .pd-sort-menu{top:calc(100% + 7px);right:0;min-width:190px}",
    ".pd-compact-sort{min-height:46px;border:1.5px solid #171717;border-radius:16px;background:#fffdf8;box-shadow:0 2px 5px rgba(0,0,0,.08)}",
    "@media(max-width:610px){.pd-compact-filter-row{gap:6px}.pd-compact-trigger{min-height:43px!important;padding:0 6px!important;gap:4px!important;border-radius:13px!important;font-size:10px!important}.pd-compact-icon{font-size:14px}.pd-compact-chevron{font-size:14px}.pd-compact-menu{width:min(420px,calc(100vw - 24px));max-height:58vh;padding:10px}.pd-compact-policy .pd-compact-menu{left:auto;right:0;transform:none}.pd-compact-sort .pd-sort-trigger{min-height:43px;font-size:10px}.pd-compact-sort{min-height:43px;border-radius:13px}}",
    "#mapFull.map-full{position:absolute!important;right:14px!important;bottom:14px!important;left:auto!important;top:auto!important;z-index:1200!important;display:grid!important;place-items:center!important;width:58px!important;height:58px!important;min-width:58px!important;min-height:58px!important;padding:0!important;border:0!important;border-radius:14px!important;background:#0878f9!important;color:#fff!important;box-shadow:0 5px 16px rgba(0,75,190,.35)!important;font-size:30px!important;font-weight:900!important;line-height:1!important;cursor:pointer!important}",
    "#mapFull.map-full:hover{background:#0067e8!important;transform:translateY(-1px)}",
    "#mapFull.map-full:focus-visible{outline:3px solid #111!important;outline-offset:3px!important}",
    "#policySave.pd-policy-done{background:#65e51f!important;color:#111!important;border-color:#65e51f!important;font-weight:900!important}",
    ".pd-place-suggestion-overlay{display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.68);align-items:center;justify-content:center;padding:16px}",
    ".pd-place-suggestion-overlay.open{display:flex}",
    ".pd-place-suggestion-open{overflow:hidden}",
    ".pd-place-suggestion-dialog{width:min(560px,100%);max-height:min(88vh,820px);overflow:auto;background:#f7f2e8;color:#111;border:2px solid #111;border-radius:22px;box-shadow:0 20px 65px rgba(0,0,0,.35);padding:18px}",
    ".pd-place-suggestion-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;border-bottom:1px solid #d9d0c0;padding-bottom:10px;margin-bottom:12px}",
    ".pd-place-suggestion-header h2{font:400 27px/1.05 Georgia,serif;margin:0}",
    ".pd-place-suggestion-close{width:40px;height:40px;border:1px solid #111;border-radius:50%;background:#fff;font-size:25px;line-height:1}",
    ".pd-place-suggestion-form{display:grid;gap:11px}",
    ".pd-place-suggestion-field{display:grid;gap:5px;font-size:12px;font-weight:800}",
    ".pd-place-suggestion-field input,.pd-place-suggestion-field select{width:100%;min-height:44px;padding:9px 11px;border:1px solid #aaa08e;border-radius:11px;background:#fff;color:#111}",
    ".pd-place-suggestion-note,.pd-place-suggestion-local-only{margin:0;padding:10px 11px;border-radius:10px;font-size:12px;line-height:1.4}",
    ".pd-place-suggestion-note{background:#fff4d2;border:1px solid #d6b45e}",
    ".pd-place-suggestion-local-only{background:#f4e5e4;border:1px solid #c98d8b}",
    ".pd-place-suggestion-message{min-height:18px;margin:0;font-size:12px;font-weight:800}",
    ".pd-place-suggestion-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}",
    ".pd-place-suggestion-actions button{min-height:44px;border:1px solid #111;border-radius:999px;font-weight:900}",
    ".pd-place-suggestion-cancel{background:#fff;color:#111}",
    ".pd-place-suggestion-save{background:#65e51f;color:#111}",
    "@media(max-width:610px){.pd-category-group-tab,.pd-category-group-subfilter{min-height:36px;padding:0 10px;font-size:11px}.pd-place-suggestion-dialog{padding:15px;border-radius:18px}.pd-place-suggestion-header h2{font-size:24px}}"
  ].join("\n");
  document.head.appendChild(style);
}

function pdBoot(){
  pdInstallStyles();
  pdInstallPlacesLayout();
  pdInstallNextControlsStyles();
  pdInstallCategoryGroups();
  pdInstallSortControl();
  pdInstallCompactFilterBar();
  pdInstallFullMapBack();
  pdInstallPolicyDone();
  pdInstallAddPlaceDraft();
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
