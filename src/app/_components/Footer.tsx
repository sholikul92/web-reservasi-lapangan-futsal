import { LuInstagram } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id='kontak' className='p-4 text-white bg-gray-800 md:p-12'>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-3 md:mx-28'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-semibold'>Tentang Kami</h1>
          <p>
            <span className='font-semibold'>Rajawali Futsal Arena</span> adalah platform pemesanan lapangan futsal yang memudahkan kamu untuk booking
            kapan saja dan di mana saja. Cepat, praktis, dan tanpa ribet!
          </p>
          <div className='flex gap-4 text-2xl'>
            <Link href='https://www.instagram.com/s.ardian642' target='_blank'>
              <LuInstagram />
            </Link>
            <Link href='https://wa.me/6283807201787' target='_blank'>
              <FaWhatsapp />
            </Link>
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='text-2xl font-semibold'>Link Cepat</h1>
          <ul className='space-y-2'>
            <li>
              <Link href='#'>Beranda</Link>
            </li>
            <li>
              <Link href='#fields'>Lapangan</Link>
            </li>
            <li>
              <Link href='/dashboard/player/booking'>Booking</Link>
            </li>
          </ul>
        </div>
        <div className='space-y-4'>
          <h1 className='text-2xl font-semibold'>Kontak Kami</h1>
          <div className='flex items-center gap-2'>
            <SiGooglemaps className='text-2xl' />
            <p>Kp. Melayu Barat, Kec. Teluknaga, Kabupaten Tangerang, Banten 15510</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaPhone />
            <p>083807201787</p>
          </div>
        </div>
      </div>
      <div className='pt-4 mt-8 border-t md:mx-28 border-t-white/50'>
        <p className='text-center'>
          &copy;2025 <span className='font-semibold'>Rajawali Futsal Arena</span> - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
