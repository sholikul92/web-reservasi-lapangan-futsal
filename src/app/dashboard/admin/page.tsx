import { BookingLineChart } from "./_components/BookingChart";
import { PopularFieldPieChart } from "./_components/PopularFieldChart";

export default async function DashboardAdminPage() {
  return (
    <section className='p-4 flex justify-center items-center min-h-screen '>
      <div className='ml-8 md:ml-16 grid grid-cols-1 md:grid-cols-2 md:gap-8 w-full'>
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
