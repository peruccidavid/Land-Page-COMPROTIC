/* ============================================================
   COMPROTIC · MAIN.JS
   Interactividad: menú móvil, scroll reveal, contadores,
   modal Simón, formulario de contacto, barra de progreso.
   ============================================================ */

'use strict';

/* ---------- Estado global ---------- */
const state = {
  mobileMenuOpen: false,
  modalOpen: false
};

/* ============================================================
   1. NAVBAR · Efecto al hacer scroll + fondo sólido
   ============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // Estado inicial

/* ============================================================
   2. BARRA DE PROGRESO DE SCROLL
   ============================================================ */
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scrollProgress';
document.body.appendChild(scrollProgress);

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

/* ============================================================
   3. MENÚ MÓVIL (Burger)
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;

  if (state.mobileMenuOpen) {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    menuBtn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>`;
  } else {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
    menuBtn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>`;
  }
}

function closeMobileMenu() {
  if (state.mobileMenuOpen) {
    state.mobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
    menuBtn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>`;
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMobileMenu);
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ============================================================
   4. EFECTO REVEAL AL HACER SCROLL (IntersectionObserver)
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el, index) => {
  // Asignar retardos escalonados
  if (index % 3 === 1) el.classList.add('reveal-delay-1');
  if (index % 3 === 2) el.classList.add('reveal-delay-2');
  revealObserver.observe(el);
});

/* ============================================================
   5. CONTADORES ANIMADOS (stats del hero)
   ============================================================ */
const counterElements = document.querySelectorAll('.counter');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function updateCounter(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const currentValue = Math.floor(eased * target);

    el.textContent = currentValue.toLocaleString('es-VE');

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target.toLocaleString('es-VE');
    }
  }

  requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(counter => counterObserver.observe(counter));

/* ============================================================
   6. MODAL SIMÓN (chatbot demo)
   ============================================================ */
const modalSimon = document.getElementById('modal-simon');
const btnSimon = document.getElementById('btnSimon');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const closeModalBtns = document.querySelectorAll('.close-modal');

const CHAT_RESPONSES = {
  default: 'Entiendo tu consulta. Un asesor académico pronto te atenderá para darte más detalles.',
  horario: 'El horario de atención de COMPROTIC es de lunes a viernes, de 8:00 am a 4:00 pm.',
  servicios: 'Ofrecemos sistemas a medida, prototipos de hardware, supercómputo, impresión 3D, capacitación y consultoría I+D+i.',
  contacto: 'Puedes escribirnos a comprotic@unefa.edu.ve o usar el formulario de contacto en esta página.',
  costo: 'Los costos varían según el proyecto y requerimientos. Te invitamos a enviar una solicitud para recibir una cotización personalizada.',
  horario: 'Nuestro horario de servicio es de lunes a viernes de 8:00 am a 4:00 pm.'
};

