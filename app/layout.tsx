import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ToastProvider } from "@/lib/toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "AuraMarket | Calm Commerce Administration",
  description:
    "A premium wellness storefront and administration system built as a serious front-end portfolio project."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
