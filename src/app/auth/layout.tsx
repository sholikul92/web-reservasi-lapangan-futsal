import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className='min-h-screen bg-[url(/hero-image.jpg)] bg-cover bg-no-repeat bg-position-[center_left_-12rem] md:bg-bottom'>
      <div className='bg-black/5 w-full min-h-screen flex justify-center items-center p-2'>{children}</div>
    </section>
  );
}
