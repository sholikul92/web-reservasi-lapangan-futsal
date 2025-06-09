import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import HeaderDashboard from './_components/HeaderDashboard';
import HeroPage from './_components/Hero';

export default async function DashboardPlayerPage() {
  const session = await getServerSession(authOption);

  if (!session) return redirect('/auth/login');
  return (
    <>
      <HeaderDashboard />
      <HeroPage />
    </>
  );
}
