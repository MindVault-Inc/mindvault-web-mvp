"use client";

import { FilledButton } from "@/components/ui/buttons/FilledButton";
import { AnimatePresence, motion } from "framer-motion";
import { Wallet } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const headingConfig = {
  firstLine: {
    prefix: "Discover Your",
    words: ["Truth", "Core", "Spirit", "Soul", "Heart", "Being", "Purpose"],
  },
  secondLine: {
    prefix: "Transform Your",
    words: ["View", "Lens", "Vision", "Mind", "Path", "Light", "World"],
  },
};

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTrueWord, setCurrentTrueWord] = useState(0);
  const [currentPerspectiveWord, setCurrentPerspectiveWord] = useState(0);

  useEffect(() => {
    // Clear any old session data
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center w-full"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-[510px] -mt-4 lg:h-[600px]"
      >
        <div className="w-full absolute top-0 bg-white rounded-b-[65px] shadow-[inset_-5px_-5px_25px_0px_rgba(134,152,183,1.00),inset_5px_5px_25px_0px_rgba(248,248,246,1.00)]" />
        <div className="w-full h-full px-[34px] pt-[125px] pb-[70px] absolute top-0 bg-[#2c5154] rounded-b-[65px] shadow-[21px_38px_64.69999694824219px_3px_rgba(0,0,0,0.25)] overflow-hidden lg:pt-[180px]">
          <div className="max-w-md mx-auto lg:max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-16 h-16 lg:w-24 lg:h-24">
                <Image
                  src="/MindVaultLogoTransparentHD.svg"
                  alt="MindVault Logo"
                  width={96}
                  height={96}
                  className="w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            <h1 className="text-white text-[clamp(3rem,9vw,3.5rem)] font-medium leading-[1] mb-8">
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
            <h2 className="text-white text-[clamp(2.75rem,8vw,3.25rem)] font-medium leading-[1]">
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
        className="w-full max-w-md space-y-4 text-center mt-auto p-4"
      >
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <FilledButton
          variant="primary"
          size="lg"
          className="w-full bg-[#E36C59] hover:bg-[#E36C59]/90"
          onClick={handleWorldIDClick}
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
            <span>{isConnecting ? "Connecting..." : "World ID"}</span>
          </div>
        </FilledButton>

        <p className="text-sm text-muted-foreground pb-6 mt-4">
          By signing in, you agree to our{" "}
          <a
            href="https://docs.google.com/document/d/1GXZ5ZBevKkXUVdIfgB3Mz4KsBrjuuSQZmjocx_RH3XY/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://docs.google.com/document/d/1Rn1Whrf3gIaq0UGMxsSyWeheTcXNZfMRAYFhegFu3vQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Terms of Service
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
