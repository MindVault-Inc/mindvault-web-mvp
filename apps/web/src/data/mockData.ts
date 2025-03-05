import { Insight, PublicFigure } from "@/atoms/insights";

// Datos simulados de figuras públicas
export const publicFigures: PublicFigure[] = [
  { 
    name: "Bernie Sanders", 
    ideology: "Socialdemócrata",
    scores: { econ: 20, dipl: 80, govt: 70, scty: 90 } 
  },
  { 
    name: "Barack Obama", 
    ideology: "Liberal Moderado",
    scores: { econ: 45, dipl: 70, govt: 60, scty: 70 } 
  },
  { 
    name: "Joe Biden", 
    ideology: "Liberal Centrista",
    scores: { econ: 40, dipl: 65, govt: 55, scty: 65 } 
  },
  { 
    name: "Donald Trump", 
    ideology: "Conservador Nacionalista",
    scores: { econ: 70, dipl: 30, govt: 40, scty: 30 } 
  },
  { 
    name: "Ron DeSantis", 
    ideology: "Conservador Tradicional",
    scores: { econ: 75, dipl: 25, govt: 30, scty: 20 } 
  },
  { 
    name: "Alexandria Ocasio-Cortez", 
    ideology: "Progresista",
    scores: { econ: 15, dipl: 75, govt: 65, scty: 85 } 
  },
];

// Función para encontrar la figura pública más cercana
export const findClosestMatch = (userScores: { econ: number; dipl: number; govt: number; scty: number }): string => {
  let closestMatch = "";
  let smallestDifference = Number.MAX_VALUE;
  
  publicFigures.forEach(figure => {
    const difference = 
      Math.abs(userScores.econ - figure.scores.econ) +
      Math.abs(userScores.dipl - figure.scores.dipl) +
      Math.abs(userScores.govt - figure.scores.govt) +
      Math.abs(userScores.scty - figure.scores.scty);
    
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestMatch = figure.name;
    }
  });
  
  return closestMatch;
};

// Datos simulados de insights para cada categoría
export const mockInsightsData: Record<string, Insight[]> = {
  "econ": [
    {
      category: "econ",
      insight: "Favoreces un enfoque equilibrado hacia la economía con una inclinación hacia intervenciones que promuevan el bienestar social.",
      description: "socialmente consciente",
      percentage: 65,
      left_label: "Igualdad",
      right_label: "Mercados",
      values: { left: 65, right: 35, label: "Equilibrado" }
    }
  ],
  "dipl": [
    {
      category: "dipl",
      insight: "Valoras la cooperación internacional mientras reconoces la importancia de los intereses nacionales.",
      description: "moderadamente globalista",
      percentage: 70,
      left_label: "Nación",
      right_label: "Mundo",
      values: { left: 30, right: 70, label: "Globalista" }
    }
  ],
  "govt": [
    {
      category: "govt",
      insight: "Buscas un equilibrio entre la autoridad necesaria para la estabilidad social y las libertades individuales fundamentales.",
      description: "libertario moderado",
      percentage: 60,
      left_label: "Autoridad",
      right_label: "Libertad",
      values: { left: 40, right: 60, label: "Equilibrado" }
    }
  ],
  "scty": [
    {
      category: "scty",
      insight: "Apoyas el cambio progresivo mientras respetas algunas tradiciones culturales valiosas.",
      description: "progresista moderado",
      percentage: 75,
      left_label: "Tradición",
      right_label: "Progreso",
      values: { left: 25, right: 75, label: "Progresista" }
    }
  ]
};

// Convertir insights a formato de array plano
export const getInsightsArray = (): Insight[] => {
  const allInsights: Insight[] = [];
  Object.values(mockInsightsData).forEach(categoryInsights => {
    categoryInsights.forEach(insight => {
      allInsights.push(insight);
    });
  });
  return allInsights;
};

// Textos de categorías
export const categoryLabels: Record<string, string> = {
  econ: "Económica",
  dipl: "Diplomática",
  govt: "Gubernamental",
  scty: "Social"
};

export const ideologies = [
    {
      "name": "Social Democracy",
      "stats": {
        "econ": 60,
        "dipl": 70,
        "govt": 60,
        "scty": 80
      }
    },
    {
      "name": "Liberalism",
      "stats": {
        "econ": 50,
        "dipl": 60,
        "govt": 60,
        "scty": 60
      }
    },
    {
      "name": "Conservatism",
      "stats": {
        "econ": 30,
        "dipl": 40,
        "govt": 40,
        "scty": 20
      }
    },
    {
      "name": "Libertarianism",
      "stats": {
        "econ": 40,
        "dipl": 60,
        "govt": 80,
        "scty": 60
      }
    },
    {
      "name": "Anarcho-Capitalism",
      "stats": {
        "econ": 0,
        "dipl": 50,
        "govt": 100,
        "scty": 50
      }
    }
];


export function findClosestIdeology(userScores: { econ: number; dipl: number; govt: number; scty: number }): string {
    let closestMatch = "";
    let smallestDifference = Number.MAX_VALUE;
    
    ideologies.forEach(ideology => {
      const difference = 
        Math.abs(userScores.econ - ideology.stats.econ) +
        Math.abs(userScores.dipl - ideology.stats.dipl) +
        Math.abs(userScores.govt - ideology.stats.govt) +
        Math.abs(userScores.scty - ideology.stats.scty);
      
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestMatch = ideology.name;
      }
    });
    
    return closestMatch;
  }