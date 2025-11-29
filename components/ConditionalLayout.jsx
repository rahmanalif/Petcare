"use client";
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import Navbar from '../component/global/Navbar';
import SitterNavbar from '../component/global/SitterNavbar';
import Footer from '../component/global/Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const { role } = useSelector((state) => state.auth);

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/login') ||
                     pathname?.startsWith('/signup') ||
                     pathname?.startsWith('/forgotpassword') ||
                     pathname?.startsWith('/changepassword');

  if (isAuthPage) {
    // Render without Navbar and Footer for auth pages
    return <>{children}</>;
  }

  // Determine which navbar to show based on user role
  const NavbarComponent = role === 'pet_sitter' ? SitterNavbar : Navbar;

  // Render with appropriate Navbar and Footer for all other pages
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      <NavbarComponent />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
