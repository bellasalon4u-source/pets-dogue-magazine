export default async function handler(req,res){

if(req.method!=="POST"){

res.setHeader("Allow","POST");

return res.status(405).json({
error:"Method not allowed"
});

}

try{

const STRIPE_SECRET_KEY=
process.env.STRIPE_SECRET_KEY;

if(!STRIPE_SECRET_KEY){

return res.status(500).json({
error:"STRIPE_SECRET_KEY is not configured."
});

}

const body=
typeof req.body==="string"
?JSON.parse(req.body)
:(req.body||{});

const {
plan,
language,
partnerEmail,
businessName,
contactName,
category,
headline,
copy,
cta,
url,
start,
end,
placement,
campaignId
}=body;

const validPlans={
50:{
amount:5000,
name:"PETS & DOGUE Offer Boost",
description:"Boosted placement for a PETS & DOGUE partner offer."
},

100:{
amount:10000,
name:"PETS & DOGUE Featured Card",
description:"Featured advertising card inside PETS & DOGUE."
},

200:{
amount:20000,
name:"PETS & DOGUE Full Page Advertising",
description:"Premium full-page PETS & DOGUE magazine advertising campaign."
}
};

const selectedPlan=
validPlans[
String(plan)
];

if(!selectedPlan){

return res.status(400).json({
error:"Invalid advertising plan."
});

}

if(
!partnerEmail||
!String(partnerEmail).includes("@")
){

return res.status(400).json({
error:"A valid partner email is required."
});

}

if(!businessName){

return res.status(400).json({
error:"Business name is required."
});

}

if(!headline){

return res.status(400).json({
error:"Advertising headline is required."
});

}

if(!start||!end){

return res.status(400).json({
error:"Campaign start and end dates are required."
});

}

const startDate=
new Date(`${start}T00:00:00Z`);

const endDate=
new Date(`${end}T23:59:59Z`);

if(
Number.isNaN(startDate.getTime())||
Number.isNaN(endDate.getTime())
){

return res.status(400).json({
error:"Invalid campaign dates."
});

}

if(endDate<=startDate){

return res.status(400).json({
error:"Campaign end date must be after its start date."
});

}

const SITE_URL=
String(
process.env.SITE_URL||
req.headers.origin||
"https://petsanddogue.com"
)
.replace(/\/+$/,"");

function stripeLocale(code){

const map={
en:"en-GB",
uk:"auto",
ru:"ru",
fr:"fr",
de:"de",
es:"es",
it:"it",
pt:"pt",
nl:"nl",
pl:"pl",
cs:"cs",
sk:"sk",
hu:"hu",
ro:"ro",
bg:"bg",
el:"el",
sv:"sv",
da:"da",
no:"nb",
fi:"fi",
tr:"tr",
ar:"auto",
hi:"auto"
};

return map[code]||"auto";
}

async function stripeRequest(
path,
params=null,
method="POST"
){

const options={
method,
headers:{
Authorization:
`Bearer ${STRIPE_SECRET_KEY}`
}
};

if(params){

const encoded=
new URLSearchParams();

Object.entries(params)
.forEach(([key,value])=>{

if(
value===undefined||
value===null||
value===""
){
return;
}

encoded.append(
key,
String(value)
);

});

options.headers[
"Content-Type"
]=
"application/x-www-form-urlencoded";

options.body=
encoded.toString();

}

const response=
await fetch(
`https://api.stripe.com/v1${path}`,
options
);

const data=
await response.json();

if(!response.ok){

const message=
data?.error?.message||
"Stripe request failed.";

throw new Error(message);
}

return data;
}

async function findOrCreateCustomer(){

const encodedEmail=
encodeURIComponent(
String(partnerEmail).trim()
);

const search=
await stripeRequest(
`/customers?email=${encodedEmail}&limit=1`,
null,
"GET"
);

if(
Array.isArray(search.data)&&
search.data.length
){

return search.data[0];
}

return stripeRequest(
"/customers",
{
email:
String(partnerEmail).trim(),

name:
String(businessName).trim(),

description:
`PETS & DOGUE advertising partner: ${String(businessName).trim()}`,

"metadata[partner_type]":
"advertiser",

"metadata[business_name]":
String(businessName).slice(0,500),

"metadata[contact_name]":
String(contactName||"").slice(0,500)
}
);

}

const customer=
await findOrCreateCustomer();

const safeCampaignId=
String(
campaignId||
`ad_${Date.now()}`
).slice(0,200);

const metadata={
campaign_id:
safeCampaignId,

advertising_plan:
String(plan),

business_name:
String(businessName).slice(0,500),

partner_email:
String(partnerEmail).slice(0,500),

contact_name:
String(contactName||"").slice(0,500),

category:
String(category||"").slice(0,500),

headline:
String(headline||"").slice(0,500),

cta:
String(cta||"").slice(0,500),

destination_url:
String(url||"").slice(0,500),

campaign_start:
String(start).slice(0,500),

campaign_end:
String(end).slice(0,500),

placement:
String(placement||"").slice(0,500),

language:
String(language||"en").slice(0,50),

source:
"pets_dogue_advertising"
};

const params={

mode:
"payment",

customer:
customer.id,

locale:
stripeLocale(language),

success_url:
`${SITE_URL}/advertise.html?ad_payment=success&session_id={CHECKOUT_SESSION_ID}`,

cancel_url:
`${SITE_URL}/advertise.html?ad_payment=cancelled`,

"line_items[0][price_data][currency]":
"gbp",

"line_items[0][price_data][unit_amount]":
selectedPlan.amount,

"line_items[0][price_data][product_data][name]":
selectedPlan.name,

"line_items[0][price_data][product_data][description]":
selectedPlan.description,

"line_items[0][quantity]":
1,

"invoice_creation[enabled]":
"true",

"invoice_creation[invoice_data][description]":
`${selectedPlan.name} — ${businessName}`,

"payment_intent_data[description]":
`${selectedPlan.name} — ${businessName}`,

"payment_intent_data[receipt_email]":
String(partnerEmail).trim(),

"payment_intent_data[metadata][campaign_id]":
metadata.campaign_id,

"payment_intent_data[metadata][advertising_plan]":
metadata.advertising_plan,

"payment_intent_data[metadata][business_name]":
metadata.business_name,

"payment_intent_data[metadata][partner_email]":
metadata.partner_email,

"payment_intent_data[metadata][category]":
metadata.category,

"payment_intent_data[metadata][campaign_start]":
metadata.campaign_start,

"payment_intent_data[metadata][campaign_end]":
metadata.campaign_end,

"payment_intent_data[metadata][placement]":
metadata.placement,

"payment_intent_data[metadata][source]":
metadata.source,

"metadata[campaign_id]":
metadata.campaign_id,

"metadata[advertising_plan]":
metadata.advertising_plan,

"metadata[business_name]":
metadata.business_name,

"metadata[partner_email]":
metadata.partner_email,

"metadata[contact_name]":
metadata.contact_name,

"metadata[category]":
metadata.category,

"metadata[headline]":
metadata.headline,

"metadata[cta]":
metadata.cta,

"metadata[destination_url]":
metadata.destination_url,

"metadata[campaign_start]":
metadata.campaign_start,

"metadata[campaign_end]":
metadata.campaign_end,

"metadata[placement]":
metadata.placement,

"metadata[language]":
metadata.language,

"metadata[source]":
metadata.source
};

const session=
await stripeRequest(
"/checkout/sessions",
params
);

return res.status(200).json({

ok:true,

sessionId:
session.id,

checkoutUrl:
session.url,

customerId:
customer.id,

campaignId:
safeCampaignId,

plan:
Number(plan),

amount:
selectedPlan.amount,

currency:"gbp"

});

}catch(error){

console.error(
"create-advertising-checkout error:",
error
);

return res.status(500).json({
error:
error?.message||
"Unable to create advertising checkout."
});

}

}
