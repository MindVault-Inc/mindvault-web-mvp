"use client";

import { FilledButton } from "@/components/ui/buttons/FilledButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { subscriptionPlanAtom, paymentAmountAtom } from "@/atoms/user";

export default function AwakenProPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPlan, setCurrentPlan] = useAtom(subscriptionPlanAtom);
  const [payAmount] = useAtom(paymentAmountAtom);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simular retraso de procesamiento
    setTimeout(() => {
      setCurrentPlan("Pro");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Enhanced header section for desktop */}
      <div className="bg-brand-tertiary p-6 md:p-12 lg:p-16 pt-12 md:pt-20 lg:pt-24 pb-10 md:pb-16 lg:pb-20 rounded-b-[2rem] md:rounded-b-[4rem] lg:rounded-b-[5rem] shadow-lg border-b border-brand-tertiary/20 relative overflow-hidden mb-6 md:mb-10 lg:mb-12">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />
        <div className="relative z-10 text-center max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-3 md:mb-5 lg:mb-6 tracking-tight">
            Da el Siguiente Paso
          </h1>
          <p className="text-slate-200 text-base md:text-lg lg:text-xl mb-3 md:mb-5 lg:mb-6 max-w-sm md:max-w-md lg:max-w-lg mx-auto font-medium">
            Plan actual:{" "}
            <span
              className="font-bold text-accent-red"
            >
              {currentPlan}
            </span>
          </p>
        </div>
      </div>

      {/* Upgrade Card with better desktop scaling */}
      <div className="max-w-sm md:max-w-md lg:max-w-2xl mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-12 lg:mb-16">
        <motion.div
          className={cn(
            "bg-brand-secondary rounded-[20px] md:rounded-[30px] lg:rounded-[40px] p-6 md:p-8 lg:p-10 relative overflow-hidden",
            "shadow-[0_10px_20px_rgba(0,0,0,0.2),_0_6px_6px_rgba(0,0,0,0.25)]",
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
              <Crown className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-accent-red" />
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">Pro</span>
            </div>
            <div className="bg-accent-red px-3 md:px-4 lg:px-5 py-1 lg:py-2 rounded-xl lg:rounded-2xl">
              <span className="text-sm md:text-base lg:text-lg text-white font-bold">Popular</span>
            </div>
          </div>

          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 lg:mb-3">
              {payAmount} CRC
            </div>
            <div className="text-slate-300 text-xs md:text-sm lg:text-base">
              Por mes, facturado mensualmente
            </div>
          </div>

          {/* Features section with vertical stacked layout */}
          <div className="space-y-3 md:space-y-4 lg:space-y-5 mb-6 md:mb-8 lg:mb-10">
            {[
              "Perspectivas Avanzadas",
              "Acceso anticipado a nuevas funciones",
              "Acceso Exclusivo a la Comunidad",
              "Soporte prioritario",
              "Próximamente chat con IA",
              "Más características próximamente...",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 md:gap-3 lg:gap-4">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-accent-red flex-shrink-0" />
                <span className="text-white text-sm md:text-base lg:text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              y: [0, -4, 0],
              boxShadow: [
                "0 8px 16px rgba(227,108,89,0.3)",
                "0 12px 24px rgba(227,108,89,0.4)",
                "0 8px 16px rgba(227,108,89,0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative max-w-lg lg:max-w-xl mx-auto"
          >
            {/* Efecto de fondo pulsante */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-red/20 to-[#FF8066]/20 rounded-xl blur-xl animate-pulse" />

            {/* Efecto de partículas flotantes */}
            <div className="absolute inset-0 overflow-hidden">
              {["top", "middle", "bottom"].map((position) => (
                <motion.div
                  key={`particle-${position}`}
                  className="absolute w-2 h-2 lg:w-3 lg:h-3 bg-white/30 rounded-full"
                  animate={{
                    y: [-10, -40],
                    x:
                      Math.sin(
                        ["top", "middle", "bottom"].indexOf(position) * 45,
                      ) * 20,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: ["top", "middle", "bottom"].indexOf(position) * 0.4,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${25 + ["top", "middle", "bottom"].indexOf(position) * 25}%`,
                    bottom: "0",
                  }}
                />
              ))}
            </div>

            <FilledButton
              variant="primary"
              className={cn(
                "w-full bg-gradient-to-r from-accent-red to-[#FF8066]",
                "hover:from-accent-red/90 hover:to-[#FF8066]/90",
                "shadow-[0_8px_16px_rgba(227,108,89,0.3)]",
                "hover:shadow-[0_12px_24px_rgba(227,108,89,0.4)]",
                "transform transition-all duration-300",
                "relative overflow-hidden",
                "border border-white/10",
                "h-12 md:h-16 lg:h-20",
                "text-white",
              )}
              onClick={handleUpgrade}
              disabled={isProcessing}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  animation: "shimmer 2s infinite",
                  backgroundSize: "200% 100%",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

              <div className="relative z-10 flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 animate-pulse text-white" />
                <span className="font-bold text-base md:text-lg lg:text-xl tracking-wide">
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span>Procesando</span>
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        ...
                      </motion.div>
                    </div>
                  ) : (
                    <motion.span
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      Actualizar a Pro
                    </motion.span>
                  )}
                </span>
              </div>
            </FilledButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}