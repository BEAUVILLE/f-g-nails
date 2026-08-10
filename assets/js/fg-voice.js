(()=>{
'use strict';
if(!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return;
const LANGS=['fr','en','es','de','it','nl','ar'];
const LOCALES={fr:'fr-FR',en:'en-GB',es:'es-ES',de:'de-DE',it:'it-IT',nl:'nl-NL',ar:'ar-SA'};
const TEXT={
  fr:{button:'🔊 Écouter la présentation',stop:'■ Arrêter',speech:'FG NAILS à Saly. Beauté, bien-être, onglerie, Head Spa, soins du visage, massage modelant et soins esthétiques. Contact direct sur WhatsApp au 78 012 70 62.'},
  en:{button:'🔊 Listen to the presentation',stop:'■ Stop',speech:'FG NAILS in Saly. Beauty, wellness, nail care, Head Spa, facial care, body massage and aesthetic treatments. Direct contact on WhatsApp at 78 012 70 62.'},
  es:{button:'🔊 Escuchar la presentación',stop:'■ Detener',speech:'FG NAILS en Saly. Belleza, bienestar, manicura, Head Spa, cuidados faciales, masaje modelador y tratamientos estéticos. Contacto directo por WhatsApp en el 78 012 70 62.'},
  de:{button:'🔊 Präsentation anhören',stop:'■ Stoppen',speech:'FG NAILS in Saly. Schönheit, Wohlbefinden, Nagelpflege, Head Spa, Gesichtspflege, Modellagemassage und ästhetische Behandlungen. Direkter Kontakt über WhatsApp unter 78 012 70 62.'},
  it:{button:'🔊 Ascolta la presentazione',stop:'■ Ferma',speech:'FG NAILS a Saly. Bellezza, benessere, cura delle unghie, Head Spa, trattamenti viso, massaggio modellante e trattamenti estetici. Contatto diretto su WhatsApp al 78 012 70 62.'},
  nl:{button:'🔊 Luister naar de presentatie',stop:'■ Stop',speech:'FG NAILS in Saly. Schoonheid, welzijn, nagelverzorging, Head Spa, gezichtsverzorging, modelmassage en esthetische behandelingen. Rechtstreeks contact via WhatsApp op 78 012 70 62.'},
  ar:{button:'🔊 استمع إلى التقديم',stop:'■ إيقاف',speech:'FG NAILS في سالي. الجمال والعناية والرفاهية، الأظافر، سبا الرأس، العناية بالوجه، التدليك والعلاجات التجميلية. تواصل مباشر عبر واتساب على الرقم 78 012 70 62.'}
};
let speaking=false;
let current=null;
function lang(){
  try{const x=window.FG_I18N&&FG_I18N.getLang&&FG_I18N.getLang();if(LANGS.includes(x))return x}catch(_){ }
  const x=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  return LANGS.includes(x)?x:'fr';
}
function selectVoice(locale){
  const voices=window.speechSynthesis.getVoices();
  const exact=voices.find(v=>(v.lang||'').toLowerCase()===locale.toLowerCase());
  if(exact)return exact;
  const prefix=locale.slice(0,2).toLowerCase();
  return voices.find(v=>(v.lang||'').toLowerCase().startsWith(prefix))||null;
}
function stop(btn){
  window.speechSynthesis.cancel();
  speaking=false;
  current=null;
  const t=TEXT[lang()]||TEXT.fr;
  if(btn)btn.textContent=t.button;
}
function speak(btn){
  const l=lang();
  const t=TEXT[l]||TEXT.fr;
  if(speaking){stop(btn);return;}
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t.speech);
  u.lang=LOCALES[l]||LOCALES.fr;
  u.rate=.96;
  u.pitch=1;
  const voice=selectVoice(u.lang);
  if(voice)u.voice=voice;
  u.onstart=()=>{speaking=true;current=u;btn.textContent=t.stop};
  u.onend=()=>{speaking=false;current=null;btn.textContent=(TEXT[lang()]||TEXT.fr).button};
  u.onerror=()=>{speaking=false;current=null;btn.textContent=(TEXT[lang()]||TEXT.fr).button};
  window.speechSynthesis.speak(u);
}
function build(){
  if(document.body?.dataset.page!=='index'||document.getElementById('fgVoiceButton'))return;
  const lead=document.querySelector('.hero .lead');
  const actions=document.querySelector('.hero .actions');
  if(!lead||!actions)return;
  const style=document.createElement('style');
  style.textContent='.fg-voice-wrap{display:flex;justify-content:center;margin:15px auto 0}.fg-voice-btn{min-height:46px;padding:10px 16px;border:1px solid var(--l);border-radius:999px;background:#fff;color:var(--i);font-weight:900;box-shadow:0 8px 22px rgba(76,51,34,.08);cursor:pointer}.fg-voice-btn:focus-visible{outline:3px solid rgba(184,135,53,.35);outline-offset:2px}';
  document.head.appendChild(style);
  const wrap=document.createElement('div');
  wrap.className='fg-voice-wrap';
  const btn=document.createElement('button');
  btn.type='button';
  btn.id='fgVoiceButton';
  btn.className='fg-voice-btn';
  btn.setAttribute('aria-live','polite');
  btn.textContent=(TEXT[lang()]||TEXT.fr).button;
  btn.addEventListener('click',()=>speak(btn));
  wrap.appendChild(btn);
  actions.before(wrap);
}
function apply(){
  build();
  const btn=document.getElementById('fgVoiceButton');
  if(!btn)return;
  if(speaking)stop(btn);
  btn.textContent=(TEXT[lang()]||TEXT.fr).button;
}
document.addEventListener('DOMContentLoaded',apply,{once:true});
window.addEventListener('load',apply,{once:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-fg-langbar] button'))setTimeout(apply,30)},true);
new MutationObserver(()=>setTimeout(apply,30)).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
window.addEventListener('beforeunload',()=>window.speechSynthesis.cancel());
setTimeout(apply,100);
})();
