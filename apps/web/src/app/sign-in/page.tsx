"use client";

import { FilledButton } from "@/components/ui/buttons/FilledButton";
import { AnimatePresence, motion } from "framer-motion";
import { Wallet } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Spanish translations for the cycling words
const headingConfig = {
  firstLine: {
    prefix: "Descubre Tu",
    words: ["Verdad", "Esencia", "Espíritu", "Alma", "Corazón", "Ser", "Propósito"],
  },
  secondLine: {
    prefix: "Transforma Tu",
    words: ["Visión", "Perspectiva", "Mirada", "Mente", "Camino", "Luz", "Mundo"],
  },
};

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTrueWord, setCurrentTrueWord] = useState(0);
  const [currentPerspectiveWord, setCurrentPerspectiveWord] = useState(0);

  useEffect(() => {
    // Clear any old session data - keeping the same functionality
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      for (const c of document.cookie.split(";")) {
        document.cookie = `${c.replace(/^ +/, "").replace(/=.*/, "=;expires=")}${new Date().toUTCString()};path=/`;
      }
    }
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentTrueWord(
        (prev) => (prev + 1) % headingConfig.firstLine.words.length,
      );
      setCurrentPerspectiveWord(
        (prev) => (prev + 1) % headingConfig.secondLine.words.length,
      );
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  const handleSignIn = () => {
    setIsConnecting(true);
    // Using setTimeout to simulate connection delay instead of actual auth
    setTimeout(() => {
      router.push("/register");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center w-full min-h-screen"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-[510px] -mt-4 lg:h-[600px] xl:h-[700px]"
      >
        <div className="w-full absolute top-0 bg-white rounded-b-[65px] shadow-[inset_-5px_-5px_25px_0px_rgba(134,152,183,1.00),inset_5px_5px_25px_0px_rgba(248,248,246,1.00)]" />
        <div className="w-full h-full px-[34px] pt-[125px] pb-[70px] absolute top-0 bg-[#2c5154] rounded-b-[65px] shadow-[21px_38px_64.69999694824219px_3px_rgba(0,0,0,0.25)] overflow-hidden md:px-12 lg:px-16 lg:pt-[180px]">
          <div className="max-w-md mx-auto lg:max-w-2xl xl:max-w-3xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-center mb-8 md:mb-10 lg:mb-12"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28">
                <Image
                  src="/MindVaultLogoTransparentHD.svg"
                  alt="Logo de MindVault"
                  width={96}
                  height={96}
                  className="w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            <h1 className="text-white text-[clamp(3rem,9vw,3.5rem)] font-medium leading-[1] mb-8 md:text-[clamp(3.25rem,8vw,4rem)] lg:text-[clamp(3.5rem,7vw,4.5rem)]">
              {headingConfig.firstLine.prefix}{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTrueWord}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-bold inline-block text-[#e36c59]"
                >
                  {headingConfig.firstLine.words[currentTrueWord]}
                </motion.span>
              </AnimatePresence>
            </h1>
            <h2 className="text-white text-[clamp(2.75rem,8vw,3.25rem)] font-medium leading-[1] md:text-[clamp(3rem,7vw,3.75rem)] lg:text-[clamp(3.25rem,6vw,4.25rem)]">
              {headingConfig.secondLine.prefix}{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPerspectiveWord}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-bold inline-block text-[#e36c59]"
                >
                  {headingConfig.secondLine.words[currentPerspectiveWord]}
                </motion.span>
              </AnimatePresence>
            </h2>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-md space-y-4 text-center mt-auto p-4 md:max-w-lg lg:max-w-xl"
      >
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <FilledButton
          variant="primary"
          size="lg"
          className="w-full bg-[#E36C59] hover:bg-[#E36C59]/90 md:w-4/5 md:mx-auto lg:w-3/5"
          onClick={handleSignIn}
          disabled={isConnecting}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-5 h-5">
              {isConnecting ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Wallet className="w-5 h-5" />
              )}
            </div>
            <span>{isConnecting ? "Conectando..." : "World ID"}</span>
          </div>
        </FilledButton>

        <p className="text-sm text-muted-foreground pb-6 mt-4 md:text-base lg:w-4/5 lg:mx-auto">
          Al iniciar sesión, aceptas nuestra{" "}
          <a
            href="https://docs.google.com/document/d/1GXZ5ZBevKkXUVdIfgB3Mz4KsBrjuuSQZmjocx_RH3XY/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Política de Privacidad
          </a>{" "}
          y{" "}
          <a
            href="https://docs.google.com/document/d/1Rn1Whrf3gIaq0UGMxsSyWeheTcXNZfMRAYFhegFu3vQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Términos de Servicio
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}