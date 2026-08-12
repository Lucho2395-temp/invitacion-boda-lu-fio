// ==========================================================
// Invitación de boda — Luis & Fiorelita
// ==========================================================

// ---------- Sobre de apertura (pantalla inicial) ----------
// Personalización OPCIONAL por invitado vía parámetros en la URL:
// index.html?invitado=Juan%20Casas&cupos=2
// Si no se agregan parámetros, el sobre funciona igual, solo que
// sin mostrar el bloque de nombre/cupos.

let cupos = 0;
(function initGuestPersonalization(){
  const params = new URLSearchParams(window.location.search);
  const invitado = params.get('invitado');
  const invitado2 = params.get('invitado2');
  // let cupos = 0;
  if(invitado){
    document.getElementById('nombre').value = `${invitado}`;
    document.getElementById('nombre').readOnly = true;
    cupos++;
  }
  if(invitado2){
    document.getElementById('nombre').value += ` y ${invitado2}`;
    cupos++;
  }
  if(cupos>0){
    document.getElementById('acompanantes').value = `${cupos}`;
    //document.getElementById('acompanantes').readOnly = true;
  }
})();

// ---------- Countdown a la fecha de la boda ----------
const weddingDate = new Date("2026-09-26T00:00:00");

function updateCountdown(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-min').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-sec').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el=> io.observe(el));

// ---------- RSVP -> WhatsApp ----------
function enviarConfirmacion(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const asistencia = document.getElementById('asistencia').value;
  const acompanantes = document.getElementById('acompanantes').value;
  const mensaje = `Hola, soy ${nombre}. Confirmo mi asistencia a la boda de Luis y Fiorelita: ${asistencia}. Número de acompañantes: ${acompanantes}.`;
  const numeroWhatsApp = "51977969250";
  window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, "_blank");
  return false;
}

// ---------- Slider de fotos ----------
const sliderTrack = document.getElementById('sliderTrack');
const slides = sliderTrack ? Array.from(sliderTrack.children) : [];
const dotsWrap = document.getElementById('sliderDots');
let currentSlide = 0;
let sliderTimer;

if(dotsWrap){
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}
const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

function goToSlide(index) {
    currentSlide =
        (index + slides.length) % slides.length;
    const slide = slides[currentSlide];
    const styles =
        window.getComputedStyle(sliderTrack);
    const gap =
        parseFloat(styles.gap) || 0;
    const slideWidth =
        slide.offsetWidth;
    const offset =
        currentSlide * (slideWidth + gap);
    sliderTrack.style.transform =
        `translateX(-${offset}px)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle(
            'active',
            i === currentSlide
        );
    });
}
function moveSlide(dir){
  goToSlide(currentSlide + dir);
  resetAutoplay();
}
function startAutoplay(){
  sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function resetAutoplay(){
  clearInterval(sliderTimer);
  startAutoplay();
}
if(slides.length){
  startAutoplay();
  const sliderEl = document.getElementById('slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(sliderTimer));
  sliderEl.addEventListener('mouseleave', startAutoplay);
}

// ---------- Regalo: copiar número/cuenta ----------
function copiarDato(btn){
  const valor = btn.getAttribute('data-copy');
  const original = btn.textContent;
  const marcarCopiado = () => {
    btn.textContent = '¡Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  };
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(valor).then(marcarCopiado).catch(() => {});
  } else {
    // Fallback para navegadores/contextos sin Clipboard API
    const temp = document.createElement('textarea');
    temp.value = valor;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try { document.execCommand('copy'); marcarCopiado(); } catch(e) {}
    document.body.removeChild(temp);
  }
}

// ---------- Botón flotante de música ----------
function toggleMusic(){
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('musicToggle');
  if(audio.paused){
    audio.play().catch(() => {});
    btn.classList.add('playing');
  } else {
    audio.pause();
    btn.classList.remove('playing');
  }
}

function validar_cupos(id){
  const input = document.getElementById(id);
  let valor = parseInt(input.value, 10); 
  if (isNaN(valor) || valor < 0) {
    input.value = 0;
  }
  if(cupos > 0){
    if (valor > cupos) {
      input.value = cupos;
      alert(`El número máximo de acompañantes permitidos es ${cupos}.`);
    }
  }
}
