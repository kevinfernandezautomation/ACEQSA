
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const body=document.body, root=document.documentElement;
const menu=$('.menu-toggle'),nav=$('.main-nav');
menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'×':'☰'});
let lang=localStorage.getItem('aceqsa-lang'); if(!lang){lang='es'; localStorage.setItem('aceqsa-lang','es');}
function applyLang(){root.lang=lang;$$('[data-es][data-en]').forEach(el=>el.textContent=el.dataset[lang]);const b=$('#lang-toggle');if(b)b.textContent=lang==='es'?'EN':'ES';localStorage.setItem('aceqsa-lang',lang);document.title=document.title.replace(lang==='en'?'Nosotros':'About',lang==='en'?'About':'Nosotros')}
applyLang();$('#lang-toggle')?.addEventListener('click',()=>{lang=lang==='es'?'en':'es';applyLang();translateSelectOptions(lang);translatePlaceholders(lang)});
if(localStorage.getItem('aceqsa-theme')==='dark')body.classList.add('dark');
$('#theme-toggle')?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('aceqsa-theme',body.classList.contains('dark')?'dark':'light')});
$('.year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
const panel=$('#a11y-panel'),aopen=$('#a11y-open');
aopen?.addEventListener('click',()=>{const opening=panel.hidden;panel.hidden=!panel.hidden;aopen.setAttribute('aria-expanded',String(opening));if(opening)$('#a11y-close')?.focus();});
$('#a11y-close')?.addEventListener('click',()=>{panel.hidden=true;aopen?.setAttribute('aria-expanded','false');aopen?.focus()});
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
$('#referral-form')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);const subject=`ACEQSA — ${d.get('type')}`;const msg=`Nombre del cliente: ${d.get('name')}\nEmail: ${d.get('email')}\nLinkedIn: ${d.get('linkedin')||''}\nPaís: ${d.get('country')}\nTipo: ${d.get('type')}\n\n${d.get('message')}`;location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`});
$$('[data-placeholder-es]').forEach(el=>el.placeholder=lang==='es'?el.dataset.placeholderEs:el.dataset.placeholderEn);

// Market quote estimator v3
(()=>{
 const dataEl=document.getElementById('market-data'); if(!dataEl)return;
 const DATA=JSON.parse(dataEl.textContent.replaceAll('&quot;','"').replaceAll('&amp;','&'));
 const kind=document.getElementById('quote-kind'),cur=document.getElementById('quote-currency'),search=document.getElementById('quote-search'),results=document.getElementById('quote-results'),qty=document.getElementById('quote-qty'),add=document.getElementById('add-selected');
 let selected=null,cart=[]; const USDCRC=500;
 if(qty){qty.setAttribute('inputmode','numeric');qty.addEventListener('input',()=>{let v=String(qty.value).replace(/\D/g,'').slice(0,4);if(Number(v)>9999)v='9999';qty.value=v});qty.addEventListener('blur',()=>{if(!qty.value||Number(qty.value)<1)qty.value='1'})} // reference conversion only, not a live FX quote
 const money=n=>cur.value==='USD'?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n/USDCRC):new Intl.NumberFormat('es-CR',{style:'currency',currency:'CRC',maximumFractionDigits:0}).format(n);
 function filtered(){const q=(search.value||'').toLowerCase().trim();const cat=document.getElementById('quote-category');const cv=cat?cat.value:'all';return DATA.filter(x=>(kind.value==='all'||x.kind===kind.value)&&(cv==='all'||x.name.startsWith(cv+' —'))&&x.name.toLowerCase().includes(q)).slice(0,12)}
 function show(){results.innerHTML='';filtered().forEach(x=>{const b=document.createElement('button');b.type='button';b.className='quote-result';const catSel=document.getElementById('quote-category');const displayName=(catSel&&catSel.value!=='all'&&x.name.startsWith(catSel.value+' — '))?x.name.slice((catSel.value+' — ').length):x.name;b.textContent=`${displayName} — ${money(x.price)} + IVA`;b.onclick=()=>{selected=x;search.value=x.name;qty.value='1';add.disabled=false;results.innerHTML=''};results.append(b)})}
 [kind,cur,search].forEach(e=>e.addEventListener(e===search?'input':'change',()=>{selected=null;add.disabled=true;show();render()}));
 add.addEventListener('click',()=>{if(!selected)return;const n=Math.min(9999,Math.max(1,Number(qty.value||1)));qty.value=String(n);const existing=cart.find(x=>x.name===selected.name&&x.kind===selected.kind&&x.price===selected.price);if(existing)existing.qty+=n;else cart.push({...selected,qty:n});selected=null;search.value='';add.disabled=true;show();render()});
 function render(){const ul=document.getElementById('market-quote-list');ul.innerHTML='';cart.forEach((x,i)=>{const li=document.createElement('li'),sp=document.createElement('span'),actions=document.createElement('span'),edit=document.createElement('button'),bt=document.createElement('button');actions.className='quote-item-actions';const c=document.getElementById('quote-category');const dn=(c&&c.value!=='all'&&x.name.startsWith(c.value+' — '))?x.name.slice((c.value+' — ').length):x.name;sp.textContent=`${x.qty} × ${dn} — ${money(x.price*x.qty)}`;edit.textContent=lang==='en'?'Edit':'Editar';edit.type='button';edit.onclick=()=>{actions.innerHTML='';const inp=document.createElement('input'),save=document.createElement('button');inp.type='number';inp.min='1';inp.max='9999';inp.value=String(x.qty);inp.className='quote-edit-input';inp.setAttribute('aria-label',lang==='en'?'Quantity':'Cantidad');inp.addEventListener('input',()=>{inp.value=inp.value.replace(/\D/g,'').slice(0,4);if(Number(inp.value)>9999)inp.value='9999'});save.type='button';save.textContent=lang==='en'?'Save':'Guardar';save.onclick=()=>{x.qty=Math.min(9999,Math.max(1,Number(inp.value||1)));render()};actions.append(inp,save);inp.focus()};bt.textContent=lang==='en'?'Remove':'Eliminar';bt.type='button';bt.onclick=()=>{cart.splice(i,1);render()};actions.append(edit,bt);li.append(sp,actions);ul.append(li)});const sub=cart.reduce((a,x)=>a+x.price*x.qty,0),vat=sub*.13,total=sub+vat;document.getElementById('subtotal').textContent=money(sub);document.getElementById('vat').textContent=money(vat);document.getElementById('grand-total').textContent=money(total)}
 document.getElementById('send-market-quote').addEventListener('click',()=>{if(!cart.length){alert('Agregue al menos un producto o servicio.');return}const sub=cart.reduce((a,x)=>a+x.price*x.qty,0),vat=sub*.13,total=sub+vat;const lines=cart.map(x=>`${x.qty} x ${x.name} — ${money(x.price*x.qty)}`).join('\n');const customer=document.getElementById('quote-customer-name')?.value.trim()||'';const msg=`Cliente: ${customer}\nMoneda: ${cur.value}\nPaís: ${document.getElementById('quote-country2').value}\n\n${lines}\n\nSubtotal: ${money(sub)}\nIVA 13%: ${money(vat)}\nTotal estimado: ${money(total)}\n\nNotas: ${document.getElementById('quote-notes2').value}\n\nSolicito confirmación de precio y disponibilidad.`;location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent('Cotización ACEQSA')}&body=${encodeURIComponent(msg)}`});
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
 const body=`Nombre: ${d.get('name')}\nEmail: ${d.get('email')}\nPaís: ${d.get('country')}\nLinkedIn: ${d.get('linkedin')||''}\nÁrea: ${d.get('area')}\n\n¿Por qué desea trabajar con nosotros?:\n${d.get('profile')}\n\nCover Letter:\n${d.get('coverletter')||''}`;
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
 const items=[...document.querySelectorAll('#market-quote-list li span')].map(x=>x.textContent.replace(/\s+—\s+[₡$].*$/,'').replace(/^([0-9]+) × [^—]+ — /,'$1 '));
 if(!items.length){alert((localStorage.getItem('aceqsa-lang')||'es')==='en'?'Add at least one product or service.':'Agregue al menos un producto o servicio.');return;}
 const lang=localStorage.getItem('aceqsa-lang')||'es';
 const customer=document.getElementById('quote-customer-name')?.value.trim()||'';
 const country=document.getElementById('quote-country2')?.value||'';
 if(!customer){alert(lang==='en'?'Enter the customer name.':'Ingrese el nombre del cliente.');document.getElementById('quote-customer-name')?.focus();return;}
 if(!country){alert(lang==='en'?'Select a country.':'Seleccione un país.');return;}
 const list=items.join(', ');
 const msg=lang==='en'?`Hello ACEQSA, my name is ${customer}. I would like to request a quote for: ${list}. I am from ${country}.`:`Hola ACEQSA, mi nombre es ${customer}. Deseo solicitar una cotización de: ${list}, soy del país de ${country}.`;
 window.open('https://wa.me/50686987840?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
});

