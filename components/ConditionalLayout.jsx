"use client";
import { usePathname } from 'next/navigation';
import Navbar from '../component/global/Navbar';
import Footer from '../component/global/Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/login') ||
                     pathname?.startsWith('/signup') ||
                     pathname?.startsWith('/forgotpassword') ||
                     pathname?.startsWith('/changepassword');

  if (isAuthPage) {
    // Render without Navbar and Footer for auth pages
    return <>{children}</>;
  }

  // Render with Navbar and Footer for all other pages
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
