/* ============================================================
   COMPROTIC · MAIN.JS
   Interactividad institucional: Three.js 3D Hero, Menú móvil,
   Scroll reveal, Contadores, Modal Simón, Formulario de contacto.
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
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

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
   3. MENÚ MÓVIL
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
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((el, index) => {
  if (index % 3 === 1) el.classList.add('reveal-delay-1');
  if (index % 3 === 2) el.classList.add('reveal-delay-2');
  revealObserver.observe(el);
});

/* ============================================================
   5. CONTADORES ANIMADOS
   ============================================================ */
const counterElements = document.querySelectorAll('.counter');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function updateCounter(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
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
}, { threshold: 0.4 });

counterElements.forEach(counter => counterObserver.observe(counter));

/* ============================================================
   6. THREE.JS · ÍCONO COMPROTIC EN 3D CON INTERACCIÓN
   ============================================================ */
function initHero3D() {
  const container = document.getElementById('hero3DContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 500;

  // Escena, Cámara y Renderizador
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.id = 'hero3DCanvas';
  container.appendChild(renderer.domElement);

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x0085bf, 3.5, 20);
  fillLight.position.set(-5, -2, 5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x004c9e, 4.0, 20);
  rimLight.position.set(0, -4, -3);
  scene.add(rimLight);

  // Grupo principal para el emblema 3D
  const badgeGroup = new THREE.Group();
  scene.add(badgeGroup);

  // Textura del ícono COMPROTIC SVG
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/comprotic-icon.svg', (iconTexture) => {
    iconTexture.generateMipmaps = true;
    iconTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // 1. Placa base hexagonal/circular tecnológica
    const baseGeo = new THREE.CylinderGeometry(2.35, 2.45, 0.35, 64);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c1322,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    badgeGroup.add(baseMesh);

    // 2. Anillo biselado exterior en azul institucional (#0085bf)
    const ringBevelGeo = new THREE.TorusGeometry(2.48, 0.08, 16, 80);
    const ringBevelMat = new THREE.MeshStandardMaterial({
      color: 0x0085bf,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x004c9e,
      emissiveIntensity: 0.4
    });
    const ringBevel = new THREE.Mesh(ringBevelGeo, ringBevelMat);
    badgeGroup.add(ringBevel);

    // 3. Cara frontal con el logo SVG proyectado
    const faceGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const faceMat = new THREE.MeshStandardMaterial({
      map: iconTexture,
      transparent: true,
      roughness: 0.2,
      metalness: 0.5,
      emissive: 0x0085bf,
      emissiveIntensity: 0.15
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.z = 0.20;
    badgeGroup.add(faceMesh);

    // 4. Cara posterior con relieve pulido
    const backFaceGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const backFaceMat = new THREE.MeshStandardMaterial({
      map: iconTexture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.7
    });
    const backFaceMesh = new THREE.Mesh(backFaceGeo, backFaceMat);
    backFaceMesh.position.z = -0.20;
    backFaceMesh.rotation.y = Math.PI;
    badgeGroup.add(backFaceMesh);
  });

  // Anillos orbitales giroscópicos institucionales
  const orbit1Geo = new THREE.TorusGeometry(3.3, 0.025, 16, 100);
  const orbit1Mat = new THREE.MeshStandardMaterial({
    color: 0x0085bf,
    emissive: 0x0085bf,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.75
  });
  const orbitRing1 = new THREE.Mesh(orbit1Geo, orbit1Mat);
  orbitRing1.rotation.x = Math.PI / 3;
  scene.add(orbitRing1);

  const orbit2Geo = new THREE.TorusGeometry(3.8, 0.018, 16, 100);
  const orbit2Mat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x004c9e,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.6
  });
  const orbitRing2 = new THREE.Mesh(orbit2Geo, orbit2Mat);
  orbitRing2.rotation.y = Math.PI / 4;
  orbitRing2.rotation.x = -Math.PI / 5;
  scene.add(orbitRing2);

  // Constelación de partículas de datos sutiles
  const particleCount = 75;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 2.8 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    particlePositions[i] = radius * Math.cos(theta) * Math.cos(phi);
    particlePositions[i + 1] = radius * Math.sin(phi);
    particlePositions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.05,
    transparent: true,
    opacity: 0.6
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Manejo de interacción con el cursor del mouse
  let targetRotX = 0;
  let targetRotY = 0;
  let mouseX = 0;
  let mouseY = 0;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX = (x / rect.width) * 2 - 1;
    mouseY = -(y / rect.height) * 2 + 1;

    targetRotY = mouseX * 0.55;
    targetRotX = -mouseY * 0.45;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Manejo de Resize
  function onResize() {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onResize);

  // Ciclo de renderizado a 60 FPS
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Rotación suave con amortiguación inercial (lerp)
    badgeGroup.rotation.y += (targetRotY - badgeGroup.rotation.y) * 0.05;
    badgeGroup.rotation.x += (targetRotX - badgeGroup.rotation.x) * 0.05;

    // Oscilación levitante institucional suave
    badgeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

    // Giro constante de anillos orbitales
    orbitRing1.rotation.z += delta * 0.25;
    orbitRing1.rotation.y += delta * 0.12;

    orbitRing2.rotation.z -= delta * 0.20;
    orbitRing2.rotation.x += delta * 0.15;

    // Rotación lenta de la constelación
    particleSystem.rotation.y += delta * 0.04;

    renderer.render(scene, camera);
  }

  animate();
}

