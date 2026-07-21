(function(){
"use strict";
const KEY="pets_dogue_language";
const CACHE_KEY="pets_dogue_translation_cache_v12";
const SOURCE="en";
const API="/api/translate";
const LANGUAGES=[
{code:"en",label:"English",short:"EN",dir:"ltr",speech:"en-GB"},
{code:"uk",label:"Українська",short:"UA",dir:"ltr",speech:"uk-UA"},
{code:"ru",label:"Русский",short:"RU",dir:"ltr",speech:"ru-RU"},
{code:"fr",label:"Français",short:"FR",dir:"ltr",speech:"fr-FR"},
{code:"de",label:"Deutsch",short:"DE",dir:"ltr",speech:"de-DE"},
{code:"es",label:"Español",short:"ES",dir:"ltr",speech:"es-ES"},
{code:"it",label:"Italiano",short:"IT",dir:"ltr",speech:"it-IT"},
{code:"pt",label:"Português",short:"PT",dir:"ltr",speech:"pt-PT"},
{code:"nl",label:"Nederlands",short:"NL",dir:"ltr",speech:"nl-NL"},
{code:"pl",label:"Polski",short:"PL",dir:"ltr",speech:"pl-PL"},
{code:"cs",label:"Čeština",short:"CZ",dir:"ltr",speech:"cs-CZ"},
{code:"sk",label:"Slovenčina",short:"SK",dir:"ltr",speech:"sk-SK"},
{code:"hu",label:"Magyar",short:"HU",dir:"ltr",speech:"hu-HU"},
{code:"ro",label:"Română",short:"RO",dir:"ltr",speech:"ro-RO"},
{code:"bg",label:"Български",short:"BG",dir:"ltr",speech:"bg-BG"},
{code:"el",label:"Ελληνικά",short:"GR",dir:"ltr",speech:"el-GR"},
{code:"sv",label:"Svenska",short:"SE",dir:"ltr",speech:"sv-SE"},
{code:"da",label:"Dansk",short:"DK",dir:"ltr",speech:"da-DK"},
{code:"no",label:"Norsk",short:"NO",dir:"ltr",speech:"nb-NO"},
{code:"fi",label:"Suomi",short:"FI",dir:"ltr",speech:"fi-FI"},
{code:"tr",label:"Türkçe",short:"TR",dir:"ltr",speech:"tr-TR"},
{code:"ar",label:"العربية",short:"AR",dir:"rtl",speech:"ar-SA"},
{code:"hi",label:"हिन्दी",short:"HI",dir:"ltr",speech:"hi-IN"}
];
const UI={
en:["Choose language","Your language stays active on every page.","Translating…","Translation is temporarily unavailable."],
uk:["Оберіть мову","Обрана мова діятиме на всіх сторінках.","Перекладаємо…","Переклад тимчасово недоступний."],
ru:["Выберите язык","Выбранный язык будет действовать на всех страницах.","Переводим…","Перевод временно недоступен."],
fr:["Choisissez la langue","Votre langue restera active sur toutes les pages.","Traduction…","La traduction est temporairement indisponible."],
de:["Sprache auswählen","Ihre Sprache bleibt auf allen Seiten aktiv.","Übersetzung…","Die Übersetzung ist vorübergehend nicht verfügbar."],
es:["Elige el idioma","Tu idioma seguirá activo en todas las páginas.","Traduciendo…","La traducción no está disponible temporalmente."],
it:["Scegli la lingua","La lingua scelta resterà attiva in tutte le pagine.","Traduzione…","La traduzione non è momentaneamente disponibile."],
pt:["Escolha o idioma","O idioma escolhido permanecerá ativo em todas as páginas.","A traduzir…","A tradução está temporariamente indisponível."],
nl:["Kies een taal","De gekozen taal blijft op elke pagina actief.","Vertalen…","Vertaling is tijdelijk niet beschikbaar."],
pl:["Wybierz język","Wybrany język pozostanie aktywny na każdej stronie.","Tłumaczenie…","Tłumaczenie jest chwilowo niedostępne."],
cs:["Vyberte jazyk","Vybraný jazyk zůstane aktivní na všech stránkách.","Překládáme…","Překlad je dočasně nedostupný."],
sk:["Vyberte jazyk","Vybraný jazyk zostane aktívny na všetkých stránkach.","Prekladáme…","Preklad je dočasne nedostupný."],
hu:["Válasszon nyelvet","A kiválasztott nyelv minden oldalon aktív marad.","Fordítás…","A fordítás átmenetileg nem érhető el."],
ro:["Alegeți limba","Limba aleasă va rămâne activă pe toate paginile.","Se traduce…","Traducerea este indisponibilă temporar."],
bg:["Изберете език","Избраният език ще остане активен на всички страници.","Превеждаме…","Преводът временно не е наличен."],
el:["Επιλέξτε γλώσσα","Η επιλεγμένη γλώσσα θα παραμένει ενεργή σε όλες τις σελίδες.","Μετάφραση…","Η μετάφραση δεν είναι προσωρινά διαθέσιμη."],
sv:["Välj språk","Det valda språket förblir aktivt på alla sidor.","Översätter…","Översättning är tillfälligt otillgänglig."],
da:["Vælg sprog","Det valgte sprog forbliver aktivt på alle sider.","Oversætter…","Oversættelse er midlertidigt utilgængelig."],
no:["Velg språk","Det valgte språket forblir aktivt på alle sider.","Oversetter…","Oversettelse er midlertidig utilgjengelig."],
fi:["Valitse kieli","Valittu kieli pysyy käytössä kaikilla sivuilla.","Käännetään…","Käännös ei ole tilapäisesti käytettävissä."],
tr:["Dil seçin","Seçilen dil tüm sayfalarda etkin kalacaktır.","Çevriliyor…","Çeviri geçici olarak kullanılamıyor."],
ar:["اختر اللغة","ستظل اللغة المختارة مفعلة في جميع الصفحات.","جارٍ الترجمة…","الترجمة غير متاحة مؤقتًا."],
hi:["भाषा चुनें","चुनी हुई भाषा हर पेज पर सक्रिय रहेगी।","अनुवाद हो रहा है…","अनुवाद अस्थायी रूप से उपलब्ध नहीं है।"]};
const EXCLUDED="script,style,noscript,code,pre,svg,iframe,canvas,video,audio";
const ATTRS=["placeholder","title","aria-label","alt"];
const PROTECTED=new Set(["PETS & DOGUE","DOGUE","PETS &amp; DOGUE","Miso","DOGUE Trust","DOGUE Verified"]);
let language=readLanguage()||SOURCE, busy=false, version=0, observer=null, timer=null, cache=readCache();
const originals=new WeakMap(), attrs=new WeakMap();
function lang(code){return LANGUAGES.find(x=>x.code===code)||LANGUAGES[0]}
function readLanguage(){try{const x=localStorage.getItem(KEY);return LANGUAGES.some(y=>y.code===x)?x:""}catch(e){return""}}
function saveLanguage(x){try{localStorage.setItem(KEY,x)}catch(e){}}
function readCache(){try{const x=JSON.parse(localStorage.getItem(CACHE_KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch(e){return{}}}
function saveCache(){try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch(e){}}
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)+"_"+s.length}
function normal(s){return String(s||"").replace(/\s+/g," ").trim()}
function letters(s){try{return /\p{L}/u.test(s)}catch(e){return /[A-Za-zА-Яа-яЁёІіЇїЄє]/.test(s)}}
function should(s){s=normal(s);return !!(s&&s.length>1&&letters(s)&&!PROTECTED.has(s)&&!/^(https?:\/\/|mailto:|tel:|javascript:)/i.test(s))}
function protectedEl(el){return !el||el.matches(EXCLUDED)||!!el.closest(EXCLUDED+",#pd-language-button,#pd-language-overlay,#pd-status,[translate='no'],.notranslate,[data-pd-no-translate],[data-pd-brand]")}
function protectBrands(root){if(!root||!root.querySelectorAll)return;root.querySelectorAll(".brand,.brand-small,.brand-big,.logo,.logo-small,.logo-big,.footer-brand,[data-pd-brand],[translate='no'],.notranslate").forEach(el=>{el.classList.add("notranslate");el.setAttribute("translate","no")});root.querySelectorAll("*").forEach(el=>{if(!el.children.length&&PROTECTED.has(normal(el.textContent))){el.classList.add("notranslate");el.setAttribute("translate","no")}})}
function rememberNode(n){if(!originals.has(n))originals.set(n,n.nodeValue)}
function rememberAttr(el,n){let a=attrs.get(el);if(!a){a={};attrs.set(el,a)}if(a[n]===undefined)a[n]=el.getAttribute(n)||""}
function rememberTitle(){if(document.documentElement.dataset.pdOriginalTitle===undefined)document.documentElement.dataset.pdOriginalTitle=document.title||""}
function restore(root){if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(w.nextNode()){const n=w.currentNode;if(originals.has(n))n.nodeValue=originals.get(n)}const els=[];if(root.nodeType===1)els.push(root);if(root.querySelectorAll)els.push(...root.querySelectorAll("*"));els.forEach(el=>{const a=attrs.get(el);if(a)Object.keys(a).forEach(k=>el.setAttribute(k,a[k]))});if(document.documentElement.dataset.pdOriginalTitle!==undefined)document.title=document.documentElement.dataset.pdOriginalTitle}
function collect(root){const items=[];const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentElement;if(!p||protectedEl(p))return NodeFilter.FILTER_REJECT;rememberNode(n);return should(originals.get(n))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});while(w.nextNode()){const n=w.currentNode,o=originals.get(n)||"";items.push({type:"text",node:n,original:o,request:normal(o)})}const els=[];if(root.nodeType===1)els.push(root);if(root.querySelectorAll)els.push(...root.querySelectorAll("*"));els.forEach(el=>{if(protectedEl(el))return;ATTRS.forEach(name=>{if(!el.hasAttribute(name))return;rememberAttr(el,name);const o=(attrs.get(el)||{})[name]||"";if(should(o))items.push({type:"attr",el,name,original:o,request:normal(o)})})});rememberTitle();const t=document.documentElement.dataset.pdOriginalTitle||"";if(should(t))items.push({type:"title",original:t,request:normal(t)});return items}
function cached(code,text){const x=cache[code]&&cache[code][hash(text)];return x&&x.original===text?x.translation:""}
function batches(xs){const out=[];let b=[],n=0;xs.forEach(x=>{if(b.length>=40||(b.length&&n+x.length>18000)){out.push(b);b=[];n=0}b.push(x);n+=x.length});if(b.length)out.push(b);return out}
async function request(texts,target){const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sourceLanguage:SOURCE,targetLanguage:target,texts})});let d={};try{d=await r.json()}catch(e){}if(!r.ok)throw new Error(d.error||"Translation request failed");if(!Array.isArray(d.translations)||d.translations.length!==texts.length)throw new Error("Invalid translation response");return d.translations}
async function getTranslations(texts,target){const unique=[...new Set(texts)],result=new Map(),missing=[];unique.forEach(t=>{const c=cached(target,t);c?result.set(t,c):missing.push(t)});for(const b of batches(missing)){const tr=await request(b,target);b.forEach((o,i)=>{const v=String(tr[i]||o);result.set(o,v);cache[target]=cache[target]||{};cache[target][hash(o)]={original:o,translation:v}});saveCache()}return result}
function apply(item,value){if(typeof value!=="string"||!value.trim())return;if(item.type==="text"){const l=(item.original.match(/^\s*/)||[""])[0],r=(item.original.match(/\s*$/)||[""])[0];item.node.nodeValue=l+value+r}else if(item.type==="attr")item.el.setAttribute(item.name,value);else document.title=value}
function direction(){const l=lang(language);document.documentElement.lang=l.code;document.documentElement.dir=l.dir;if(document.body)document.body.classList.toggle("pd-rtl",l.dir==="rtl")}
function styles(){if(document.getElementById("pd-language-styles"))return;const s=document.createElement("style");s.id="pd-language-styles";s.textContent=`.languages{display:none!important}#pd-language-button{position:fixed;right:14px;bottom:14px;z-index:2147483000;height:52px;padding:0 17px;border:3px solid #111;border-radius:999px;background:#65e51f;color:#111;font:900 15px Arial,sans-serif;box-shadow:0 14px 38px rgba(0,0,0,.28)}#pd-language-overlay{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.78)}#pd-language-overlay.open{display:flex}#pd-language-modal{width:min(720px,100%);max-height:88vh;overflow:auto;background:#f8f7f3;border:3px solid #111;border-radius:30px}.pd-head{display:flex;justify-content:space-between;align-items:center;padding:20px;background:#111;color:#fff}.pd-head h2{font:normal 30px Georgia,serif}.pd-close{width:42px;height:42px;border:0;border-radius:50%;background:#fff;font-size:24px}.pd-intro{padding:18px 20px 4px;color:#555}.pd-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:15px 20px 22px}.pd-option{display:flex;justify-content:space-between;align-items:center;min-height:58px;padding:12px 14px;border:2px solid #111;border-radius:17px;background:#fff;font-weight:800}.pd-option.active{background:#65e51f}.pd-code{font-size:11px;color:#666}#pd-status{position:fixed;left:50%;bottom:20px;z-index:2147482999;padding:11px 16px;border-radius:999px;background:#111;color:#fff;font:700 13px Arial,sans-serif;opacity:0;visibility:hidden;transform:translate(-50%,10px);transition:.2s}#pd-status.show{opacity:1;visibility:visible;transform:translate(-50%,0)}body.pd-rtl #pd-language-button{right:auto;left:14px}@media(max-width:600px){.pd-grid{grid-template-columns:1fr;padding:12px}#pd-status{bottom:76px}}`;document.head.appendChild(s)}
function protect(el){el.classList.add("notranslate");el.setAttribute("translate","no");el.setAttribute("data-pd-no-translate","true")}
function interfaceUI(){if(document.getElementById("pd-language-button"))return;const b=document.createElement("button");b.id="pd-language-button";b.type="button";protect(b);const overlay=document.createElement("div");overlay.id="pd-language-overlay";protect(overlay);const modal=document.createElement("div");modal.id="pd-language-modal";const head=document.createElement("div");head.className="pd-head";const h=document.createElement("h2");h.id="pd-title";const close=document.createElement("button");close.className="pd-close";close.type="button";close.textContent="×";head.append(h,close);const intro=document.createElement("p");intro.className="pd-intro";intro.id="pd-intro";const grid=document.createElement("div");grid.className="pd-grid";LANGUAGES.forEach(l=>{const o=document.createElement("button");o.type="button";o.className="pd-option";o.dataset.language=l.code;o.innerHTML=`<span>${l.label}</span><span class="pd-code">${l.short}</span>`;o.onclick=()=>changeLanguage(l.code);grid.appendChild(o)});modal.append(head,intro,grid);overlay.appendChild(modal);const status=document.createElement("div");status.id="pd-status";protect(status);b.onclick=()=>{overlay.classList.add("open");document.body.style.overflow="hidden"};close.onclick=closeMenu;overlay.onclick=e=>{if(e.target===overlay)closeMenu()};document.body.append(b,overlay,status);updateUI()}
function closeMenu(){const o=document.getElementById("pd-language-overlay");if(o)o.classList.remove("open");document.body.style.overflow=""}
function updateUI(){const l=lang(language),u=UI[language]||UI.en,b=document.getElementById("pd-language-button");if(b)b.textContent="🌐 "+l.short;const h=document.getElementById("pd-title"),i=document.getElementById("pd-intro");if(h)h.textContent=u[0];if(i)i.textContent=u[1];document.querySelectorAll(".pd-option").forEach(x=>x.classList.toggle("active",x.dataset.language===language))}
function show(msg){const s=document.getElementById("pd-status");if(s){s.textContent=msg;s.classList.add("show")}}
function hide(){const s=document.getElementById("pd-status");if(s)s.classList.remove("show")}
async function translate(root=document.body){if(!root||busy)return;const my=++version,l=lang(language);direction();updateUI();protectBrands(root);rememberTitle();if(l.code===SOURCE){busy=true;restore(root);busy=false;hide();return}busy=true;show((UI[language]||UI.en)[2]);try{const items=collect(root);if(!items.length)return;const map=await getTranslations(items.map(x=>x.request),l.code);if(my!==version||l.code!==language)return;items.forEach(x=>apply(x,map.get(x.request)))}catch(e){console.error("PETS & DOGUE translation error",e);show((UI[language]||UI.en)[3]);setTimeout(hide,4000);return}finally{busy=false}setTimeout(hide,200)}
async function changeLanguage(code){version++;busy=true;restore(document.body);busy=false;language=lang(code).code;saveLanguage(language);direction();updateUI();closeMenu();await translate(document.body)}
function observe(){if(observer||!document.body)return;observer=new MutationObserver(ms=>{if(busy)return;let added=false;ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){protectBrands(n);added=true}else if(n.nodeType===3&&should(n.nodeValue))added=true}));if(added&&language!==SOURCE){clearTimeout(timer);timer=setTimeout(()=>translate(document.body),350)}});observer.observe(document.body,{childList:true,subtree:true})}
function restoreNavigation(){language=readLanguage()||SOURCE;direction();updateUI();if(language===SOURCE)restore(document.body);else setTimeout(()=>translate(document.body),80)}
async function init(){language=readLanguage()||SOURCE;styles();interfaceUI();protectBrands(document);rememberTitle();direction();updateUI();observe();await translate(document.body)}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});window.addEventListener("pageshow",restoreNavigation);window.addEventListener("popstate",()=>setTimeout(restoreNavigation,80));if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
window.PetsDogueLanguage={languages:LANGUAGES,getCurrentLanguage:()=>lang(language),getSpeechLanguage:()=>lang(language).speech,changeLanguage,setLanguage:changeLanguage,translatePage:translate,restore:restoreNavigation,open:()=>document.getElementById("pd-language-overlay")?.classList.add("open"),close:closeMenu,translate:(key,fallback)=>fallback||key};
})();
