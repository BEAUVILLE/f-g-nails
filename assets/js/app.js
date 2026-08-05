const WA = "https://wa.me/221781662359";
const esc = (v="") => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

async function getJSON(path){
  const r = await fetch(path, {cache:'no-store'});
  if(!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}

function renderServices(services=[]){
  const box=document.querySelector('#servicesGrid');
  box.innerHTML=services.filter(s=>s.active!==false).map(s=>`<article class="service-card">
    <div class="service-icon" aria-hidden="true">${esc(s.icon||'✦')}</div>
    <h3>${esc(s.name)}</h3><p>${esc(s.description)}</p>
    <a href="${WA}?text=${encodeURIComponent(`Bonjour FG NAILS, je souhaite des renseignements sur : ${s.name}.`)}" target="_blank" rel="noopener">Demander un rendez-vous →</a>
  </article>`).join('');
}

let allProducts=[];
function renderProducts(category='Tous'){
  const grid=document.querySelector('#productsGrid');
  const empty=document.querySelector('#productsEmpty');
  const list=allProducts.filter(p=>p.active!==false && (category==='Tous'||p.category===category));
  grid.innerHTML=list.map(p=>`<article class="product-card">
    <img src="${esc(p.image||'assets/images/produit-placeholder.webp')}" alt="${esc(p.name)}" loading="lazy">
    <div class="product-body"><span class="tag">${esc(p.category||'Produit')}</span><h3>${esc(p.name)}</h3><p>${esc(p.description||'Renseignements en direct.')}</p>
    <div class="product-meta"><span class="price">${esc(p.price||'Prix sur demande')}</span><a href="${WA}?text=${encodeURIComponent(`Bonjour FG NAILS, je souhaite des renseignements sur le produit : ${p.name}.`)}" target="_blank" rel="noopener">WhatsApp →</a></div></div>
  </article>`).join('');
  empty.hidden=list.length>0;
}

function renderFilters(products=[]){
  const filters=document.querySelector('#filters');
  const cats=['Tous',...new Set(products.filter(p=>p.active!==false).map(p=>p.category).filter(Boolean))];
  filters.innerHTML=cats.length>1?cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join(''):'';
  filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.cat)});
}

function renderVideos(videos=[]){
  const grid=document.querySelector('#videosGrid');
  const empty=document.querySelector('#videosEmpty');
  const list=videos.filter(v=>v.active!==false);
  grid.innerHTML=list.map(v=>`<article class="video-card"><div class="thumb">▶</div><h3>${esc(v.title)}</h3><p>${esc(v.description||'Présentation FG NAILS')}</p><a href="${esc(v.driveUrl)}" target="_blank" rel="noopener">Voir la vidéo sur Drive →</a></article>`).join('');
  empty.hidden=list.length>0;
}

(async()=>{
  try{
    const data=await getJSON('assets/data/catalogue.json');
    renderServices(data.services||[]); allProducts=data.products||[]; renderFilters(allProducts); renderProducts();
  }catch(e){console.error(e);renderServices([]);document.querySelector('#productsEmpty').hidden=false}
  try{const data=await getJSON('assets/data/videos.json');renderVideos(data.videos||[])}catch(e){console.error(e);document.querySelector('#videosEmpty').hidden=false}
})();
