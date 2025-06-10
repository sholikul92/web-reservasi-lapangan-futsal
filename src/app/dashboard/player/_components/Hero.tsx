import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";

const menuLists = [
  {
    id: 1,
    name: "Booking Lapangan",
    imageUrl: "/ilustration/Soccer-bro.svg",
    link: "/dashboard/player/booking",
  },
  {
    id: 2,
    name: "Cek Jadwal",
    imageUrl: "/ilustration/Team-lineup-amico.svg",
    link: "/dashboard/player/schedule",
  },
  {
    id: 3,
    name: "Riwayat Transaksi",
    imageUrl: "/ilustration/E-Wallet-bro.svg",
    link: "/dashboard/player/history/transaction",
  },
  {
    id: 4,
    name: "Pengaturan",
    imageUrl: "/ilustration/Settings-rafiki.svg",
    link: "/dashboard/player/booking",
  },
];

export default function HeroPage() {
  return (
    <section className='min-h-screen bg-gray-100 pt-24 pb-10 md:pt-20 flex justify-center items-center'>
      <div className='grid grid-cols-1 md:grid-cols-4  gap-8'>
        {menuLists.map((menu) => (
          <div key={menu.id} className='bg-white w-xs flex flex-col justify-center items-center p-8 rounded-xl shadow-xl'>
            <Image src={menu.imageUrl} alt='Booking Image' width={300} height={300} />
            <Link href={menu.link}>
              <Button variant='bordered' color='primary' className='cursor-pointer'>
                {menu.name}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
