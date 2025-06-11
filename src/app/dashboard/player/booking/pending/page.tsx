import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";

export default function BookingPendingPage() {
  return (
    <section className='min-h-[100dvh] w-full flex justify-center items-center bg-white/50'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Image src='/ilustration/waiting.svg' alt='pending payment' width={300} height={300} priority />
        <p className='font-semibold text-xl'>Menunggu Pembayaran</p>
        <p>Silahkan lakukan pembayaran</p>
        <Link href='/dashboard/player/history/transaction' aria-label='link back to dashboard'>
          <Button color='success'>Halaman Transaksi</Button>
        </Link>
      </div>
    </section>
  );
}
