// Navbar color change on scroll
const nav = document.getElementById('mainNav');
const onScroll = () => {
  if(window.scrollY > 24){
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
document.addEventListener('scroll', onScroll);
onScroll();

// WhatsApp form + floating button
const form = document.getElementById('whatsappForm');
const waFloat = document.getElementById('whatsappFloat');
const phone = '5579998811954'; // <-- substitua pelo número da Camila (apenas dígitos, com DDI)

function buildWaURL(){
  const nome = document.getElementById('nome')?.value || '';
  const assunto = document.getElementById('assunto')?.value || 'Agendamento de sessão';
  const pref = document.getElementById('preferencia')?.value || 'Online';
  const msg = document.getElementById('mensagem')?.value || '';
  const text = `Olá, sou ${nome}. Assunto: ${assunto}. Preferência: ${pref}. Mensagem: ${msg}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return url;
}

if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    window.open(buildWaURL(), '_blank');
  });
}
if(waFloat){
  waFloat.addEventListener('click',(e)=>{
    e.preventDefault();
    window.open(buildWaURL(), '_blank');
  });
}

// Lightbox da galeria
const galleryLinks = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightImg = document.getElementById('lightbox-img');
const btnPrev = document.querySelector('.lightbox .prev');
const btnNext = document.querySelector('.lightbox .next');
const btnClose = document.querySelector('.btn-close-lightbox');
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  const href = galleryLinks[currentIndex].getAttribute('href');
  lightImg.src = href;
  lightbox.classList.remove('d-none');
}

function closeLightbox(){
  lightbox.classList.add('d-none');
  lightImg.src = '';
}

function showPrev(){
  currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
  lightImg.src = galleryLinks[currentIndex].getAttribute('href');
}
function showNext(){
  currentIndex = (currentIndex + 1) % galleryLinks.length;
  lightImg.src = galleryLinks[currentIndex].getAttribute('href');
}

galleryLinks.forEach((a, i)=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    openLightbox(i);
  });
});
btnPrev?.addEventListener('click', showPrev);
btnNext?.addEventListener('click', showNext);
btnClose?.addEventListener('click', closeLightbox);

// Fechar com ESC e navegar com setas
document.addEventListener('keydown', (e)=>{
  if(lightbox.classList.contains('d-none')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') showPrev();
  if(e.key === 'ArrowRight') showNext();
});
