import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SessionContextProvider } from "@/app/context/session-context";

export default async function dashboardPlayerLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOption);

  if (!session) return redirect("/auth/login");
  return <SessionContextProvider session={session}>{children}</SessionContextProvider>;
}
