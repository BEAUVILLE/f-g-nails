(()=>{
'use strict';
const LANGS=['fr','en','es','de','it','nl','ar'];
const VIDEOS=[
  {key:'sauna_pedicure',id:'1iAEtdLWG6z5lbvQAm1gOq4hwHxGxusun',tag:'sauna-pedicure-old',alt:'Sauna et pédicure FG NAILS'},
  {key:'face_21',id:'1yNeg3Y62bp3Og6FARbiAysBEmJAJYbmA',tag:'fg-nails21',alt:'Soin complet du visage FG NAILS'},
  {key:'face_22',id:'1CcWJS06asHRL8T7JfhkxEJu5MvSNwSu4',tag:'fg-nails22',alt:'Soin complet du visage FG NAILS'},
  {key:'sauna_23',id:'1MHnffpC-V2k_9wwT-b-hLvyIo0QLXRAk',tag:'fg-nails23',alt:'Sauna dôme FG NAILS'},
  {key:'feet_24',id:'1q4Mu9pyfeJbjyp4csGQC6_seWv1K2TSh',tag:'fg-nails24',alt:'Soin des pieds FG NAILS'}
];
const TEXT={
  fr:{lead:'Neuf contenus originaux. Les vidéos s’ouvrent sur Google Drive uniquement à la demande.',action:'Voir la vidéo',sauna_pedicure:['Sauna & pédicure chez FG NAILS','Découverte du sauna, de l’espace détente et de la prestation pédicure FG NAILS à Saly.'],face_21:['Soin complet du visage — séance 1','Soin du visage réalisé chez FG NAILS et publié avec l’autorisation de la cliente.'],face_22:['Soin complet du visage — séance 2','Suite du soin du visage réalisé chez FG NAILS et publié avec l’autorisation de la cliente.'],sauna_23:['Sauna dôme','Séance de sauna dôme proposée chez FG NAILS à Saly, sur rendez-vous.'],feet_24:['Soin des pieds','Soin des pieds réalisé chez FG NAILS à Saly, sur rendez-vous.']},
  en:{lead:'Nine original pieces of content. Videos open on Google Drive only when requested.',action:'Watch the video',sauna_pedicure:['Sauna & pedicure at FG NAILS','Discover the sauna, relaxation area and pedicure service at FG NAILS in Saly.'],face_21:['Complete facial care — session 1','Facial care performed at FG NAILS and published with the client’s permission.'],face_22:['Complete facial care — session 2','Continuation of the facial care performed at FG NAILS and published with the client’s permission.'],sauna_23:['Dome sauna','Dome sauna session offered at FG NAILS in Saly, by appointment.'],feet_24:['Foot care','Foot care performed at FG NAILS in Saly, by appointment.']},
  es:{lead:'Nueve contenidos originales. Los vídeos se abren en Google Drive solo cuando el cliente lo solicita.',action:'Ver el vídeo',sauna_pedicure:['Sauna y pedicura en FG NAILS','Descubre la sauna, el espacio de relajación y el servicio de pedicura de FG NAILS en Saly.'],face_21:['Cuidado facial completo — sesión 1','Cuidado facial realizado en FG NAILS y publicado con autorización de la clienta.'],face_22:['Cuidado facial completo — sesión 2','Continuación del cuidado facial realizado en FG NAILS y publicado con autorización de la clienta.'],sauna_23:['Sauna domo','Sesión de sauna domo ofrecida en FG NAILS en Saly, con cita previa.'],feet_24:['Cuidado de los pies','Cuidado de los pies realizado en FG NAILS en Saly, con cita previa.']},
  de:{lead:'Neun originale Inhalte. Videos werden nur auf Wunsch in Google Drive geöffnet.',action:'Video ansehen',sauna_pedicure:['Sauna & Pediküre bei FG NAILS','Entdecken Sie Sauna, Ruhebereich und Pediküre bei FG NAILS in Saly.'],face_21:['Komplette Gesichtspflege — Sitzung 1','Gesichtspflege bei FG NAILS, veröffentlicht mit Zustimmung der Kundin.'],face_22:['Komplette Gesichtspflege — Sitzung 2','Fortsetzung der Gesichtspflege bei FG NAILS, veröffentlicht mit Zustimmung der Kundin.'],sauna_23:['Kuppelsauna','Kuppelsauna-Sitzung bei FG NAILS in Saly, nach Termin.'],feet_24:['Fußpflege','Fußpflege bei FG NAILS in Saly, nach Termin.']},
  it:{lead:'Nove contenuti originali. I video si aprono su Google Drive solo su richiesta.',action:'Guarda il video',sauna_pedicure:['Sauna e pedicure da FG NAILS','Scopri la sauna, l’area relax e il servizio pedicure di FG NAILS a Saly.'],face_21:['Trattamento viso completo — seduta 1','Trattamento viso eseguito presso FG NAILS e pubblicato con l’autorizzazione della cliente.'],face_22:['Trattamento viso completo — seduta 2','Proseguimento del trattamento viso presso FG NAILS, pubblicato con l’autorizzazione della cliente.'],sauna_23:['Sauna a cupola','Seduta di sauna a cupola proposta da FG NAILS a Saly, su appuntamento.'],feet_24:['Trattamento piedi','Trattamento dei piedi eseguito da FG NAILS a Saly, su appuntamento.']},
  nl:{lead:'Negen originele items. Video’s openen alleen op verzoek in Google Drive.',action:'Video bekijken',sauna_pedicure:['Sauna & pedicure bij FG NAILS','Ontdek de sauna, ontspanningsruimte en pedicurebehandeling bij FG NAILS in Saly.'],face_21:['Volledige gezichtsverzorging — sessie 1','Gezichtsverzorging bij FG NAILS, gepubliceerd met toestemming van de klant.'],face_22:['Volledige gezichtsverzorging — sessie 2','Vervolg van de gezichtsverzorging bij FG NAILS, gepubliceerd met toestemming van de klant.'],sauna_23:['Koepelsauna','Koepelsaunasessie bij FG NAILS in Saly, op afspraak.'],feet_24:['Voetverzorging','Voetverzorging bij FG NAILS in Saly, op afspraak.']},
  ar:{lead:'تسعة محتويات أصلية. تُفتح الفيديوهات على Google Drive عند الطلب فقط.',action:'مشاهدة الفيديو',sauna_pedicure:['الساونا والباديكير لدى FG NAILS','اكتشفي الساونا ومساحة الاسترخاء وخدمة الباديكير لدى FG NAILS في سالي.'],face_21:['عناية كاملة بالوجه — الجلسة 1','عناية بالوجه أُنجزت لدى FG NAILS ونُشرت بموافقة الزبونة.'],face_22:['عناية كاملة بالوجه — الجلسة 2','متابعة لعناية الوجه لدى FG NAILS ونُشرت بموافقة الزبونة.'],sauna_23:['ساونا القبة','جلسة ساونا القبة لدى FG NAILS في سالي، بموعد مسبق.'],feet_24:['العناية بالقدمين','عناية بالقدمين لدى FG NAILS في سالي، بموعد مسبق.']}
};
function lang(){
  try{const x=window.FG_I18N&&FG_I18N.getLang&&FG_I18N.getLang();if(LANGS.includes(x))return x}catch(_){ }
  const x=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  return LANGS.includes(x)?x:'fr';
}
function makeCard(v){
  const url=`https://drive.google.com/file/d/${v.id}/view?usp=sharing`;
  const img=`https://drive.google.com/thumbnail?id=${v.id}&sz=w800`;
  const card=document.createElement('article');
  card.className='fgm-card';
  card.dataset.fgVideo=v.tag;
  card.innerHTML=`<a class="fgm-thumb" href="${url}" target="_blank" rel="noopener"><img src="${img}" alt="${v.alt}" loading="lazy"><span class="fgm-play">▶</span></a><div class="fgm-body"><h3 data-extra-title></h3><p data-extra-desc></p><a class="fgm-action" href="${url}" target="_blank" rel="noopener" data-extra-action></a></div>`;
  return card;
}
function apply(){
  const grid=document.querySelector('#realisations .fgm-grid');
  if(!grid)return false;
  const t=TEXT[lang()]||TEXT.fr;
  VIDEOS.forEach(v=>{
    let card=document.querySelector(`[data-fg-video="${v.tag}"]`);
    if(!card){card=makeCard(v);grid.appendChild(card)}
    const copy=t[v.key]||TEXT.fr[v.key];
    card.querySelector('[data-extra-title]').textContent=copy[0];
    card.querySelector('[data-extra-desc]').textContent=copy[1];
    card.querySelector('[data-extra-action]').textContent=t.action;
  });
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
