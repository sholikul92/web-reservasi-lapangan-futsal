"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Session } from "next-auth";

type SessionContextType = {
  session: Session | null;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
});

export const SessionContextProvider = ({ children, session }: { children: ReactNode; session: Session | null }) => {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => useContext(SessionContext);
