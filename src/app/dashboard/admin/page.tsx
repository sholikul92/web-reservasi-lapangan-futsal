import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { BookingLineChart } from "./_components/BookingChart";
import { PopularFieldPieChart } from "./_components/PopularFieldChart";

export default async function DashboardAdminPage() {
  const session = await getServerSession(authOption);

  if (!session) return redirect("/auth/login");
  if (session.user.role !== "superadmin") return redirect("/dashboard/player");
  return (
    <section>
      <Sidebar />
      <div className='ml-8 md:ml-18 grid grid-cols-1 md:grid-cols-2 justify-center md:gap-8'>
        <div>
          <BookingLineChart />
        </div>
        <div className='w-1/2'>
          <PopularFieldPieChart />
        </div>
      </div>
    </section>
  );
}
