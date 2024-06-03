import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/contexts/SessionProvider";
import "./globals.css";
import SwrProvider from "@/contexts/SwrProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assistance System",
  description: "A virtual institucional panel to manage assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <SwrProvider>{children}</SwrProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
