
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const body=document.body;
// mobile menu
const menuBtn=$('.menu-toggle'), nav=$('.main-nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰'});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');if(menuBtn){menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}}));
// theme
const savedTheme=localStorage.getItem('aceqsa-theme'); if(savedTheme==='dark') body.classList.add('dark');
const themeBtn=$('#theme-toggle'); const syncTheme=()=>{if(themeBtn){themeBtn.textContent=body.classList.contains('dark')?'☀️':'🌙';themeBtn.title=body.classList.contains('dark')?'Cambiar a modo claro':'Cambiar a modo oscuro'}};syncTheme();
themeBtn?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('aceqsa-theme',body.classList.contains('dark')?'dark':'light');syncTheme()});
// language toggle using data-es/data-en
let lang=localStorage.getItem('aceqsa-lang')||'es';
function applyLang(){document.documentElement.lang=lang;$$('[data-es][data-en]').forEach(el=>{el.textContent=el.dataset[lang]});$$('[data-placeholder-es]').forEach(el=>el.placeholder=el.dataset['placeholder'+(lang==='es'?'Es':'En')]);const b=$('#lang-toggle');if(b)b.textContent=lang==='es'?'EN':'ES';localStorage.setItem('aceqsa-lang',lang)}applyLang();
$('#lang-toggle')?.addEventListener('click',()=>{lang=lang==='es'?'en':'es';applyLang()});
// a11y
const panel=$('#a11y-panel'), openA=$('#a11y-open'), closeA=$('#a11y-close');
openA?.addEventListener('click',()=>{panel.hidden=!panel.hidden;if(!panel.hidden)closeA?.focus()});closeA?.addEventListener('click',()=>{panel.hidden=true;openA?.focus()});
panel?.addEventListener('click',e=>{const a=e.target.dataset.a11y;if(!a)return;if(a==='font-up'){const root=document.documentElement;const n=parseFloat(getComputedStyle(root).getPropertyValue('--text-scale'))||1;root.style.setProperty('--text-scale',n>=1.25?1:(n+.1).toFixed(2))}if(a==='contrast')body.classList.toggle('high-contrast');if(a==='motion')body.classList.toggle('reduce-motion');if(a==='reset'){document.documentElement.style.setProperty('--text-scale',1);body.classList.remove('high-contrast','reduce-motion')}});
// back to top
const topBtn=$('#back-to-top');window.addEventListener('scroll',()=>topBtn?.classList.toggle('show',scrollY>450),{passive:true});topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
// year
$$('.year').forEach(x=>x.textContent=new Date().getFullYear());
// Calculator
const calc=$('#quote-calculator');
const catalog={
 'laptop':{label:'Computadora portátil empresarial',price:650},'desktop':{label:'Computadora de escritorio',price:550},'server':{label:'Servidor / infraestructura',price:1800},'printer':{label:'Impresora / multifuncional',price:280},'network':{label:'Equipo de red',price:190},'storage':{label:'Almacenamiento',price:120},'support':{label:'Soporte técnico (hora)',price:45},'maintenance':{label:'Mantenimiento preventivo (equipo)',price:35},'cabling':{label:'Cableado estructurado (punto)',price:55},'training':{label:'Capacitación / Academia (persona)',price:30}
};
function calculate(){if(!calc)return;const key=$('#calc-item')?.value||'laptop',q=Math.max(1,Number($('#calc-qty')?.value)||1),discount=Math.min(25,Math.max(0,Number($('#calc-discount')?.value)||0)),tax=$('#calc-tax')?.checked?0.13:0;const base=catalog[key].price*q;const disc=base*(discount/100);const sub=base-disc;const iva=sub*tax;const total=sub+iva;$('#calc-base').textContent='$'+base.toFixed(2);$('#calc-disc').textContent='-$'+disc.toFixed(2);$('#calc-tax-value').textContent='$'+iva.toFixed(2);$('#calc-total').textContent='$'+total.toFixed(2);const wa=$('#calc-whatsapp');if(wa){const msg=`Hola ACEQSA. Deseo confirmar una cotización aproximada para ${q} x ${catalog[key].label}. Estimado web: $${total.toFixed(2)}. ¿Me pueden ayudar?`;wa.href='https://wa.me/50686987840?text='+encodeURIComponent(msg)}}
calc?.addEventListener('input',calculate);calculate();
// contact form opens mail client with captured data
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=`Consulta web ACEQSA - ${f.get('asunto')||'Información'}`;const msg=`Nombre: ${f.get('nombre')||''}\nEmpresa: ${f.get('empresa')||''}\nTeléfono: ${f.get('telefono')||''}\nCorreo: ${f.get('correo')||''}\n\nMensaje:\n${f.get('mensaje')||''}`;window.location.href=`mailto:servicioalcliente@aceqsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;const status=$('#form-status');if(status)status.textContent='Se abrió su aplicación de correo con el mensaje preparado.'});
