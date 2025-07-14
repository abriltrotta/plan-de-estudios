const planEstudios = {
  "Primer Año": {
    aprobado: false,
    cuatrimestres: {
      "Primer Cuatrimestre": [
        { nombre: "Contabilidad I", correlativas: [] },
        { nombre: "Introducción a la Economía", correlativas: [] },
        { nombre: "Administración I", correlativas: [] },
      ],
      "Segundo Cuatrimestre": [
        { nombre: "Microeconomía I", correlativas: ["Introducción a la Economía"] },
        { nombre: "Matemática I", correlativas: ["Introducción a la Economía"] },
        { nombre: "Derecho Constitucional y Administrativo", correlativas: ["Contabilidad I", "Introducción a la Economía"] },
        { nombre: "Introducción a las Ciencias Sociales y al Conocimiento Científico", correlativas: ["Administración I", "Introducción a la Economía"] },
      ]
    }
  },
  "Segundo Año": {
    aprobado: false,
    cuatrimestres: {
      "Primer Cuatrimestre": [
        { nombre: "Comportamiento Humano en las Organizaciones", correlativas: ["Administración I"] },
        { nombre: "Macroeconomía I", correlativas: ["Introducción a la Economía"] },
        { nombre: "Historia Económica y Social I", correlativas: ["Introducción a la Economía"] },
        { nombre: "Interpretación de los Estados Contables", correlativas: ["Contabilidad I"] },
      ],
      "Segundo Cuatrimestre": [
        { nombre: "Administración II", correlativas: ["Administración I"] },
        { nombre: "Derecho Privado", correlativas: ["Derecho Constitucional y Administrativo"] },
        { nombre: "Finanzas Públicas", correlativas: ["Microeconomía I"] },
        { nombre: "Matemática II", correlativas: ["Matemática I"] },
      ]
    }
  },
  "Tercer Año": {
    aprobado: false,
    cuatrimestres: {
      "Primer Cuatrimestre": [
        { nombre: "Administración III", correlativas: [
          "Contabilidad I", "Introducción a la Economía", "Administración I", "Microeconomía I", "Matemática I",
          "Derecho Constitucional y Administrativo", "Introducción a las Ciencias Sociales y al Conocimiento Científico",
          "Administración II", "Interpretación de los Estados Contables"
        ]},
        { nombre: "Administración Pública", correlativas: [
          "Contabilidad I", "Introducción a la Economía", "Administración I", "Microeconomía I", "Matemática I",
          "Derecho Constitucional y Administrativo", "Introducción a las Ciencias Sociales y al Conocimiento Científico"
        ]},
        { nombre: "Estadística Aplicada", correlativas: ["Matemática II"] },
      ],
      "Segundo Cuatrimestre": [
        { nombre: "Derecho Empresario", correlativas: ["Derecho Privado"] },
        { nombre: "Matemática para Decisiones Empresarias", correlativas: ["Matemática II"] },
        { nombre: "Administración de la Producción", correlativas: ["Administración II"] },
      ]
    }
  },
  "Cuarto Año": {
    aprobado: false,
    cuatrimestres: {
      "Primer Cuatrimestre": [
        { nombre: "Diseño de Sistemas de Información", correlativas: ["Administración III"] },
        { nombre: "Marketing Estratégico", correlativas: ["Estadística Aplicada"] },
        { nombre: "Trabajo y Sociedad", correlativas: ["Historia Económica y Social I"] },
      ],
      "Segundo Cuatrimestre": [
        { nombre: "Finanzas de Empresas", correlativas: ["Administración III", "Matemática para Decisiones Empresarias"] },
        { nombre: "Psicosociología Organizacional", correlativas: ["Comportamiento Humano en las Organizaciones"] },
        { nombre: "Costos para la Gestión", correlativas: ["Administración de la Producción"] },
      ]
    }
  },
  "Quinto Año": {
    aprobado: false,
    cuatrimestres: {
      "Primer Cuatrimestre": [
        { nombre: "Gestión y Desarrollo de las Personas en las Organizaciones", correlativas: ["Trabajo y Sociedad"] },
        { nombre: "Tecnología Informática y Sistemas de Información para la Dirección", correlativas: ["Diseño de Sistemas de Información"] },
        { nombre: "Marketing Táctico y Operativo", correlativas: ["Marketing Estratégico"] },
        { nombre: "Negocios Internacionales", correlativas: ["Marketing Estratégico"] },
        { nombre: "Tópicos Avanzados en Finanzas", correlativas: ["Finanzas de Empresas"] },
        { nombre: "Dirección General", correlativas: ["Costos para la Gestión", "Marketing Estratégico", "Finanzas de Empresas"] },
      ]
    }
  },
  "Seminario": {
    aprobado: false,
    cuatrimestres: {
      "Unico": [
        { nombre: "Seminario", correlativas: ["*22 materias"] }
      ]
    }
  }
};

