"use client";
import { useState, useEffect } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id='header'
      className={`p-4 fixed left-0 right-0 z-50 transition-colors duration-75 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <nav className='flex flex-col gap-2 text-black md:flex-row md:justify-around'>
        <div className='flex items-center justify-between md:justify-start'>
          <h1 className={`text-xl font-semibold ${!scrolled && "text-white"}`}>
            <span className='text-primary'>Unipi</span>Futsal
          </h1>
          <HiOutlineMenuAlt1 className='text-2xl text-primary md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <ul
          className={`${isMenuOpen ? "flex" : "hidden"} ${
            !scrolled && "text-white"
          } flex-col md:flex md:flex-row items-start md:items-center md:justify-between md:w-1/2 gap-4 md:gap-6`}
        >
          <li className='w-full'>
            <Link href='#' className='block' aria-label='link beranda'>
              Beranda
            </Link>
          </li>
          <li className='w-full'>
            <Link href='#fields' className='block' aria-label='link lapangan'>
              Lapangan
            </Link>
          </li>
          <li className='w-full'>
            <Link href='#kontak' className='block' aria-label='link kontak'>
              Kontak
            </Link>
          </li>
          <li className='w-full bg-primary text-white text-center p-2 rounded-xl'>
            <Link href='/auth/login' className='block' aria-label='masuk'>
              Masuk
            </Link>
          </li>
          <li className='w-full border p-2 text-center border-primary rounded-xl'>
            <Link href='/auth/register' className='block' aria-label='daftar'>
              Daftar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
