import HeroSection from './_components/HeroSection';
import FieldSection from './_components/FieldSection';
import Header from './_components/Header';
import MapsSection from './_components/MapsSection';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FieldSection />
        <MapsSection />
      </main>
      <Footer />
    </>
  );
}