// Estado global de materias aprobadas
const materiasEstado = {};

// Inicializar materiasEstado con false para cada materia
for (const año in planEstudios) {
  for (const cuatri in planEstudios[año].cuatrimestres) {
    planEstudios[año].cuatrimestres[cuatri].forEach(m => {
      materiasEstado[m.nombre] = false;
    });
  }
}

// Función para contar materias aprobadas
function contarAprobadas() {
  return Object.values(materiasEstado).filter(v => v).length;
}

// Función para verificar si un año está aprobado 100%
function añoAprobado(nombreAño) {
  const cuatri = planEstudios[nombreAño].cuatrimestres;
  for (const c in cuatri) {
    for (const materia of cuatri[c]) {
      if (!materiasEstado[materia.nombre]) return false;
    }
  }
  return true;
}

// Actualiza el campo 'aprobado' de cada año según materiasEstado
function actualizarEstadosAño() {
  for (const año in planEstudios) {
    planEstudios[año].aprobado = añoAprobado(año);
  }
}

// Verifica si las correlativas de una materia están aprobadas
function correlativasAprobadas(materias) {
  return materias.every(c => {
    if (c === "*22 materias") {
      return contarAprobadas() >= 22;
    }
    return materiasEstado[c];
  });
}

// Verifica si un año anterior está aprobado (para habilitar el año siguiente)
function añoAnteriorAprobado(año) {
  const años = Object.keys(planEstudios);
  const index = años.indexOf(año);
  if (index <= 0) return true; // Primer año no tiene anterior
  const anterior = años[index - 1];
  return planEstudios[anterior].aprobado;
}

// Función para saber si la materia está desbloqueada para hacer click
function materiaDesbloqueada(año, materia) {
  // Para que se desbloquee, el año anterior tiene que estar aprobado
  if (!añoAnteriorAprobado(año)) return false;
  // Y las correlativas de la materia tienen que estar aprobadas
  return correlativasAprobadas(materia.correlativas);
}

// Función para renderizar la malla en pantalla
function render() {
  actualizarEstadosAño();

  const container = document.getElementById("materias");
  container.innerHTML = "";

  for (const año of Object.keys(planEstudios)) {
    const añoDiv = document.createElement("div");
    añoDiv.classList.add("año-container");

    // Título del año con tachado si está aprobado
    const tituloAño = document.createElement("h2");
    tituloAño.textContent = año;
    if (planEstudios[año].aprobado) {
      tituloAño.style.textDecoration = "line-through";
      tituloAño.style.color = "green";
    }
    añoDiv.appendChild(tituloAño);

    // Recorremos cuatrimestres
    const cuatriCont = document.createElement("div");
    cuatriCont.classList.add("cuatri-container");

    for (const cuatri of Object.keys(planEstudios[año].cuatrimestres)) {
      const cuatriDiv = document.createElement("div");
      cuatriDiv.classList.add("cuatri");

      // Título del cuatrimestre
      const tituloCuatri = document.createElement("h3");
      tituloCuatri.textContent = cuatri;
      cuatriDiv.appendChild(tituloCuatri);

      // Lista materias
      planEstudios[año].cuatrimestres[cuatri].forEach(materia => {
        const matDiv = document.createElement("div");
        matDiv.classList.add("materia");
        matDiv.textContent = materia.nombre;

        // Si materia aprobada, color celeste y tachado
        if (materiasEstado[materia.nombre]) {
          matDiv.style.backgroundColor = "#81d4fa"; // celeste claro
          matDiv.style.textDecoration = "line-through";
          matDiv.style.color = "black";
        } else {
          matDiv.style.backgroundColor = "#f8bbd0"; // rosa claro
        }

        // Si no está desbloqueada, opacidad baja y no clickeable
        if (!materiaDesbloqueada(año, materia)) {
          matDiv.style.opacity = "0.4";
          matDiv.style.pointerEvents = "none";
        } else {
          matDiv.style.cursor = "pointer";
          matDiv.onclick = () => {
            materiasEstado[materia.nombre] = !materiasEstado[materia.nombre];
            render();
          };
        }

        cuatriDiv.appendChild(matDiv);
      });

      cuatriCont.appendChild(cuatriDiv);
    }

    añoDiv.appendChild(cuatriCont);
    container.appendChild(añoDiv);
  }
}

render();
