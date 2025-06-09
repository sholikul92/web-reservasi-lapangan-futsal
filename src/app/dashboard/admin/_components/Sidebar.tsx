"use client";
import { BiSolidHome } from "react-icons/bi";
import { FaCalendarAlt, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { Tooltip } from "@heroui/react";

export default function Sidebar() {
  return (
    <aside className='bg-green-700 text-white md:w-16 min-h-screen p-2 flex fixed flex-col justify-between items-center'>
      <div className='md:text-3xl space-y-10 flex-1 mt-2 cursor-pointer'>
        <Tooltip content='Dashboard' placement='left'>
          <BiSolidHome />
        </Tooltip>
        <Tooltip content='Lapangan' placement='left'>
          <TbSoccerField />
        </Tooltip>
        <Tooltip content='Jadwal' placement='left'>
          <FaCalendarAlt />
        </Tooltip>
        <Tooltip content='History' placement='left'>
          <FaHistory />
        </Tooltip>
        <Tooltip content='Pengaturan' placement='left'>
          <MdSettings />
        </Tooltip>
      </div>
      <div className='md:text-3xl'>
        <Tooltip content='Keluar' placement='left'>
          <FaSignOutAlt />
        </Tooltip>
      </div>
    </aside>
  );
}
