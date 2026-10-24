import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Черновик — резюме",
  description:
    "Соберите резюме и мини-портфолио. Gemini пишет текст, вы правите и скачиваете PDF.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
      style={
        {
          "--font-system":
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", system-ui, sans-serif',
        } as CSSProperties
      }
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
