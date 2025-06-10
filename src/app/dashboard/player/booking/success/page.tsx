import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";

export default function BookingSuccessPage() {
  return (
    <section className='min-h-[100dvh] w-full flex justify-center items-center bg-white/50'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Image src='/ilustration/success-payment.svg' alt='success payment' width={300} height={300} priority />
        <p className='font-semibold text-xl'>Transaksi Berhasil</p>
        <p>Lapangan berhasil di Booking</p>
        <Link href='/dashboard/player/history/transaction' aria-label='link back to dashboard'>
          <Button color='success'>Cek Transaksi</Button>
        </Link>
      </div>
    </section>
  );
}
