window.PetsDogueTranslations=window.PetsDogueTranslations||{};
window.PetsDogueTranslations.article=window.PetsDogueTranslations.article||{};

(function(){
"use strict";

const A=window.PetsDogueTranslations.article;

if(!A.en){
console.error("PETS & DOGUE: article.en translations are missing.");
return;
}

const E=A.en;

/*
=========================================================
ARTICLE TRANSLATION NORMALISATION
=========================================================

Этот блок сохраняет все уже существующие переводы из файла
и делает структуру одинаковой для каждого языка.

Также он автоматически создаёт две статьи, ссылки на которые
уже используются в article.html:

?story=wellness
?story=fashion

Текст для них не переводится на английский:
он собирается из уже локализованных текстов соответствующего
языка, поэтому RU остаётся RU, UK остаётся UK, AR остаётся AR
и т.д.
=========================================================
*/

function clone(value){

if(value==null){
return value;
}

try{
return JSON.parse(JSON.stringify(value));
}catch(error){
return value;
}

}

function valueOr(value,fallback){

if(
value===undefined ||
value===null ||
value===""
){
return fallback;
}

return value;

}

function ensureObject(parent,key){

if(
!parent[key] ||
typeof parent[key]!=="object" ||
Array.isArray(parent[key])
){
parent[key]={};
}

return parent[key];

}

function makeWellnessStory(t){

const d=t.default||E.default;
const r=t.related||E.related;
const body=d.body||E.default.body||{};
const tags=d.tags||E.default.tags||{};

return{
category:valueOr(
tags.wellbeing,
valueOr(d.category,E.default.category)
),

title:valueOr(
r.wellnessTitle,
E.related.wellnessTitle
),

intro:valueOr(
r.wellnessDescription,
E.related.wellnessDescription
),

author:valueOr(
d.author,
E.default.author
),

date:valueOr(
d.date,
E.default.date
),

readingTime:valueOr(
d.readingTime,
E.default.readingTime
),

metaDescription:valueOr(
r.wellnessDescription,
E.related.wellnessDescription
),

body:[
{
type:"text",
text:valueOr(
body.p2,
E.default.body.p2
)
},
{
type:"heading",
text:valueOr(
body.h2b,
E.default.body.h2b
)
},
{
type:"text",
text:valueOr(
body.p5,
E.default.body.p5
)
},
{
type:"text",
text:valueOr(
body.p6,
E.default.body.p6
)
},
{
type:"quote",
text:valueOr(
body.quote,
E.default.body.quote
)
},
{
type:"heading",
text:valueOr(
body.h2d,
E.default.body.h2d
)
},
{
type:"text",
text:valueOr(
body.p9,
E.default.body.p9
)
},
{
type:"text",
text:valueOr(
body.p10,
E.default.body.p10
)
},
{
type:"text",
text:valueOr(
body.p11,
E.default.body.p11
)
}
]
};

}

function makeFashionStory(t){

const d=t.default||E.default;
const r=t.related||E.related;
const body=d.body||E.default.body||{};
const tags=d.tags||E.default.tags||{};

return{
category:valueOr(
tags.design,
valueOr(d.category,E.default.category)
),

title:valueOr(
r.fashionTitle,
E.related.fashionTitle
),

intro:valueOr(
r.fashionDescription,
E.related.fashionDescription
),

author:valueOr(
d.author,
E.default.author
),

date:valueOr(
d.date,
E.default.date
),

readingTime:valueOr(
d.readingTime,
E.default.readingTime
),

metaDescription:valueOr(
r.fashionDescription,
E.related.fashionDescription
),

body:[
{
type:"text",
text:valueOr(
body.p3,
E.default.body.p3
)
},
{
type:"heading",
text:valueOr(
body.h2c,
E.default.body.h2c
)
},
{
type:"text",
text:valueOr(
body.p7,
E.default.body.p7
)
},
{
type:"text",
text:valueOr(
body.p8,
E.default.body.p8
)
},
{
type:"quote",
text:valueOr(
body.quote,
E.default.body.quote
)
},
{
type:"heading",
text:valueOr(
body.h2a,
E.default.body.h2a
)
},
{
type:"text",
text:valueOr(
body.p4,
E.default.body.p4
)
},
{
type:"heading",
text:valueOr(
body.h2d,
E.default.body.h2d
)
},
{
type:"text",
text:valueOr(
body.p11,
E.default.body.p11
)
}
]
};

}

/*
=========================================================
NORMALISE EVERY SUPPORTED LANGUAGE
=========================================================
*/

Object.keys(A).forEach(code=>{

const t=A[code];

if(
!t ||
typeof t!=="object"
){
return;
}

ensureObject(t,"ui");
ensureObject(t,"default");
ensureObject(t,"sidebar");
ensureObject(t,"related");
ensureObject(t,"messages");
ensureObject(t,"stories");

[
"listen",
"stop",
"readingMode",
"share",
"copyLink",
"by"
].forEach(k=>{

if(!t.ui[k]){
t.ui[k]=E.ui[k];
}

});

[
"category",
"title",
"intro",
"author",
"date",
"readingTime",
"metaDescription"
].forEach(k=>{

if(!t.default[k]){
t.default[k]=E.default[k];
}

});

if(
!t.default.body ||
typeof t.default.body!=="object"
){
t.default.body=clone(E.default.body);
}else{

Object.keys(E.default.body).forEach(k=>{

if(
t.default.body[k]===undefined ||
t.default.body[k]===null ||
t.default.body[k]===""
){
t.default.body[k]=E.default.body[k];
}

});

}

if(
!t.default.tags ||
typeof t.default.tags!=="object"
){
t.default.tags=clone(E.default.tags);
}else{

Object.keys(E.default.tags).forEach(k=>{

if(!t.default.tags[k]){
t.default.tags[k]=E.default.tags[k];
}

});

}

[
"authorTitle",
"authorDescription",
"shareTitle",
"shareDescription",
"clubTitle",
"clubDescription",
"clubButton"
].forEach(k=>{

if(!t.sidebar[k]){
t.sidebar[k]=E.sidebar[k];
}

});

[
"heading",
"wellnessTitle",
"wellnessDescription",
"fashionTitle",
"fashionDescription",
"travelTitle",
"travelDescription"
].forEach(k=>{

if(!t.related[k]){
t.related[k]=E.related[k];
}

});

[
"narrationUnsupported",
"linkCopied",
"copyFallback"
].forEach(k=>{

if(!t.messages[k]){
t.messages[k]=E.messages[k];
}

});

/*
---------------------------------------------------------
CREATE THE TWO STORIES THAT article.html LINKS TO
---------------------------------------------------------
*/

if(!t.stories.wellness){
t.stories.wellness=makeWellnessStory(t);
}

if(!t.stories.fashion){
t.stories.fashion=makeFashionStory(t);
}

/*
---------------------------------------------------------
NORMALISE ALL STORIES
---------------------------------------------------------
*/

Object.keys(E.stories).forEach(id=>{

if(!t.stories[id]){
t.stories[id]=clone(E.stories[id]);
}

});

Object.keys(t.stories).forEach(id=>{

const s=t.stories[id];

if(
!s ||
typeof s!=="object"
){
return;
}

const englishStory=
E.stories[id] ||
(
id==="wellness"
? makeWellnessStory(E)
: id==="fashion"
? makeFashionStory(E)
: null
);

if(!englishStory){
return;
}

[
"category",
"title",
"intro",
"author",
"date",
"readingTime"
].forEach(k=>{

if(
s[k]===undefined ||
s[k]===null ||
s[k]===""
){
s[k]=englishStory[k];
}

});

if(!s.metaDescription){

s.metaDescription=
s.intro ||
t.default.metaDescription ||
englishStory.metaDescription ||
E.default.metaDescription;

}

if(
s.body===undefined ||
s.body===null
){

s.body=clone(
englishStory.body
);

}

});

});

/*
=========================================================
ENSURE ENGLISH ALSO HAS WELLNESS + FASHION
=========================================================
*/

if(!E.stories.wellness){
E.stories.wellness=makeWellnessStory(E);
}

if(!E.stories.fashion){
E.stories.fashion=makeFashionStory(E);
}

/*
=========================================================
PUBLIC HELPER
=========================================================

article.html может использовать этот метод для безопасного
получения статьи, не ломаясь при неизвестном story id.
=========================================================
*/

window.PetsDogueArticleTranslations={
get:function(language,story){

let code=String(
language ||
"en"
)
.toLowerCase()
.trim();

const aliases={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

code=aliases[code]||code;

const bundle=
A[code] ||
A.en;

if(
!story ||
story==="default"
){
return bundle.default;
}

return(
bundle.stories &&
bundle.stories[story]
) ||
bundle.default;

},

hasStory:function(language,story){

let code=String(
language ||
"en"
)
.toLowerCase()
.trim();

const aliases={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

code=aliases[code]||code;

const bundle=
A[code] ||
A.en;

return !!(
story &&
story!=="default" &&
bundle.stories &&
bundle.stories[story]
);

},

languages:function(){

return Object.keys(A);

},

stories:function(language){

let code=String(
language ||
"en"
)
.toLowerCase()
.trim();

const aliases={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

code=aliases[code]||code;

const bundle=
A[code] ||
A.en;

return Object.keys(
bundle.stories ||
{}
);

}
};

})();
