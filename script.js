// PETS & DOGUE CMS

window.addEventListener("DOMContentLoaded", () => {

const issueTitle = localStorage.getItem("issueTitle");
const issueDesc = localStorage.getItem("issueDesc");
const coverPath = localStorage.getItem("coverPath");

if(issueTitle){
const titleElement = document.querySelector(".issue h1");
if(titleElement) titleElement.textContent = issueTitle;
}

if(issueDesc){
const descElement = document.querySelector(".issue p");
if(descElement) descElement.textContent = issueDesc;
}

if(coverPath){
const coverImage = document.querySelector(".cover img");
if(coverImage) coverImage.src = coverPath;
}

const articles = JSON.parse(localStorage.getItem("articles") || "[]");

if(articles.length > 0){

const section = document.createElement("section");

section.style.maxWidth = "1200px";
section.style.margin = "50px auto";
section.style.padding = "0 20px";

section.innerHTML = `
<h2 style="
font-size:48px;
margin-bottom:30px;
font-family:Georgia,serif;
">
Latest Articles
</h2>
`;

articles.forEach(article => {

const card = document.createElement("div");

card.style.background = "white";
card.style.padding = "25px";
card.style.borderRadius = "25px";
card.style.border = "2px solid #111";
card.style.marginBottom = "20px";

card.innerHTML = `
<h3 style="margin-bottom:15px;font-size:28px;">
${article.title}
</h3>

<p style="
line-height:1.8;
color:#444;
">
${article.text}
</p>
`;

section.appendChild(card);

});

document.body.insertBefore(
section,
document.querySelector("footer")
);

}

const ads = JSON.parse(localStorage.getItem("ads") || "[]");

if(ads.length > 0){

const adSection = document.createElement("section");

adSection.style.maxWidth = "1200px";
adSection.style.margin = "50px auto";
adSection.style.padding = "0 20px";

adSection.innerHTML = `
<h2 style="
font-size:48px;
margin-bottom:30px;
font-family:Georgia,serif;
">
Partners & Advertising
</h2>
`;

ads.forEach(ad => {

const card = document.createElement("div");

card.style.background = "#f6ecd3";
card.style.padding = "25px";
card.style.borderRadius = "25px";
card.style.border = "2px solid #c9a043";
card.style.marginBottom = "20px";

card.innerHTML = `
<h3 style="
margin-bottom:15px;
font-size:24px;
color:#a17718;
">
${ad.name}
</h3>

<p style="
line-height:1.7;
">
${ad.text}
</p>
`;

adSection.appendChild(card);

});

document.body.insertBefore(
adSection,
document.querySelector("footer")
);

}

});
