
const cfg = { base:'Sandton City, Johannesburg', free_km:50, r_per_km:4, note:'1 stripper per 20 guests' };
function parseRand(s){ return Number(String(s).replace(/[^0-9.]/g,''))||0; }
function fmt(n){ return 'R'+Math.round(n); }

const prices = {
  'Topless Waiter': {type:'per_hour', base:750, min_hours:2, one_hour:850},
  'Bottomless Waiter': {type:'per_hour', base:750, min_hours:2, one_hour:950},
  'Exotic Dancer (One-Man Show)': {type:'flat', base:2500},
  'Naughty Games': {type:'flat', base:1600}
};

function performanceFee(service, guests){
  if(service.includes('Waiter')){
    const oneHourOnly = false; // could be toggled with a checkbox later
    const per = oneHourOnly ? (service.includes('Bottomless')?950:850) : 750;
    const hours = oneHourOnly ? 1 : 2;
    const guys = (guests==='20 to 40'||guests==='40 or more') ? 2 : 1;
    return per*guys*hours;
  }
  if(service==='Exotic Dancer (One-Man Show)') return 2500;
  if(service==='Naughty Games') return 1600;
  return 0;
}

// simple travel estimate: placeholder without Google API (edit constants in CMS later)
function estimateTravelKm(addressOrArea){
  if(!addressOrArea) return 0;
  // crude heuristic: farther areas include keywords
  const far = /(pretoria|durban|cape town|stellenbosch|paarl|polokwane|rustenburg|nelspruit)/i.test(addressOrArea);
  return far ? 100 : 30;
}
function travelCost(km){ const billable = Math.max(0, km - cfg.free_km); return billable * cfg.r_per_km; }

function updateQuote(){
  const guests = document.getElementById('guests').value;
  const service = document.getElementById('service').value;
  const locMode = [...document.querySelectorAll('input[name=loc_mode]')].find(r=>r.checked).value;
  const addr = locMode==='exact' ? document.getElementById('address').value : document.getElementById('area').value;

  const fee = performanceFee(service, guests);
  const km = estimateTravelKm(addr);
  const travel = travelCost(km);
  document.getElementById('fee').textContent = fmt(fee);
  document.getElementById('travel').textContent = fmt(travel);
  document.getElementById('total').textContent = fmt(fee+travel);
  document.getElementById('travelNote').textContent = `Assuming ${km}km round-trip from ${cfg.base} with ${cfg.free_km}km free at R${cfg.r_per_km}/km.`;
}
document.addEventListener('change', updateQuote);
document.addEventListener('input', updateQuote);
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('recNote').textContent = `Recommendation: ${cfg.note}`;
  const venueSel = document.getElementById('venue_type');
  venueSel.addEventListener('change',()=>{
    document.getElementById('venue_other').style.display = (venueSel.value==='Other') ? 'block' : 'none';
  });
  const radios = document.querySelectorAll('input[name=loc_mode]');
  radios.forEach(r=>r.addEventListener('change',()=>{
    const exact = r.value==='exact' && r.checked;
    document.getElementById('addressWrap').style.display = exact ? 'block':'none';
    document.getElementById('areaWrap').style.display = exact ? 'none':'block';
    updateQuote();
  }));
  updateQuote();
});
