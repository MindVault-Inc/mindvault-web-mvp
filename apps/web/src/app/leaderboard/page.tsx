"use client";

import { Avatar, AvatarFallback } from "@/components/ui/base/avatar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  initials: string;
}

const topThree = [
  {
    rank: 1,
    name: "Jennifer",
    points: 760,
    color: "#4ECCA3",
    height: "160px",
    top: "129px",
    mobileTop: "109px",
    tabletTop: "119px",
  },
  {
    rank: 2,
    name: "Alice",
    points: 749,
    color: "#387478",
    height: "145px",
    top: "169px",
    mobileTop: "149px",
    tabletTop: "159px",
  },
  {
    rank: 3,
    name: "William",
    points: 689,
    color: "#E36C59",
    height: "130px",
    top: "196px",
    mobileTop: "176px",
    tabletTop: "186px",
  },
];

const leaderboardEntries: LeaderboardEntry[] = [
  { rank: 1, name: "Jennifer", points: 760, initials: "JE" },
  { rank: 2, name: "Alice", points: 749, initials: "AL" },
  { rank: 3, name: "William", points: 689, initials: "WI" },
  { rank: 4, name: "Lydia", points: 652, initials: "LY" },
  { rank: 5, name: "Erick", points: 620, initials: "ER" },
  { rank: 6, name: "Ryan", points: 577, initials: "RY" },
];

export default function LeaderboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  return (
    <div className="min-h-screen bg-neutral-bg relative">
      {/* Main Content */}
      <div className="relative">
        {/* Top 3 Podium Section - Behind everything */}
        {!isModalOpen && (
          <div className="absolute inset-0 z-0">
            <div className="relative h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px]">
              <div className="relative z-10 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto pt-[60px] sm:pt-[70px] md:pt-[80px] lg:pt-[90px]">
                {topThree.map((entry) => (
                  <div
                    key={`${entry.name}-${entry.rank}`}
                    className={cn(
                      "absolute left-1/2 transform transition-all duration-300 hover:scale-105",
                      "w-[60px] sm:w-[70px] md:w-[75px] lg:w-[80px]",
                      entry.rank === 1
                        ? "-ml-[30px] sm:-ml-[35px] md:-ml-[37.5px] lg:-ml-[40px]"
                        : entry.rank === 2
                        ? "-ml-[90px] sm:-ml-[105px] md:-ml-[112.5px] lg:-ml-[120px]"
                        : "ml-[30px] sm:ml-[35px] md:ml-[37.5px] lg:ml-[40px]"
                    )}
                    style={{
                      height: entry.height,
                      backgroundColor: entry.color,
                      borderRadius: "20px",
                      boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                      top: `var(--top-position, ${entry.mobileTop})`,
                      "@media (min-width: 640px)": { "--top-position": entry.tabletTop },
                      "@media (min-width: 1024px)": { "--top-position": entry.top },
                    } as React.CSSProperties}
                  >
                    <div className="absolute -top-8 sm:-top-10 md:-top-11 lg:-top-12 left-1/2 transform -translate-x-1/2">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 border-2 border-white">
                        <AvatarFallback className="bg-neutral-bg text-white text-xs sm:text-sm md:text-base lg:text-lg">
                          {leaderboardEntries[entry.rank - 1].initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute top-2 sm:top-3 md:top-3.5 lg:top-4 left-1/2 transform -translate-x-1/2 text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold">
                      {entry.rank}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Layer */}
        <div className="relative z-10">
          <div
            className={cn(
              "bg-brand-tertiary px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12",
              "rounded-b-[1.5rem] sm:rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[4rem]",
              "relative overflow-hidden",
              "shadow-[0_10px_20px_rgba(0,0,0,0.2),_0_6px_6px_rgba(0,0,0,0.25)]",
              "border-b border-brand-tertiary/20",
            )}
          >
            <div className="relative text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight mb-4">
                Tabla de Clasificación
              </h1>
            </div>
          </div>

          <div className="relative z-20 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 space-y-2 sm:space-y-3 md:space-y-3.5 lg:space-y-4 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
              {leaderboardEntries.map((entry) => (
                <div
                  key={`${entry.name}-${entry.rank}`}
                  className="bg-white rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[20px] p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="w-8 sm:w-9 md:w-10 lg:w-12 text-center text-[#2C5154] text-lg sm:text-xl md:text-xl lg:text-2xl font-normal">
                    {String(entry.rank).padStart(2, "0")}
                  </span>
                  <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12">
                    <AvatarFallback className="bg-neutral-400 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                      {entry.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-[#232931] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                      {entry.name}
                    </span>
                    <span className="text-[#73777C] text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                      {entry.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon Modal - Top Layer */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-neutral-bg/60 backdrop-blur-sm flex items-center justify-center pb-16 sm:pb-20 px-4 z-50">
            <div
              className={cn(
                "bg-brand-secondary p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center w-full max-w-[320px] sm:max-w-sm",
                "shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]",
                "border border-brand-tertiary/10 backdrop-blur-sm",
              )}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Próximamente
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm">
                La tabla de clasificación está en desarrollo. ¡Vuelve pronto para competir con otros!
              </p>
              <button
                type="button"
                className="mt-4 bg-accent-red text-white text-sm sm:text-base rounded-lg px-4 py-2 hover:bg-accent-red/90 transition-colors"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