/* ============================================================
   7. MODAL SIMÓN (Chatbot Demo Institucional)
   ============================================================ */
const modalSimon = document.getElementById('modal-simon');
const btnSimon = document.getElementById('btnSimon');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const closeModalBtns = document.querySelectorAll('.close-modal');

const CHAT_RESPONSES = {
  default: 'Entendido. Un asesor institucional de COMPROTIC atenderá su requerimiento para brindarle información personalizada.',
  horario: 'El horario de atención institucional de COMPROTIC es de lunes a viernes, de 8:00 am a 4:00 pm.',
  servicios: 'COMPROTIC ofrece cuatro unidades estratégicas: Desarrollo de Software e Ingeniería, Laboratorio de Manufactura (UNEFABLAB), Centro de Cómputo y Control de Calidad de Producción.',
  contacto: 'Puede comunicarse a través de nuestro correo institucional comprotic@unefa.edu.ve o mediante el formulario de solicitud en esta página.',
  costo: 'La evaluación técnica de proyectos se realiza de forma personalizada según las especificaciones institucionales.',
  unidades: 'Nuestras 4 Unidades son: Centro de Desarrollo de Tecnología, UNEFABLAB 3D, Centro de Cómputo y Unidad de Control y Calidad.'
};

function normalizeText(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getBotResponse(input) {
  const normalized = normalizeText(input);

  if (normalized.includes('horario') || normalized.includes('hora')) return CHAT_RESPONSES.horario;
  if (normalized.includes('servicio') || normalized.includes('ofrec')) return CHAT_RESPONSES.servicios;
  if (normalized.includes('unidad') || normalized.includes('unidades')) return CHAT_RESPONSES.unidades;
  if (normalized.includes('contacto') || normalized.includes('correo') || normalized.includes('email')) return CHAT_RESPONSES.contacto;
  if (normalized.includes('costo') || normalized.includes('precio') || normalized.includes('cotiz')) return CHAT_RESPONSES.costo;
  return CHAT_RESPONSES.default;
}

function addChatMessage(message, isUser = false) {
  if (!chatWindow) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg flex gap-2 items-start ${
    isUser
      ? 'bg-[#0085bf]/15 border border-[#0085bf]/40 rounded-xl rounded-tr-none p-3 max-w-[85%] ml-auto'
      : 'bg-[#111a2b] border border-[#232d3d] rounded-xl rounded-tl-none p-3 max-w-[85%]'
  }`;

  const prefix = isUser ? 'Usted: ' : 'Simón: ';
  const prefixColor = isUser ? 'text-[#38bdf8]' : 'text-[#0085bf]';

  msgDiv.innerHTML = `
    <p class="text-sm text-gray-200">
      <span class="${prefixColor} font-semibold">${prefix}</span>${message}
    </p>
  `;

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendChatMessage() {
  if (!chatInput) return;
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(message, true);
  chatInput.value = '';

  setTimeout(() => {
    addChatMessage(getBotResponse(message), false);
  }, 700);
}

function openModal() {
  if (!state.modalOpen && modalSimon) {
    state.modalOpen = true;
    modalSimon.classList.remove('hidden');
    modalSimon.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }
}

function closeModal() {
  if (state.modalOpen && modalSimon) {
    state.modalOpen = false;
    modalSimon.classList.add('hidden');
    modalSimon.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

if (btnSimon) btnSimon.addEventListener('click', openModal);
const btnUnefitoWeb = document.getElementById('btnUnefitoWeb');
if (btnUnefitoWeb) {
  btnUnefitoWeb.addEventListener('click', () => {
    alert('El asistente web interactivo de Unefito estará disponible próximamente. Actualmente puedes chatear de inmediato con Unefito a través de Telegram.');
  });
}
if (chatSend) chatSend.addEventListener('click', sendChatMessage);
if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChatMessage();
    }
  });
}

closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

if (modalSimon) {
  modalSimon.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeMobileMenu();
    if (window.ProjectViewer) window.ProjectViewer.close();
  }
});

/* ============================================================
   8. FORMULARIO DE CONTACTO INSTITUCIONAL
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const btnEnviar = document.getElementById('btnEnviar');

function setFieldError(input, hasError) {
  if (!input) return;
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
    mensaje: document.getElementById('mensaje')
  };

  if (fields.nombre && fields.nombre.value.trim().length < 3) {
    setFieldError(fields.nombre, true);
    isValid = false;
  } else {
    setFieldError(fields.nombre, false);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (fields.email && !emailRegex.test(fields.email.value)) {
    setFieldError(fields.email, true);
    isValid = false;
  } else {
    setFieldError(fields.email, false);
  }

  if (fields.mensaje && fields.mensaje.value.trim().length < 10) {
    setFieldError(fields.mensaje, true);
    isValid = false;
  } else {
    setFieldError(fields.mensaje, false);
  }

  return isValid;
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formStatus) {
      formStatus.classList.add('hidden');
      formStatus.classList.remove('form-success', 'form-error');
    }

    if (!validateForm()) {
      if (formStatus) {
        formStatus.textContent = 'Por favor, complete todos los campos requeridos correctamente antes de continuar.';
        formStatus.classList.remove('hidden');
        formStatus.classList.add('form-error');
      }
      return;
    }

    const btnTextoOriginal = btnEnviar.innerHTML;
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <span>Enviando solicitud institucional...</span>
    `;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('enviar-correo.php', {
        method: 'POST',
        body: formData
      });

      const responseText = await response.text();
      let result = null;

      try {
        result = JSON.parse(responseText);
      } catch (jsonErr) {
        // Si el servidor local (ej. serve/Node) no interpreta PHP y devuelve el código en texto plano
        if (responseText.includes('<?php') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          if (formStatus) {
            formStatus.innerHTML = `
              <strong>Modo de prueba local:</strong> Los datos se validaron con éxito. En su servidor <strong>cPanel</strong>, el archivo <code>enviar-correo.php</code> procesará y enviará el correo directamente a <strong>somos@comprotic.com.ve</strong>.
            `;
            formStatus.classList.remove('hidden');
            formStatus.classList.add('form-success');
          }
          contactForm.reset();
          return;
        }
      }

      if (result && result.success) {
        if (formStatus) {
          formStatus.textContent = result.message || '¡Solicitud enviada exitosamente! El equipo técnico de COMPROTIC se comunicará a la brevedad.';
          formStatus.classList.remove('hidden');
          formStatus.classList.add('form-success');
        }
        contactForm.reset();
      } else {
        const errorMsg = (result && result.message) ? result.message : 'Ocurrió un inconveniente al enviar la solicitud. Por favor, intente nuevamente o escriba a somos@comprotic.com.ve.';
        if (formStatus) {
          formStatus.textContent = errorMsg;
          formStatus.classList.remove('hidden');
          formStatus.classList.add('form-error');
        }
      }
    } catch (err) {
      // Si ocurrió un fallo de red o conectividad
      if (formStatus) {
        formStatus.textContent = 'No fue posible conectar con el servidor de envío. Por favor verifique su conexión o contáctenos directamente a somos@comprotic.com.ve.';
        formStatus.classList.remove('hidden');
        formStatus.classList.add('form-error');
      }
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = btnTextoOriginal;

      // Ocultar mensaje después de 9 segundos si fue exitoso
      setTimeout(() => {
        if (formStatus && formStatus.classList.contains('form-success')) {
          formStatus.classList.add('hidden');
        }
      }, 9000);
    }
  });

  ['nombre', 'email', 'servicio', 'mensaje'].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', () => {
        if (field.value.trim()) setFieldError(field, false);
      });
    }
  });
}

