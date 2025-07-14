const materias = {
  // PRIMER AÑO
  "Contabilidad I": { aprobada: false, correlativas: [] },
  "Introducción a la Economía": { aprobada: false, correlativas: [] },
  "Administración I": { aprobada: false, correlativas: [] },
  "Microeconomía I": { aprobada: false, correlativas: ["Introducción a la Economía"] },
  "Matemática I": { aprobada: false, correlativas: [] },
  "Derecho Constitucional": { aprobada: false, correlativas: ["Introducción a la Economía"] },
  "Introducción a las Ciencias Sociales": { aprobada: false, correlativas: [] },

  // SEGUNDO AÑO (requiere todo 1ro)
  "Comportamiento Humano en las Organizaciones": { aprobada: false, correlativas: ["Administración I"] },
  "Macroeconomía I": { aprobada: false, correlativas: ["Introducción a la Economía"] },
  "Historia Económica y Social I": { aprobada: false, correlativas: ["Introducción a la Economía"] },
  "Interpretación de Estados Contables": { aprobada: false, correlativas: ["Contabilidad I"] },
  "Administración II": { aprobada: false, correlativas: ["Administración I"] },
  "Derecho Privado": { aprobada: false, correlativas: ["Derecho Constitucional"] },
  "Finanzas Públicas": { aprobada: false, correlativas: ["Microeconomía I"] },
  "Matemática II": { aprobada: false, correlativas: ["Matemática I"] },

  // TERCER AÑO (requiere TODO 1er AÑO)
  "Administración III": { aprobada: false, correlativas: ["Contabilidad I", "Introducción a la Economía", "Administración I", "Microeconomía I", "Matemática I", "Derecho Constitucional", "Introducción a las Ciencias Sociales", "Administración II", "Interpretación de Estados Contables"] },
  "Administración Pública": { aprobada: false, correlativas: ["Contabilidad I", "Introducción a la Economía", "Administración I", "Microeconomía I", "Matemática I", "Derecho Constitucional", "Introducción a las Ciencias Sociales"] },
  "Estadística Aplicada": { aprobada: false, correlativas: ["Matemática II"] },
  "Derecho Empresario": { aprobada: false, correlativas: ["Derecho Privado"] },
  "Matemática para Decisiones Empresarias": { aprobada: false, correlativas: ["Matemática II"] },
  "Administración de la Producción": { aprobada: false, correlativas: ["Administración II"] },

  // CUARTO AÑO (requiere TODO 2do AÑO)
  "Diseño de Sistemas de Información": { aprobada: false, correlativas: ["Administración III"] },
  "Marketing Estratégico": { aprobada: false, correlativas: ["Estadística Aplicada"] },
  "Trabajo y Sociedad": { aprobada: false, correlativas: ["Historia Económica y Social I"] },
  "Finanzas de Empresas": { aprobada: false, correlativas: ["Administración III", "Matemática para Decisiones Empresarias"] },
  "Psicosociología Organizacional": { aprobada: false, correlativas: ["Comportamiento Humano en las Organizaciones"] },
  "Costos para la Gestión": { aprobada: false, correlativas: ["Administración de la Producción"] },

  // QUINTO AÑO (requiere TODO 3er AÑO)
  "Gestión de Personas": { aprobada: false, correlativas: ["Trabajo y Sociedad"] },
  "Tecnología Informática": { aprobada: false, correlativas: ["Diseño de Sistemas de Información"] },
  "Marketing Táctico": { aprobada: false, correlativas: ["Marketing Estratégico"] },
  "Negocios Internacionales": { aprobada: false, correlativas: ["Marketing Estratégico"] },
  "Tópicos en Finanzas": { aprobada: false, correlativas: ["Finanzas de Empresas"] },
  "Dirección General": { aprobada: false, correlativas: ["Costos para la Gestión", "Marketing Estratégico", "Finanzas de Empresas"] },

  // SEMINARIO
  "Seminario": { aprobada: false, correlativas: ["*22 materias"] }
};

function contarAprobadas() {
  return Object.values(materias).filter(m => m.aprobada).length;
}

function desbloqueada(nombre, datos) {
  if (datos.correlativas.includes("*22 materias")) {
    return contarAprobadas() >= 22;
  }

  return datos.correlativas.every(c => materias[c]?.aprobada);
}

function render() {
  const container = document.getElementById("materias");
  container.innerHTML = "";

  for (const [nombre, datos] of Object.entries(materias)) {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = nombre;

    const habilitada = desbloqueada(nombre, datos);

    if (datos.aprobada) {
      div.classList.add("aprobada");
    } else if (!habilitada) {
      div.classList.add("bloqueada");
    }

    div.onclick = () => {
      if (!habilitada && !datos.aprobada) return;
      materias[nombre].aprobada = !materias[nombre].aprobada;
      render();
    };

    container.appendChild(div);
  }
}

render();
