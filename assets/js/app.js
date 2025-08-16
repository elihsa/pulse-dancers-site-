
async function loadJSON(path){
  const res = await fetch(path, {cache: 'no-store'});
  return await res.json();
}
async function hydrateHome(){
  const el = document.querySelector('[data-home]');
  if(!el) return;
  const data = await loadJSON('/data/home.json');
  el.querySelector('[data-hero-title]').textContent = data.hero_title;
  el.querySelector('[data-hero-sub]').textContent = data.hero_subtitle;
  el.querySelector('[data-cta]').textContent = data.cta_text;
  el.querySelector('[data-cta]').href = data.cta_url;
}
async function hydratePrices(){
  const wrap = document.querySelector('[data-prices]');
  if(!wrap) return;
  const data = await loadJSON('/data/prices.json');
  const tbody = wrap.querySelector('tbody');
  data.items.forEach(item=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.name}</td><td>${item.duration||''}</td><td>${item.price}</td>`;
    tbody.appendChild(tr);
  });
  const notes = document.querySelector('[data-price-notes]');
  if(notes && data.notes) notes.textContent = data.notes;
}
async function hydrateFAQ(){
  const wrap = document.querySelector('[data-faq]');
  if(!wrap) return;
  const data = await loadJSON('/data/faq.json');
  const section = wrap;
  data.groups.forEach(group=>{
    const h = document.createElement('h3');
    h.textContent = group.title;
    h.className = 'badge';
    section.appendChild(h);
    const acc = document.createElement('div');
    acc.className = 'accordion';
    group.qas.forEach(qa=>{
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = qa.q;
      const content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = `<p>${qa.a.replace(/\n/g,'<br>')}</p>`;
      details.appendChild(summary);
      details.appendChild(content);
      acc.appendChild(details);
    });
    section.appendChild(acc);
  });
}
async function main(){
  hydrateHome();
  hydratePrices();
  hydrateFAQ();
}
document.addEventListener('DOMContentLoaded', main);
