import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import TamaguiClientProvider from '../components/TamaguiClientProvider'
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pospon - Gestión de Proyectos",
  description: "La plataforma todo-en-uno para gestión de proyectos",
};

// Forzar renderizado dinámico para evitar problemas de SSG con Tamagui
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <TamaguiClientProvider>
          {children}
        </TamaguiClientProvider>
      </body>
    </html>
  );
}
