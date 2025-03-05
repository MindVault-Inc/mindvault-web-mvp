"use client";

import { BottomNav } from "@/components/common";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
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
  }, [pageStates]);

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
    const { isSignInPage, isHomePage, isSettingsPage, isResultsPage } = pageStates;

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

  const showNav =
    !isSignInPage &&
    !isRegisterPage &&
    !isWelcomePage &&
    !isShareModalOpen;

  // Show bottom nav only on mobile
  const showBottomNav = showNav && isMobileView;
  
  return (
    // Removed any fixed width constraints, using full viewport width
    <div className="flex min-h-screen flex-col bg-neutral-bg w-full">
      <BackgroundEffect variant={getBackgroundVariant()} />
      
      {/* Main content container */}
      <main className="w-full min-h-screen">
        <div className={`w-full ${showBottomNav ? "pb-16 md:pb-0" : ""}`}>
          {/* For mobile view, keep constraint. For desktop, use different widths */}
          <div className={isMobileView ? "w-full max-w-[430px] mx-auto" : "w-full px-0"}>
            {children}
          </div>
        </div>
      </main>
      
      {/* Bottom navigation for mobile only */}
      {showBottomNav && (
        <div className="z-40 w-full max-w-[430px] fixed bottom-0 left-1/2 -translate-x-1/2">
          <BottomNav />
        </div>
      )}
      
      {/* Desktop navigation for larger screens */}
      {showNav && !isMobileView && (
        <div className="hidden md:block fixed top-0 right-0 p-4">
          {/* Desktop navigation placeholder */}
        </div>
      )}
    </div>
  );
}