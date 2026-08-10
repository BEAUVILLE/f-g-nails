(()=>{
'use strict';
const LANGS=['fr','en','es','de','it','nl','ar'];
const LOCALES={fr:'fr-FR',en:'en-GB',es:'es-ES',de:'de-DE',it:'it-IT',nl:'nl-NL',ar:'ar-SA'};
const TEXT={
  fr:{button:'🔊 Écouter la présentation',stop:'■ Arrêter',unavailable:'🔇 Lecture vocale indisponible',speech:'FG NAILS à Saly. Beauté, bien-être, onglerie, Head Spa, soins du visage, massage modelant et soins esthétiques. Contact direct sur WhatsApp au 78 012 70 62.'},
  en:{button:'🔊 Listen to the presentation',stop:'■ Stop',unavailable:'🔇 Voice playback unavailable',speech:'FG NAILS in Saly. Beauty, wellness, nail care, Head Spa, facial care, body massage and aesthetic treatments. Direct contact on WhatsApp at 78 012 70 62.'},
  es:{button:'🔊 Escuchar la presentación',stop:'■ Detener',unavailable:'🔇 Lectura de voz no disponible',speech:'FG NAILS en Saly. Belleza, bienestar, manicura, Head Spa, cuidados faciales, masaje modelador y tratamientos estéticos. Contacto directo por WhatsApp en el 78 012 70 62.'},
  de:{button:'🔊 Präsentation anhören',stop:'■ Stoppen',unavailable:'🔇 Sprachausgabe nicht verfügbar',speech:'FG NAILS in Saly. Schönheit, Wohlbefinden, Nagelpflege, Head Spa, Gesichtspflege, Modellagemassage und ästhetische Behandlungen. Direkter Kontakt über WhatsApp unter 78 012 70 62.'},
  it:{button:'🔊 Ascolta la presentazione',stop:'■ Ferma',unavailable:'🔇 Lettura vocale non disponibile',speech:'FG NAILS a Saly. Bellezza, benessere, cura delle unghie, Head Spa, trattamenti viso, massaggio modellante e trattamenti estetici. Contatto diretto su WhatsApp al 78 012 70 62.'},
  nl:{button:'🔊 Luister naar de presentatie',stop:'■ Stop',unavailable:'🔇 Spraakweergave niet beschikbaar',speech:'FG NAILS in Saly. Schoonheid, welzijn, nagelverzorging, Head Spa, gezichtsverzorging, modelmassage en esthetische behandelingen. Rechtstreeks contact via WhatsApp op 78 012 70 62.'},
  ar:{button:'🔊 استمع إلى التقديم',stop:'■ إيقاف',unavailable:'🔇 القراءة الصوتية غير متاحة',speech:'FG NAILS في سالي. الجمال والعناية والرفاهية، الأظافر، سبا الرأس، العناية بالوجه، التدليك والعلاجات التجميلية. تواصل مباشر عبر واتساب على الرقم 78 012 70 62.'}
};
const SUPPORTED=('speechSynthesis' in window)&&typeof SpeechSynthesisUtterance!=='undefined';
let speaking=false;
function lang(){
  try{const x=window.FG_I18N&&FG_I18N.getLang&&FG_I18N.getLang();if(LANGS.includes(x))return x}catch(_){ }
  const x=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  return LANGS.includes(x)?x:'fr';
}
function selectVoice(locale){
  if(!SUPPORTED)return null;
  const voices=window.speechSynthesis.getVoices();
  const exact=voices.find(v=>(v.lang||'').toLowerCase()===locale.toLowerCase());
  if(exact)return exact;
  const prefix=locale.slice(0,2).toLowerCase();
  return voices.find(v=>(v.lang||'').toLowerCase().startsWith(prefix))||null;
}
function build(){
  if(document.body?.dataset.page!=='index')return null;
  let btn=document.getElementById('fgVoiceButton');
  if(btn)return btn;
  const actions=document.querySelector('.hero .actions');
  if(!actions)return null;
  if(!document.getElementById('fgVoiceStyle')){
    const style=document.createElement('style');
    style.id='fgVoiceStyle';
    style.textContent='.fg-voice-wrap{display:flex;justify-content:center;margin:18px auto 2px;width:100%}.fg-voice-btn{width:min(100%,440px);min-height:60px;padding:14px 22px;border:2px solid #8f6525;border-radius:18px;background:#b88735;color:#fff;font-size:17px;line-height:1.2;font-weight:1000;letter-spacing:.01em;box-shadow:0 12px 28px rgba(86,59,41,.22);cursor:pointer}.fg-voice-btn:hover{filter:brightness(1.05)}.fg-voice-btn:active{transform:translateY(1px)}.fg-voice-btn:focus-visible{outline:4px solid rgba(184,135,53,.32);outline-offset:3px}.fg-voice-btn[aria-disabled="true"]{opacity:.8;cursor:default}';
    document.head.appendChild(style);
  }
  const wrap=document.createElement('div');
  wrap.className='fg-voice-wrap';
  btn=document.createElement('button');
  btn.type='button';
  btn.id='fgVoiceButton';
  btn.className='fg-voice-btn';
  btn.setAttribute('aria-live','polite');
  wrap.appendChild(btn);
  actions.before(wrap);
  return btn;
}
function stop(btn){
  if(SUPPORTED)window.speechSynthesis.cancel();
  speaking=false;
  const t=TEXT[lang()]||TEXT.fr;
  if(btn)btn.textContent=SUPPORTED?t.button:t.unavailable;
}
function speak(btn){
  const l=lang();
  const t=TEXT[l]||TEXT.fr;
  if(!SUPPORTED){btn.textContent=t.unavailable;btn.setAttribute('aria-disabled','true');return;}
  if(speaking){stop(btn);return;}
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t.speech);
  u.lang=LOCALES[l]||LOCALES.fr;
  u.rate=.96;
  u.pitch=1;
  const voice=selectVoice(u.lang);
  if(voice)u.voice=voice;
  u.onstart=()=>{speaking=true;btn.textContent=t.stop};
  u.onend=()=>{speaking=false;btn.textContent=(TEXT[lang()]||TEXT.fr).button};
  u.onerror=()=>{speaking=false;btn.textContent=(TEXT[lang()]||TEXT.fr).button};
  window.speechSynthesis.speak(u);
}
function apply(){
  const btn=build();
  if(!btn)return;
  const t=TEXT[lang()]||TEXT.fr;
  btn.textContent=SUPPORTED?t.button:t.unavailable;
  if(!btn.dataset.voiceBound){btn.addEventListener('click',()=>speak(btn));btn.dataset.voiceBound='1';}
}
document.addEventListener('DOMContentLoaded',apply,{once:true});
window.addEventListener('load',apply,{once:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-fg-langbar] button'))setTimeout(()=>{if(speaking){const b=document.getElementById('fgVoiceButton');stop(b)}apply()},30)},true);
new MutationObserver(()=>setTimeout(apply,30)).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
window.addEventListener('beforeunload',()=>{if(SUPPORTED)window.speechSynthesis.cancel()});
setTimeout(apply,80);
})();
