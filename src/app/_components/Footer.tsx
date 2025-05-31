import { LuInstagram } from "react-icons/lu";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id='kontak' className='p-4 text-white bg-gray-800 md:p-12'>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-3 md:mx-28'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-semibold'>Tentang Kami</h1>
          <p>
            <span className='font-semibold'>Unipi Futsal</span> adalah platform pemesanan lapangan futsal yang memudahkan kamu untuk booking kapan
            saja dan di mana saja. Cepat, praktis, dan tanpa ribet!
          </p>
          <div className='flex gap-4 text-2xl'>
            <a href='#'>
              <LuInstagram />
            </a>
            <a href='#'>
              <FaLinkedin />
            </a>
            <a href='#'>
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='text-2xl font-semibold'>Link Cepat</h1>
          <ul className='space-y-2'>
            <li>
              <a href='#'>Beranda</a>
            </li>
            <li>
              <a href='#fields'>Lapangan</a>
            </li>
            <li>
              <a href='#form-cek-jadwal'>Cek Jadwal</a>
            </li>
            <li>
              <a href='#'>Booking</a>
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
        <p className='text-center'>&copy;2025 UnipiFutsal - All Rights Reserved</p>
      </div>
    </footer>
  );
}
