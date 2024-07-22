import localFont from "next/font/local";
import type { Metadata } from "next";
import { Do_Hyeon, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import KakaoIcon from "@/public/kakao.svg";
import Image from "next/image";

const DoHyeon = Do_Hyeon({
  subsets: ["latin"],
  variable: "--font-do-hyeon",
  weight: "400",
});

const NotoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const gmarketSans = localFont({
  src: [
    {
      path: "./fonts/GmarketSansTTFMedium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/GmarketSansTTFBold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/GmarketSansTTFLight.ttf",
      weight: "300",
    },
  ],
  variable: "--font-gmarket-sans",
});
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
          gmarketSans.variable,
          DoHyeon.variable,
          NotoSansKR.variable
        )}
      >
        <Header />
        {children}
        <a
          href="/"
          className="fixed bottom-[5dvh] right-4 z-20"
          target="_blank"
        >
          <Image
            src={KakaoIcon}
            alt="카카오 채널 링크"
            width={80}
            height={80}
          />
        </a>
        <Footer />
      </body>
    </html>
  );
}
