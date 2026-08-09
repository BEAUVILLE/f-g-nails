(()=>{
'use strict';
function arrange(){
  const wrap=document.getElementById('fg-media-showcase');
  const work=document.getElementById('realisations');
  const shop=document.getElementById('boutique');
  if(!wrap||!work||!shop)return false;
  if(window.matchMedia('(max-width:619px)').matches){
    if(wrap.firstElementChild!==shop)wrap.insertBefore(shop,work);
  }else{
    if(work.nextElementSibling!==shop)wrap.insertBefore(shop,work.nextSibling);
  }
  return true;
}
function boot(){
  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(arrange()||tries>=50)clearInterval(timer)},100);
}
document.addEventListener('DOMContentLoaded',boot,{once:true});
window.addEventListener('load',arrange,{once:true});
window.addEventListener('resize',()=>setTimeout(arrange,50));
setTimeout(boot,0);
})();
