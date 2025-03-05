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
  description: "Tu viaje hacia la comprensión de tu verdadero yo comienza aquí.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} bg-neutral-bg text-foreground antialiased`}
      >
          <ThemeProvider>
            {/* Removed nested divs and width constraints */}
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
      </body>
    </html>
  );
}