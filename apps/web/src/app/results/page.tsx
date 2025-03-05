"use client";

import { ActionCard } from "@/components/ui/cards/ActionCard";
import { LoadingSpinner } from "@/components/ui/feedback/LoadingSpinner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileChartColumn, Globe, Heart, Star, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Test {
  testId: string;
  testName: string;
}

interface TestResult {
  title: string;
  backgroundColor: string;
  iconBgColor: string;
  Icon: LucideIcon;
  isEnabled: boolean;
  testId?: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isMobileView, setIsMobileView] = useState(true);

  // Check viewport size on mount and resize
  useEffect(() => {
    const checkViewportSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkViewportSize();
    
    // Add resize listener
    window.addEventListener('resize', checkViewportSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  useEffect(() => {
    const loadMockData = () => {
      try {
        const mockTest = {
          testId: "1",
          testName: "Test de Valores Políticos"
        };

        const transformedResults = [{
          title: mockTest.testName,
          backgroundColor: "#387478",
          iconBgColor: "#2C5154",
          Icon: Globe,
          isEnabled: true,
          testId: mockTest.testId,
        }];

        const comingSoonCards = [
          {
            title: "Test de Personalidad (Próximamente)",
            backgroundColor: "#778BAD",
            iconBgColor: "#4A5A7A",
            Icon: Heart,
            isEnabled: false,
          },
          {
            title: "Próximamente",
            backgroundColor: "#DA9540",
            iconBgColor: "#A66B1E",
            Icon: Star,
            isEnabled: false,
          },
          {
            title: "Próximamente",
            backgroundColor: "#D87566",
            iconBgColor: "#A44C3D",
            Icon: Trophy,
            isEnabled: false,
          },
        ];

        setTestResults([...transformedResults, ...comingSoonCards]);
      } catch (error) {
        console.error("Error loading mock data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  const handleCardClick = (testId: string) => {
    router.push(`/insights?testId=${testId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="bg-brand-tertiary rounded-b-[50px] md:rounded-b-[80px] shadow-lg pb-8 sm:pb-14 md:pb-20 mb-6 sm:mb-8 md:mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />
        <motion.div
          className="relative z-10 w-full max-w-2xl mx-auto px-4 md:px-8 pt-16 sm:pt-20 md:pt-24 space-y-4 md:space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-3 md:space-y-4">
            <FileChartColumn className="h-10 w-10 md:h-12 md:w-12 mx-auto text-[#E36C59]" />
            <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] mb-3 sm:mb-4 md:mb-6">
              Resultados de Pruebas
            </h1>
          </div>

          <p className="text-center text-[#C9CDCE] text-lg md:text-xl font-normal leading-[25px] md:leading-[30px]">
            Información basada en <span className="font-bold">tus resultados</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={`grid ${isMobileView ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6 md:gap-8 justify-items-center max-w-[400px] md:max-w-none mx-auto`}>
          {testResults.map((test) => (
            <motion.div
              key={test.title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + testResults.indexOf(test) * 0.1,
              }}
              className="contents"
            >
              <ActionCard
                title={test.title}
                backgroundColor={test.backgroundColor}
                iconBgColor={test.iconBgColor}
                Icon={test.Icon}
                isClickable={test.isEnabled}
                onClick={() =>
                  test.testId && test.isEnabled && handleCardClick(test.testId)
                }
                className={cn(
                  "transform transition-all duration-300",
                  "hover:scale-105 hover:-translate-y-1",
                  !test.isEnabled && "opacity-30 cursor-not-allowed",
                )}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}