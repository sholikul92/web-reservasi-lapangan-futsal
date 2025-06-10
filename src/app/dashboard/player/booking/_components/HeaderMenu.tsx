"use client";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function HeaderMenu({ menuName }: { menuName: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/player");
  };

  return (
    <header className='p-4 bg-primary text-white fixed left-0 right-0 z-50'>
      <nav className='flex items-center md:px-18'>
        <MdArrowBack className='text-xl md:text-2xl cursor-pointer' onClick={handleClick} />
        <h1 className='text-center flex-1 text-xl font-semibold md:text-2xl'>{menuName}</h1>
      </nav>
    </header>
  );
}
