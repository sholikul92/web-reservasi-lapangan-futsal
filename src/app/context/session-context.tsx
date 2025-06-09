"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

type SessionContextType = {
  session: Session | null;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: false,
});

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();
  const [session, setSession] = useState<Session | null>(null);
  const loading = status === "loading";

  useEffect(() => {
    if (status === "authenticated") {
      setSession(data);
    } else if (status === "unauthenticated") {
      setSession(null);
    }
  }, [status, data]);

  return <SessionContext.Provider value={{ session, loading }}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => useContext(SessionContext);