document.getElementById('ref-terms-open')?.addEventListener('click',()=>{const d=document.getElementById('ref-terms');if(d){d.open=!d.open;if(d.open)d.scrollIntoView({behavior:'smooth',block:'nearest'});}});
// Optional geolocation: requires explicit browser permission; used only to suggest the country.
document.getElementById('detect-location')?.addEventListener('click',()=>{
 const lang=localStorage.getItem('aceqsa-lang')||'es';
 if(!navigator.geolocation){alert(lang==='en'?'Geolocation is not available in this browser.':'La geolocalización no está disponible en este navegador.');return;}
 navigator.geolocation.getCurrentPosition(async pos=>{
   try{
     const {latitude,longitude}=pos.coords;
     const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=3&accept-language=${lang}`,{headers:{'Accept':'application/json'}});
     if(!r.ok)throw new Error('lookup');
     const data=await r.json(); const code=(data.address?.country_code||'').toUpperCase();
     const names={CR:'Costa Rica',US:'Estados Unidos',CA:'Canadá',MX:'México',PA:'Panamá',NI:'Nicaragua',HN:'Honduras',SV:'El Salvador',GT:'Guatemala',CO:'Colombia'};
     const select=document.querySelector('#quote-country2, #contact-form select[name="country"]');
     if(select){const target=names[code]||data.address?.country;const opt=[...select.options].find(o=>o.value===target||o.textContent===target||o.dataset.en===target);if(opt){select.value=opt.value;select.dispatchEvent(new Event('change'));}}
   }catch(e){alert(lang==='en'?'Location was obtained, but the country could not be suggested automatically.':'Se obtuvo la ubicación, pero no fue posible sugerir el país automáticamente.');}
 },()=>alert(lang==='en'?'Location permission was not granted. You can select your country manually.':'No se concedió permiso de ubicación. Puede seleccionar el país manualmente.'),{enableHighAccuracy:false,timeout:8000,maximumAge:300000});
});

// v8: validate customer and country for email quote too.
document.getElementById('send-market-quote')?.addEventListener('click',e=>{
 const l=localStorage.getItem('aceqsa-lang')||'es', n=document.getElementById('quote-customer-name'), c=document.getElementById('quote-country2');
 if(!n?.value.trim()){e.preventDefault();e.stopImmediatePropagation();alert(l==='en'?'Enter the customer name.':'Ingrese el nombre del cliente.');n?.focus();return;}
 if(!c?.value){e.preventDefault();e.stopImmediatePropagation();alert(l==='en'?'Select a country.':'Seleccione un país.');c?.focus();}
},true);

// v8: unobtrusive location suggestion. Browsers still control permission/privacy prompts.
(()=>{const select=document.getElementById('quote-country2');if(!select||!navigator.geolocation)return;navigator.geolocation.getCurrentPosition(async({coords})=>{try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=3`);const d=await r.json(),code=(d.address?.country_code||'').toUpperCase(),map={CR:'Costa Rica',US:'Estados Unidos',CA:'Canadá',MX:'México',PA:'Panamá',NI:'Nicaragua',HN:'Honduras',SV:'El Salvador',GT:'Guatemala',CO:'Colombia'};const target=map[code]||d.address?.country,opt=[...select.options].find(o=>o.value===target||o.textContent===target||o.dataset.en===target);if(opt&&!select.value)select.value=opt.value}catch{}},()=>{}, {enableHighAccuracy:false,timeout:5000,maximumAge:600000})})();

