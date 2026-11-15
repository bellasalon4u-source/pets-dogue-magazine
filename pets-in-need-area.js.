(function(){
  "use strict";

  var params = new URLSearchParams(window.location.search);

  /* This module stays inactive unless opened from the Pet-Friendly map. */
  if (params.get("from") !== "map") return;

  var language = String(
    params.get("lang") ||
    document.documentElement.lang ||
    "en"
  ).toLowerCase().split("-")[0].split("_")[0];

  var aliases = { ua:"uk", cz:"cs", gr:"el", se:"sv", dk:"da" };
  language = aliases[language] || language;

  var TEXT = {
    en:{title:"Help needed near you",subtitle:"Public help requests in the selected area",loading:"Finding help nearby…",empty:"No public help requests were found in this area yet.",error:"Nearby help is temporarily unavailable. Please try again.",open:"View source",back:"Back to map",km:"km",source:"Public listing"},
    uk:{title:"Допомога поруч",subtitle:"Відкриті запити про допомогу у вибраному районі",loading:"Шукаємо запити поблизу…",empty:"Поки що в цьому районі не знайдено відкритих запитів про допомогу.",error:"Зараз не вдалося завантажити запити поблизу. Спробуйте ще раз.",open:"Переглянути джерело",back:"Назад до карти",km:"км",source:"Відкрите оголошення"},
    ru:{title:"Кому нужна помощь рядом",subtitle:"Открытые запросы о помощи в выбранном районе",loading:"Ищем запросы поблизости…",empty:"Пока в этом районе не найдено открытых запросов о помощи.",error:"Сейчас не удалось загрузить запросы поблизости. Попробуйте ещё раз.",open:"Открыть источник",back:"Назад к карте",km:"км",source:"Открытое объявление"},
    fr:{title:"Aide près de chez vous",subtitle:"Demandes publiques dans la zone sélectionnée",loading:"Recherche d’aide à proximité…",empty:"Aucune demande publique n’a encore été trouvée dans cette zone.",error:"Les demandes à proximité sont momentanément indisponibles. Réessayez.",open:"Voir la source",back:"Retour à la carte",km:"km",source:"Annonce publique"},
    de:{title:"Hilfe in Ihrer Nähe",subtitle:"Öffentliche Hilfegesuche im ausgewählten Gebiet",loading:"Suche nach Hilfe in der Nähe…",empty:"In diesem Gebiet wurden noch keine öffentlichen Hilfegesuche gefunden.",error:"Hilfegesuche in der Nähe sind derzeit nicht verfügbar. Bitte erneut versuchen.",open:"Quelle ansehen",back:"Zurück zur Karte",km:"km",source:"Öffentliche Anzeige"},
    es:{title:"Ayuda cerca de ti",subtitle:"Solicitudes públicas en la zona seleccionada",loading:"Buscando ayuda cercana…",empty:"Todavía no se encontraron solicitudes públicas de ayuda en esta zona.",error:"La ayuda cercana no está disponible temporalmente. Inténtalo de nuevo.",open:"Ver fuente",back:"Volver al mapa",km:"km",source:"Anuncio público"},
    it:{title:"Aiuto vicino a te",subtitle:"Richieste pubbliche nella zona selezionata",loading:"Cerco richieste nelle vicinanze…",empty:"Al momento non sono state trovate richieste pubbliche in questa zona.",error:"Le richieste vicine non sono disponibili al momento. Riprova.",open:"Apri la fonte",back:"Torna alla mappa",km:"km",source:"Annuncio pubblico"},
    pt:{title:"Ajuda perto de si",subtitle:"Pedidos públicos na área selecionada",loading:"A procurar ajuda nas proximidades…",empty:"Ainda não foram encontrados pedidos públicos de ajuda nesta área.",error:"Os pedidos próximos estão temporariamente indisponíveis. Tente novamente.",open:"Ver fonte",back:"Voltar ao mapa",km:"km",source:"Anúncio público"},
    nl:{title:"Hulp bij jou in de buurt",subtitle:"Openbare hulpvragen in het geselecteerde gebied",loading:"Hulp in de buurt zoeken…",empty:"Er zijn nog geen openbare hulpvragen in dit gebied gevonden.",error:"Hulpvragen in de buurt zijn tijdelijk niet beschikbaar. Probeer opnieuw.",open:"Bron bekijken",back:"Terug naar de kaart",km:"km",source:"Openbare oproep"},
    pl:{title:"Pomoc w pobliżu",subtitle:"Publiczne prośby o pomoc w wybranym obszarze",loading:"Szukamy pomocy w pobliżu…",empty:"Nie znaleziono jeszcze publicznych próśb o pomoc w tej okolicy.",error:"Prośby o pomoc w pobliżu są chwilowo niedostępne. Spróbuj ponownie.",open:"Zobacz źródło",back:"Wróć do mapy",km:"km",source:"Publiczne ogłoszenie"},
    cs:{title:"Pomoc ve vašem okolí",subtitle:"Veřejné žádosti o pomoc ve vybrané oblasti",loading:"Hledáme pomoc v okolí…",empty:"V této oblasti zatím nebyly nalezeny žádné veřejné žádosti o pomoc.",error:"Žádosti o pomoc v okolí jsou dočasně nedostupné. Zkuste to znovu.",open:"Zobrazit zdroj",back:"Zpět na mapu",km:"km",source:"Veřejný inzerát"},
    sk:{title:"Pomoc vo vašom okolí",subtitle:"Verejné žiadosti o pomoc vo vybranej oblasti",loading:"Hľadáme pomoc v okolí…",empty:"V tejto oblasti sa zatiaľ nenašli žiadne verejné žiadosti o pomoc.",error:"Žiadosti o pomoc v okolí sú dočasne nedostupné. Skúste to znova.",open:"Zobraziť zdroj",back:"Späť na mapu",km:"km",source:"Verejný inzerát"},
    hu:{title:"Segítség a közelben",subtitle:"Nyilvános segítségkérések a kiválasztott környéken",loading:"Közeli segítséget keresünk…",empty:"Ezen a környéken még nem találtunk nyilvános segítségkérést.",error:"A közeli segítségkérések most nem érhetők el. Próbáld újra.",open:"Forrás megnyitása",back:"Vissza a térképhez",km:"km",source:"Nyilvános hirdetés"},
    ro:{title:"Ajutor în apropiere",subtitle:"Cereri publice de ajutor în zona selectată",loading:"Căutăm ajutor în apropiere…",empty:"Nu au fost găsite încă cereri publice de ajutor în această zonă.",error:"Cererile din apropiere nu sunt disponibile momentan. Încearcă din nou.",open:"Vezi sursa",back:"Înapoi la hartă",km:"km",source:"Anunț public"},
    bg:{title:"Помощ наблизо",subtitle:"Публични заявки за помощ в избрания район",loading:"Търсим помощ наблизо…",empty:"В този район все още няма намерени публични заявки за помощ.",error:"Заявките наблизо временно не са достъпни. Опитайте отново.",open:"Отвори източника",back:"Назад към картата",km:"км",source:"Публична обява"},
    el:{title:"Βοήθεια κοντά σας",subtitle:"Δημόσια αιτήματα βοήθειας στην επιλεγμένη περιοχή",loading:"Αναζήτηση βοήθειας κοντά σας…",empty:"Δεν βρέθηκαν ακόμη δημόσια αιτήματα βοήθειας σε αυτήν την περιοχή.",error:"Τα κοντινά αιτήματα βοήθειας δεν είναι προσωρινά διαθέσιμα. Δοκιμάστε ξανά.",open:"Προβολή πηγής",back:"Επιστροφή στον χάρτη",km:"χλμ",source:"Δημόσια αγγελία"},
    sv:{title:"Hjälp i närheten",subtitle:"Offentliga hjälpförfrågningar i det valda området",loading:"Söker efter hjälp i närheten…",empty:"Inga offentliga hjälpförfrågningar hittades i området ännu.",error:"Hjälpförfrågningar i närheten är tillfälligt otillgängliga. Försök igen.",open:"Visa källa",back:"Tillbaka till kartan",km:"km",source:"Offentlig annons"},
    da:{title:"Hjælp i nærheden",subtitle:"Offentlige hjælpeforespørgsler i det valgte område",loading:"Søger efter hjælp i nærheden…",empty:"Der blev endnu ikke fundet offentlige hjælpeforespørgsler i området.",error:"Hjælpeforespørgsler i nærheden er midlertidigt utilgængelige. Prøv igen.",open:"Se kilde",back:"Tilbage til kortet",km:"km",source:"Offentlig annonce"},
    no:{title:"Hjelp i nærheten",subtitle:"Offentlige hjelpeforespørsler i det valgte området",loading:"Søker etter hjelp i nærheten…",empty:"Ingen offentlige hjelpeforespørsler ble funnet i området ennå.",error:"Hjelpeforespørsler i nærheten er midlertidig utilgjengelige. Prøv igjen.",open:"Vis kilde",back:"Tilbake til kartet",km:"km",source:"Offentlig annonse"},
    fi:{title:"Apua lähelläsi",subtitle:"Julkiset avunpyynnöt valitulla alueella",loading:"Etsitään apua lähialueelta…",empty:"Alueelta ei vielä löytynyt julkisia avunpyyntöjä.",error:"Lähialueen avunpyynnöt eivät ole nyt saatavilla. Yritä uudelleen.",open:"Avaa lähde",back:"Takaisin karttaan",km:"km",source:"Julkinen ilmoitus"},
    tr:{title:"Yakınınızdaki yardım çağrıları",subtitle:"Seçilen bölgedeki herkese açık yardım talepleri",loading:"Yakındaki yardım talepleri aranıyor…",empty:"Bu bölgede henüz herkese açık bir yardım talebi bulunamadı.",error:"Yakındaki yardım talepleri şu anda kullanılamıyor. Lütfen tekrar deneyin.",open:"Kaynağı görüntüle",back:"Haritaya dön",km:"km",source:"Herkese açık ilan"},
    ar:{title:"مساعدة بالقرب منك",subtitle:"طلبات المساعدة العامة في المنطقة المحددة",loading:"جارٍ البحث عن مساعدة قريبة…",empty:"لم يتم العثور على طلبات مساعدة عامة في هذه المنطقة بعد.",error:"طلبات المساعدة القريبة غير متاحة مؤقتًا. حاول مرة أخرى.",open:"عرض المصدر",back:"العودة إلى الخريطة",km:"كم",source:"إعلان عام"},
    hi:{title:"आपके पास मदद",subtitle:"चुने गए क्षेत्र में सार्वजनिक सहायता अनुरोध",loading:"आस-पास मदद खोजी जा रही है…",empty:"इस क्षेत्र में अभी कोई सार्वजनिक सहायता अनुरोध नहीं मिला।",error:"आस-पास के अनुरोध अभी उपलब्ध नहीं हैं। कृपया फिर कोशिश करें।",open:"स्रोत देखें",back:"मैप पर वापस जाएँ",km:"किमी",source:"सार्वजनिक पोस्ट"}
  };

  var copy = TEXT[language] || TEXT.en;
  var contextKey = "pets_dogue_help_area_context";
  var helpTypes = new Set(["lost","seen","found","help","volunteers","foster","adoption"]);

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
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    }catch(error){
      return "";
    }
  }

  function loadContext(){
    try{
      var data = JSON.parse(sessionStorage.getItem(contextKey) || "null");
      if(!data) return null;

      var lat = Number(data.lat);
      var lng = Number(data.lng);
      var radius = Number(data.radius);

      if(!Number.isFinite(lat) || lat < -90 || lat > 90) return null;
      if(!Number.isFinite(lng) || lng < -180 || lng > 180) return null;

      return {
        lat:lat,
        lng:lng,
        radius:Math.min(50,Math.max(1,Number.isFinite(radius) ? radius : 15)),
        label:String(data.label || "")
      };
    }catch(error){
      return null;
    }
  }

  function cardHTML(item){
    var title = escapeHTML(item.title || copy.source);
    var description = escapeHTML(item.description || "");
    var location = escapeHTML(item.location || item.address || "");
    var distance = typeof item.distanceKm === "number" ? item.distanceKm : NaN;
    var distanceLabel = Number.isFinite(distance)
      ? '<span>' + distance.toFixed(1) + ' ' + copy.km + '</span>'
      : "";
    var imageURL = safeURL(item.image);
    var image = imageURL
      ? '<img class="pda-image" src="' + escapeHTML(imageURL) + '" alt="" loading="lazy" referrerpolicy="no-referrer">'
      : '<span class="pda-heart" aria-hidden="true">♥</span>';
    var source = safeURL(item.url);
    var action = source
      ? '<a class="pda-open" href="' + escapeHTML(source) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(copy.open) + ' ↗</a>'
      : "";

    return '<article class="pda-card">' + image +
      '<div class="pda-copy"><span class="pda-source">' + escapeHTML(item.source || copy.source) + '</span>' +
      '<h3>' + title + '</h3><p>' + description + '</p>' +
      '<div class="pda-meta">' + (location ? '<span>' + location + '</span>' : "") + distanceLabel + '</div>' +
      action + '</div></article>';
  }

  function mount(){
    var anchor = document.getElementById("help-now");
    if(!anchor || document.getElementById("pdaNearby")) return;

    var panel = document.createElement("section");
    panel.id = "pdaNearby";
    panel.className = "pda-nearby";
    panel.setAttribute("aria-live","polite");
    panel.innerHTML =
      '<header class="pda-heading"><div><p class="pda-kicker">PETS &amp; DOGUE · HELP</p>' +
      '<h2>' + escapeHTML(copy.title) + '</h2><p class="pda-subtitle">' + escapeHTML(copy.subtitle) + '</p></div>' +
      '<button class="pda-back" type="button">' + escapeHTML(copy.back) + '</button></header>' +
      '<p class="pda-area" id="pdaArea"></p><div class="pda-results" id="pdaResults"></div>';

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
      '.pda-open{display:inline-flex;margin-top:7px;color:#111;font:800 11px/1.2 Arial,sans-serif;text-decoration:underline;text-underline-offset:2px}' +
      '.pda-back{flex:0 0 auto;min-height:38px;padding:0 12px;border:1px solid #111;border-radius:99px;background:#111;color:#fff;font:800 11px/1 Arial,sans-serif}' +
      '.pda-state{grid-column:1/-1;padding:16px;border:1px solid #d9d1c1;background:#f4efe4;color:#4d473e;font:14px/1.5 Arial,sans-serif}' +
      '@media(max-width:680px){.pda-nearby{margin:12px 10px 18px;padding:12px}.pda-heading{align-items:flex-start}.pda-heading h2{font-size:27px}.pda-results{grid-template-columns:1fr}.pda-card{grid-template-columns:64px minmax(0,1fr);gap:8px;padding:8px}.pda-image,.pda-heart{width:64px;height:64px}.pda-back{min-height:35px;padding:0 9px;font-size:10px}}';
    document.head.appendChild(styles);

    anchor.parentNode.insertBefore(panel,anchor);

    var area = panel.querySelector("#pdaArea");
    var results = panel.querySelector("#pdaResults");
    var backButton = panel.querySelector(".pda-back");

    backButton.addEventListener("click",function(){
      var canReturn = false;
      try{
        var ref = new URL(document.referrer,window.location.href);
        canReturn = ref.origin === window.location.origin && /pet-friendly-places\.html$/.test(ref.pathname);
      }catch(error){}
      if(canReturn) window.history.back();
      else window.location.href = "/pet-friendly-places.html?lang=" + encodeURIComponent(language);
    });

    var context = loadContext();

    if(!context){
      results.innerHTML = '<div class="pda-state">' + escapeHTML(copy.error) + '</div>';
      return;
    }

    var label = context.label || (context.lat.toFixed(4) + ", " + context.lng.toFixed(4));
    area.textContent = "♥  " + label + " · " + context.radius + " " + copy.km;
    results.innerHTML = '<div class="pda-state">' + escapeHTML(copy.loading) + '</div>';

    var query = new URLSearchParams({
      location:context.label,
      lat:String(context.lat),
      lng:String(context.lng),
      radius:String(context.radius),
      lang:language,
      limit:"60"
    });

    fetch("/api/community-discovery?" + query.toString(),{
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

      var items = data.items
        .filter(function(item){
          return helpTypes.has(String(item.type || "").toLowerCase());
        })
        .sort(function(a,b){
          var da = typeof a.distanceKm === "number" ? a.distanceKm : Infinity;
          var db = typeof b.distanceKm === "number" ? b.distanceKm : Infinity;
          return da - db;
        });

      var actualArea = data.query && (data.query.canonicalLocation || data.query.location);
      if(actualArea){
        area.textContent = "♥  " + actualArea + " · " + context.radius + " " + copy.km;
      }

      results.innerHTML = items.length
        ? items.map(cardHTML).join("")
        : '<div class="pda-state">' + escapeHTML(copy.empty) + '</div>';
      panel.scrollIntoView({behavior:"smooth",block:"start"});
    })
    .catch(function(error){
      console.warn("Nearby help discovery failed:",error);
      results.innerHTML = '<div class="pda-state">' + escapeHTML(copy.error) + '</div>';
      panel.scrollIntoView({behavior:"smooth",block:"start"});
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",mount,{once:true});
  }else{
    mount();
  }
})();
