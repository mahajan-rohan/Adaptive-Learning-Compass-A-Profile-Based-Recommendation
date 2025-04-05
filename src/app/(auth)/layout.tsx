import MouseMoveEffect from "@/components/mouse-move-effect";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <MouseMoveEffect />
      {children}
    </div>
  );
}
