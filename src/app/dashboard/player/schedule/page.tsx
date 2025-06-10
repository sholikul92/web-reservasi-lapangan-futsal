import HeaderMenu from "../booking/_components/HeaderMenu";
import FormSchedule from "./_components/FormSchedule";

export default function SchedulePage() {
  return (
    <>
      <HeaderMenu menuName='Cek Jadwal Lapangan' />
      <section className='min-h-[100dvh] bg-[url(/hero-image.jpg)] bg-cover md:bg-bottom bg-position-[center_left_-12rem] bg-no-repeat flex justify-center items-center p-2'>
        <div className='bg-white p-4 rounded-xl shadow w-xs space-y-4'>
          <FormSchedule />
        </div>
      </section>
    </>
  );
}
