import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";

export default async function LayoutDashboardAdmin({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOption);

  if (!session) return redirect("/auth/login");
  if (session.user.role !== "superadmin") return redirect("/dashboard/player");
  return (
    <section>
      <Sidebar />
      {children}
    </section>
  );
}
