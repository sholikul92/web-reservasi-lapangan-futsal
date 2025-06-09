"use client";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { SessionContextProvider } from "./context/session-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionContextProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
}