/* ============================================================
   9. AÑO DE COPYRIGHT
   ============================================================ */
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ============================================================
   10. ACTIVE NAV LINK
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY;
  const offset = 140;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (targetLink) {
        navLinks.forEach(link => {
          link.classList.remove('text-[#0085bf]', 'font-semibold');
          link.classList.add('text-gray-300');
        });
        targetLink.classList.add('text-[#0085bf]', 'font-semibold');
        targetLink.classList.remove('text-gray-300');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink();

/* ============================================================
   11. PARALLAX DE PROFUNDIDAD EN BANNER CUNAGUARO
   ============================================================ */
function initCunaguaroParallax() {
  const banner = document.getElementById('bannerCunaguaro');
  const img = document.getElementById('parallaxCunaguaroImg');
  if (!banner || !img) return;

  // 1. Parallax cinemático al hacer scroll
  function updateScrollParallax() {
    const rect = banner.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (scrollProgress - 0.5) * 25;
      img.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
    }
  }

  window.addEventListener('scroll', updateScrollParallax, { passive: true });
  updateScrollParallax();

  // 2. Parallax de profundidad interactiva al mover el cursor sobre el banner
  banner.addEventListener('mousemove', (e) => {
    const rect = banner.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const scrollY = (scrollProgress - 0.5) * 25;

    // Desplazamiento reactivo bidimensional suave
    img.style.transform = `translate3d(${x * -20}px, ${scrollY + y * -10}px, 0) scale(1.12)`;
  });

  banner.addEventListener('mouseleave', () => {
    updateScrollParallax();
  });
}

