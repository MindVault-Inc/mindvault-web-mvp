"use client";

import {
  FilledButton,
} from "@/components/ui/buttons";
import {
  LoadingSpinner,
} from "@/components/ui/feedback";
import { MembershipCard } from "@/components/ui/cards";
import { SettingsCard } from "@/components/ui/cards";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  Crown,
  FileText,
  Flag,
  HelpCircle,
  type LucideIcon,
  Moon,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { useEffect, useState } from "react";
import { subscriptionPlanAtom, paymentAmountAtom } from "@/atoms/user";
import { useAtom } from "jotai";

interface SubscriptionData {
  next_payment_date: string | null;
  isPro: boolean;
  subscription_start: string | null;
  subscription_expires: string | null;
}

interface SettingItem {
  Icon: LucideIcon;
  label: string;
  element?: React.ReactNode;
  onClick?: () => void;
}

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subscriptionPlan] = useAtom(subscriptionPlanAtom);
  const [paymentAmount] = useAtom(paymentAmountAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    next_payment_date: null,
    isPro: false,
    subscription_start: null,
    subscription_expires: null,
  });

  useEffect(() => {
    // Mock data using the atoms instead of API calls
    const fetchMockSettings = () => {
      try {
        // Create a current date for next payment (one month from now)
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        
        // Determine if user is Pro based on atom
        const isPro = subscriptionPlan === "Pro";
        
        // Set mock data
        setSubscriptionData({
          next_payment_date: isPro ? nextMonth.toISOString().split('T')[0] : null,
          isPro: isPro,
          subscription_start: isPro ? currentDate.toISOString().split('T')[0] : null,
          subscription_expires: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMockSettings();
    
    // Simulating the event listeners for focus/visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchMockSettings();
      }
    };

    window.addEventListener("focus", fetchMockSettings);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", fetchMockSettings);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [subscriptionPlan]);

  const handleUpgradeClick = () => {
    router.push("/awaken-pro");
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Mock logout - no API call
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 1000);
    } catch {
      // Error handling is done via the UI state
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <div className="relative mb-6 overflow-hidden rounded-b-[50px] bg-brand-tertiary pb-8 shadow-lg sm:mb-8 md:mb-10 sm:pb-14 md:pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20" />
        <motion.div
          className="relative z-10 mx-auto w-full max-w-2xl space-y-4 px-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-3 text-center">
            <Settings className="mx-auto h-10 w-10 text-[#E36C59] sm:h-12 sm:w-12" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
              Configuración
            </h1>
          </div>

          <p className="font-spaceGrotesk text-center text-lg font-normal leading-[25px] text-[#C9CDCE] sm:text-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm"
            >
              {subscriptionData.isPro && (
                <Crown className="h-5 w-5 text-[#e36c59]" />
              )}
              <span className="font-medium text-white/90">
                {subscriptionData.isPro ? "Miembro Premium" : "Miembro Básico"}
              </span>
            </motion.div>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-4 max-w-md px-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <MembershipCard
            expiryDate={
              subscriptionData.next_payment_date || "Sin suscripción activa"
            }
            isActive={subscriptionData.isPro}
            cost={paymentAmount / 1000}
          />

          {!subscriptionData.isPro && (
            <div className="relative mt-4">
              <div className="absolute -inset-3 animate-pulse rounded-2xl bg-accent-red/20 blur-xl" />
              <FilledButton
                variant="primary"
                size="lg"
                className={cn(
                  "relative z-10 w-full transform bg-accent-red shadow-[0_10px_20px_rgba(227,108,89,0.3)] transition-all duration-300 hover:scale-[1.02] hover:bg-accent-red/90 hover:shadow-[0_14px_28px_rgba(227,108,89,0.4)]",
                )}
                onClick={handleUpgradeClick}
              >
                <div className="flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  <span>Actualizar a Awaken Pro</span>
                </div>
              </FilledButton>

              <div className="relative z-10 mt-3 mb-4 px-4 py-2 text-center">
                <p className="text-sm font-medium sm:text-base">
                  <span className="text-neutral-black">Desbloquea</span>
                  <span className="text-accent-red"> funciones avanzadas </span>
                  <span className="text-neutral-black">y</span>
                  <span className="text-accent-red"> contenido exclusivo </span>
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="mt-8 space-y-4 md:mt-10 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {(
            [
              {
                Icon: Bell,
                label: "Notificaciones",
              },
              { Icon: Moon, label: "Tema Oscuro", element: <ToggleSwitch /> },
              {
                Icon: FileText,
                label: "Ver Política de Privacidad",
                onClick: () => {},
              },
              { Icon: HelpCircle, label: "Centro de Ayuda", onClick: () => {} },
              { Icon: Flag, label: "Reportar un Problema", onClick: () => {} },
            ] as SettingItem[]
          ).map((setting, index) => (
            <motion.div
              key={setting.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="md:col-span-1"
            >
              <SettingsCard
                icon={setting.Icon}
                label={setting.label}
                rightElement={setting.element}
                onClick={setting.onClick}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mb-20 mt-8 md:mt-10 md:flex md:justify-center lg:mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <FilledButton
            variant="primary"
            size="lg"
            className="w-full bg-[#E36C59] hover:bg-[#E36C59]/90 md:w-2/3 lg:w-1/2"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
          </FilledButton>
        </motion.div>
      </motion.div>
    </div>
  );
}