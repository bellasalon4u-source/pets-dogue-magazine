/* PETS & DOGUE — in-page fashion articles */
(() => {
'use strict';

const data=window.PDFashionMaterials;
if(!data)return;

function setup(){
  const grid=document.querySelector('main>.grid');
  const autumn=document.getElementById('autumn-elegance');
  const accessories=document.getElementById('signature-accessories');

  if(
    !grid||!autumn||!accessories||
    document.getElementById('pfReading')
  )return;

  const style=document.createElement('style');

  style.textContent=`
#pfReading{
  grid-column:1/-1;
  background:#f4efe5;
  color:#26221b;
  padding:clamp(18px,4vw,46px);
  border:1px solid #c4a563;
  scroll-margin-top:120px;
}
#pfReading[hidden]{display:none!important}
#pfReading .pf-read-tools{
  display:flex;
  gap:10px;
  align-items:center;
  border-bottom:1px solid #c4a563;
  padding-bottom:12px;
  margin-bottom:24px;
}
#pfReading button{
  min-width:44px;
  min-height:44px;
  padding:8px 12px;
  border:1px solid #bba267;
  background:transparent;
  color:#493b24;
  border-radius:4px;
  font:600 14px Arial,sans-serif;
}
#pfReading .pf-close{
  margin-inline-start:auto;
  font-size:25px;
}
#pfReading h2{
  font:400 clamp(30px,7vw,58px)/1.08 Georgia,serif;
  max-width:850px;
  margin:14px 0 24px;
}
#pfReading h3{
  font:400 clamp(24px,4vw,34px)/1.15 Georgia,serif;
  margin:0 0 12px;
}
#pfReading p{
  font:400 clamp(16px,2vw,18px)/1.7 Arial,sans-serif;
  max-width:780px;
  margin:12px 0 18px;
}
#pfReading .pf-product{
  padding:26px 0;
  border-top:1px solid #d4c5a6;
}
#pfReading a{
  display:inline-block;
  color:#805f22;
  text-decoration:underline;
  font:600 14px/1.5 Arial,sans-serif;
  padding:8px 0;
}
#pfReading .pf-date{
  font:400 12px/1.5 Arial,sans-serif;
  color:#76694f;
}
#pfReading button:focus-visible,
#pfReading a:focus-visible{
  outline:3px solid #0783ff;
  outline-offset:3px;
}
`;

  document.head.append(style);

  const panel=document.createElement('section');
  panel.id='pfReading';
  panel.hidden=true;
  panel.setAttribute('aria-labelledby','pfReadingTitle');

  const toolbar=document.createElement('div');
  toolbar.className='pf-read-tools';

  const back=document.createElement('button');
  const sound=document.createElement('button');
  const close=document.createElement('button');

  for(const button of [back,sound,close]){
    button.type='button';
  }

  sound.textContent='🔊';
  close.textContent='×';
  close.className='pf-close';

  toolbar.append(back,sound,close);

  const heading=document.createElement('h2');
  heading.id='pfReadingTitle';
  heading.tabIndex=-1;

  const body=document.createElement('div');
  panel.append(toolbar,heading,body);

  const refs=[autumn,accessories].map(card=>({
    card,
    title:card.querySelector('h3'),
    description:card.querySelector('.card-content p'),
    button:card.querySelector('a.btn')
  }));

  for(const ref of refs){
    ref.title?.removeAttribute('data-i18n');
    ref.description?.removeAttribute('data-i18n');
    ref.button?.removeAttribute('data-i18n');
    ref.description?.removeAttribute('id');
    ref.title?.removeAttribute('id');
  }

  let active=null;
  let origin=null;
  let savedY=0;

  const token='fashion-'+Date.now();

  function language(){
    let code=document.documentElement.lang||'en';

    try{
      if(typeof getCurrentLanguage==='function'){
        code=getCurrentLanguage();
      }
    }catch{}

    code=String(code).toLowerCase().split(/[-_]/)[0];

    code=({
      ua:'uk',cz:'cs',gr:'el',se:'sv',dk:'da'
    })[code]||code;

    return data.ui[code]?code:'en';
  }

  function stop(){
    window.speechSynthesis?.cancel();
  }

  function render(){
    const lang=language();
    const ui=data.ui[lang];
    const text=data.text[lang];

    for(const [index,ref] of refs.entries()){
      const type=index?'accessories':'finds';

      if(ref.title){
        ref.title.textContent=ui[index];
      }

      if(ref.description){
        ref.description.textContent=text[index];
      }

      if(ref.button){
        ref.button.textContent=ui[2];
        ref.button.href='#read='+type;

        ref.button.setAttribute(
          'aria-expanded',
          String(active===type)
        );

        ref.button.setAttribute(
          'aria-controls',
          'pfReading'
        );
      }
    }

    if(!active)return;

    const type=active==='finds'?0:1;

    panel.lang=lang;
    panel.dir=lang==='ar'?'rtl':'ltr';
    heading.textContent=ui[type];

    back.textContent=(lang==='ar'?'→ ':'← ')+ui[4];
    back.setAttribute('aria-label',ui[4]);
    close.setAttribute('aria-label',ui[3]);
    sound.setAttribute('aria-label',ui[7]);

    body.replaceChildren();

    const lead=document.createElement('p');
    lead.textContent=text[type];
    body.append(lead);

    const selected=type
      ?data.products.slice(4)
      :data.products.slice(0,4);

    for(const product of selected){
      const section=document.createElement('section');
      section.className='pf-product';

      const title=document.createElement('h3');
      const paragraph=document.createElement('p');
      const link=document.createElement('a');

      title.textContent=product[0];
      paragraph.textContent=text[product[2]];

      link.href=product[1];
      link.target='_blank';
      link.rel='noopener noreferrer';
      link.textContent=ui[5]+' ↗';

      section.append(title,paragraph,link);
      body.append(section);
    }

    const note=document.createElement('p');
    note.className='pf-date';
    note.textContent=ui[6];
    body.append(note);
  }

  function show(type,source,push=true){
    if(!['finds','accessories'].includes(type))return;

    const wasOpen=!!active;

    if(!active){
      savedY=window.scrollY;
      origin=source||null;
    }

    stop();
    active=type;

    const card=type==='finds'?autumn:accessories;
    card.after(panel);

    panel.hidden=false;
    render();

    if(push){
      const state=
        history.state&&typeof history.state==='object'
          ?{...history.state}
          :{};

      const action=
        wasOpen&&history.state?.pfReadToken===token
          ?'replaceState'
          :'pushState';

      history[action](
        {
          ...state,
          pfReadToken:token,
          pfReadType:type
        },
        '',
        location.pathname+
        location.search+
        '#read='+type
      );
    }

    requestAnimationFrame(()=>{
      heading.focus({preventScroll:true});

      panel.scrollIntoView({
        block:'start',
        behavior:'auto'
      });
    });
  }

  function hide(){
    if(!active)return;

    stop();
    active=null;
    panel.hidden=true;
    render();

    const target=origin;

    requestAnimationFrame(()=>{
      target?.focus({preventScroll:true});

      window.scrollTo({
        top:savedY,
        behavior:'auto'
      });
    });
  }

  function requestClose(){
    if(history.state?.pfReadToken===token){
      history.back();
    }else{
      hide();

      if(location.hash.startsWith('#read=')){
        history.replaceState(
          history.state,
          '',
          location.pathname+location.search
        );
      }
    }
  }

  refs.forEach((ref,index)=>{
    ref.button?.addEventListener('click',event=>{
      if(
        event.ctrlKey||event.metaKey||
        event.shiftKey||event.altKey||
        event.button>0
      )return;

      event.preventDefault();

      show(
        index?'accessories':'finds',
        ref.button
      );
    });
  });

  back.onclick=requestClose;
  close.onclick=requestClose;

  sound.onclick=()=>{
    const synth=window.speechSynthesis;
    if(!synth||!active)return;

    if(synth.speaking){
      synth.cancel();
      return;
    }

    const speech=new SpeechSynthesisUtterance(
      heading.textContent+'. '+body.innerText
    );

    speech.lang=language();

    const voice=synth.getVoices().find(item=>
      item.lang.toLowerCase().split('-')[0]===language()
    );

    if(voice)speech.voice=voice;
    synth.speak(speech);
  };

  window.addEventListener('popstate',event=>{
    if(event.state?.pfReadToken===token){
      show(event.state.pfReadType,origin,false);
    }else{
      hide();
    }
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&active){
      event.preventDefault();
      requestClose();
    }
  });

  new MutationObserver(()=>{
    stop();
    render();
  }).observe(document.documentElement,{
    attributes:true,
    attributeFilter:['lang','dir']
  });

  render();

  const initial=location.hash.match(
    /^#read=(finds|accessories)$/
  );

  if(initial){
    show(initial[1],null,false);
  }
}

if(document.readyState==='loading'){
  document.addEventListener(
    'DOMContentLoaded',
    setup,
    {once:true}
  );
}else{
  setup();
}
})();
