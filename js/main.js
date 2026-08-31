const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
addEventListener('scroll', () => {
  navbar.style.background = scrollY > 10 ? 'rgba(255,255,255,.96)' : 'rgba(247,243,238,.86)';
}, {passive:true});
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ev=>{
    const id=a.getAttribute('href'); if(!id||id==='#') return;
    const t=document.querySelector(id); if(!t) return;
    ev.preventDefault();
    scrollTo({top:t.getBoundingClientRect().top+scrollY-64, behavior:'smooth'});
  });
});
const form=document.getElementById('contactForm');
const statusEl=document.getElementById('formStatus');
const btn=document.getElementById('submitBtn');
form?.addEventListener('submit', e=>{
  const n=form.nombre.value.trim(), em=form.email.value.trim(), m=form.mensaje.value.trim();
  if(n.length<2 || !em.includes('@') || m.length<8){
    e.preventDefault();
    statusEl.textContent='Revisá: nombre, email válido y mensaje de al menos 8 caracteres.';
    statusEl.style.color='#B94A48'; return;
  }
  btn.textContent='Enviando...'; btn.disabled=true;
  statusEl.textContent='Enviando consulta a consultasibpcap@gmail.com...';
  statusEl.style.color='#8C7344';
});
