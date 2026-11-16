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
    var title = escapeHTML(item.title || copy.source);
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
            escapeHTML(copy.source) +
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
      '<div class="pda-results" id="pdaResults"></div>';

    var styles = document.createElement("style");

    styles.textContent =
      '.pda-nearby{max-width:1120px;margin:16px auto 24px;padding:16px;background:#fffdf8;border:1px solid #c99729;box-shadow:0 10px 24px rgba(0,0,0,.08);scroll-margin-top:140px}' +
      '.pda-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}' +
      '.pda-kicker{margin:0 0 5px;color:#8a6825;font:800 10px/1.2 Arial,sans-serif;letter-spacing:.15em}' +
      '.pda-heading h2{margin:0;color:#111;font:400 clamp(25px,4vw,36px)/1 Georgia,serif}' +
      '.pda-subtitle{margin:6px 0 0;color:#625d54;font:14px/1.4 Arial,sans-serif}' +
      '.pda-area{margin:13px 0;color:#265b20;font:700 14px/1.4 Arial,sans-serif}' +
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

    if(!context){
      results.innerHTML =
        '<div class="pda-state">' +
        escapeHTML(copy.error) +
        '</div>';
      return;
    }

    var label =
      context.label ||
      (context.lat.toFixed(4) + ", " + context.lng.toFixed(4));

    area.textContent =
      "♥  " + label + " · " +
      context.radius + " " + copy.km;

    results.innerHTML =
      '<div class="pda-state">' +
      escapeHTML(copy.loading) +
      '</div>';

    var query = new URLSearchParams({
      lat:String(context.lat),
      lng:String(context.lng),
      radius:String(context.radius),
      lang:language,
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
          escapeHTML(copy.empty) +
          '</div>';

      panel.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    })
    .catch(function(error){
      console.warn("Nearby help requests failed:",error);

      results.innerHTML =
        '<div class="pda-state">' +
        escapeHTML(copy.error) +
        '</div>';

      panel.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",mount,{once:true});
  }else{
    mount();
  }
})();
