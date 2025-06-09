import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroPage() {
  return (
    <section className='min-h-screen bg-gray-100 pt-24 pb-10 md:pt-20 flex justify-center items-center'>
      <div className='grid grid-cols-1 md:grid-cols-4  gap-8'>
        <div className='bg-white w-xs flex flex-col justify-center items-center p-8 rounded-xl shadow-xl'>
          <Image src={"/ilustration/Soccer-bro.svg"} alt='Booking Image' width={300} height={300} />
          <Link href='/dashboard/player/booking'>
            <Button variant='bordered' color='primary' className='cursor-pointer'>
              Booking Lapangan
            </Button>
          </Link>
        </div>
        <div className='bg-white w-xs flex flex-col justify-center items-center p-8 rounded-xl shadow-xl'>
          <Image src={"/ilustration/Team-lineup-amico.svg"} alt='Booking Image' width={300} height={300} />
          <Button variant='bordered' color='primary' className='cursor-pointer'>
            Cek Jadwal
          </Button>
        </div>
        <div className='bg-white w-xs flex flex-col justify-center items-center p-8 rounded-xl shadow-xl'>
          <Image src={"/ilustration/E-Wallet-bro.svg"} alt='Booking Image' width={300} height={300} />
          <Button variant='bordered' color='primary' className='cursor-pointer'>
            Riwayat Transaksi
          </Button>
        </div>
        <div className='bg-white w-xs flex flex-col justify-center items-center p-8 rounded-xl shadow-xl'>
          <Image src={"/ilustration/Settings-rafiki.svg"} alt='Booking Image' width={300} height={300} />
          <Button variant='bordered' color='primary' className='cursor-pointer'>
            Pengaturan
          </Button>
        </div>
      </div>
    </section>
  );
}
