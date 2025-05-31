import { Button } from "@heroui/button";
import FormCekJadwal from "./_components/FormCekJadwal";
import FieldSection from "./_components/FieldSection";
import Header from "./_components/Header";
import MapsSection from "./_components/MapsSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id='hero' className='min-h-screen bg-[url(/hero-image.jpg)] bg-cover md:bg-bottom bg-position-[center_left_-12rem] bg-no-repeat'>
          <div className='flex flex-col items-center justify-center w-full min-h-screen gap-4 text-center bg-black/50'>
            <h1 className='text-4xl font-semibold text-white md:text-7xl'>Cari Lapangan Futsal? Gampang!</h1>
            <p className='text-white md:text-2xl'>Tinggal klik, pilih jadwal, dan langsung main. Yuk, cobain sekarang!</p>
            <div className='flex gap-4'>
              <Button color='primary' size='md'>
                Booking Sekarang
              </Button>
              <a href='#form-cek-jadwal'>
                <Button variant='bordered' className='text-white' size='md'>
                  Cek Lapangan
                </Button>
              </a>
            </div>
          </div>
        </section>
        <section className='flex justify-center md:p-4'>
          <FormCekJadwal />
        </section>
        <FieldSection />
        <MapsSection />
      </main>
      <Footer />
    </>
  );
}
