/* =========================================================
   PETS & DOGUE — MISO EDITORIAL MOBILE LAYOUT
   2026-10-04

   IMPORTANT:
   - MISO ONLY
   - does not change Pablo / Jessica / Richie / Pi
   - preserves PETS & DOGUE multilingual system
   - preserves Arabic RTL
   - preserves Miso carousel / swipe
   - photographs keep their natural proportions
   - no stretched photographs
   - no narrow magazine text columns on mobile
   ========================================================= */

(function () {
  "use strict";

  const STYLE_ID = "pdMisoEditorialMobileFix";

  function installMisoEditorialFix() {

    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = `

/* =====================================================
   ONLY THE MISO STORY OPENED INSIDE ISSUE 01
===================================================== */

.pd-inline-story-panel[data-pd-inline-story="miso"]
.pd-inline-story-content{
  width:100% !important;
  max-width:1180px !important;
  margin:0 auto !important;
  overflow:hidden !important;
  background:#fffaf0 !important;
}

.pd-inline-story-panel[data-pd-inline-story="miso"]
#misoIssue{
  width:100% !important;
  max-width:1180px !important;
  margin:0 auto !important;
  overflow:hidden !important;
}


/* =====================================================
   GLOBAL MISO IMAGE SAFETY

   Never stretch a Miso photograph.
===================================================== */

.pd-inline-story-panel[data-pd-inline-story="miso"]
#misoIssue img{
  max-width:100% !important;
}


/* =====================================================
   DESKTOP / TABLET

   Keep the approved magazine design.
===================================================== */

@media (min-width:721px){

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover{
    grid-template-columns:minmax(0,58%) minmax(0,42%) !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-photo img{
    object-fit:contain !important;
    object-position:center !important;
    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro{
    grid-template-columns:minmax(320px,42%) minmax(0,58%) !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-photo img{
    object-fit:contain !important;
    object-position:center !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-layout{
    grid-template-columns:minmax(300px,.85fr) minmax(380px,1.15fr) !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-photo{
    min-height:0 !important;
    height:auto !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-photo img{
    width:100% !important;
    height:auto !important;
    max-height:600px !important;
    object-fit:contain !important;
    object-position:center !important;
  }

}


/* =====================================================
   MOBILE — PETS & DOGUE EDITORIAL SYSTEM
===================================================== */

@media (max-width:720px){

  /* ---------------------------------------------------
     BASIC MOBILE SAFETY
  --------------------------------------------------- */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue{
    width:100% !important;
    max-width:100% !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .chapter{
    width:100% !important;
    max-width:100% !important;
    overflow:hidden !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .display{
    overflow-wrap:normal !important;
    word-break:normal !important;
    hyphens:auto;
  }


  /* ===================================================
     1. OPENING COVER

     Photo first.
     Text underneath.
     No 61/39 split on a phone.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover{
    display:flex !important;
    flex-direction:column !important;

    min-height:0 !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-photo{
    order:1 !important;

    width:100% !important;
    min-height:0 !important;
    height:auto !important;

    overflow:hidden !important;
    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-photo img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-copy{
    order:2 !important;

    width:100% !important;
    min-width:0 !important;

    padding:28px 22px 31px !important;

    background:#070707 !important;
    color:#fff !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-copy h1{
    max-width:100% !important;
    margin:0 !important;

    font-size:clamp(42px,13vw,62px) !important;
    line-height:.88 !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-blue{
    margin:16px 0 18px !important;

    font-size:clamp(27px,8vw,39px) !important;
    line-height:.96 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .cover-copy p{
    max-width:560px !important;

    font-size:17px !important;
    line-height:1.45 !important;
  }


  /* ===================================================
     2. HELLO MISO

     This is the block that was creating the very thin
     text column in the screenshot.

     Mobile becomes:
     text
     photo
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro{
    display:flex !important;
    flex-direction:column !important;

    width:100% !important;

    background:#fffaf0 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-copy{
    order:1 !important;

    width:100% !important;
    min-width:0 !important;

    padding:31px 24px 27px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-copy h2{
    max-width:100% !important;
    margin:0 !important;

    font-size:clamp(43px,13vw,61px) !important;
    line-height:.88 !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-copy p{
    max-width:600px !important;

    margin:18px 0 0 !important;

    font-size:17px !important;
    line-height:1.48 !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-photo{
    order:2 !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;

    overflow:hidden !important;

    background:#eee5d8 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .intro-photo img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;
  }


  /* ===================================================
     3. PROFILE

     Previous layout:
     tiny photograph inside a tall empty frame.

     New layout:
     large natural photograph + full-width profile card.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile{
    padding:31px 16px 35px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-head{
    width:100% !important;
    max-width:100% !important;

    margin:0 0 23px !important;
    padding:0 5px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-head .display{
    max-width:100% !important;

    font-size:clamp(40px,11vw,57px) !important;
    line-height:.88 !important;

    letter-spacing:-.045em !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-layout{
    display:flex !important;
    flex-direction:column !important;

    width:100% !important;
    max-width:620px !important;

    gap:14px !important;

    margin:0 auto !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-photo{
    display:block !important;

    width:100% !important;

    min-height:0 !important;
    height:auto !important;

    padding:8px !important;

    border:4px solid #111 !important;

    overflow:hidden !important;

    background:#eee8dc !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-photo img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:560px !important;

    margin:0 auto !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;

    background:#eee8dc !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-card{
    width:100% !important;

    padding:23px 20px 25px !important;

    border:3px solid #111 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-name{
    font-size:38px !important;
    line-height:.94 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-sub{
    margin:7px 0 17px !important;

    font-size:15px !important;
    line-height:1.35 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-grid{
    display:grid !important;
    grid-template-columns:1fr 1fr !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact,
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact:nth-child(even){
    min-width:0 !important;

    padding:11px 8px !important;

    font-size:14px !important;
    line-height:1.3 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact:nth-child(odd){
    padding-left:0 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact:nth-child(even){
    padding-left:13px !important;
    border-left:1px solid #ccc !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact b{
    margin-bottom:4px !important;
    font-size:8px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .match{
    margin-top:18px !important;

    font-size:22px !important;
    line-height:1.12 !important;
  }


  /* ===================================================
     4. MY LITTLE WORLD

     KEEP HORIZONTAL SWIPE.
     Images show naturally instead of being enlarged
     and cropped.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moments{
    padding:31px 0 27px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .section-head{
    width:100% !important;
    max-width:100% !important;

    margin:0 0 23px !important;
    padding:0 21px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .section-head .display{
    font-size:clamp(42px,12vw,58px) !important;
    line-height:.88 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment-track{
    display:flex !important;

    width:100% !important;

    gap:12px !important;
    padding:0 17px 10px !important;

    overflow-x:auto !important;
    overflow-y:hidden !important;

    scroll-snap-type:x mandatory !important;
    scroll-behavior:smooth !important;

    -webkit-overflow-scrolling:touch;

    scrollbar-width:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment-track::-webkit-scrollbar{
    display:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment{
    flex:0 0 84% !important;

    width:84% !important;
    height:auto !important;
    min-height:0 !important;

    margin:0 !important;

    overflow:hidden !important;

    scroll-snap-align:center !important;
    scroll-snap-stop:always !important;

    background:#111 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    aspect-ratio:auto !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;

    background:#111 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment::after{
    inset:auto 0 0 !important;
    height:48% !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment figcaption{
    left:17px !important;
    right:17px !important;
    bottom:17px !important;

    font-size:16px !important;
    line-height:1.25 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment figcaption strong{
    margin-bottom:6px !important;

    font-size:30px !important;
    line-height:1 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .carousel-controls{
    margin-top:17px !important;
  }


  /* ===================================================
     5. DIARY / TEXT

     Give translated text enough width.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .story-title{
    padding:29px 21px 24px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .story-title .display{
    max-width:100% !important;

    font-size:clamp(38px,10.5vw,52px) !important;
    line-height:.91 !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .diary{
    width:100% !important;
    max-width:680px !important;

    margin:0 auto !important;
    padding:29px 23px 30px !important;

    font-size:17px !important;
    line-height:1.5 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .diary-lead{
    font-size:22px !important;
    line-height:1.38 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .diary-note{
    margin:20px 0 !important;
    padding:17px 17px !important;

    font-size:18px !important;
    line-height:1.42 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .pull{
    width:100% !important;
    max-width:680px !important;

    margin:0 auto !important;
    padding:4px 23px 31px !important;

    font-size:clamp(31px,8vw,42px) !important;
    line-height:.99 !important;
  }


  /* ===================================================
     6. SEA

     On a phone we do NOT place text into a narrow
     30% column anymore.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea{
    display:flex !important;
    flex-direction:column !important;

    width:100% !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea-photo{
    width:100% !important;
    height:auto !important;
    min-height:0 !important;

    overflow:hidden !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea-photo img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea-copy{
    width:100% !important;

    padding:27px 23px 31px !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea-copy h2{
    margin:0 !important;

    font-size:clamp(43px,12vw,60px) !important;
    line-height:.9 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .sea-copy p{
    margin-top:16px !important;

    font-size:23px !important;
    line-height:1.2 !important;
  }


  /* ===================================================
     7. LONDON
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-head{
    padding:30px 22px 24px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-head .display{
    max-width:100% !important;

    font-size:clamp(42px,11vw,56px) !important;
    line-height:.89 !important;

    overflow-wrap:normal !important;
    word-break:normal !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-feature{
    width:calc(100% - 28px) !important;

    height:auto !important;
    min-height:0 !important;

    margin:0 14px 22px !important;

    overflow:hidden !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-feature img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-feature-copy{
    left:20px !important;
    right:20px !important;
    bottom:21px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-feature-copy strong{
    max-width:80% !important;

    font-size:clamp(29px,8vw,39px) !important;
    line-height:.97 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-feature-copy em{
    max-width:80% !important;

    font-size:17px !important;
    line-height:1.2 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-note{
    width:100% !important;
    max-width:680px !important;

    margin:0 auto !important;
    padding:27px 23px 31px !important;

    font-size:17px !important;
    line-height:1.5 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .london-note .scribble{
    margin:19px 0 !important;

    font-size:clamp(24px,7vw,33px) !important;
    line-height:1.36 !important;
  }


  /* ===================================================
     8. FRIENDS

     Keep the editorial photo but do not make translated
     copy live in a tiny column over it.
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends{
    display:flex !important;
    flex-direction:column !important;

    min-height:0 !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-bg{
    position:relative !important;
    inset:auto !important;

    order:1 !important;

    width:100% !important;
    height:auto !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-bg img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-shade{
    display:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-overlay{
    position:relative !important;

    order:2 !important;

    width:100% !important;
    min-height:0 !important;

    padding:28px 23px 32px !important;

    background:#070707 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-overlay h2{
    max-width:100% !important;

    margin:0 0 20px !important;

    font-size:clamp(43px,12vw,59px) !important;
    line-height:.89 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .friends-overlay p{
    max-width:600px !important;

    font-size:17px !important;
    line-height:1.46 !important;
  }


  /* ===================================================
     9. EVERYONE
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .everyone-head{
    padding:28px 22px 23px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .everyone-head .display{
    font-size:clamp(39px,10.5vw,53px) !important;
    line-height:.91 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .everyone-body{
    width:100% !important;
    max-width:680px !important;

    margin:0 auto !important;
    padding:27px 23px 32px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .animal-line,
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .everyone-copy{
    font-size:17px !important;
    line-height:1.5 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .everyone-big{
    font-size:29px !important;
    line-height:1.04 !important;
  }


  /* ===================================================
     10. ASK MISO
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-head{
    padding:28px 22px 23px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-head .display{
    font-size:clamp(39px,10.5vw,53px) !important;
    line-height:.91 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-body{
    display:block !important;

    width:100% !important;
    max-width:680px !important;

    min-height:0 !important;

    margin:0 auto !important;
    padding:27px 23px 135px !important;

    overflow:visible !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-mark{
    width:100% !important;

    padding:0 0 18px !important;

    border-right:0 !important;
    border-bottom:2px solid #111 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-mark strong{
    font-size:31px !important;
    line-height:1 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-copy{
    width:100% !important;

    padding:21px 0 0 !important;

    font-size:17px !important;
    line-height:1.48 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .ask-marker{
    display:none !important;
  }


  /* ===================================================
     11. FINAL
  =================================================== */

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-photo{
    width:100% !important;
    height:auto !important;
    min-height:0 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-photo img{
    display:block !important;

    width:100% !important;
    height:auto !important;
    min-height:0 !important;
    max-height:none !important;

    object-fit:contain !important;
    object-position:center !important;

    transform:none !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-copy{
    width:100% !important;
    max-width:680px !important;

    margin:0 auto !important;
    padding:34px 23px 39px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-copy h2{
    font-size:clamp(44px,12vw,61px) !important;
    line-height:.88 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-blue{
    font-size:29px !important;
    line-height:.98 !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .final-copy p{
    font-size:17px !important;
    line-height:1.48 !important;
  }


  /* ===================================================
     RTL / ARABIC

     Layout stays full width.
     Text direction follows the global site language.
  =================================================== */

  html[dir="rtl"]
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue{
    direction:rtl !important;
    text-align:right !important;
  }

  html[dir="rtl"]
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-grid{
    direction:rtl !important;
  }

  html[dir="rtl"]
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact:nth-child(even){
    padding-left:8px !important;
    padding-right:13px !important;

    border-left:0 !important;
    border-right:1px solid #ccc !important;
  }

  html[dir="rtl"]
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment-track{
    direction:rtl !important;
  }

  html[dir="rtl"]
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .diary-note{
    border-left:0 !important;
    border-right:4px solid #d4a334 !important;
  }

}


/* =====================================================
   VERY SMALL PHONES
===================================================== */

@media (max-width:390px){

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile{
    padding-left:12px !important;
    padding-right:12px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-card{
    padding-left:15px !important;
    padding-right:15px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact,
  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .profile-fact:nth-child(even){
    font-size:12.5px !important;
  }

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment{
    flex-basis:88% !important;
    width:88% !important;
  }

}


/* =====================================================
   REDUCED MOTION / ACCESSIBILITY
===================================================== */

@media (prefers-reduced-motion:reduce){

  .pd-inline-story-panel[data-pd-inline-story="miso"]
  #misoIssue .moment-track{
    scroll-behavior:auto !important;
  }

}

`;

    document.head.appendChild(style);
  }


  /* Install immediately when possible. */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      installMisoEditorialFix,
      { once:true }
    );

  } else {

    installMisoEditorialFix();
  }


  /*
   * The Miso article is inserted dynamically after
   * pressing MORE ABOUT MISO, so watch for it.
   */

  const observer = new MutationObserver(function () {

    const miso = document.querySelector(
      '.pd-inline-story-panel[data-pd-inline-story="miso"] #misoIssue'
    );

    if (!miso) {
      return;
    }

    miso.querySelectorAll("img").forEach(function (image) {

      image.style.removeProperty("transform");

    });

  });

  function startObserver() {

    if (!document.body) {
      return;
    }

    observer.observe(
      document.body,
      {
        childList:true,
        subtree:true
      }
    );

  }

  if (document.body) {
    startObserver();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      startObserver,
      { once:true }
    );
  }

})();
