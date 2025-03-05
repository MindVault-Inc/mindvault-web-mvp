"use client";

import { FilledButton } from "@/components/ui/buttons";
import { LoadingSpinner } from "@/components/ui/feedback";
import { Card } from "@/components/ui/base";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, FileQuestion } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TestInstructions {
  description: string;
  total_questions: number;
}

// Mock data for tests
const mockTests = {
  "1": {
    description: "Este test evalúa tus valores políticos a través de una serie de preguntas sobre temas sociales, económicos y filosóficos.",
    total_questions: 70
  },
  "2": {
    description: "Este test evalúa tu personalidad a través de preguntas sobre situaciones cotidianas y preferencias personales.",
    total_questions: 30
  },
  "3": {
    description: "Este test evalúa tus habilidades cognitivas a través de problemas de lógica y razonamiento.",
    total_questions: 25
  }
};

// Mock progress data
const mockProgress = {
  "1": { answers: {} },
  "2": { answers: { "1": "agree", "2": "neutral", "3": "disagree" } },
  "3": { answers: { "1": "agree", "2": "strongly_agree" } }
};

export default function TestInstructions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId") || "1"; // Fallback to 1 for now

  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState<TestInstructions>({
    description: "",
    total_questions: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Simulating API fetch with mock data
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get mock test data
        const instructionsData = mockTests[testId as keyof typeof mockTests] || mockTests["1"];
        
        // Get mock progress data
        const progressData = mockProgress[testId as keyof typeof mockProgress] || { answers: {} };
        
        setInstructions({
          description: instructionsData.description,
          total_questions: instructionsData.total_questions,
        });

        if (progressData.answers) {
          const answeredCount = Object.keys(progressData.answers).length;
          setCurrentQuestion(answeredCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [testId]);

  // Calculate estimated time: roughly 9 seconds per question
  const estimatedTime = Math.ceil(instructions.total_questions * 0.15);
  
  // Calculate progress percentage
  const progress = (currentQuestion / instructions.total_questions) * 100;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#387478] to-[#2C5154]">
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full w-full items-start justify-center p-4 pt-12 sm:p-6 md:p-8 lg:p-10">
          <div className="relative mx-auto w-full max-w-[421px] md:max-w-[500px] lg:max-w-[580px]">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-2"
            >
              <FilledButton
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-[#E36C59] to-[#E36C59]/90 hover:bg-accent/90"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Atrás</span>
              </FilledButton>
            </motion.div>

            <motion.div
              className="mt-12 space-y-6 sm:mt-14 md:mt-16 sm:space-y-8 md:space-y-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4 text-center">
                <Brain className="mx-auto h-12 w-12 text-[#E36C59] md:h-14 md:w-14 lg:h-16 lg:w-16" />
                <h1 className="px-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Descubre Tus Valores Políticos
                </h1>
              </div>

              <Card className="mx-4 space-y-3 border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6 md:p-7 sm:space-y-4 md:space-y-5">
                <h2 className="text-center text-lg font-semibold text-white sm:text-xl md:text-2xl">
                  Antes de comenzar
                </h2>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <FileQuestion className="mt-1 h-5 w-5 flex-shrink-0 text-[#E36C59] md:h-6 md:w-6" />
                    <p className="text-sm text-white/90 md:text-base">
                      Este test consiste en {instructions.total_questions}{" "}
                      afirmaciones diseñadas para explorar tus creencias 
                      políticas. Tus respuestas reflejarán tu posición en
                      ocho valores fundamentales.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-2 sm:p-3 md:p-4">
                    <p className="text-center text-sm font-medium text-white/90 md:text-base">
                      Por favor, responde honestamente, basándote en tus verdaderas opiniones.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/90 sm:text-sm md:text-base">
                      Tiempo estimado:{" "}
                      <span className="font-semibold text-white">
                        {estimatedTime} min
                      </span>
                    </p>
                    <p className="text-xs text-white/90 sm:text-sm md:text-base">
                      Progreso:{" "}
                      <span className="font-semibold text-white">
                        {currentQuestion}/{instructions.total_questions}
                      </span>
                    </p>
                  </div>
                </div>

                {currentQuestion > 0 && (
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 md:h-3">
                    <motion.div
                      className="h-full bg-[#E36C59]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </Card>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center px-4"
              >
                <FilledButton
                  variant="primary"
                  size="lg"
                  className="relative w-full overflow-hidden bg-gradient-to-r from-[#E36C59] to-[#E36C59]/90 px-8 hover:from-[#E36C59]/90 hover:to-[#E36C59] sm:w-auto md:text-lg"
                  onClick={() => {
                    void router.push(`/ideology-test?testId=${testId}`);
                  }}
                >
                  <span className="relative z-10">
                    {currentQuestion > 0 ? "Continuar test" : "Comenzar test"}
                  </span>
                </FilledButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-[#387478]/20 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-[#2C5154]/40 blur-3xl" />
    </div>
  );
}