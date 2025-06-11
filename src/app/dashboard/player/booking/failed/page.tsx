import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";

export default function BookingFailedPage() {
  return (
    <section className='min-h-[100dvh] w-full flex justify-center items-center bg-white/50'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Image src='/ilustration/failed-payment.svg' alt='failed payment' width={300} height={300} priority />
        <p className='font-semibold text-xl'>Transaksi Gagal!</p>
        <p>lakukan transaksi ulang</p>
        <Link href='/dashboard/player/history/transaction' aria-label='link back to dashboard'>
          <Button color='primary'>Ke halaman transaksi</Button>
        </Link>
      </div>
    </section>
  );
}
