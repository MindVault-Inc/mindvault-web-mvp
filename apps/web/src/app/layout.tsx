import "@/app/globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import type * as React from "react";

import { LayoutContent } from "@/components/layout/LayoutContent";
import { ThemeProvider } from "@/providers";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});


export const metadata: Metadata = {
  title: "MindVault",
  description: "Your journey toward understanding your true self begins here.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} bg-neutral-bg text-foreground antialiased`}
      >
          <ThemeProvider>
            <div className="mx-auto w-full min-h-screen overflow-hidden">
              <div className="mx-auto w-full max-w-[430px] min-h-screen">
                <LayoutContent>{children}</LayoutContent>
              </div>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
