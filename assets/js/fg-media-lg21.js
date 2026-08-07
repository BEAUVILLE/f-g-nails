(()=>{
'use strict';
const VIDEO_ID='1iAEtdLWG6z5lbvQAm1gOq4hwHxGxusun';
const LANGS=['fr','en','es','de','it','nl','ar'];
const TEXT={
  fr:{title:'Sauna & pédicure chez FG NAILS',desc:'Découverte du sauna, de l’espace détente et de la prestation pédicure FG NAILS à Saly.',lead:'Cinq contenus originaux. Les vidéos s’ouvrent sur Google Drive uniquement à la demande.',action:'Voir la vidéo'},
  en:{title:'Sauna & pedicure at FG NAILS',desc:'Discover the sauna, relaxation area and pedicure service at FG NAILS in Saly.',lead:'Five original pieces of content. Videos open on Google Drive only when requested.',action:'Watch the video'},
  es:{title:'Sauna y pedicura en FG NAILS',desc:'Descubre la sauna, el espacio de relajación y el servicio de pedicura de FG NAILS en Saly.',lead:'Cinco contenidos originales. Los vídeos se abren en Google Drive solo cuando se solicitan.',action:'Ver el vídeo'},
  de:{title:'Sauna & Pediküre bei FG NAILS',desc:'Entdecken Sie Sauna, Ruhebereich und Pediküre bei FG NAILS in Saly.',lead:'Fünf originale Inhalte. Videos werden nur auf Wunsch in Google Drive geöffnet.',action:'Video ansehen'},
  it:{title:'Sauna e pedicure da FG NAILS',desc:'Scopri la sauna, l’area relax e il servizio pedicure di FG NAILS a Saly.',lead:'Cinque contenuti originali. I video si aprono su Google Drive solo su richiesta.',action:'Guarda il video'},
  nl:{title:'Sauna & pedicure bij FG NAILS',desc:'Ontdek de sauna, ontspanningsruimte en pedicurebehandeling bij FG NAILS in Saly.',lead:'Vijf originele items. Video’s openen alleen op verzoek in Google Drive.',action:'Video bekijken'},
  ar:{title:'الساونا والباديكير لدى FG NAILS',desc:'اكتشفي الساونا ومساحة الاسترخاء وخدمة الباديكير لدى FG NAILS في سالي.',lead:'خمسة محتويات أصلية. تُفتح الفيديوهات على Google Drive عند الطلب فقط.',action:'مشاهدة الفيديو'}
};
function lang(){
  try{const x=window.FG_I18N&&FG_I18N.getLang&&FG_I18N.getLang();if(LANGS.includes(x))return x}catch(_){ }
  const x=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  return LANGS.includes(x)?x:'fr';
}
function apply(){
  const grid=document.querySelector('#realisations .fgm-grid');
  if(!grid)return false;
  let card=document.querySelector('[data-fg-video="lg-nails21"]');
  if(!card){
    const url=`https://drive.google.com/file/d/${VIDEO_ID}/view?usp=sharing`;
    const img=`https://drive.google.com/thumbnail?id=${VIDEO_ID}&sz=w800`;
    card=document.createElement('article');
    card.className='fgm-card';
    card.dataset.fgVideo='lg-nails21';
    card.innerHTML=`<a class="fgm-thumb" href="${url}" target="_blank" rel="noopener"><img src="${img}" alt="Sauna et pédicure FG NAILS" loading="lazy"><span class="fgm-play">▶</span></a><div class="fgm-body"><h3 data-lg21-title></h3><p data-lg21-desc></p><a class="fgm-action" href="${url}" target="_blank" rel="noopener" data-lg21-action></a></div>`;
    grid.appendChild(card);
  }
  const t=TEXT[lang()]||TEXT.fr;
  card.querySelector('[data-lg21-title]').textContent=t.title;
  card.querySelector('[data-lg21-desc]').textContent=t.desc;
  card.querySelector('[data-lg21-action]').textContent=t.action;
  const lead=document.querySelector('#realisations [data-fgm="media_lead"]');
  if(lead)lead.textContent=t.lead;
  return true;
}
function boot(){
  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(apply()||tries>=40)clearInterval(timer)},100);
}
document.addEventListener('DOMContentLoaded',boot,{once:true});
window.addEventListener('load',apply,{once:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-fg-langbar] button'))setTimeout(apply,0)},true);
new MutationObserver(()=>setTimeout(apply,0)).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
setTimeout(boot,0);
})();
