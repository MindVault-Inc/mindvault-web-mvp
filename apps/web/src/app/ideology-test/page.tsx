"use client";

import type { Question } from "@/app/types";
import { FilledButton } from "@/components/ui/buttons/FilledButton";
import { LoadingSpinner, ProgressBar } from "@/components/ui/feedback";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Mock data @AlvaroLazarus change this
const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Economic freedom is more important than economic equality.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 2,
    question: "Government intervention in the economy is necessary to protect citizens.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 }
  },
  {
    id: 3,
    question: "International cooperation is more beneficial than national self-interest.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 }
  },
  {
    id: 4,
    question: "Military action is sometimes necessary to protect national interests.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 }
  },
  {
    id: 5,
    question: "Civil liberties are more important than security concerns.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }
  },
  {
    id: 6,
    question: "Strong government authority is needed to maintain social order.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 }
  },
  {
    id: 7,
    question: "Traditional values should guide social progress.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 }
  },
  {
    id: 8,
    question: "Society should embrace social change and progressive values.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 }
  }
];

// Define types for our atoms
interface TestProgress {
  [questionId: number]: number; // questionId -> multiplier
}

interface Scores {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
}

interface Insight {
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

// Create atoms with localStorage persistence
const testProgressAtom = atomWithStorage<TestProgress>("test-progress", {});
const scoresAtom = atomWithStorage<Scores>("test-scores", { econ: 0, dipl: 0, govt: 0, scty: 0 });
const insightsAtom = atomWithStorage<Record<string, Insight[]>>("test-insights", {});
const ideologyAtom = atomWithStorage<string>("test-ideology", "");
const testCompletedAtom = atomWithStorage<boolean>("test-completed", false);

const answerOptions = [
  { label: "Strongly Agree", multiplier: 1.0 },
  { label: "Agree", multiplier: 0.5 },
  { label: "Neutral", multiplier: 0.0 },
  { label: "Disagree", multiplier: -0.5 },
  { label: "Strongly Disagree", multiplier: -1.0 },
];

// Mock ideologies based on scores
// @AlvaroLazarus change this TO ACTUAL IDEOLOGIES OF 8VALUES
const getIdeology = (scores: Scores): string => {
  const { econ, dipl, govt, scty } = scores;
  
  if (econ > 60 && govt > 60) return "Libertarian";
  if (econ < 40 && govt < 40) return "Authoritarian Left";
  if (econ > 60 && govt < 40) return "Authoritarian Right";
  if (econ < 40 && govt > 60) return "Libertarian Left";
  if (econ > 60) return "Right-Wing";
  if (econ < 40) return "Left-Wing";
  if (govt > 60) return "Libertarian Centrist";
  if (govt < 40) return "Authoritarian Centrist";
  if (scty > 60) return "Progressive Centrist";
  if (scty < 40) return "Traditional Centrist";
  
  return "Centrist";
};

// Generate mock insights based on scores
// @AlvaroLazarus change this TO THE PROPER INSIGHTS OF 8VALUES
const generateInsights = (scores: Scores): Record<string, Insight[]> => {
  const categories = ["econ", "dipl", "govt", "scty"];
  const insights: Record<string, Insight[]> = {};
  
  categories.forEach(category => {
    const score = scores[category as keyof Scores];
    const insight: Insight = {
      category,
      percentage: score,
      insight: `Your ${category.toUpperCase()} score is ${score}%`,
      description: `This indicates your position on the ${getCategoryName(category)} spectrum.`,
      left_label: getLeftLabel(category),
      right_label: getRightLabel(category),
      values: {
        left: 100 - score,
        right: score,
        label: getCategoryName(category)
      }
    };
    insights[category] = [insight];
  });
  
  return insights;
};

// Helper functions for insight generation
const getCategoryName = (category: string): string => {
  switch (category) {
    case "econ": return "Economic";
    case "dipl": return "Diplomatic";
    case "govt": return "Government";
    case "scty": return "Societal";
    default: return category;
  }
};

const getLeftLabel = (category: string): string => {
  switch (category) {
    case "econ": return "Equality";
    case "dipl": return "Nation";
    case "govt": return "Authority";
    case "scty": return "Tradition";
    default: return "Left";
  }
};

const getRightLabel = (category: string): string => {
  switch (category) {
    case "econ": return "Markets";
    case "dipl": return "Globe";
    case "govt": return "Liberty";
    case "scty": return "Progress";
    default: return "Right";
  }
};

export default function IdeologyTest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId") || "1";

  // Local state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions] = useState<Question[]>(mockQuestions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges] = useState(false);

