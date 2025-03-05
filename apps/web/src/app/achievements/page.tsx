"use client";

import { AchievementCard } from "@/components/ui/cards/AchievementCard";
import { LoadingSpinner } from "@/components/ui/feedback/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Achievement {
  title: string;
  description: string;
  date?: string;
  obtained: boolean;
}

// Datos simulados de logros
const mockAchievements: Achievement[] = [
  {
    title: "Novato Político",
    description: "Completa tu primera prueba de ideología",
    date: "2024-01-15",
    obtained: true
  },
  {
    title: "Pensador Profundo",
    description: "Responde todas las preguntas reflexivamente en menos de 10 minutos",
    date: "2024-01-20",
    obtained: true
  },
  {
    title: "Voz Consistente",
    description: "Completa 3 pruebas de ideología con resultados similares",
    obtained: false
  },
  {
    title: "Erudito Político",
    description: "Lee 10 análisis detallados de tus resultados",
    obtained: false
  },
  {
    title: "Voz de la Comunidad",
    description: "Comparte tus resultados con la comunidad",
    obtained: false
  }
];

// Datos simulados de nivel
const mockLevel = {
  current: 25,
  max: 100,
  title: "Explorador Político"
};

export default function AchievementsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState({ current: 0, max: 100, title: "" });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const loadMockData = () => {
      try {
        setLevel(mockLevel);
        setAchievements(mockAchievements);
      } catch (error) {
        console.error("Error al cargar logros simulados:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simular retraso de carga
    loadMockData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-neutral-bg">
      <div className="relative mb-6 md:mb-8 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] border-b border-brand-tertiary/20 bg-brand-tertiary p-6 md:p-10 pb-10 md:pb-12 pt-12 md:pt-16 shadow-lg">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />
        <div className="relative z-10 mx-auto max-w-md md:max-w-xl text-center">
          <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            Logros
          </h1>
          <p className="mx-auto mb-6 md:mb-9 max-w-sm md:max-w-lg text-base md:text-lg font-medium text-slate-200">
            Celebra tu progreso y descubre qué sigue en tu camino de aprendizaje
          </p>

          <div className="mx-auto max-w-sm md:max-w-lg space-y-4 rounded-2xl md:rounded-3xl border border-brand-tertiary/10 bg-brand-secondary p-4 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="flex justify-between text-sm md:text-base font-semibold text-slate-100">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-accent-red" />
                {level.title}
              </span>
              <span>
                {level.current}/{level.max} puntos
              </span>
            </div>
            <div className="h-2 md:h-3 overflow-hidden rounded-full bg-neutral-bg/90 backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-accent-red transition-all duration-500"
                style={{
                  width: `${(level.current / level.max) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs md:text-sm font-medium text-slate-200">
              ¡Alcanza el siguiente nivel para desbloquear nuevas insignias y contenido exclusivo!
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md md:max-w-2xl space-y-4 px-4 md:px-6 lg:px-8 pb-16">
        {achievements.map((achievement) => (
          <div
            key={`${achievement.title}-${achievement.obtained}`}
            className={`transition-all duration-300 ${
              !achievement.obtained && "opacity-60"
            }`}
          >
            <AchievementCard
              title={achievement.title}
              description={achievement.description}
              date={achievement.obtained ? achievement.date : "Bloqueado"}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-bg/60 pb-16 md:pb-20 backdrop-blur-sm">
          <div className="mx-4 max-w-xs md:max-w-sm rounded-2xl md:rounded-3xl border border-brand-tertiary/10 bg-brand-secondary p-6 md:p-8 text-center shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            <h2 className="mb-3 text-xl md:text-2xl font-bold text-white">Próximamente</h2>
            <p className="text-sm text-slate-200">
              La función de logros está actualmente en desarrollo. ¡Vuelve pronto para celebrar tu progreso!
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-accent-red px-4 py-2 text-white hover:bg-accent-red/90 transition-colors"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}