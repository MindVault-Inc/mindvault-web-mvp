"use client";

import { LoadingSpinner } from "@/components/ui/feedback/LoadingSpinner";
import { SearchBar } from "@/components/ui/navigation/SearchBar";
import { TestCard } from "@/components/ui/cards/TestCard";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
}

interface TestData {
  testId: string;
  title: string;
  totalQuestions: number;
  answeredQuestions: number;
  achievements: Achievement[];
}

// Import the test progress atom from ideology-test
interface TestProgress {
  [questionId: number]: number; // questionId -> multiplier
}

const testProgressAtom = atomWithStorage<TestProgress>("test-progress", {});

// Mock test data
// TODO: Change test name to spanish
const mockTests = [
  {
    testId: "1",
    testName: "Political Ideology Test",
    totalQuestions: 70,
    achievements: [
      {
        id: "1",
        title: "Political Explorer",
        description: "Complete your first ideology test"
      },
      {
        id: "2",
        title: "Deep Thinker",
        description: "Answer all questions thoughtfully"
      }
    ]
  }
];

export default function TestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState<TestData>({
    testId: "",
    title: "",
    totalQuestions: 0,
    answeredQuestions: 0,
    achievements: [],
  });
  
  // Get test progress from atom
  const [testProgress] = useAtom(testProgressAtom);

  useEffect(() => {
    const loadMockData = () => {
      try {
        if (mockTests && mockTests.length > 0) {
          const firstTest = mockTests[0];
          
          // Calculate answered questions from the atom
          const answeredCount = Object.keys(testProgress).length;

          setTestData({
            testId: firstTest.testId,
            title: firstTest.testName,
            totalQuestions: firstTest.totalQuestions || 70, // Default to 70 as specified
            answeredQuestions: answeredCount,
            achievements: firstTest.achievements || [],
          });
        }
      } catch (error) {
        console.error("Error loading mock test data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay
    loadMockData();
  }, [testProgress]);

  const handleSearch = (query: string) => {
    if (query.toLowerCase().includes(testData.title.toLowerCase())) {
      setTestData((prev) => ({ ...prev }));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative mb-4 sm:mb-6 lg:mb-12 overflow-hidden rounded-b-[1.5rem] sm:rounded-b-[2.5rem] lg:rounded-b-[4rem] border-b border-brand-tertiary/20 bg-brand-tertiary px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-20 shadow-lg">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />

        <motion.div
          className="relative z-10 mx-auto max-w-xs sm:max-w-sm lg:max-w-2xl space-y-4 sm:space-y-6 lg:space-y-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center">
            <Brain className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 text-[#E36C59]" />
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-slate-100">
              Pruebas Disponibles
            </h1>
          </div>

          <p className="mx-auto max-w-[280px] sm:max-w-sm lg:max-w-xl text-sm sm:text-base lg:text-xl font-medium text-slate-200 px-2 sm:px-4 lg:px-0">
            Explora nuestra colección de pruebas para entenderte mejor
          </p>

          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar pruebas..."
            className="mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-md"
          />

          <div className="mt-4 sm:mt-6 lg:mt-8 rounded-lg sm:rounded-xl bg-white/10 p-2 sm:p-3 lg:p-4 backdrop-blur-sm">
            <p className="text-center text-xs sm:text-sm lg:text-base text-white/90">
              ¡Logros próximamente! 🏆
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col items-center px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12 lg:pb-24 bg-gray-50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <TestCard
              title={testData.title}
              totalQuestions={testData.totalQuestions}
              answeredQuestions={testData.answeredQuestions}
              achievements={testData.achievements}
              onCardClick={() =>
                router.push(`/tests/instructions?testId=${testData.testId}`)
              }
            />
            <div className="pointer-events-none opacity-40">
              <TestCard
                title="Test de Personalidad"
                totalQuestions={50}
                answeredQuestions={0}
                achievements={[]}
                onCardClick={() => {}}
              />
            </div>
          </div>
        </div>

        <p className="mt-6 sm:mt-8 lg:mt-12 text-center text-sm sm:text-base lg:text-lg font-medium text-gray-600">
          ¡Más pruebas próximamente! Mantente atento 🎉
        </p>
      </motion.div>
    </div>
  );
}
