import { CgProfile } from "react-icons/cg";

export default function HeaderDashboard() {
  return (
    <header className='bg-primary fixed left-0 right-0 p-4'>
      <nav className='text-white flex justify-between md:justify-around items-center'>
        <h1 className='text-xl'>
          Welcome, <span className='font-semibold'>Udin</span>
        </h1>
        <CgProfile className='text-3xl' />
      </nav>
    </header>
  );
}
