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
        { nombre: "Administración III", correlativas: ["Administración II", "Interpretación de los Estados Contables"] },
        { nombre: "Administración Pública", correlativas: ["Introducción a las Ciencias Sociales y al Conocimiento Científico"] },
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
      "Único": [
        { nombre: "Seminario", correlativas: ["*22 materias"] }
      ]
    }
  }
};

const materiasEstado = {};
for (const año in planEstudios) {
  for (const cuatri in planEstudios[año].cuatrimestres) {
    planEstudios[año].cuatrimestres[cuatri].forEach(m => {
      materiasEstado[m.nombre] = false;
    });
  }
}

function contarAprobadas() {
  return Object.values(materiasEstado).filter(v => v).length;
}

function añoAprobado(nombreAño) {
  const cuatri = planEstudios[nombreAño].cuatrimestres;
  for (const c in cuatri) {
    for (const materia of cuatri[c]) {
      if (!materiasEstado[materia.nombre]) return false;
    }
  }
  return true;
}

function actualizarEstadosAño() {
  for (const año in planEstudios) {
    planEstudios[año].aprobado = añoAprobado(año);
  }
}

function correlativasAprobadas(correlativas) {
  return correlativas.every(c => {
    if (c === "*22 materias") {
      return contarAprobadas() >= 22;
    }
    return materiasEstado[c];
  });
}

function añoCompletoNecesario(año) {
  // Solo para 3°, 4° y 5° año
  return ["Tercer Año", "Cuarto Año", "Quinto Año"].includes(año);
}

function añoAnteriorAprobado(año) {
  if (!añoCompletoNecesario(año)) return true;

  const años = Object.keys(planEstudios);
  const index = años.indexOf(año);
  if (index <= 0) return true;
  const anterior = años[index - 1];
  return planEstudios[anterior].aprobado;
}

function materiaDesbloqueada(año, materia) {
  return añoAnteriorAprobado(año) && correlativasAprobadas(materia.correlativas);
}

function render() {
  actualizarEstadosAño();

  const container = document.getElementById("materias");
  container.innerHTML = "";

  for (const año of Object.keys(planEstudios)) {
    const añoDiv = document.createElement("div");
    añoDiv.classList.add("año-container");

    const tituloAño = document.createElement("h2");
    tituloAño.textContent = año;
    if (planEstudios[año].aprobado) {
      tituloAño.style.textDecoration = "line-through";
      tituloAño.style.color = "green";
    }
    añoDiv.appendChild(tituloAño);

    const cuatriCont = document.createElement("div");
    cuatriCont.classList.add("cuatri-container");

    for (const cuatri of Object.keys(planEstudios[año].cuatrimestres)) {
      const cuatriDiv = document.createElement("div");
      cuatriDiv.classList.add("cuatri");

      const tituloCuatri = document.createElement("h3");
      tituloCuatri.textContent = cuatri;
      cuatriDiv.appendChild(tituloCuatri);

      planEstudios[año].cuatrimestres[cuatri].forEach(materia => {
        const matDiv = document.createElement("div");
        matDiv.classList.add("materia");
        matDiv.textContent = materia.nombre;

        if (materiasEstado[materia.nombre]) {
          matDiv.style.backgroundColor = "#81d4fa";
          matDiv.style.textDecoration = "line-through";
          matDiv.style.color = "black";
        } else {
          matDiv.style.backgroundColor = "#f8bbd0";
        }

        if (!materiaDesbloqueada(año, materia)) {
          matDiv.style.opacity = "0.4";
          matDiv.style.pointerEvents = "none";
          matDiv.style.cursor = "default";
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
