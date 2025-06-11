"use client";
import { BiSolidHome } from "react-icons/bi";
import { FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const handleClickLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };
  return (
    <aside className='bg-green-700 text-white md:w-16 min-h-screen p-2 flex fixed flex-col justify-between items-center z-50'>
      <div className='md:text-3xl flex flex-col gap-8 flex-1 mt-2 cursor-pointer'>
        <Tooltip content='Dashboard' placement='left'>
          <Link href='/dashboard/admin'>
            <BiSolidHome />
          </Link>
        </Tooltip>
        <Tooltip content='Lapangan' placement='left'>
          <Link href='/dashboard/admin/lapangan'>
            <TbSoccerField />
          </Link>
        </Tooltip>
        <Tooltip content='Jadwal' placement='left'>
          <Link href='/dashboard/admin/jadwal'>
            <FaCalendarAlt />
          </Link>
        </Tooltip>
        <Tooltip content='Pengaturan' placement='left'>
          <MdSettings />
        </Tooltip>
      </div>
      <div className='md:text-3xl'>
        <Tooltip content='Keluar' placement='left'>
          <FaSignOutAlt onClick={handleClickLogout} />
        </Tooltip>
      </div>
    </aside>
  );
}
