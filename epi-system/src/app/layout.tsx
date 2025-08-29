import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { EPIProvider } from "@/context/EPIContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Gestão de EPIs",
  description: "Sistema para controle de entrada e saída de Equipamentos de Proteção Individual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider>
          <EPIProvider>
            {children}
          </EPIProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

