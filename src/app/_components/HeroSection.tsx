import { Button } from '@heroui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      id='hero'
      className='min-h-[100dvh] bg-[url(/hero-image.jpg)] bg-cover md:bg-bottom bg-position-[center_left_-12rem] bg-no-repeat'
    >
      <div className='flex flex-col items-center justify-center w-full min-h-[100dvh] gap-4 text-center bg-black/50'>
        <h1 className='text-4xl font-semibold text-white md:text-7xl'>
          Cari Lapangan Futsal? Gampang!
        </h1>
        <p className='text-white md:text-2xl'>
          Tinggal klik, pilih jadwal, dan langsung main. Yuk, cobain sekarang!
        </p>
        <Link href='/dashboard/player/booking'>
          <Button color='primary' size='md' className='cursor-pointer'>
            Booking Sekarang
          </Button>
        </Link>
      </div>
    </section>
  );
}