/* ============================================================
   12. PORTAFOLIO: FILTRADO Y BÚSQUEDA INTERACTIVA
   ============================================================ */
function initPortafolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const searchInput = document.getElementById('project-search-input');
  const counterEl = document.getElementById('visible-projects-count');
  const totalEl = document.getElementById('total-projects-count');
  const noResultsEl = document.getElementById('no-projects-found');
  const resetBtn = document.getElementById('reset-filters-btn');
  const projectModal = document.getElementById('project-modal');

  // Elementos de Paginación
  const paginationEl = document.getElementById('projects-pagination');
  const prevPageBtn = document.getElementById('prev-page-btn');
  const nextPageBtn = document.getElementById('next-page-btn');
  const pageNumbersContainer = document.getElementById('pagination-numbers');
  const currentPageNumEl = document.getElementById('current-page-num');
  const totalPagesNumEl = document.getElementById('total-pages-num');
  const gridEl = document.getElementById('projects-grid');

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal && window.ProjectViewer) {
        window.ProjectViewer.close();
      }
    });
  }

  if (!projectCards.length) return;

  const ITEMS_PER_PAGE = 6;
  let currentPage = 1;
  let activeCategory = 'all';
  let searchTerm = '';
  let matchingCards = [];

  if (totalEl) totalEl.textContent = projectCards.length;

  function scrollToGridTop() {
    if (gridEl) {
      const rect = gridEl.getBoundingClientRect();
      if (rect.top < 80 || rect.top > window.innerHeight) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderPagination(totalPages, totalMatching) {
    if (!paginationEl) return;

    if (totalMatching <= ITEMS_PER_PAGE || totalPages <= 1) {
      paginationEl.classList.add('hidden');
      return;
    }

    paginationEl.classList.remove('hidden');

    if (currentPageNumEl) currentPageNumEl.textContent = currentPage;
    if (totalPagesNumEl) totalPagesNumEl.textContent = totalPages;

    if (prevPageBtn) prevPageBtn.disabled = (currentPage <= 1);
    if (nextPageBtn) nextPageBtn.disabled = (currentPage >= totalPages);

    if (pageNumbersContainer) {
      pageNumbersContainer.innerHTML = '';
      for (let p = 1; p <= totalPages; p++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Página ${p}`);
        btn.textContent = p;

        if (p === currentPage) {
          btn.className = 'w-10 h-10 rounded-xl text-sm font-mono font-bold border border-[#0085bf] text-[#38bdf8] bg-[#0085bf]/25 shadow-[0_0_12px_rgba(0,133,191,0.35)] flex items-center justify-center cursor-default';
        } else {
          btn.className = 'w-10 h-10 rounded-xl text-sm font-mono font-semibold border border-[#232d3d] text-gray-400 bg-[#0c121e] hover:border-[#0085bf]/50 hover:text-white transition-all flex items-center justify-center cursor-pointer';
          btn.addEventListener('click', () => {
            currentPage = p;
            applyDisplayAndPagination(false);
            scrollToGridTop();
          });
        }
        pageNumbersContainer.appendChild(btn);
      }
    }
  }

  function applyDisplayAndPagination(scrollOnPageChange = false) {
    const totalMatching = matchingCards.length;
    const totalPages = Math.ceil(totalMatching / ITEMS_PER_PAGE) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    projectCards.forEach(card => {
      const matchIndex = matchingCards.indexOf(card);
      if (matchIndex !== -1 && matchIndex >= startIndex && matchIndex < endIndex) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Actualizar contador
    if (counterEl) {
      if (totalMatching === 0) {
        counterEl.textContent = '0';
      } else if (totalMatching <= ITEMS_PER_PAGE) {
        counterEl.textContent = totalMatching;
      } else {
        counterEl.textContent = `${startIndex + 1}-${Math.min(endIndex, totalMatching)}`;
      }
    }

    // Mensaje de sin resultados
    if (noResultsEl) {
      if (totalMatching === 0) {
        noResultsEl.classList.remove('hidden');
      } else {
        noResultsEl.classList.add('hidden');
      }
    }

    renderPagination(totalPages, totalMatching);

    if (scrollOnPageChange) {
      scrollToGridTop();
    }
  }

  function filterProjects(resetPage = true) {
    if (resetPage) {
      currentPage = 1;
    }

    matchingCards = projectCards.filter(card => {
      const category = card.dataset.category || '';
      const title = (card.dataset.title || '').toLowerCase();
      const summary = (card.dataset.summary || '').toLowerCase();
      const authors = (card.dataset.authors || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        summary.includes(searchTerm) || 
        authors.includes(searchTerm);

      return matchesCategory && matchesSearch;
    });

    applyDisplayAndPagination(false);
  }

  // Event listeners para controles de paginación
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        applyDisplayAndPagination(true);
      }
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(matchingCards.length / ITEMS_PER_PAGE) || 1;
      if (currentPage < totalPages) {
        currentPage++;
        applyDisplayAndPagination(true);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'border-[#0085bf]', 'text-[#38bdf8]', 'bg-[#0085bf]/20');
        b.classList.add('border-[#232d3d]', 'text-gray-400', 'bg-[#0c121e]');
      });

      btn.classList.add('active', 'border-[#0085bf]', 'text-[#38bdf8]', 'bg-[#0085bf]/20');
      btn.classList.remove('border-[#232d3d]', 'text-gray-400', 'bg-[#0c121e]');

      activeCategory = btn.dataset.category || 'all';
      filterProjects(true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      filterProjects(true);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchTerm = '';
      activeCategory = 'all';
      filterBtns.forEach(b => {
        if (b.dataset.category === 'all') {
          b.classList.add('active', 'border-[#0085bf]', 'text-[#38bdf8]', 'bg-[#0085bf]/20');
          b.classList.remove('border-[#232d3d]', 'text-gray-400', 'bg-[#0c121e]');
        } else {
          b.classList.remove('active', 'border-[#0085bf]', 'text-[#38bdf8]', 'bg-[#0085bf]/20');
          b.classList.add('border-[#232d3d]', 'text-gray-400', 'bg-[#0c121e]');
        }
      });
      filterProjects(true);
    });
  }

  // Inicializar filtrado y paginación en carga
  filterProjects(true);
}

/* ============================================================
   13. INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Iniciar visualizador 3D
  initHero3D();

  // Iniciar parallax de profundidad en banner Cunaguaro
  initCunaguaroParallax();

  // Iniciar filtros y buscador interactivo del Portafolio
  initPortafolioFilter();

  // Asegurar visibilidad de elementos reveal visibles de inmediato
  document.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('reveal-visible');
    }
  });
});