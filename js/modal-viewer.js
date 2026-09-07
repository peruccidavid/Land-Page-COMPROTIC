/**
 * COMPROTIC & UNEFA - Project Article Viewer
 * Stores complete article data and manages the interactive reader modal
 */

const ProjectViewer = {
  articles: {
    "unefa-telegram": {
      id: "unefa-telegram",
      title: "Del Portal Web a tu Bolsillo: La UNEFA llega a Telegram a través de COMPROTIC",
      category: "ia-software",
      categoryName: "Inteligencia Artificial & Software",
      categoryColor: "cyan",
      badge: "DESPLIEGUE OFICIAL",
      date: "2025 - 2026",
      image: "images/proyectos/unefa-telegram-bot.svg",
      authors: "Equipo Multidisciplinario de Ingenieros de COMPROTIC & UNEFA",
      summary: "Lanzamiento del nuevo Asistente Virtual de la UNEFA en Telegram para llevar toda la infraestructura informativa académica directamente al dispositivo móvil con mínimo consumo de datos.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          En el Complejo Productivo de Tecnologías de Información (COMPROTIC), entendemos que la innovación no solo se trata de crear herramientas potentes, sino de hacerlas accesibles donde el usuario se encuentra más cómodo. Tras el éxito del asistente virtual en nuestra plataforma web, hemos decidido dar un paso natural en nuestra estrategia de democratización tecnológica: el lanzamiento del nuevo <strong>Asistente Virtual de la UNEFA en Telegram</strong>.
        </p>

        <p class="text-slate-300 mb-6 leading-relaxed">
          Este desarrollo, nacido en el seno de nuestros laboratorios por un equipo multidisciplinario de ingenieros, busca llevar toda la infraestructura informativa de nuestra universidad directamente a tu dispositivo móvil.
        </p>

        <h3 class="text-lg font-bold text-cyan-400 mt-6 mb-3">¿Por qué Telegram? Movilidad y Eficiencia</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          Elegir Telegram como plataforma de despliegue no fue una decisión al azar. Buscamos una herramienta que combine ligereza, seguridad y, sobre todo, un consumo de datos eficiente para nuestra comunidad universitaria. Con este nuevo canal, la UNEFA rompe las barreras del navegador web para integrarse en la dinámica diaria de sus estudiantes y trabajadores.
        </p>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Al igual que su "hermano" en el portal web, este bot utiliza inteligencia artificial para comprender tus necesidades y ofrecerte datos precisos en tiempo real.
        </p>

        <h3 class="text-lg font-bold text-cyan-400 mt-6 mb-3">Todo lo que necesitas saber, en un solo chat</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          ¿Tienes dudas sobre los próximos pasos académicos? Ya no es necesario navegar por múltiples menús o buscar documentos impresos. El asistente en Telegram está programado para responder sobre:
        </p>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 border-l-2 border-cyan-500/40">
          <li><strong>Procesos de Inscripción:</strong> Guía paso a paso para nuevos ingresos y alumnos regulares.</li>
          <li><strong>Fechas y Cronogramas:</strong> Mantente al día con los lapsos académicos y eventos institucionales.</li>
          <li><strong>Estructura y Autoridades:</strong> Conoce quiénes dirigen cada área de nuestra casa de estudios.</li>
          <li><strong>Reglamentos y Normas:</strong> Consulta tus derechos y deberes, así como el reglamento interno, de forma inmediata.</li>
          <li><strong>Aranceles y Trámites:</strong> Información transparente sobre costos y requisitos administrativos.</li>
          <li><strong>Ubicación de Sedes:</strong> Direcciones exactas y puntos de referencia de todos nuestros núcleos a nivel nacional.</li>
        </ul>

        <h3 class="text-lg font-bold text-cyan-400 mt-6 mb-3">Un Compromiso con la Transformación Digital</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          Para los ingenieros y especialistas de COMPROTIC, este bot representa la consolidación de un ecosistema digital integrado. No se trata simplemente de un canal de difusión, sino de una herramienta de gestión de conocimiento que evoluciona con cada interacción.
        </p>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Al centralizar la información institucional en plataformas de mensajería masiva, estamos reduciendo la brecha de desinformación y optimizando los tiempos de respuesta que nuestra comunidad merece.
        </p>

        <h3 class="text-lg font-bold text-cyan-400 mt-6 mb-3">Cómo empezar a interactuar</h3>
        <p class="text-slate-300 mb-6 leading-relaxed">
          El acceso es sumamente sencillo. Solo necesitas buscar el canal oficial del asistente en Telegram (disponible mediante el enlace en <code>comprotic.com.ve</code>) y presionar el botón de inicio. A partir de ese momento, tendrás un consultor académico personal disponible las 24 horas del día.
        </p>

        <div class="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-sm italic">
          "Desde el Complejo Productivo, seguimos trabajando para que la tecnología sea el puente que facilite tu camino por la UNEFA. La transformación digital es hoy, y está en tus manos."
        </div>
      `
    },

    "silla-ruedas": {
      id: "silla-ruedas",
      title: "Silla de Ruedas Automatizada para ser operada desde un Smartphone con Android",
      category: "robotica-movilidad",
      categoryName: "Robótica & Movilidad",
      categoryColor: "emerald",
      badge: "MOVILIDAD ASISTIDA",
      date: "2025",
      image: "images/proyectos/silla-ruedas-android.svg",
      authors: "Equipo de Robótica y Automatización COMPROTIC",
      summary: "Vehículo inteligente de asistencia a personas con movilidad reducida controlado vía app Android, con cámara y sensores anticolisión, y sistema GPS para traslados y acercamiento autónomo a la cama.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          El principal objetivo de este proyecto es mejorar la vida de las personas que presentan movilidad reducida, facilitando sus desplazamientos y brindando los más altos estándares de seguridad y autonomía personal.
        </p>

        <h3 class="text-lg font-bold text-emerald-400 mt-6 mb-3">Características Técnicas y Sensores de Seguridad</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          La silla de ruedas automatizada cuenta con una suite integral de sensores y sistemas embebidos de última generación:
        </p>
        <ul class="space-y-3 mb-6 text-slate-300 pl-4 border-l-2 border-emerald-500/40">
          <li><strong>Cámara y Sensores de Proximidad:</strong> Permiten detectar obstáculos y la presencia de otras personas en el entorno inmediato para evitar accidentes, frenando o esquivando colisiones de manera autónoma.</li>
          <li><strong>Módulo GPS de Precisión:</strong> Permite determinar con exactitud la ubicación de la silla y habilitar rutas de movimiento o traslado automático preprogramadas en un momento determinado.</li>
          <li><strong>Tren Motriz y Batería de Larga Duración:</strong> Motores de alto torque de 24V diseñados para desplazamientos en interiores y rampas exteriores.</li>
        </ul>

        <h3 class="text-lg font-bold text-emerald-400 mt-6 mb-3">Control Total desde Aplicación Móvil Android</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          La silla podrá ser manejada a través de un teléfono celular mediante una aplicación móvil diseñada a la medida para tal fin. La silla podrá ser controlada a distancia, facilitando el movimiento de la misma en circunstancias lejanas, como el acercamiento a la cama o a una mesa sin que el usuario tenga que levantarse.
        </p>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Asimismo, el sistema permite que las personas con discapacidad puedan realizar desplazamientos más largos y tediosos sin necesidad de realizar mayores esfuerzos físicos, aumentando su independencia cotidiana.
        </p>
      `
    },

    "impresora-3d": {
      id: "impresora-3d",
      title: "Impresora 3D de Fabricación Digital",
      category: "hardware-energia",
      categoryName: "Hardware & Energía",
      categoryColor: "amber",
      badge: "PROTOTIPADO DIGITAL",
      date: "2024 - 2025",
      image: "images/proyectos/impresora-3d-prototipo.svg",
      authors: "Área de Fabricación Digital e Ingeniería Mecatrónica COMPROTIC",
      summary: "Prototipo de manufactura aditiva capaz de realizar réplicas tridimensionales a partir de bocetos y modelos vectoriales, con control de coordenadas mediante microcontrolador y extrusor térmico.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          Este proyecto se basa en la construcción de un prototipo capaz de realizar réplicas de bocetos en 3D, creando piezas a partir de una imagen y modelos diseñados en software asistido por computadora (CAD).
        </p>

        <h3 class="text-lg font-bold text-amber-400 mt-6 mb-3">Principio de Funcionamiento y Cinemática</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          El principio de funcionamiento de este proyecto se basa en vectorizar un diseño, para luego ser procesado por un microcontrolador el cual señala las coordenadas en las que los motores paso a paso se desplazarán a lo largo de los ejes X, Y y Z.
        </p>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Al mismo tiempo, el microcontrolador gestiona los diferentes actuadores térmicos, como la resistencia interna del extrusor y la temperatura constante de la cama de impresión para garantizar una adherencia y acabado perfectos.
        </p>

        <h3 class="text-lg font-bold text-amber-400 mt-6 mb-3">Campos de Aplicación</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          En la actualidad las impresoras 3D se emplean para el diseño de piezas a nivel industrial y a nivel de arquitectura. Comúnmente se ha utilizado en el prefabricado de:
        </p>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 border-l-2 border-amber-500/40">
          <li>Todo tipo de objetos y repuestos mecánicos.</li>
          <li>Modelos para vaciado y fundición de piezas complejas.</li>
          <li><strong>Prótesis médicas y de salud pública</strong> para personas con amputaciones o lesiones óseas.</li>
          <li>Maquetas a escala para ingeniería civil y arquitectura.</li>
        </ul>
      `
    },

    "directorio-interactivo": {
      id: "directorio-interactivo",
      title: "Directorio Interactivo Todo en Uno (All In One)",
      category: "sistemas-seguridad",
      categoryName: "Sistemas & Seguridad",
      categoryColor: "blue",
      badge: "SISTEMA ALL-IN-ONE",
      date: "2025",
      image: "images/proyectos/directorio-interactivo-chuao.svg",
      authors: "Desarrollo Web y Sistemas Embebidos COMPROTIC UNEFA",
      summary: "Plataforma táctil All-in-One de bajo costo para la orientación e información espacial de visitantes en el edificio de la UNEFA Chuao, con planos interactivos por piso y búsqueda de dependencias.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          La principal meta de este proyecto es el desarrollo de una plataforma todo en uno <em>“All In One”</em> con una aplicación web dispuesta para orientar e informar a los visitantes de la ubicación exacta de los diferentes departamentos dentro de un edificio específico.
        </p>

        <h3 class="text-lg font-bold text-blue-400 mt-6 mb-3">Arquitectura y Núcleo UNEFA Chuao</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          Para la elaboración del actual proyecto, se utilizaron recursos básicos de hardware de bajo costo. La aplicación está basada en la ubicación de las distintas dependencias del emblemático edificio de la <strong>UNEFA-Chuao</strong>.
        </p>

        <h3 class="text-lg font-bold text-blue-400 mt-6 mb-3">Características Actuales de la Plataforma</h3>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 border-l-2 border-blue-500/40">
          <li>Permite la búsqueda interactiva por departamento o jefatura de área.</li>
          <li>Muestra el plano arquitectónico interactivo de cada piso (Planta Baja, Piso 1, Piso 2, etc.).</li>
          <li>Presenta la leyenda clara y codificada por colores de cada mapa.</li>
        </ul>

        <h3 class="text-lg font-bold text-blue-400 mt-6 mb-3">Ruta de Innovación y Futuras Implementaciones</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          A futuro se desea implementar el atributo de mostrar el camino en un plano desde la ubicación del directorio a cualquier punto en tiempo real (wayfinding asistido), el atributo que permita la búsqueda a través de una barra de búsqueda predictiva y equipar la aplicación con una pantalla táctil para hacer la experiencia más amigable e intuitiva.
        </p>
      `
    },

    "drone-vant": {
      id: "drone-vant",
      title: "DRONE - Vehículo Aéreo No Tripulado (VANT)",
      category: "robotica-movilidad",
      categoryName: "Robótica & Movilidad",
      categoryColor: "emerald",
      badge: "VANT SOBERANO",
      date: "2024 - 2025",
      image: "images/proyectos/drone-vant-monitoreo.svg",
      realPhoto: "images/proyectos/drone-vant-real.jpg",
      authors: "Jessika Rodríguez, Abraham Rodríguez, Ernesto Mejias y Adrian Aguilera",
      summary: "Vehículo aéreo no tripulado de bajo costo para tareas de monitoreo, observación y seguridad, con sistema de automatización de vuelos programables desarrollado por talento unefista.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          El Drone es un vehículo aéreo no tripulado (VANT) con una amplia gama de aplicaciones en diversas situaciones de alta exigencia civil y de seguridad territorial.
        </p>

        <h3 class="text-lg font-bold text-teal-400 mt-6 mb-3">Campos de Aplicación del VANT</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          Entre las principales áreas de aplicación estratégica para este prototipo se encuentran:
        </p>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 border-l-2 border-teal-500/40">
          <li>Servicios de entrega y logística rápida en zonas remotas.</li>
          <li>Labores de salvamento, búsqueda y rescate de personas en contingencias naturales.</li>
          <li>Control fiscal, vigilancia perimetral y resguardo fronterizo.</li>
          <li>Investigaciones arqueológicas y prospección topográfica.</li>
          <li>Inspección y manipulación remota de materiales nocivos o zonas de riesgo químico.</li>
        </ul>

        <h3 class="text-lg font-bold text-teal-400 mt-6 mb-3">Desarrollo y Automatización de Vuelo</h3>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Se plantea el diseño y desarrollo de un vehículo aéreo no tripulado de bajo costo, para tareas de monitoreo y observación, desarrollando un sistema de automatización de vuelos que pueden ser programadas por el usuario para cumplir diversas tareas de forma autónoma.
        </p>

        <div class="p-4 rounded-xl bg-slate-900 border border-teal-500/40 mt-6">
          <span class="text-sm font-mono font-bold text-teal-400 block mb-1">AUTORÍA DEL PROYECTO:</span>
          <p class="text-sm font-semibold text-white">Jessika Rodríguez, Abraham Rodríguez, Ernesto Mejias y Adrian Aguilera</p>
          <span class="text-sm text-slate-400 mt-0.5 block">Investigación y Desarrollo en los laboratorios de COMPROTIC & UNEFA</span>
        </div>
      `
    },

    "pase-vehicular": {
      id: "pase-vehicular",
      title: "Sistema de Pase Vehicular y Control de Acceso",
      category: "sistemas-seguridad",
      categoryName: "Sistemas & Seguridad",
      categoryColor: "blue",
      badge: "SEGURIDAD INSTITUCIONAL",
      date: "2024 - 2025",
      image: "images/proyectos/sistema-pase-vehicular.svg",
      authors: "Equipo de Ingeniería de Software COMPROTIC & UNEFA",
      summary: "Plataforma integral de seguridad para registro de personas, vehículos, asignación de permisos, control de hasta 3 verificaciones y emisión automática de carnets en PDF.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          El Sistema de Pase Vehicular permite llevar un control riguroso y transparente de los vehículos que ingresan en las instalaciones de la universidad, garantizando la seguridad perimetral mediante el registro de los datos del vehículo y del conductor autorizado.
        </p>

        <h3 class="text-lg font-bold text-pink-400 mt-6 mb-3">Módulos del Sistema y Flujo Operativo</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          La arquitectura del software está compuesta por módulos especializados diseñados para una operación ágil:
        </p>
        <ul class="space-y-3 mb-6 text-slate-300 pl-4 border-l-2 border-pink-500/40">
          <li><strong>Autenticación y Seguridad:</strong> Módulo de <em>Inicio de Sesión</em> y <em>Recuperación de Contraseña</em> para acceso protegido del personal de vigilancia.</li>
          <li><strong>Módulo Persona:</strong> Opciones de búsqueda, agregar nueva persona, actualizar foto del registro, consultar historiales, asignar vehículo, editar información y <strong>enviar carnet oficial al correo</strong> del registro seleccionado.</li>
          <li><strong>Módulo Usuario:</strong> Búsqueda, consulta y edición de credenciales para usuarios con permisos administrativos.</li>
          <li><strong>Módulo Verificación:</strong> Permite consultar la cantidad de verificaciones que se le han realizado a un conductor (hasta un máximo de tres), así como asignar verificaciones y observaciones técnicas.</li>
          <li><strong>Módulo Configuración:</strong> Gestión de cambio de contraseñas y cierre seguro de sesión.</li>
        </ul>

        <p class="text-slate-300 mb-6 leading-relaxed">
          Todos los procesos que se ejecutan en el Sistema de Pase Vehicular fueron diseñados y desarrollados de manera que éste pueda ser usado fácil y eficazmente por el personal de seguridad y vigilancia en las garitas universitarias.
        </p>
      `
    },

    "turbina-eolica": {
      id: "turbina-eolica",
      title: "Turbina Eólica Vertical Tipo Savonius",
      category: "hardware-energia",
      categoryName: "Hardware & Energía",
      categoryColor: "amber",
      badge: "ENERGÍA LIMPIA",
      date: "2024 - 2025",
      image: "images/proyectos/turbina-eolica-savonius.svg",
      authors: "Grupo de Investigación en Energías Renovables COMPROTIC",
      summary: "Diseño y construcción de un modelo funcional de turbina eólica de eje vertical tipo Savonius de bajo costo, para generación limpia y distribuida sin emisiones contaminantes.",
      content: `
        <p class="lead text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
          La energía eólica es una forma de energía renovable que se obtiene a partir de la fuerza del viento. Los aerogeneradores, también conocidos como turbinas eólicas, son los equipos que transforman la energía cinética de las corrientes de aire en energía eléctrica.
        </p>

        <h3 class="text-lg font-bold text-sky-400 mt-6 mb-3">Ventajas de la Tecnología Eólica</h3>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 border-l-2 border-sky-500/40">
          <li><strong>Energía Renovable:</strong> No se agota con el uso cotidiano.</li>
          <li><strong>Cero Emisiones:</strong> No produce contaminación atmosférica durante su operación, protegiendo el medio ambiente.</li>
          <li><strong>Reducción de Costos:</strong> Disminución del uso de combustibles fósiles y alta eficiencia operativa.</li>
          <li><strong>Segura:</strong> Bajo riesgo ambiental para entornos comunitarios.</li>
        </ul>

        <h3 class="text-lg font-bold text-sky-400 mt-6 mb-3">Objetivos del Proyecto</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          <strong>Objetivo General:</strong> Diseñar y construir un modelo funcional de una turbina eólica tipo Savonius.
        </p>
        <p class="text-slate-300 mb-2 font-semibold">Objetivos Específicos:</p>
        <ul class="space-y-2 mb-6 text-slate-300 pl-4 list-disc">
          <li>Investigar los principios físicos de funcionamiento de una turbina eólica tipo Savonius.</li>
          <li>Llevar a cabo un modelo 3D asistido, de una turbina tipo Savonius con materiales de bajo costo.</li>
          <li>Diseñar el sistema eléctrico y el mecanismo multiplicador de velocidad entre el rotor y el generador.</li>
          <li>Desarrollar los planos para la construcción de la turbina.</li>
          <li>Desarrollar un prototipo y someterlo a pruebas con simulación controlada de viento.</li>
          <li>Desarrollar el manual de funcionamiento de la turbina.</li>
        </ul>

        <h3 class="text-lg font-bold text-sky-400 mt-6 mb-3">Generadores Eólicos de Eje Vertical (Savonius)</h3>
        <p class="text-slate-300 mb-4 leading-relaxed">
          Los generadores eólicos de eje vertical presentan el eje transversal a las líneas de corriente del aire. El rotor Savonius (inventado en los años 20 por Sigurd Savonius) consta de 2 o 3 palas verticales dobladas de manera semicircular fijadas al eje con un ángulo de 180° o 120°.
        </p>
        <p class="text-slate-300 mb-6 leading-relaxed">
          Dado que sus palas tienen una cara convexa y una cóncava, al incidir el viento sobre la cara cóncava, la pala es empujada por la fuerza de arrastre (D), ocasionando el giro del rotor y accionando el generador eléctrico con la máxima eficiencia posible sin importar la dirección del viento.
        </p>
      `
    }
  },

  open(projectId) {
    const article = this.articles[projectId];
    if (!article) return;

    const modal = document.getElementById('project-modal');
    const container = document.getElementById('modal-content-container');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="relative bg-[#0c121e] text-gray-200">
        <!-- Modal Cover Header -->
        <div class="p-6 sm:p-8 border-b border-[#232d3d] bg-[#111a2b] relative overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-2">
              <span class="px-3.5 py-1 rounded-full text-sm font-mono font-bold uppercase bg-[#0085bf]/20 text-[#38bdf8] border border-[#0085bf]/40">
                ${article.categoryName}
              </span>
              <span class="px-3 py-1 rounded-full text-sm font-mono bg-[#0c121e] text-gray-300 border border-[#232d3d]">
                ${article.badge}
              </span>
            </div>
            <span class="text-sm font-mono text-[#38bdf8] font-medium">${article.date}</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-display font-bold text-white mb-3 tracking-tight leading-snug">
            ${article.title}
          </h1>

          <div class="flex items-center gap-2 text-sm text-gray-400">
            <span class="font-mono text-[#38bdf8] font-semibold">COMPROTIC &amp; UNEFA</span>
            <span>•</span>
            <span>${article.authors}</span>
          </div>
        </div>

        <!-- Visual Media Showcase inside Article -->
        <div class="p-6 sm:p-8 border-b border-[#232d3d] bg-[#070b12] flex flex-col items-center justify-center">
          <div class="w-full max-w-2xl rounded-2xl overflow-hidden border border-[#232d3d] bg-[#0c121e] shadow-2xl p-3">
            <img 
              src="${article.image}" 
              alt="${article.title}" 
              class="w-full h-auto max-h-[400px] object-contain rounded-xl"
            />
          </div>

          ${article.realPhoto ? `
            <div class="mt-6 w-full max-w-2xl">
              <div class="text-sm font-mono text-[#38bdf8] mb-2 flex items-center gap-1.5 font-semibold">
                <span class="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping"></span>
                <span>REGISTRO FOTOGRÁFICO REAL EN LABORATORIO:</span>
              </div>
              <div class="rounded-xl overflow-hidden border border-[#0085bf]/40 shadow-xl">
                <img src="${article.realPhoto}" alt="Foto real de laboratorio" class="w-full h-auto object-cover max-h-[350px]">
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Article Prose Body -->
        <div class="p-6 sm:p-10 max-w-4xl mx-auto leading-relaxed text-gray-300 text-sm sm:text-base">
          ${article.content}
        </div>

        <!-- Modal Action Footer -->
        <div class="p-6 border-t border-[#232d3d] bg-[#111a2b] flex flex-wrap items-center justify-between gap-4">
          <div class="text-sm font-mono text-gray-400">
            COMPROTIC • Vicerrectorado de Investigación, Desarrollo e Innovación (VIDI) — UNEFA
          </div>
          <button onclick="ProjectViewer.close()" class="btn-primary px-6 py-2.5 text-sm font-bold rounded-xl flex items-center gap-2">
            <span>Cerrar Artículo</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
};

window.ProjectViewer = ProjectViewer;
