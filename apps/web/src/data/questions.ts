import { atom } from 'jotai';

export interface Question {
  id: number;
  question: string;
  effect: { 
    econ: number; 
    dipl: number; 
    govt: number; 
    scty: number;
  }
}

// All 70 test questions with Spanish translations
export const questionsAtom = atom<Question[]>([
  {
    id: 1,
    question: "La opresión por parte de las corporaciones es más preocupante que la opresión por parte de los gobiernos.",
    effect: { econ: 10, dipl: 0, govt: -5, scty: 0 }
  },
  {
    id: 2,
    question: "Es necesario que el gobierno intervenga en la economía para proteger a los consumidores.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 3,
    question: "Cuanto más libres sean los mercados, más libres serán las personas.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 4,
    question: "Es mejor mantener un presupuesto equilibrado que garantizar el bienestar de todos los ciudadanos.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 5,
    question: "La investigación financiada con fondos públicos es más beneficiosa para las personas que dejarla en manos del mercado.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 6,
    question: "Los aranceles al comercio internacional son importantes para fomentar la producción local.",
    effect: { econ: 5, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 7,
    question: "De cada quien según su capacidad, a cada quien según sus necesidades.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 8,
    question: "Sería mejor que los programas sociales fueran abolidos en favor de la caridad privada.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 9,
    question: "Se deberían aumentar los impuestos a los ricos para proveer a los pobres.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 10,
    question: "La herencia es una forma legítima de riqueza.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: -5 }
  },
  {
    id: 11,
    question: "Los servicios básicos como carreteras y electricidad deberían ser de propiedad pública.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 12,
    question: "La intervención del gobierno es una amenaza para la economía.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 13,
    question: "Aquellos con mayor capacidad de pago deberían recibir mejor atención médica.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 14,
    question: "La educación de calidad es un derecho de todas las personas.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 5 }
  },
  {
    id: 15,
    question: "Los medios de producción deberían pertenecer a los trabajadores que los utilizan.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 16,
    question: "Las Naciones Unidas deberían ser abolidas.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 }
  },
  {
    id: 17,
    question: "La acción militar por parte de nuestra nación es a menudo necesaria para protegerla.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 }
  },
  {
    id: 18,
    question: "Apoyo las uniones regionales, como la Unión Europea.",
    effect: { econ: -5, dipl: 10, govt: 10, scty: 5 }
  },
  {
    id: 19,
    question: "Es importante mantener nuestra soberanía nacional.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 }
  },
  {
    id: 20,
    question: "Un gobierno mundial unificado sería beneficioso para la humanidad.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 }
  },
  {
    id: 21,
    question: "Es más importante mantener relaciones pacíficas que aumentar nuestra fuerza.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 }
  },
  {
    id: 22,
    question: "Las guerras no necesitan ser justificadas ante otros países.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 }
  },
  {
    id: 23,
    question: "El gasto militar es un desperdicio de dinero.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 }
  },
  {
    id: 24,
    question: "La ayuda internacional es un desperdicio de dinero.",
    effect: { econ: -5, dipl: -10, govt: 0, scty: 0 }
  },
  {
    id: 25,
    question: "Mi nación es grandiosa.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 }
  },
  {
    id: 26,
    question: "La investigación debería realizarse a escala internacional.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 }
  },
  {
    id: 27,
    question: "Los gobiernos deberían rendir cuentas a la comunidad internacional.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 0 }
  },
  {
    id: 28,
    question: "Incluso al protestar contra un gobierno autoritario, la violencia no es aceptable.",
    effect: { econ: 0, dipl: 5, govt: -5, scty: 0 }
  },
  {
    id: 29,
    question: "Mis valores religiosos deberían difundirse lo más posible.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -10 }
  },
  {
    id: 30,
    question: "Los valores de nuestra nación deberían difundirse lo más posible.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 }
  },
  {
    id: 31,
    question: "Es muy importante mantener la ley y el orden.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -5 }
  },
  {
    id: 32,
    question: "La población general toma malas decisiones.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 33,
    question: "El suicidio asistido por médicos debería ser legal.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }
  },
  {
    id: 34,
    question: "El sacrificio de algunas libertades civiles es necesario para protegernos de actos de terrorismo.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 35,
    question: "La vigilancia gubernamental es necesaria en el mundo moderno.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 36,
    question: "La mera existencia del estado es una amenaza para nuestra libertad.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }
  },
  {
    id: 37,
    question: "Independientemente de las opiniones políticas, es importante apoyar a tu país.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: -5 }
  },
  {
    id: 38,
    question: "Toda autoridad debería ser cuestionada.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 5 }
  },
  {
    id: 39,
    question: "Un estado jerárquico es lo mejor.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 40,
    question: "Es importante que el gobierno siga la opinión de la mayoría, incluso si está equivocada.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }
  },
  {
    id: 41,
    question: "Cuanto más fuerte sea el liderazgo, mejor.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 }
  },
  {
    id: 42,
    question: "La democracia es más que un proceso de toma de decisiones.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }
  },
  {
    id: 43,
    question: "Las regulaciones ambientales son esenciales.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 44,
    question: "Un mundo mejor vendrá de la automatización, la ciencia y la tecnología.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 45,
    question: "Los niños deberían ser educados en valores religiosos o tradicionales.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 }
  },
  {
    id: 46,
    question: "Las tradiciones no tienen valor por sí mismas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 47,
    question: "La religión debería desempeñar un papel en el gobierno.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 }
  },
  {
    id: 48,
    question: "Las iglesias deberían ser gravadas de la misma manera que otras instituciones.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 49,
    question: "El cambio climático es actualmente una de las mayores amenazas para nuestro modo de vida.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 50,
    question: "Es importante que trabajemos como un mundo unido para combatir el cambio climático.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 }
  },
  {
    id: 51,
    question: "La sociedad era mejor hace muchos años de lo que es ahora.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 }
  },
  {
    id: 52,
    question: "Es importante que mantengamos las tradiciones de nuestro pasado.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 }
  },
  {
    id: 53,
    question: "Es importante que pensemos a largo plazo, más allá de nuestras vidas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 54,
    question: "La razón es más importante que mantener nuestra cultura.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 55,
    question: "El uso de drogas debería ser legalizado o despenalizado.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 2 }
  },
  {
    id: 56,
    question: "El matrimonio entre personas del mismo sexo debería ser legal.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 10 }
  },
  {
    id: 57,
    question: "Ninguna cultura es superior a otras.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 10 }
  },
  {
    id: 58,
    question: "El sexo fuera del matrimonio es inmoral.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 }
  },
  {
    id: 59,
    question: "Si aceptamos migrantes, es importante que se asimilen a nuestra cultura.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 }
  },
  {
    id: 60,
    question: "El aborto debería estar prohibido en la mayoría o todos los casos.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 }
  },
  {
    id: 61,
    question: "La posesión de armas debería estar prohibida para aquellos sin una razón válida.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 62,
    question: "Apoyo la atención médica universal financiada por un único pagador.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 63,
    question: "La prostitución debería ser ilegal.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 }
  },
  {
    id: 64,
    question: "Mantener los valores familiares es esencial.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 }
  },
  {
    id: 65,
    question: "Perseguir el progreso a toda costa es peligroso.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 }
  },
  {
    id: 66,
    question: "La modificación genética es una fuerza para el bien, incluso en humanos.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  },
  {
    id: 67,
    question: "Deberíamos abrir nuestras fronteras a la inmigración.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 }
  },
  {
    id: 68,
    question: "Los gobiernos deberían preocuparse por los extranjeros tanto como por sus propios ciudadanos.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 }
  },
  {
    id: 69,
    question: "Todas las personas - independientemente de factores como cultura o sexualidad - deberían ser tratadas con igualdad.",
    effect: { econ: 10, dipl: 10, govt: 10, scty: 10 }
  },
  {
    id: 70,
    question: "Es importante que promovamos los objetivos de mi grupo por encima de todos los demás.",
    effect: { econ: -10, dipl: -10, govt: -10, scty: -10 }
  }
]);