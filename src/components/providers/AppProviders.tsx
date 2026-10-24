"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";

function AccentSync() {
  const accent = useResumeStore((s) => s.accent);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AccentSync />
      {children}
    </ThemeProvider>
  );
}
