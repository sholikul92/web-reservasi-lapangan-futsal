'use client';
import { MdArrowBack } from 'react-icons/md';
import FormBooking from './_components/FormBooking';
import { Tooltip } from '@heroui/tooltip';
import { useRouter } from 'next/navigation';
import { MidtransSnapScript } from './_components/MidtransSnap';

export default function BookingPage() {
  const router = useRouter();
  const handleBackClick = () => {
    router.push('/dashboard/player');
  };
  return (
    <section className='min-h-screen bg-[url(/hero-image.jpg)] bg-cover md:bg-bottom bg-position-[center_left_-12rem] bg-no-repeat flex justify-center items-center'>
      <div className='w-xl mx-4 bg-white/70 p-4 md:p-8 rounded-xl shadow-md flex flex-col items-stretch gap-8'>
        <div className='flex items-center'>
          <Tooltip content='Kembali'>
            <MdArrowBack
              className='text-2xl cursor-pointer'
              onClick={handleBackClick}
            />
          </Tooltip>
          <h1 className='flex-1 text-2xl font-semibold text-center'>
            Form Booking
          </h1>
        </div>
        <FormBooking />
        <MidtransSnapScript />
      </div>
    </section>
  );
}
