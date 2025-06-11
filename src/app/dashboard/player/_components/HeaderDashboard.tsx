"use client";
import { CgProfile } from "react-icons/cg";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import ButtonLogout from "./ButtonLogout";
import { useSessionContext } from "@/app/context/session-context";

export default function HeaderDashboard() {
  const { session } = useSessionContext();
  const firstName = session?.user.name?.split(" ")[0];

  return (
    <header className='bg-primary fixed left-0 right-0 p-4'>
      <nav className='text-white flex justify-between md:justify-around items-center'>
        <h1 className='text-xl'>
          Welcome, <span className='font-semibold'>{firstName && firstName}</span>
        </h1>
        <Dropdown>
          <DropdownTrigger>
            <CgProfile className='text-3xl cursor-pointer' />
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem key='setting'>Pengaturan</DropdownItem>
            <DropdownItem key='delete' className='text-primary' color='primary' textValue='keluar'>
              <ButtonLogout />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </header>
  );
}
