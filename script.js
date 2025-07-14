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
      "Único": [
        { nombre: "Seminario", correlativas: ["*22 materias"] }
      ]
    }
  }
};

/