  // Jotai atoms
  const [testProgress, setTestProgress] = useAtom(testProgressAtom);
  const [scores, setScores] = useAtom(scoresAtom);
  const [, setInsights] = useAtom(insightsAtom);
  const [, setIdeology] = useAtom(ideologyAtom);
  const [testCompleted, setTestCompleted] = useAtom(testCompletedAtom);

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Auto-clear error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Load saved progress on initial render
  useEffect(() => {
    const loadProgress = () => {
      try {
        // Check if test is already completed
        if (testCompleted) {
          router.push(`/insights?testId=${testId}`);
          return;
        }
        
        // Find the last answered question
        if (Object.keys(testProgress).length > 0) {
          const questionIds = Object.keys(testProgress).map(Number);
          const lastAnsweredId = Math.max(...questionIds);
          const lastAnsweredIndex = questions.findIndex(q => q.id === lastAnsweredId);
          const nextQuestionIndex = Math.min(lastAnsweredIndex + 1, questions.length - 1);
          setCurrentQuestion(nextQuestionIndex);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate API loading delay
    setTimeout(() => {
      loadProgress();
    }, 500);
  }, [testId, testProgress, questions, router, testCompleted]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleUnload = () => {
      if (hasUnsavedChanges) {
        void router.push('/');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [hasUnsavedChanges, router]);

  const handleEndTest = async () => {
    if (isSubmitting) return;

    const answeredQuestions = Object.keys(testProgress).length;
    if (answeredQuestions < questions.length) {
      setError(
        `Please answer all questions before submitting. You have ${
          questions.length - answeredQuestions
        } questions remaining.`,
      );
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Calculate scores
      const maxEcon = questions.reduce(
        (sum, q) => sum + Math.abs(q.effect.econ),
        0,
      );
      const maxDipl = questions.reduce(
        (sum, q) => sum + Math.abs(q.effect.dipl),
        0,
      );
      const maxGovt = questions.reduce(
        (sum, q) => sum + Math.abs(q.effect.govt),
        0,
      );
      const maxScty = questions.reduce(
        (sum, q) => sum + Math.abs(q.effect.scty),
        0,
      );

      const econScore = ((scores.econ + maxEcon) / (2 * maxEcon)) * 100;
      const diplScore = ((scores.dipl + maxDipl) / (2 * maxDipl)) * 100;
      const govtScore = ((scores.govt + maxGovt) / (2 * maxGovt)) * 100;
      const sctyScore = ((scores.scty + maxScty) / (2 * maxScty)) * 100;

      const roundedScores = {
        econ: Math.round(econScore),
        dipl: Math.round(diplScore),
        govt: Math.round(govtScore),
        scty: Math.round(sctyScore),
      };

      // Update scores atom
      setScores(roundedScores);
      
      // Generate insights based on scores
      const generatedInsights = generateInsights(roundedScores);
      setInsights(generatedInsights);
      
      // Calculate ideology based on scores
      const calculatedIdeology = getIdeology(roundedScores);
      setIdeology(calculatedIdeology);
      
      // Mark test as completed
      setTestCompleted(true);
      
      // Simulate API delay
      setTimeout(() => {
        router.push(`/insights?testId=${testId}`);
      }, 500);
    } catch (error) {
      console.error("Error ending test:", error);
      setIsSubmitting(false);
    }
  };

  const handleAnswer = async (multiplier: number) => {
    if (questions.length === 0 || isSubmitting) return;

    const question = questions[currentQuestion];
    const updatedScores = {
      econ: scores.econ + multiplier * question.effect.econ,
      dipl: scores.dipl + multiplier * question.effect.dipl,
      govt: scores.govt + multiplier * question.effect.govt,
      scty: scores.scty + multiplier * question.effect.scty,
    };
    
    // Update scores atom
    setScores(updatedScores);
    
    // Update test progress atom
    setTestProgress(prev => ({
      ...prev,
      [question.id]: multiplier,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleLeaveTest = () => {
    router.push("/test-selection");
  };

  if (loading) return <LoadingSpinner />;
  if (
    !questions ||
    questions.length === 0 ||
    currentQuestion >= questions.length
  ) {
    return <div className="text-white text-center">No questions found.</div>;
  }

  // Rest of the component remains the same
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#387478] to-[#2A5A5E] p-4">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2C5154] rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          {/* Question Counter */}
          <div className="text-center mb-6">
            <h1 className="text-white text-2xl font-semibold">
              Question {currentQuestion + 1} of {totalQuestions}
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-10">
            <ProgressBar 
              progress={((currentQuestion + 1) / totalQuestions) * 100} 
              variant="warning"
            />
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-white text-xl font-medium leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-10">
            {answerOptions.map((answer) => {
              const isSelected = testProgress[questions[currentQuestion].id] === answer.multiplier;
              return (
                <button
                  key={`${answer.label}-${answer.multiplier}`}
                  onClick={() => handleAnswer(answer.multiplier)}
                  className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-[#387478] border-l-4 border-[#E36C59]"
                      : "bg-[#387478]/70 hover:bg-[#387478] border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        isSelected ? "bg-[#E36C59]" : "border border-white"
                      }`}
                    >
                      {isSelected && <div className="h-full w-full rounded-full"></div>}
                    </div>
                    <span>{answer.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-2 rounded-full transition-colors ${
                  currentQuestion === 0
                    ? "bg-[#1E3B3E] text-[#5A7A7D] cursor-not-allowed"
                    : "bg-[#E36C59] text-white hover:bg-[#D05A48]"
                }`}
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </div>
              </button>
            )}

            {currentQuestion === totalQuestions - 1 ? (
              <button
                onClick={handleEndTest}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-full transition-colors ${
                  isSubmitting
                    ? "bg-[#1E3B3E] text-[#5A7A7D] cursor-not-allowed"
                    : "bg-[#E36C59] text-white hover:bg-[#D05A48]"
                }`}
              >
                <div className="flex items-center">
                  {isSubmitting ? "Saving..." : "End Test"}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-full transition-colors bg-[#E36C59] text-white hover:bg-[#D05A48]"
              >
                <div className="flex items-center">
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
