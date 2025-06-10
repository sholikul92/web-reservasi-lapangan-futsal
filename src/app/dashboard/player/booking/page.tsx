"use client";
import FormBooking from "./_components/FormBooking";
import { MidtransSnapScript } from "./_components/MidtransSnap";
import HeaderMenu from "./_components/HeaderMenu";

export default function BookingPage() {
  return (
    <>
      <HeaderMenu menuName='Booking Lapangan' />
      <section className='min-h-screen bg-[url(/hero-image.jpg)] bg-cover md:bg-bottom bg-position-[center_left_-12rem] bg-no-repeat flex justify-center items-center'>
        <div className='w-xl mx-4 bg-white/70 p-4 md:p-8 rounded-xl shadow-md flex flex-col items-stretch gap-8'>
          <div className='flex items-center'>
            <h1 className='flex-1 text-2xl font-semibold text-center'>Form Booking</h1>
          </div>
          <FormBooking />
          <MidtransSnapScript />
        </div>
      </section>
    </>
  );
}
