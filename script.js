
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const body=document.body, root=document.documentElement;
const menu=$('.menu-toggle'),nav=$('.main-nav');
menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'×':'☰'});
let lang=localStorage.getItem('aceqsa-lang'); if(!lang){lang='es'; localStorage.setItem('aceqsa-lang','es');}
function applyLang(){root.lang=lang;$$('[data-es][data-en]').forEach(el=>el.textContent=el.dataset[lang]);const b=$('#lang-toggle');if(b)b.textContent=lang==='es'?'EN':'ES';localStorage.setItem('aceqsa-lang',lang);document.title=document.title.replace(lang==='en'?'Nosotros':'About',lang==='en'?'About':'Nosotros')}
applyLang();$('#lang-toggle')?.addEventListener('click',()=>{lang=lang==='es'?'en':'es';applyLang()});
if(localStorage.getItem('aceqsa-theme')==='dark')body.classList.add('dark');
$('#theme-toggle')?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('aceqsa-theme',body.classList.contains('dark')?'dark':'light')});
$('.year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
const panel=$('#a11y-panel'),aopen=$('#a11y-open');
aopen?.addEventListener('click',()=>{panel.hidden=false;$('#a11y-close')?.focus()});
$('#a11y-close')?.addEventListener('click',()=>{panel.hidden=true;aopen?.focus()});
let scale=Number(localStorage.getItem('aceqsa-scale')||1);root.style.setProperty('--text-scale',scale);
['high-contrast','highlight-links','text-spacing','reduce-motion','readable-font'].forEach(c=>{if(localStorage.getItem('aceqsa-'+c)==='1')body.classList.add(c)});
panel?.addEventListener('click',e=>{const a=e.target.closest('[data-a11y]')?.dataset.a11y;if(!a)return;
 if(a==='font+'||a==='font-'){scale=Math.min(1.5,Math.max(.9,scale+(a==='font+'?.1:-.1)));root.style.setProperty('--text-scale',scale);localStorage.setItem('aceqsa-scale',scale)}
 const m={contrast:'high-contrast',links:'highlight-links',spacing:'text-spacing',motion:'reduce-motion',readable:'readable-font'};
 if(m[a]){body.classList.toggle(m[a]);localStorage.setItem('aceqsa-'+m[a],body.classList.contains(m[a])?'1':'0')}
 if(a==='read'&&'speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance($('#contenido')?.innerText||'');u.lang=lang==='es'?'es-CR':'en-US';speechSynthesis.speak(u)}
 if(a==='reset'){scale=1;root.style.setProperty('--text-scale',1);localStorage.removeItem('aceqsa-scale');Object.values(m).forEach(c=>{body.classList.remove(c);localStorage.removeItem('aceqsa-'+c)})}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');if(panel&&!panel.hidden){panel.hidden=true;aopen?.focus()}}});
$('#back-to-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);const subject=`ACEQSA — ${d.get('type')}`;const body=`Nombre: ${d.get('name')}\nEmail: ${d.get('email')}\nPaís: ${d.get('country')}\nTipo: ${d.get('type')}\n\n${d.get('message')}`;location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});
let quote=[];
function renderQuote(){const list=$('#quote-list');if(!list)return;list.innerHTML='';quote.forEach((x,i)=>{const li=document.createElement('li');const s=document.createElement('span');s.textContent=`${x.qty} × ${x.item}${x.price?` — ₡${(x.price*x.qty).toLocaleString('es-CR')}`:''}`;const b=document.createElement('button');b.type='button';b.textContent=lang==='es'?'Eliminar':'Remove';b.addEventListener('click',()=>{quote.splice(i,1);renderQuote()});li.append(s,b);list.append(li)});$('#quote-empty').hidden=quote.length>0;const t=quote.reduce((a,x)=>a+(x.price||0)*x.qty,0);if($('#quote-total'))$('#quote-total').textContent='₡'+t.toLocaleString('es-CR')}
$('#add-quote')?.addEventListener('click',()=>{const item=$('#quote-item')?.value,qty=Math.max(1,Number($('#quote-qty')?.value||1));if(item){const price=Math.max(0,Number($('#quote-price')?.value||0));quote.push({item,qty,price});renderQuote()}});
$('#send-quote')?.addEventListener('click',()=>{if(!quote.length){alert(lang==='es'?'Agregue al menos un producto o servicio.':'Add at least one product or service.');return}const lines=quote.map(x=>`${x.qty} × ${x.item}`).join('\n');const notes=$('#quote-notes')?.value||'',country=$('#quote-country')?.value||'';location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent('Solicitud de cotización ACEQSA')}&body=${encodeURIComponent(`País: ${country}\n\nProductos y servicios:\n${lines}\n\nNotas:\n${notes}`)}`});

const cookie=$('#cookie-banner'); if(cookie && !localStorage.getItem('aceqsa-cookie-choice')) cookie.hidden=false;
$('#cookie-accept')?.addEventListener('click',()=>{localStorage.setItem('aceqsa-cookie-choice','accepted');cookie.hidden=true});
$('#cookie-essential')?.addEventListener('click',()=>{localStorage.setItem('aceqsa-cookie-choice','essential');cookie.hidden=true});
$('#referral-form')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);const subject=`ACEQSA — ${d.get('type')}`;const msg=`Nombre: ${d.get('name')}\nEmail: ${d.get('email')}\nPaís: ${d.get('country')}\nTipo: ${d.get('type')}\n\n${d.get('message')}`;location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`});
$$('[data-placeholder-es]').forEach(el=>el.placeholder=lang==='es'?el.dataset.placeholderEs:el.dataset.placeholderEn);

// Market quote estimator v3
(()=>{
 const dataEl=document.getElementById('market-data'); if(!dataEl)return;
 const DATA=JSON.parse(dataEl.textContent.replaceAll('&quot;','"').replaceAll('&amp;','&'));
 const kind=document.getElementById('quote-kind'),cur=document.getElementById('quote-currency'),search=document.getElementById('quote-search'),results=document.getElementById('quote-results'),qty=document.getElementById('quote-qty'),add=document.getElementById('add-selected');
 let selected=null,cart=[]; const USDCRC=500; // reference conversion only, not a live FX quote
 const money=n=>cur.value==='USD'?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n/USDCRC):new Intl.NumberFormat('es-CR',{style:'currency',currency:'CRC',maximumFractionDigits:0}).format(n);
 function filtered(){const q=(search.value||'').toLowerCase().trim();const cat=document.getElementById('quote-category');const cv=cat?cat.value:'all';return DATA.filter(x=>(kind.value==='all'||x.kind===kind.value)&&(cv==='all'||x.name.startsWith(cv+' —'))&&x.name.toLowerCase().includes(q)).slice(0,12)}
 function show(){results.innerHTML='';filtered().forEach(x=>{const b=document.createElement('button');b.type='button';b.className='quote-result';const catSel=document.getElementById('quote-category');const displayName=(catSel&&catSel.value!=='all'&&x.name.startsWith(catSel.value+' — '))?x.name.slice((catSel.value+' — ').length):x.name;b.textContent=`${displayName} — ${money(x.price)} + IVA`;b.onclick=()=>{selected=x;search.value=x.name;add.disabled=false;results.innerHTML=''};results.append(b)})}
 [kind,cur,search].forEach(e=>e.addEventListener(e===search?'input':'change',()=>{selected=null;add.disabled=true;show();render()}));
 add.addEventListener('click',()=>{if(!selected)return;cart.push({...selected,qty:Math.max(1,Number(qty.value||1))});selected=null;search.value='';add.disabled=true;show();render()});
 function render(){const ul=document.getElementById('market-quote-list');ul.innerHTML='';cart.forEach((x,i)=>{const li=document.createElement('li'),sp=document.createElement('span'),bt=document.createElement('button');const c=document.getElementById('quote-category');const dn=(c&&c.value!=='all'&&x.name.startsWith(c.value+' — '))?x.name.slice((c.value+' — ').length):x.name;sp.textContent=`${x.qty} × ${dn} — ${money(x.price*x.qty)}`;bt.textContent='Eliminar';bt.type='button';bt.onclick=()=>{cart.splice(i,1);render()};li.append(sp,bt);ul.append(li)});const sub=cart.reduce((a,x)=>a+x.price*x.qty,0),vat=sub*.13,total=sub+vat;document.getElementById('subtotal').textContent=money(sub);document.getElementById('vat').textContent=money(vat);document.getElementById('grand-total').textContent=money(total)}
 document.getElementById('send-market-quote').addEventListener('click',()=>{if(!cart.length){alert('Agregue al menos un producto o servicio.');return}const sub=cart.reduce((a,x)=>a+x.price*x.qty,0),vat=sub*.13,total=sub+vat;const lines=cart.map(x=>`${x.qty} x ${x.name} — ${money(x.price*x.qty)}`).join('\n');const msg=`Moneda: ${cur.value}\nPaís: ${document.getElementById('quote-country2').value}\n\n${lines}\n\nSubtotal: ${money(sub)}\nIVA 13%: ${money(vat)}\nTotal estimado: ${money(total)}\n\nNotas: ${document.getElementById('quote-notes2').value}\n\nSolicito confirmación de precio y disponibilidad.`;location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent('Cotización ACEQSA')}&body=${encodeURIComponent(msg)}`});
 show();render();
})();

// v5: translate option labels and optgroup labels.
function translateSelectOptions(lang){
  document.querySelectorAll('option[data-es]').forEach(o=>o.textContent=lang==='en'?(o.dataset.en||o.dataset.es):o.dataset.es);
  document.querySelectorAll('optgroup[data-label-es]').forEach(g=>g.label=lang==='en'?(g.dataset.labelEn||g.dataset.labelEs):g.dataset.labelEs);
}
translateSelectOptions(localStorage.getItem('aceqsa-lang')||'es');
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>translateSelectOptions(localStorage.getItem('aceqsa-lang')||'es'),0)));

// Careers email form.
document.getElementById('career-form')?.addEventListener('submit',e=>{
 e.preventDefault(); const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);
 const body=`Nombre: ${d.get('name')}\nEmail: ${d.get('email')}\nPaís: ${d.get('country')}\nÁrea: ${d.get('area')}\n\n${d.get('profile')}`;
 location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent('Perfil profesional — ACEQSA')}&body=${encodeURIComponent(body)}`;
});

// Quote category filter. Works alongside the existing market estimator.
(()=>{
 const kind=document.getElementById('quote-kind'),cat=document.getElementById('quote-category'),wrap=document.getElementById('quote-category-wrap');
 if(!kind||!cat)return;
 const sync=()=>{wrap.hidden=kind.value==='service'; if(kind.value==='service')cat.value='all'; document.getElementById('quote-search')?.dispatchEvent(new Event('input',{bubbles:true}))};
 kind.addEventListener('change',sync); cat.addEventListener('change',()=>document.getElementById('quote-search')?.dispatchEvent(new Event('input',{bubbles:true}))); sync();
})();

function translatePlaceholders(lang){
 document.querySelectorAll('[data-placeholder-es]').forEach(el=>{el.placeholder=lang==='en'?(el.dataset.placeholderEn||el.dataset.placeholderEs):el.dataset.placeholderEs});
}
translatePlaceholders(localStorage.getItem('aceqsa-lang')||'es');
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>translatePlaceholders(localStorage.getItem('aceqsa-lang')||'es'),0)));

// PDF validation for Careers. Browsers/mailto cannot silently attach a local file.
document.getElementById('career-pdf')?.addEventListener('change',e=>{
 const f=e.target.files?.[0]; if(!f)return;
 if(f.type!=='application/pdf' && !f.name.toLowerCase().endsWith('.pdf')){alert('Seleccione un archivo PDF.');e.target.value='';}
 else if(f.size>5*1024*1024){alert('El PDF no debe superar 5 MB.');e.target.value='';}
});

document.getElementById('send-market-whatsapp')?.addEventListener('click',()=>{
 const items=[...document.querySelectorAll('#market-quote-list li span')].map(x=>x.textContent);
 if(!items.length){alert((localStorage.getItem('aceqsa-lang')||'es')==='en'?'Add at least one product or service.':'Agregue al menos un producto o servicio.');return;}
 const lang=localStorage.getItem('aceqsa-lang')||'es';
 const country=document.getElementById('quote-country2')?.selectedOptions?.[0]?.textContent||'';
 const msg=(lang==='en'?'Hello ACEQSA, I would like to request a quote:':'Hola ACEQSA, deseo solicitar una cotización:')+
 '\n\n'+items.join('\n')+
 `\n\n${lang==='en'?'Subtotal':'Subtotal'}: ${document.getElementById('subtotal')?.textContent}`+
 `\n${lang==='en'?'VAT 13%':'IVA 13%'}: ${document.getElementById('vat')?.textContent}`+
 `\n${lang==='en'?'Estimated total':'Total estimado'}: ${document.getElementById('grand-total')?.textContent}`+
 `\n${lang==='en'?'Country':'País'}: ${country}`;
 window.open('https://wa.me/50686987840?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
});
