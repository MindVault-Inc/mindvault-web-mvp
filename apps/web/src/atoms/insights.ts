import { atom } from 'jotai';

// Define types if not already defined elsewhere
export interface UserSubscription {
  isPro: boolean;
}

export interface Insight {
    category: string;
    percentage: number;
    insight: string;
    description: string;
    left_label: string;
    right_label: string;
    values: {
      left: number;
      right: number;
      label: string;
    };
  }

export interface Scores {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
}

export interface PublicFigure {
  name: string;
  ideology: string;
  scores: Scores;
}

// Create atoms
export const userSubscriptionAtom = atom<UserSubscription | null>(null);
export const ideologyAtom = atom<string>('');
export const insightsAtom = atom<Insight[]>([]);
export const scoresAtom = atom<Scores>({ econ: 0, dipl: 0, govt: 0, scty: 0 });
export const publicFiguresAtom = atom<PublicFigure[]>([]);
export const selectedPublicFigureAtom = atom<string>('');

// Derived atom for selecting a matching public figure
export const matchingPublicFigureAtom = atom(
  (get) => {
    const publicFigures = get(publicFiguresAtom);
    const ideology = get(ideologyAtom);
    const scores = get(scoresAtom);
    
    if (!publicFigures.length || !ideology) {
      return 'Unknown Match';
    }
    
    // Filter figures that match the ideology
    const matchingFigures = publicFigures.filter(figure => 
      figure.ideology.toLowerCase().includes(ideology.toLowerCase())
    );
    
    if (matchingFigures.length > 0) {
      // Randomly select one of the matching figures
      const randomIndex = Math.floor(Math.random() * matchingFigures.length);
      return matchingFigures[randomIndex].name;
    }
    
    // If no ideology match, find closest match based on scores
    if (scores && publicFigures.length) {
      // Calculate distance between user scores and each figure
      const figuresWithDistance = publicFigures.map(figure => {
        const distance = Math.sqrt(
          Math.pow(scores.econ - figure.scores.econ, 2) +
          Math.pow(scores.dipl - figure.scores.dipl, 2) +
          Math.pow(scores.govt - figure.scores.govt, 2) +
          Math.pow(scores.scty - figure.scores.scty, 2)
        );
        return { ...figure, distance };
      });
      
      // Sort by closest match
      figuresWithDistance.sort((a, b) => a.distance - b.distance);
      
      // Return closest match
      return figuresWithDistance[0].name;
    }
    
    return 'Unknown Match';
  }
);