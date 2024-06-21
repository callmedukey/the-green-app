import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Noto = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "더그린",
  description: "더그린 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          Noto.variable
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
