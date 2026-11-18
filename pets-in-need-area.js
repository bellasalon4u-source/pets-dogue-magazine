(function(){
  "use strict";

  var params = new URLSearchParams(window.location.search);

  /* This screen is opened from the Pet-Friendly map only. */
  if(params.get("from") !== "map") return;

  var language = String(
    params.get("lang") ||
    document.documentElement.lang ||
    "en"
  ).toLowerCase().split(/[-_]/)[0];

  var aliases = {
    ua:"uk",
    cz:"cs",
    gr:"el",
    se:"sv",
    dk:"da"
  };

  language = aliases[language] || language;

  var TEXT = {
    en:{
      title:"Help needed near you",
      subtitle:"Approved help requests in the selected area",
      loading:"Finding help nearby…",
      empty:"There are no approved help requests in this area yet.",
      error:"Nearby help is temporarily unavailable. Please try again.",
      back:"Back to map",
      km:"km",
      source:"PETS & DOGUE · HELP"
    },
    uk:{
      title:"Допомога поруч",
      subtitle:"Схвалені запити про допомогу у вибраному районі",
      loading:"Шукаємо допомогу поблизу…",
      empty:"У цьому районі поки немає схвалених запитів про допомогу.",
      error:"Зараз не вдалося завантажити запити поблизу. Спробуйте ще раз.",
      back:"Назад до карти",
      km:"км",
      source:"PETS & DOGUE · ДОПОМОГА"
    },
    ru:{
      title:"Кому нужна помощь рядом",
      subtitle:"Одобренные запросы о помощи в выбранном районе",
      loading:"Ищем помощь поблизости…",
      empty:"В этом районе пока нет одобренных запросов о помощи.",
      error:"Сейчас не удалось загрузить запросы поблизости. Попробуйте ещё раз.",
      back:"Назад к карте",
      km:"км",
      source:"PETS & DOGUE · ПОМОЩЬ"
    },
    fr:{
      title:"Aide près de chez vous",
      subtitle:"Demandes approuvées dans la zone sélectionnée",
      loading:"Recherche d’aide à proximité…",
      empty:"Aucune demande approuvée dans cette zone pour le moment.",
      error:"Les demandes à proximité sont momentanément indisponibles. Réessayez.",
      back:"Retour à la carte",
      km:"km",
      source:"PETS & DOGUE · AIDE"
    },
    de:{
      title:"Hilfe in Ihrer Nähe",
      subtitle:"Genehmigte Hilfegesuche im ausgewählten Gebiet",
      loading:"Suche nach Hilfe in der Nähe…",
      empty:"In diesem Gebiet gibt es noch keine genehmigten Hilfegesuche.",
      error:"Hilfegesuche in der Nähe sind derzeit nicht verfügbar. Bitte erneut versuchen.",
      back:"Zurück zur Karte",
      km:"km",
      source:"PETS & DOGUE · HILFE"
    },
    es:{
      title:"Ayuda cerca de ti",
      subtitle:"Solicitudes aprobadas en la zona seleccionada",
      loading:"Buscando ayuda cercana…",
      empty:"Todavía no hay solicitudes aprobadas en esta zona.",
      error:"La ayuda cercana no está disponible temporalmente. Inténtalo de nuevo.",
      back:"Volver al mapa",
      km:"km",
      source:"PETS & DOGUE · AYUDA"
    },
    it:{
      title:"Aiuto vicino a te",
      subtitle:"Richieste approvate nella zona selezionata",
      loading:"Cerco aiuto nelle vicinanze…",
      empty:"Al momento non ci sono richieste approvate in questa zona.",
      error:"Le richieste vicine non sono disponibili al momento. Riprova.",
      back:"Torna alla mappa",
      km:"km",
      source:"PETS & DOGUE · AIUTO"
    },
    pt:{
      title:"Ajuda perto de si",
      subtitle:"Pedidos aprovados na área selecionada",
      loading:"A procurar ajuda nas proximidades…",
      empty:"Ainda não existem pedidos aprovados nesta área.",
      error:"Os pedidos próximos estão temporariamente indisponíveis. Tente novamente.",
      back:"Voltar ao mapa",
      km:"km",
      source:"PETS & DOGUE · AJUDA"
    },
    nl:{
      title:"Hulp bij jou in de buurt",
      subtitle:"Goedgekeurde hulpvragen in het geselecteerde gebied",
      loading:"Hulp in de buurt zoeken…",
      empty:"Er zijn nog geen goedgekeurde hulpvragen in dit gebied.",
      error:"Hulpvragen in de buurt zijn tijdelijk niet beschikbaar. Probeer opnieuw.",
      back:"Terug naar de kaart",
      km:"km",
      source:"PETS & DOGUE · HULP"
    },
    pl:{
      title:"Pomoc w pobliżu",
      subtitle:"Zatwierdzone prośby o pomoc w wybranym obszarze",
      loading:"Szukamy pomocy w pobliżu…",
      empty:"W tej okolicy nie ma jeszcze zatwierdzonych próśb o pomoc.",
      error:"Prośby o pomoc w pobliżu są chwilowo niedostępne. Spróbuj ponownie.",
      back:"Wróć do mapy",
      km:"km",
      source:"PETS & DOGUE · POMOC"
    },
    cs:{
      title:"Pomoc ve vašem okolí",
      subtitle:"Schválené žádosti o pomoc ve vybrané oblasti",
      loading:"Hledáme pomoc v okolí…",
      empty:"V této oblasti zatím nejsou žádné schválené žádosti o pomoc.",
      error:"Žádosti o pomoc v okolí jsou dočasně nedostupné. Zkuste to znovu.",
      back:"Zpět na mapu",
      km:"km",
      source:"PETS & DOGUE · POMOC"
    },
    sk:{
      title:"Pomoc vo vašom okolí",
      subtitle:"Schválené žiadosti o pomoc vo vybranej oblasti",
      loading:"Hľadáme pomoc v okolí…",
      empty:"V tejto oblasti zatiaľ nie sú žiadne schválené žiadosti o pomoc.",
      error:"Žiadosti o pomoc v okolí sú dočasne nedostupné. Skúste to znova.",
      back:"Späť na mapu",
      km:"km",
      source:"PETS & DOGUE · POMOC"
    },
    hu:{
      title:"Segítség a közelben",
      subtitle:"Jóváhagyott segítségkérések a kiválasztott környéken",
      loading:"Közeli segítséget keresünk…",
      empty:"Ezen a környéken még nincs jóváhagyott segítségkérés.",
      error:"A közeli segítségkérések most nem érhetők el. Próbáld újra.",
      back:"Vissza a térképhez",
      km:"km",
      source:"PETS & DOGUE · SEGÍTSÉG"
    },
    ro:{
      title:"Ajutor în apropiere",
      subtitle:"Cereri aprobate de ajutor în zona selectată",
      loading:"Căutăm ajutor în apropiere…",
      empty:"Nu există încă cereri aprobate de ajutor în această zonă.",
      error:"Cererile din apropiere nu sunt disponibile momentan. Încearcă din nou.",
      back:"Înapoi la hartă",
      km:"km",
      source:"PETS & DOGUE · AJUTOR"
    },
    bg:{
      title:"Помощ наблизо",
      subtitle:"Одобрени заявки за помощ в избрания район",
      loading:"Търсим помощ наблизо…",
      empty:"В този район все още няма одобрени заявки за помощ.",
      error:"Заявките наблизо временно не са достъпни. Опитайте отново.",
      back:"Назад към картата",
      km:"км",
      source:"PETS & DOGUE · ПОМОЩ"
    },
    el:{
      title:"Βοήθεια κοντά σας",
      subtitle:"Εγκεκριμένα αιτήματα βοήθειας στην επιλεγμένη περιοχή",
      loading:"Αναζήτηση βοήθειας κοντά σας…",
      empty:"Δεν υπάρχουν ακόμη εγκεκριμένα αιτήματα βοήθειας σε αυτήν την περιοχή.",
      error:"Τα κοντινά αιτήματα βοήθειας δεν είναι προσωρινά διαθέσιμα. Δοκιμάστε ξανά.",
      back:"Επιστροφή στον χάρτη",
      km:"χλμ",
      source:"PETS & DOGUE · ΒΟΗΘΕΙΑ"
    },
    sv:{
      title:"Hjälp i närheten",
      subtitle:"Godkända hjälpförfrågningar i det valda området",
      loading:"Söker efter hjälp i närheten…",
      empty:"Inga godkända hjälpförfrågningar har hittats i området ännu.",
      error:"Hjälpförfrågningar i närheten är tillfälligt otillgängliga. Försök igen.",
      back:"Tillbaka till kartan",
      km:"km",
      source:"PETS & DOGUE · HJÄLP"
    },
    da:{
      title:"Hjælp i nærheden",
      subtitle:"Godkendte hjælpeforespørgsler i det valgte område",
      loading:"Søger efter hjælp i nærheden…",
      empty:"Der er endnu ingen godkendte hjælpeforespørgsler i området.",
      error:"Hjælpeforespørgsler i nærheden er midlertidigt utilgængelige. Prøv igen.",
      back:"Tilbage til kortet",
      km:"km",
      source:"PETS & DOGUE · HJÆLP"
    },
    no:{
      title:"Hjelp i nærheten",
      subtitle:"Godkjente hjelpeforespørsler i det valgte området",
      loading:"Søker etter hjelp i nærheten…",
      empty:"Det finnes ingen godkjente hjelpeforespørsler i området ennå.",
      error:"Hjelpeforespørsler i nærheten er midlertidig utilgjengelige. Prøv igjen.",
      back:"Tilbake til kartet",
      km:"km",
      source:"PETS & DOGUE · HJELP"
    },
    fi:{
      title:"Apua lähelläsi",
      subtitle:"Hyväksytyt avunpyynnöt valitulla alueella",
      loading:"Etsitään apua lähialueelta…",
      empty:"Alueelta ei vielä löydy hyväksyttyjä avunpyyntöjä.",
      error:"Lähialueen avunpyynnöt eivät ole nyt saatavilla. Yritä uudelleen.",
      back:"Takaisin karttaan",
      km:"km",
      source:"PETS & DOGUE · APU"
    },
    tr:{
      title:"Yakınınızdaki yardım çağrıları",
      subtitle:"Seçilen bölgedeki onaylanmış yardım talepleri",
      loading:"Yakındaki yardım talepleri aranıyor…",
      empty:"Bu bölgede henüz onaylanmış bir yardım talebi yok.",
      error:"Yakındaki yardım talepleri şu anda kullanılamıyor. Lütfen tekrar deneyin.",
      back:"Haritaya dön",
      km:"km",
      source:"PETS & DOGUE · YARDIM"
    },
    ar:{
      title:"مساعدة بالقرب منك",
      subtitle:"طلبات المساعدة المعتمدة في المنطقة المحددة",
      loading:"جارٍ البحث عن مساعدة قريبة…",
      empty:"لا توجد طلبات مساعدة معتمدة في هذه المنطقة حتى الآن.",
      error:"طلبات المساعدة القريبة غير متاحة مؤقتًا. حاول مرة أخرى.",
      back:"العودة إلى الخريطة",
      km:"كم",
      source:"PETS & DOGUE · المساعدة"
    },
    hi:{
      title:"आपके पास मदद",
      subtitle:"चुने गए क्षेत्र में स्वीकृत सहायता अनुरोध",
      loading:"आस-पास मदद खोजी जा रही है…",
      empty:"इस क्षेत्र में अभी कोई स्वीकृत सहायता अनुरोध नहीं है।",
      error:"आस-पास के अनुरोध अभी उपलब्ध नहीं हैं। कृपया फिर कोशिश करें।",
      back:"मैप पर वापस जाएँ",
      km:"किमी",
      source:"PETS & DOGUE · सहायता"
    }
  };

  var copy = TEXT[language] || TEXT.en;
  var LISTING_TEXT = {
    en:["Help requests","Walking & pet sitting","Approved walking and pet-sitting offers in the selected area","Finding walking and pet-sitting offers…","There are no approved walking or pet-sitting offers in this area yet.","Walking and pet-sitting offers are temporarily unavailable. Please try again.","PETS & DOGUE · WALKING & PET SITTING"],
    uk:["Запити про допомогу","Вигул і догляд","Схвалені оголошення про вигул і догляд у вибраному районі","Шукаємо оголошення про вигул і догляд…","У цьому районі поки немає схвалених оголошень про вигул і догляд.","Оголошення про вигул і догляд тимчасово недоступні. Спробуйте ще раз.","PETS & DOGUE · ВИГУЛ І ДОГЛЯД"],
    ru:["Запросы о помощи","Выгул и присмотр","Одобренные объявления о выгуле и присмотре в выбранном районе","Ищем объявления о выгуле и присмотре…","В этом районе пока нет одобренных объявлений о выгуле и присмотре.","Объявления о выгуле и присмотре временно недоступны. Попробуйте ещё раз.","PETS & DOGUE · ВЫГУЛ И ПРИСМОТР"],
    fr:["Demandes d’aide","Promenade et garde","Offres approuvées de promenade et de garde dans la zone sélectionnée","Recherche d’offres de promenade et de garde…","Aucune offre approuvée de promenade ou de garde dans cette zone pour le moment.","Les offres de promenade et de garde sont temporairement indisponibles. Réessayez.","PETS & DOGUE · PROMENADE ET GARDE"],
    de:["Hilfegesuche","Gassi gehen und Betreuung","Genehmigte Angebote für Gassi gehen und Betreuung im ausgewählten Gebiet","Suche Angebote für Gassi gehen und Betreuung…","In diesem Gebiet gibt es noch keine genehmigten Angebote für Gassi gehen oder Betreuung.","Angebote für Gassi gehen und Betreuung sind vorübergehend nicht verfügbar. Bitte erneut versuchen.","PETS & DOGUE · GASSI UND BETREUUNG"],
    es:["Solicitudes de ayuda","Paseos y cuidado","Ofertas aprobadas de paseo y cuidado en la zona seleccionada","Buscando ofertas de paseo y cuidado…","Todavía no hay ofertas aprobadas de paseo o cuidado en esta zona.","Las ofertas de paseo y cuidado no están disponibles temporalmente. Inténtalo de nuevo.","PETS & DOGUE · PASEOS Y CUIDADO"],
    it:["Richieste di aiuto","Passeggiate e cura","Offerte approvate per passeggiate e cura nella zona selezionata","Cerco offerte di passeggiate e cura…","Al momento non ci sono offerte approvate per passeggiate o cura in questa zona.","Le offerte di passeggiate e cura non sono temporaneamente disponibili. Riprova.","PETS & DOGUE · PASSEGGIATE E CURA"],
    pt:["Pedidos de ajuda","Passeios e cuidados","Ofertas aprovadas de passeios e cuidados na área selecionada","A procurar ofertas de passeios e cuidados…","Ainda não existem ofertas aprovadas de passeios ou cuidados nesta área.","As ofertas de passeios e cuidados estão temporariamente indisponíveis. Tente novamente.","PETS & DOGUE · PASSEIOS E CUIDADOS"],
    nl:["Hulpvragen","Uitlaten en oppassen","Goedgekeurde aanbiedingen voor uitlaten en oppassen in het geselecteerde gebied","Aanbiedingen voor uitlaten en oppassen zoeken…","Er zijn nog geen goedgekeurde aanbiedingen voor uitlaten of oppassen in dit gebied.","Aanbiedingen voor uitlaten en oppassen zijn tijdelijk niet beschikbaar. Probeer opnieuw.","PETS & DOGUE · UITLATEN EN OPPASSEN"],
    pl:["Prośby o pomoc","Spacery i opieka","Zatwierdzone oferty spacerów i opieki w wybranym obszarze","Szukamy ofert spacerów i opieki…","W tej okolicy nie ma jeszcze zatwierdzonych ofert spacerów ani opieki.","Oferty spacerów i opieki są chwilowo niedostępne. Spróbuj ponownie.","PETS & DOGUE · SPACERY I OPIEKA"],
    cs:["Žádosti o pomoc","Venčení a hlídání","Schválené nabídky venčení a hlídání ve vybrané oblasti","Hledáme nabídky venčení a hlídání…","V této oblasti zatím nejsou žádné schválené nabídky venčení ani hlídání.","Nabídky venčení a hlídání jsou dočasně nedostupné. Zkuste to znovu.","PETS & DOGUE · VENČENÍ A HLÍDÁNÍ"],
    sk:["Žiadosti o pomoc","Venčenie a stráženie","Schválené ponuky venčenia a stráženia vo vybranej oblasti","Hľadáme ponuky venčenia a stráženia…","V tejto oblasti zatiaľ nie sú žiadne schválené ponuky venčenia ani stráženia.","Ponuky venčenia a stráženia sú dočasne nedostupné. Skúste to znova.","PETS & DOGUE · VENČENIE A STRÁŽENIE"],
    hu:["Segítségkérések","Sétáltatás és felügyelet","Jóváhagyott sétáltatási és felügyeleti ajánlatok a kiválasztott környéken","Sétáltatási és felügyeleti ajánlatokat keresünk…","Ezen a környéken még nincs jóváhagyott sétáltatási vagy felügyeleti ajánlat.","A sétáltatási és felügyeleti ajánlatok átmenetileg nem érhetők el. Próbáld újra.","PETS & DOGUE · SÉTÁLTATÁS ÉS FELÜGYELET"],
    ro:["Cereri de ajutor","Plimbare și îngrijire","Oferte aprobate de plimbare și îngrijire în zona selectată","Căutăm oferte de plimbare și îngrijire…","Nu există încă oferte aprobate de plimbare sau îngrijire în această zonă.","Ofertele de plimbare și îngrijire nu sunt disponibile momentan. Încearcă din nou.","PETS & DOGUE · PLIMBARE ȘI ÎNGRIJIRE"],
    bg:["Заявки за помощ","Разходка и гледане","Одобрени обяви за разходка и гледане в избрания район","Търсим обяви за разходка и гледане…","В този район все още няма одобрени обяви за разходка или гледане.","Обявите за разходка и гледане временно не са достъпни. Опитайте отново.","PETS & DOGUE · РАЗХОДКА И ГЛЕДАНЕ"],
    el:["Αιτήματα βοήθειας","Βόλτα και φύλαξη","Εγκεκριμένες προσφορές βόλτας και φύλαξης στην επιλεγμένη περιοχή","Αναζήτηση προσφορών βόλτας και φύλαξης…","Δεν υπάρχουν ακόμη εγκεκριμένες προσφορές βόλτας ή φύλαξης σε αυτήν την περιοχή.","Οι προσφορές βόλτας και φύλαξης δεν είναι προσωρινά διαθέσιμες. Δοκιμάστε ξανά.","PETS & DOGUE · ΒΟΛΤΑ ΚΑΙ ΦΥΛΑΞΗ"],
    sv:["Hjälpförfrågningar","Promenad och passning","Godkända erbjudanden om promenad och passning i det valda området","Söker efter erbjudanden om promenad och passning…","Inga godkända erbjudanden om promenad eller passning har hittats i området ännu.","Erbjudanden om promenad och passning är tillfälligt otillgängliga. Försök igen.","PETS & DOGUE · PROMENAD OCH PASSNING"],
    da:["Hjælpeforespørgsler","Gåture og pasning","Godkendte tilbud om gåture og pasning i det valgte område","Søger efter tilbud om gåture og pasning…","Der er endnu ingen godkendte tilbud om gåture eller pasning i området.","Tilbud om gåture og pasning er midlertidigt utilgængelige. Prøv igen.","PETS & DOGUE · GÅTURE OG PASNING"],
    no:["Hjelpeforespørsler","Lufting og pass","Godkjente tilbud om lufting og pass i det valgte området","Søker etter tilbud om lufting og pass…","Det finnes ingen godkjente tilbud om lufting eller pass i området ennå.","Tilbud om lufting og pass er midlertidig utilgjengelige. Prøv igjen.","PETS & DOGUE · LUFTING OG PASS"],
    fi:["Avunpyynnöt","Ulkoilutus ja hoito","Hyväksytyt ulkoilutus- ja hoitotarjoukset valitulla alueella","Etsitään ulkoilutus- ja hoitotarjouksia…","Alueelta ei vielä löydy hyväksyttyjä ulkoilutus- tai hoitotarjouksia.","Ulkoilutus- ja hoitotarjoukset eivät ole nyt saatavilla. Yritä uudelleen.","PETS & DOGUE · ULKOILUTUS JA HOITO"],
    tr:["Yardım talepleri","Gezdirme ve bakım","Seçilen bölgedeki onaylanmış gezdirme ve bakım ilanları","Gezdirme ve bakım ilanları aranıyor…","Bu bölgede henüz onaylanmış gezdirme veya bakım ilanı yok.","Gezdirme ve bakım ilanları şu anda kullanılamıyor. Lütfen tekrar deneyin.","PETS & DOGUE · GEZDİRME VE BAKIM"],
    ar:["طلبات المساعدة","التنزه والرعاية","عروض معتمدة للتنزه ورعاية الحيوانات في المنطقة المحددة","جارٍ البحث عن عروض التنزه والرعاية…","لا توجد عروض معتمدة للتنزه أو الرعاية في هذه المنطقة حتى الآن.","عروض التنزه والرعاية غير متاحة مؤقتًا. حاول مرة أخرى.","PETS & DOGUE · التنزه والرعاية"],
    hi:["मदद के अनुरोध","घुमाना और देखभाल","चुने गए क्षेत्र में घुमाने और देखभाल के स्वीकृत विज्ञापन","घुमाने और देखभाल के विज्ञापन खोजे जा रहे हैं…","इस क्षेत्र में अभी घुमाने या देखभाल का कोई स्वीकृत विज्ञापन नहीं है।","घुमाने और देखभाल के विज्ञापन अभी उपलब्ध नहीं हैं। कृपया फिर कोशिश करें।","PETS & DOGUE · घुमाना और देखभाल"]
  };

  var listingLanguage = LISTING_TEXT[language] || LISTING_TEXT.en;
  var activeKind = params.get("kind") === "service_offer"
    ? "service_offer"
    : "request";
  var contextKey = "pets_dogue_help_area_context";

  function escapeHTML(value){
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }

  function safeURL(value){
    try{
      var url = new URL(String(value || ""),window.location.href);
      return url.protocol === "http:" || url.protocol === "https:"
        ? url.href
        : "";
    }catch(error){
      return "";
    }
  }

  function loadContext(){
    try{
      var data = JSON.parse(
        sessionStorage.getItem(contextKey) || "null"
      );

      if(!data) return null;

      var lat = Number(data.lat);
      var lng = Number(data.lng);
      var radius = Number(data.radius);

      if(!Number.isFinite(lat) || lat < -90 || lat > 90) return null;
      if(!Number.isFinite(lng) || lng < -180 || lng > 180) return null;

      return {
        lat:lat,
        lng:lng,
        radius:Math.min(
          100,
          Math.max(1,Number.isFinite(radius) ? radius : 15)
        ),
        label:String(data.label || "")
      };
    }catch(error){
      return null;
    }
  }

  function cardHTML(item){
    var isServiceOffer = item.kind === "service_offer";
    var sourceLabel = isServiceOffer
      ? listingLanguage[6]
      : copy.source;
    var title = escapeHTML(item.title || sourceLabel);
    var description = escapeHTML(item.description || "");
    var location = escapeHTML(item.location_label || "");
    var distance = Number(item.distance_km);
    var imageURL = safeURL(item.image_url);

    var distanceLabel = Number.isFinite(distance)
      ? '<span>' + distance.toFixed(1) + ' ' +
        escapeHTML(copy.km) + '</span>'
      : "";

    var image = imageURL
      ? '<img class="pda-image" src="' +
        escapeHTML(imageURL) +
        '" alt="" loading="lazy" referrerpolicy="no-referrer">'
      : '<span class="pda-heart" aria-hidden="true">♥</span>';

    return (
      '<article class="pda-card">' +
        image +
        '<div class="pda-copy">' +
          '<span class="pda-source">' +
            escapeHTML(sourceLabel) +
          '</span>' +
          '<h3>' + title + '</h3>' +
          '<p>' + description + '</p>' +
          '<div class="pda-meta">' +
            (location ? '<span>' + location + '</span>' : "") +
            distanceLabel +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function mount(){
    var anchor = document.getElementById("help-now");

    if(!anchor || document.getElementById("pdaNearby")) return;

    var panel = document.createElement("section");
    panel.id = "pdaNearby";
    panel.className = "pda-nearby";
    panel.setAttribute("aria-live","polite");

    panel.innerHTML =
      '<header class="pda-heading">' +
        '<div>' +
          '<p class="pda-kicker">' +
            escapeHTML(copy.source) +
          '</p>' +
          '<h2>' + escapeHTML(copy.title) + '</h2>' +
          '<p class="pda-subtitle">' +
            escapeHTML(copy.subtitle) +
          '</p>' +
        '</div>' +
        '<button class="pda-back" type="button">' +
          escapeHTML(copy.back) +
        '</button>' +
      '</header>' +
      '<p class="pda-area" id="pdaArea"></p>' +
      '<div class="pda-tabs" role="tablist" aria-label="' +
        escapeHTML(copy.title) + '">' +
        '<button class="pda-tab" type="button" role="tab" data-kind="request"></button>' +
        '<button class="pda-tab" type="button" role="tab" data-kind="service_offer"></button>' +
      '</div>' +
      '<div class="pda-results" id="pdaResults"></div>';

    var styles = document.createElement("style");

    styles.textContent =
      '.pda-nearby{max-width:1120px;margin:16px auto 24px;padding:16px;background:#fffdf8;border:1px solid #c99729;box-shadow:0 10px 24px rgba(0,0,0,.08);scroll-margin-top:140px}' +
      '.pda-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}' +
      '.pda-kicker{margin:0 0 5px;color:#8a6825;font:800 10px/1.2 Arial,sans-serif;letter-spacing:.15em}' +
      '.pda-heading h2{margin:0;color:#111;font:400 clamp(25px,4vw,36px)/1 Georgia,serif}' +
      '.pda-subtitle{margin:6px 0 0;color:#625d54;font:14px/1.4 Arial,sans-serif}' +
      '.pda-area{margin:13px 0;color:#265b20;font:700 14px/1.4 Arial,sans-serif}' +
      '.pda-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px}' +
      '.pda-tab{min-height:38px;padding:0 14px;border:1px solid #c9bea8;border-radius:999px;background:#fff;color:#171717;font:800 12px/1.2 Arial,sans-serif;cursor:pointer}' +
      '.pda-tab[aria-selected="true"]{border-color:#c99729;background:#111;color:#fff;box-shadow:0 2px 0 #c99729}' +
      '.pda-results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}' +
      '.pda-card{min-width:0;display:grid;grid-template-columns:70px minmax(0,1fr);gap:10px;padding:9px;border:1px solid #d9d1c1;background:#fff}' +
      '.pda-image,.pda-heart{width:70px;height:70px;object-fit:cover;border-radius:5px}' +
      '.pda-heart{display:grid;place-items:center;background:#111;color:#ed1b35;font:35px/1 Arial,sans-serif}' +
      '.pda-copy{min-width:0}.pda-source{color:#8b692a;font:800 9px/1.3 Arial,sans-serif;letter-spacing:.07em;text-transform:uppercase;overflow-wrap:anywhere}' +
      '.pda-card h3{margin:4px 0;color:#151515;font:700 15px/1.2 Arial,sans-serif;overflow-wrap:anywhere}' +
      '.pda-card p{margin:0;color:#5f5b54;font:12px/1.4 Arial,sans-serif;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}' +
      '.pda-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:6px;color:#6d675d;font:10px/1.3 Arial,sans-serif}' +
      '.pda-back{flex:0 0 auto;min-height:38px;padding:0 12px;border:1px solid #111;border-radius:99px;background:#111;color:#fff;font:800 11px/1 Arial,sans-serif}' +
      '.pda-state{grid-column:1/-1;padding:16px;border:1px solid #d9d1c1;background:#f4efe4;color:#4d473e;font:14px/1.5 Arial,sans-serif}' +
      '@media(max-width:680px){.pda-nearby{margin:12px 10px 18px;padding:12px}.pda-heading{align-items:flex-start}.pda-heading h2{font-size:27px}.pda-results{grid-template-columns:1fr}.pda-card{grid-template-columns:64px minmax(0,1fr);gap:8px;padding:8px}.pda-image,.pda-heart{width:64px;height:64px}.pda-back{min-height:35px;padding:0 9px;font-size:10px}}' +
      'html[dir="rtl"] .pda-heading{direction:rtl}';

    document.head.appendChild(styles);
    anchor.parentNode.insertBefore(panel,anchor);

    var area = panel.querySelector("#pdaArea");
    var results = panel.querySelector("#pdaResults");
    var backButton = panel.querySelector(".pda-back");
    var subtitle = panel.querySelector(".pda-subtitle");
    var kicker = panel.querySelector(".pda-kicker");
    var tabs = Array.prototype.slice.call(
      panel.querySelectorAll(".pda-tab")
    );
    var context = loadContext();

    backButton.addEventListener("click",function(){
      var canReturn = false;

      try{
        var ref = new URL(document.referrer,window.location.href);
        canReturn =
          ref.origin === window.location.origin &&
          /pet-friendly-places\.html$/.test(ref.pathname);
      }catch(error){}

      if(canReturn){
        window.history.back();
      }else{
        window.location.href =
          "/pet-friendly-places.html?lang=" +
          encodeURIComponent(language);
      }
    });

    function loadListings(kind,shouldScroll){
      activeKind = kind === "service_offer"
        ? "service_offer"
        : "request";

      var isServices = activeKind === "service_offer";
      tabs.forEach(function(tab){
        var selected = tab.getAttribute("data-kind") === activeKind;
        tab.setAttribute("aria-selected",selected ? "true" : "false");
        tab.setAttribute("tabindex",selected ? "0" : "-1");
      });

      kicker.textContent = isServices
        ? listingLanguage[6]
        : copy.source;
      subtitle.textContent = isServices
        ? listingLanguage[2]
        : copy.subtitle;

      if(!context){
        results.innerHTML =
          '<div class="pda-state">' +
          escapeHTML(copy.error) +
          '</div>';
        return;
      }

      results.innerHTML =
        '<div class="pda-state">' +
        escapeHTML(isServices ? listingLanguage[3] : copy.loading) +
        '</div>';

      var query = new URLSearchParams({
        lat:String(context.lat),
        lng:String(context.lng),
        radius:String(context.radius),
        lang:language,
        kind:activeKind,
        limit:"60"
      });

      fetch("/api/help-requests?" + query.toString(),{
        method:"GET",
        headers:{Accept:"application/json"}
      })
      .then(function(response){
        if(!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function(data){
        if(!data || data.ok !== true || !Array.isArray(data.items)){
          throw new Error("Invalid response");
        }

        results.innerHTML = data.items.length
          ? data.items.map(cardHTML).join("")
          : '<div class="pda-state">' +
            escapeHTML(isServices ? listingLanguage[4] : copy.empty) +
            '</div>';

        if(shouldScroll){
          panel.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });
        }
      })
      .catch(function(error){
        console.warn("Nearby help listings failed:",error);

        results.innerHTML =
          '<div class="pda-state">' +
          escapeHTML(isServices ? listingLanguage[5] : copy.error) +
          '</div>';

        if(shouldScroll){
          panel.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });
        }
      });
    }

    var label =
      context
        ? (context.label || (context.lat.toFixed(4) + ", " + context.lng.toFixed(4)))
        : "";

    area.textContent = context
      ? "♥  " + label + " · " + context.radius + " " + copy.km
      : "";

    tabs.forEach(function(tab){
      tab.textContent = listingLanguage[
        tab.getAttribute("data-kind") === "service_offer" ? 1 : 0
      ];
      tab.addEventListener("click",function(){
        loadListings(tab.getAttribute("data-kind"),false);
      });
    });

    loadListings(activeKind,true);

  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",mount,{once:true});
  }else{
    mount();
  }
})();
