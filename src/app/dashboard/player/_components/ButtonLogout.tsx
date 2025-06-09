'use client';
import { signOut } from 'next-auth/react';

export default function ButtonLogout() {
  const handleClick = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  return <p onClick={handleClick}>Keluar</p>;
}
