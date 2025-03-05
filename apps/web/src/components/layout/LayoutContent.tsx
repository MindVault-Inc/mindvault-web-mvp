"use client";

import { BottomNav } from "@/components/common";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
import { LoadingOverlay } from "@/components/ui/feedback/LoadingOverlay";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useEffect, useMemo, useState } from "react";

type BackgroundVariant = "signin" | "home" | "settings" | "results" | "default";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Page checks
  const pageStates = useMemo(
    () => ({
      isSignInPage: pathname === "/sign-in",
      isRegisterPage: pathname === "/register",
      isWelcomePage: pathname === "/welcome",
      isTestInstructions: pathname === "/tests/instructions",
      isIdeologyTest: pathname.includes("/ideology-test"),
      isHomePage: pathname === "/",
      isSettingsPage: pathname === "/settings",
      isResultsPage: pathname === "/results",
    }),
    [pathname],
  );

  // Auth refresh effect
  useEffect(() => {
    const { isSignInPage, isRegisterPage, isWelcomePage } = pageStates;

    if (isSignInPage || isRegisterPage || isWelcomePage) return;
  }, [
    pageStates,
  ]);

  // Listen for share modal state changes from child components
  useEffect(() => {
    const handleShareModalState = (e: Event) => {
      const event = e as CustomEvent<{ isOpen: boolean }>;
      setIsShareModalOpen(event.detail.isOpen);
    };

    window.addEventListener('shareModalState', handleShareModalState);
    return () => {
      window.removeEventListener('shareModalState', handleShareModalState);
    };
  }, []);

  const getBackgroundVariant = (): BackgroundVariant => {
    const { isSignInPage, isHomePage, isSettingsPage, isResultsPage } =
      pageStates;

    if (isSignInPage) return "signin";
    if (isHomePage) return "home";
    if (isSettingsPage) return "settings";
    if (isResultsPage) return "results";
    return "default";
  };

  const {
    isSignInPage,
    isRegisterPage,
    isWelcomePage,
    isTestInstructions,
    isIdeologyTest,
  } = pageStates;

  // const showLoadingOverlay = !isSignInPage && !isRegisterPage && !isWelcomePage;

  // if (
  //   showLoadingOverlay
  // ) {
  //   return (
  //     <>
  //       <LoadingOverlay />
  //       <div className="flex-grow opacity-0">{children}</div>
  //     </>
  //   );
  // }

  const showBanner =
    !isSignInPage &&
    !isRegisterPage &&
    !isWelcomePage &&
    !isTestInstructions &&
    !isIdeologyTest;

  const showNav =
    !isSignInPage &&
    !isRegisterPage &&
    !isWelcomePage &&
    !isShareModalOpen;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-bg">
      <BackgroundEffect variant={getBackgroundVariant()} />
      <main className="scroll-container">
        <div className={`flex-grow ${showNav ? "pb-16" : ""}`}>{children}</div>
      </main>
      {showNav && <div className="z-40 w-full max-w-[430px] fixed bottom-0 left-1/2 -translate-x-1/2"><BottomNav /></div>}
    </div>
  );
}