function normalizeText(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getBotResponse(input) {
  const normalized = normalizeText(input);

  if (normalized.includes('horario') || normalized.includes('hora')) {
    return CHAT_RESPONSES.horario;
  }
  if (normalized.includes('servicio') || normalized.includes('ofrec')) {
    return CHAT_RESPONSES.servicios;
  }
  if (normalized.includes('contacto') || normalized.includes('correo') || normalized.includes('email')) {
    return CHAT_RESPONSES.contacto;
  }
  if (normalized.includes('costo') || normalized.includes('precio') || normalized.includes('cotiz')) {
    return CHAT_RESPONSES.costo;
  }
  return CHAT_RESPONSES.default;
}

function addChatMessage(message, isUser = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg flex gap-2 items-start ${
    isUser
      ? 'bg-tgreen-500/10 border border-tgreen-500/30 rounded-xl rounded-tr-none p-3 max-w-[85%] ml-auto'
      : 'bg-carbon-800 border border-carbon-700 rounded-xl rounded-tl-none p-3 max-w-[85%]'
  }`;

  const prefix = isUser ? 'Tú: ' : 'Simón: ';
  const color = isUser ? 'text-tgreen-400' : 'text-tgreen-400';

  msgDiv.innerHTML = `
    <p class="text-sm text-gray-300">
      <span class="${color} font-semibold">${prefix}</span>${message}
    </p>
  `;

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendChatMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(message, true);
  chatInput.value = '';

  // Simular respuesta del bot con delay
  setTimeout(() => {
    addChatMessage(getBotResponse(message), false);
  }, 800);
}

function openModal() {
  if (!state.modalOpen) {
    state.modalOpen = true;
    modalSimon.classList.remove('hidden');
    modalSimon.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }
}

function closeModal() {
  if (state.modalOpen) {
    state.modalOpen = false;
    modalSimon.classList.add('hidden');
    modalSimon.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

if (btnSimon) {
  btnSimon.addEventListener('click', openModal);
}

if (chatSend) {
  chatSend.addEventListener('click', sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChatMessage();
    }
  });
}

closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

// Cerrar modal al hacer clic en el backdrop
if (modalSimon) {
  modalSimon.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeMobileMenu();
  }
});

/* ============================================================
   7. FORMULARIO DE CONTACTO
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const btnEnviar = document.getElementById('btnEnviar');

function setFieldError(input, hasError) {
  const label = input.id;
  if (hasError) {
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
  }
}

function validateForm() {
  let isValid = true;
  const fields = {
    nombre: document.getElementById('nombre'),
    email: document.getElementById('email'),
    servicio: document.getElementById('servicio'),
    mensaje: document.getElementById('mensaje')
  };

  // Validar nombre (mín 3 caracteres)
  if (fields.nombre.value.trim().length < 3) {
    setFieldError(fields.nombre, true);
    isValid = false;
  } else {
    setFieldError(fields.nombre, false);
  }

  // Validar email con regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email.value)) {
    setFieldError(fields.email, true);
    isValid = false;
  } else {
    setFieldError(fields.email, false);
  }

  // Validar servicio seleccionado
  if (!fields.servicio.value) {
    setFieldError(fields.servicio, true);
    isValid = false;
  } else {
    setFieldError(fields.servicio, false);
  }

  // Validar mensaje (mín 10 caracteres)
  if (fields.mensaje.value.trim().length < 10) {
    setFieldError(fields.mensaje, true);
    isValid = false;
  } else {
    setFieldError(fields.mensaje, false);
  }

  return isValid;
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar estados
    formStatus.classList.add('hidden');
    formStatus.classList.remove('form-success', 'form-error');

    if (!validateForm()) {
      formStatus.textContent = '⚠️ Por favor, verifique los campos marcados en rojo.';
      formStatus.classList.remove('hidden');
      formStatus.classList.add('form-error');
      return;
    }

    // Simular envío
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Enviando...
    `;

    // Datos del formulario
    const formData = {
      nombre: document.getElementById('nombre').value,
      institucion: document.getElementById('institucion').value,
      email: document.getElementById('email').value,
      servicio: document.getElementById('servicio').value,
      mensaje: document.getElementById('mensaje').value
    };

    console.log('Datos de solicitud:', formData);

    // Simular envío asíncrono (en producción reemplazar por fetch/API)
    setTimeout(() => {
      formStatus.textContent = '✔️ ¡Solicitud enviada exitosamente! Nuestro equipo se pondrá en contacto con usted.';
      formStatus.classList.remove('hidden');
      formStatus.classList.add('form-success');

      contactForm.reset();
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 11l2 2L22 4"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
        Enviar Solicitud`;
    }, 1800);

    // Ocultar el mensaje después de 6 segundos
    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 6000);
  });

  // Limpiar errores mientras se escribe
  ['nombre', 'email', 'servicio', 'mensaje'].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          setFieldError(field, false);
        }
      });
    }
  });
}

/* ============================================================
   8.  AÑO DE COPYRIGHT AUTOMÁTICO
   ============================================================ */
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ============================================================
   9. ACTIVE NAV LINK (resaltar sección actual)
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY;
  const offset = 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (targetLink) {
        navLinks.forEach(link => {
          link.classList.remove('text-tgreen-400', 'font-semibold');
          link.classList.add('text-gray-300');
        });
        targetLink.classList.add('text-tgreen-400', 'font-semibold');
        targetLink.classList.remove('text-gray-300');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink();

/* ============================================================
   10. NOTIFICACIÓN DE VERSIÓN DEMO (opcional)
   ============================================================ */
console.log('%cCOMPROTIC 🚀', 'background: #16a34a; color: white; font-size: 20px; font-weight: bold; padding: 8px 12px; border-radius: 6px;');
console.log('%cInnovación universitaria al servicio de la soberanía tecnológica nacional.', 'color: #22c55e; font-size: 13px;');
console.log('%cDesarrollado con HTML5 · Tailwind CSS · JavaScript — UNEFA VIDI.', 'color: #22d3ee; font-size: 12px;');

/* ============================================================
   INICIALIZACIÓN AL CARGAR
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Asegurar que el hero reveal se muestre inmediatamente
  document.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('reveal-visible');
    }
  });
});