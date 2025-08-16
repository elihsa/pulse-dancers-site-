
async function loadJSON(path){ const res = await fetch(path,{cache:'no-store'}); return await res.json(); }
async function hydratePrices(){
  const el=document.querySelector('[data-prices]'); if(!el) return;
  const data=await loadJSON('/data/prices.json'); const tbody=el.querySelector('tbody');
  data.items.forEach(i=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${i.name}</td><td>${i.duration||''}</td><td>${i.price}</td>`; tbody.appendChild(tr);});
  const notes=document.querySelector('[data-price-notes]'); if(notes && data.notes) notes.textContent=data.notes;
}
async function hydrateFAQ(){
  const wrap=document.querySelector('[data-faq]'); if(!wrap) return;
  const data=await loadJSON('/data/faq.json');
  data.groups.forEach(g=>{
    const card=document.createElement('div'); card.className='card'; card.style.marginBottom='12px';
    const h=document.createElement('h3'); h.textContent=g.title; card.appendChild(h);
    g.qas.forEach(qa=>{ const d=document.createElement('details'); const s=document.createElement('summary'); s.textContent=qa.q; const c=document.createElement('div'); c.className='small'; c.innerHTML=qa.a.replace(/\n/g,'<br>'); d.appendChild(s); d.appendChild(c); card.appendChild(d); });
    wrap.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded',()=>{hydratePrices();hydrateFAQ();});
