import Image from "next/image";
import { Button } from "@heroui/button";

const fields = [
  {
    id: 1,
    name: "Lapangan A",
    price: "150.000",
    imageUrl: "/lapangan-1.jpg",
  },
  {
    id: 2,
    name: "Lapangan B",
    price: "150.000",
    imageUrl: "/lapangan-2.jpg",
  },
  {
    id: 3,
    name: "Lapangan C",
    price: "100.000",
    imageUrl: "/lapangan-3.jpg",
  },
];

export default function FieldSection() {
  return (
    <section id='fields' className='p-4 my-8 scroll-mt-20'>
      <h1 className='mb-8 text-2xl font-semibold text-center md:text-4xl'>Daftar Lapangan</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:mx-60'>
        {fields.map((field) => (
          <div key={field.id} className='overflow-hidden bg-white shadow-lg rounded-xl'>
            <Image src={field.imageUrl} alt='lapangan-A' width={200} height={150} className='w-full' priority />
            <div className='flex flex-col gap-2 p-4 md:flex-row md:items-end'>
              <div className='flex-1 text-black/70'>
                <p className='text-xl font-semibold'>{field.name}</p>
                <p>Rp. {field.price} / Jam</p>
              </div>
              <Button color='primary'>Booking Sekarang</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
