import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AppProvider } from "@/Context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Hub - Personalized Learning Resources",
  description:
    "Student Hub provides tailored learning resources based on your subject proficiency. Enhance your academic performance with our personalized recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} bg-background text-foreground antialiased min-h-screen w-screen`}
        >
          <div className="pointer-events-none fixed inset-0 min-h-screen w-screen">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
          </div>
          <div className="flex items-center justify-center min-h-screen w-screen">
            <AppProvider>{children}</AppProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
