"use client";

import {
  AchievementButton,
  LeaderboardButton,
  LoadingSpinner,
  ProfileCard,
  QuizCard,
} from "@/components";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { subscriptionPlanAtom, userNameAtom } from "@/atoms/user";

interface User {
  name: string;
  last_name: string;
  level: string;
  level_points: number;
  points: number;
  maxPoints: number;
  verified?: boolean;
}

// Niveles de usuario en español
const userLevels = [
  "Principiante Curioso",
  "Explorador Consciente",
  "Buscador Reflexivo",
  "Pensador Analítico",
  "Maestro Filosófico"
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [userName] = useAtom(userNameAtom);
  const [subscriptionPlan] = useAtom(subscriptionPlanAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Crear datos de usuario simulados usando el átomo userName
        const firstName = userName || "Jhon Doe"
        const lastName = userName ? "Usuario" : "";
        
        // Generar nivel aleatorio y puntos basados en el plan de suscripción
        const isPro = subscriptionPlan === "Pro";
        const levelIndex = isPro ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2);
        const level = userLevels[levelIndex];
        const points = isPro ? 45 + Math.floor(Math.random() * 40) : 15 + Math.floor(Math.random() * 30);
        
        setUserData({
          name: firstName,
          last_name: lastName,
          level: level,
          level_points: points,
          points: points,
          maxPoints: 100,
          verified: isPro
        });
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [router, userName, subscriptionPlan]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="relative mb-6 sm:mb-8 md:mb-10 overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[4rem] lg:rounded-b-[5rem] border-b border-brand-tertiary/20 bg-brand-tertiary px-4 py-8 sm:p-8 md:p-10 lg:p-12 xl:p-16">
          <div className="absolute inset-0 opacity-20" />

          <motion.div
            className="relative z-10 mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-4 sm:space-y-5 md:space-y-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center">
              <Sun className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-[#E36C59]" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
                ¡Bienvenido de nuevo!
              </h1>
            </div>

            <p className="mx-auto mb-2 sm:mb-4 md:mb-6 max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-200">
              Sigue tu progreso y continúa tu viaje de autodescubrimiento
            </p>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center pb-8 sm:pb-10 md:pb-12 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
            <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              <motion.div
                className="flex w-full justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <ProfileCard
                  className={cn(
                    "w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px]",
                    "transform transition-all duration-300 hover:scale-105 hover:-translate-y-1",
                    "shadow-[0_10px_20px_rgba(0,0,0,0.2),_0_6px_6px_rgba(0,0,0,0.25)]",
                    "hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]",
                  )}
                  user={userData || undefined}
                />
              </motion.div>

              <motion.div
                className="flex w-full justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <LeaderboardButton />
              </motion.div>

              <motion.div
                className="flex w-full justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <QuizCard />
              </motion.div>

              <motion.div
                className="flex w-full justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <AchievementButton />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}