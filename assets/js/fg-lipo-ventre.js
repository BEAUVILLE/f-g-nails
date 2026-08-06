(()=>{
'use strict';
const LANGS=['fr','en','es','de','it','nl','ar'];
const TEXT={
  fr:{name:'Lipocavitation ventre',desc:'Soin esthétique ciblé sur le ventre.',lead:'Onglerie, soins de beauté, massage modelant, lipocavitation ventre et produits d’hygiène pour femmes et hommes.'},
  en:{name:'Abdominal lipocavitation',desc:'Aesthetic treatment targeting the abdomen.',lead:'Nail care, beauty treatments, body massage, abdominal lipocavitation and hygiene products for women and men.'},
  es:{name:'Lipocavitación abdominal',desc:'Tratamiento estético dirigido al abdomen.',lead:'Manicura, cuidados de belleza, masaje modelador, lipocavitación abdominal y productos de higiene para mujeres y hombres.'},
  de:{name:'Lipokavitation am Bauch',desc:'Ästhetische Behandlung für den Bauchbereich.',lead:'Nagelpflege, Schönheitspflege, Modellagemassage, Lipokavitation am Bauch und Hygieneprodukte für Frauen und Männer.'},
  it:{name:'Lipocavitazione addominale',desc:'Trattamento estetico mirato all’addome.',lead:'Unghie, trattamenti di bellezza, massaggio modellante, lipocavitazione addominale e prodotti per l’igiene di donne e uomini.'},
  nl:{name:'Lipocavitatie voor de buik',desc:'Esthetische behandeling gericht op de buik.',lead:'Nagelverzorging, schoonheidsbehandelingen, modelmassage, lipocavitatie voor de buik en hygiëneproducten voor vrouwen en mannen.'},
  ar:{name:'ليبـوكافيتيشن البطن',desc:'عناية تجميلية موجهة لمنطقة البطن.',lead:'العناية بالأظافر وخدمات التجميل والتدليك وليبـوكافيتيشن البطن ومنتجات النظافة للنساء والرجال.'}
};
function lang(){
  try{const x=window.FG_I18N&&FG_I18N.getLang&&FG_I18N.getLang();if(LANGS.includes(x))return x}catch(_){ }
  const h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  return LANGS.includes(h)?h:'fr';
}
function apply(){
  const t=TEXT[lang()]||TEXT.fr;
  document.querySelectorAll('[data-i18n="lipo"]').forEach(el=>{
    el.textContent=t.name;
    if(el.tagName==='OPTION')el.value='Lipocavitation ventre';
  });
  document.querySelectorAll('[data-i18n="lipo_desc"]').forEach(el=>el.textContent=t.desc);
  document.querySelectorAll('[data-i18n="main_lead"]').forEach(el=>el.textContent=t.lead);
  document.querySelectorAll('a[href*="service=Lipocavitation"]').forEach(a=>{
    const u=new URL(a.getAttribute('href'),location.href);
    u.searchParams.set('service','Lipocavitation ventre');
    a.setAttribute('href',u.pathname.replace(location.pathname.substring(0,location.pathname.lastIndexOf('/')+1),'')+u.search+u.hash);
  });
  const select=document.getElementById('service');
  if(select){
    const requested=new URLSearchParams(location.search).get('service');
    if(requested&&/^lipocavitation(?:\s+ventre)?$/i.test(requested))select.value='Lipocavitation ventre';
  }
}
document.addEventListener('DOMContentLoaded',apply,{once:true});
window.addEventListener('load',apply,{once:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-fg-langbar] button'))setTimeout(apply,0)},true);
new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
setTimeout(apply,80);setTimeout(apply,500);
})();
(()=>{if(document.querySelector('script[data-fg-media]'))return;const s=document.createElement('script');s.src='assets/js/fg-media.js?v=20260806-v1';s.defer=true;s.dataset.fgMedia='1';document.head.appendChild(s)})();