// v8 home carousel.
(()=>{const slides=[...document.querySelectorAll('.carousel-slide')];if(!slides.length)return;let i=0,t;const show=n=>{slides[i].classList.remove('active');i=(n+slides.length)%slides.length;slides[i].classList.add('active')},auto=()=>{clearInterval(t);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)t=setInterval(()=>show(i+1),5500)};document.querySelector('.carousel-arrow.next')?.addEventListener('click',()=>{show(i+1);auto()});document.querySelector('.carousel-arrow.prev')?.addEventListener('click',()=>{show(i-1);auto()});auto()})();

// v9: inline quote validation, company field, and bilingual WhatsApp/email messages.
(()=>{
 const name=document.getElementById('quote-customer-name'), country=document.getElementById('quote-country2'), company=document.getElementById('quote-company');
 if(!name||!country)return;
 const setError=(el,errorId,bad)=>{const err=document.getElementById(errorId);el.classList.toggle('field-invalid',bad);el.setAttribute('aria-invalid',bad?'true':'false');if(err){err.hidden=!bad;const l=localStorage.getItem('aceqsa-lang')||'es';err.textContent=l==='en'?'Required':'Requerido';}};
 const validate=()=>{const a=!name.value.trim(),b=!country.value;setError(name,'quote-name-error',a);setError(country,'quote-country-error',b);if(a)name.focus();else if(b)country.focus();return !(a||b)};
 name.addEventListener('input',()=>{if(name.value.trim())setError(name,'quote-name-error',false)});country.addEventListener('change',()=>{if(country.value)setError(country,'quote-country-error',false)});
 const email=document.getElementById('send-market-quote'), wa=document.getElementById('send-market-whatsapp');
 // Capture phase prevents older handlers from displaying popup validation.
 [email,wa].forEach(btn=>btn?.addEventListener('click',e=>{if(!validate()){e.preventDefault();e.stopImmediatePropagation();}},true));
 // Replace old email handler after validation by handling first in capture when valid.
 email?.addEventListener('click',e=>{
   if(!validate())return;
   const items=[...document.querySelectorAll('#market-quote-list li span')].map(x=>x.textContent);
   if(!items.length)return; // legacy handler keeps empty-cart behavior
   e.preventDefault();e.stopImmediatePropagation();
   const l=localStorage.getItem('aceqsa-lang')||'es', notes=document.getElementById('quote-notes2')?.value||'';
   const body=l==='en'?`Customer: ${name.value.trim()}\nCompany / business: ${company?.value.trim()||'-'}\nCountry: ${country.options[country.selectedIndex]?.dataset.en||country.value}\n\nRequested items:\n${items.join('\n')}\n\nNotes: ${notes}\n\nPlease confirm price and availability.`:`Cliente: ${name.value.trim()}\nEmpresa / negocio: ${company?.value.trim()||'-'}\nPaís: ${country.value}\n\nProductos y servicios solicitados:\n${items.join('\n')}\n\nNotas: ${notes}\n\nSolicito confirmación de precio y disponibilidad.`;
   location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent(l==='en'?'ACEQSA quote request':'Solicitud de cotización ACEQSA')}&body=${encodeURIComponent(body)}`;
 },true);
 // New WA handler runs before legacy one and fully localizes item labels from visible translated text when possible.
 wa?.addEventListener('click',e=>{
   if(!validate())return;
   const spans=[...document.querySelectorAll('#market-quote-list li span')];if(!spans.length)return;
   e.preventDefault();e.stopImmediatePropagation();
   const l=localStorage.getItem('aceqsa-lang')||'es';
   const items=spans.map(x=>x.textContent.replace(/\s+—\s+[₡$].*$/,'')).join(', ');
   const c=l==='en'?(country.options[country.selectedIndex]?.dataset.en||country.value):country.value;
   const co=company?.value.trim();
   const msg=l==='en'?`Hello ACEQSA, my name is ${name.value.trim()}${co?` from ${co}`:''}. I would like to request a quote for: ${items}. I am from ${c}.`:`Hola ACEQSA, mi nombre es ${name.value.trim()}${co?` de ${co}`:''}. Deseo solicitar una cotización de: ${items}, soy del país de ${c}.`;
   window.open('https://wa.me/50686987840?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
 },true);
})();

// v11: shared inline quote validation for both email and WhatsApp; no popup for required customer/country.
(()=>{
 const name=document.getElementById('quote-customer-name'), country=document.getElementById('quote-country2');
 if(!name||!country)return;
 const show=(el,id,bad)=>{const msg=document.getElementById(id);el.classList.toggle('field-invalid',bad);el.setAttribute('aria-invalid',bad?'true':'false');if(msg){msg.hidden=!bad;msg.textContent=(localStorage.getItem('aceqsa-lang')||'es')==='en'?'Required':'Requerido';}};
 const valid=()=>{const a=!name.value.trim(),b=!country.value;show(name,'quote-name-error',a);show(country,'quote-country-error',b);if(a)name.focus();else if(b)country.focus();return !(a||b)};
 ['send-market-quote','send-market-whatsapp'].forEach(id=>document.getElementById(id)?.addEventListener('click',e=>{if(!valid()){e.preventDefault();e.stopImmediatePropagation();}},true));
})();

// v11: home geolocation service. No custom UI is displayed; browser privacy controls still apply.
(()=>{
 if(!document.body.classList.contains('home-page') && !location.pathname.endsWith('/index.html') && location.pathname!=='/' )return;
 if(!navigator.geolocation)return;
 navigator.geolocation.getCurrentPosition(({coords})=>{
   try{sessionStorage.setItem('aceqsa-location-hint',JSON.stringify({lat:+coords.latitude.toFixed(2),lon:+coords.longitude.toFixed(2),ts:Date.now()}));}catch{}
 },()=>{}, {enableHighAccuracy:false,timeout:5000,maximumAge:1800000});
})();

// v13: automatic country suggestion on Contact without custom location UI.
(()=>{
 const select=document.querySelector('#contact-form select[name="country"]');
 if(!select||select.value||!navigator.geolocation)return;
 navigator.geolocation.getCurrentPosition(async({coords})=>{
   try{
     const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=3`);
     const d=await r.json(), code=(d.address?.country_code||'').toUpperCase();
     const map={CR:'Costa Rica',US:'Estados Unidos',CA:'Canadá',MX:'México',PA:'Panamá',NI:'Nicaragua',HN:'Honduras',SV:'El Salvador',GT:'Guatemala',CO:'Colombia'};
     const target=map[code]||d.address?.country;
     const opt=[...select.options].find(o=>o.value===target||o.textContent===target||o.dataset.en===target);
     if(opt&&!select.value)select.value=opt.value;
   }catch{}
 },()=>{}, {enableHighAccuracy:false,timeout:5000,maximumAge:600000});
})();

// v13: CV and cover-letter click/drag-and-drop selectors.
(()=>{
 const setup=(zoneId,inputId)=>{
   const zone=document.getElementById(zoneId), input=document.getElementById(inputId); if(!zone||!input)return;
   const name=zone.querySelector('.file-drop-name');
   const render=()=>{const l=localStorage.getItem('aceqsa-lang')||'es'; name.textContent=input.files?.[0]?.name||(l==='en'?name.dataset.emptyEn:name.dataset.emptyEs);};
   input.addEventListener('change',render);
   ['dragenter','dragover'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.add('is-dragover')}));
   ['dragleave','drop'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.remove('is-dragover')}));
   zone.addEventListener('drop',e=>{const files=e.dataTransfer?.files;if(!files?.length)return;const dt=new DataTransfer();dt.items.add(files[0]);input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}));});
   zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click()}});
 };
 setup('cv-drop-zone','career-pdf'); setup('cover-drop-zone','cover-letter-file');
})();
