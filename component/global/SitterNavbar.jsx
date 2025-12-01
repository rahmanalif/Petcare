"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SitterNavbar() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/sitterdashboard" className="relative w-24 h-10 md:w-32 md:h-12 cursor-pointer">
          <Image
            src="/Logo.png"
            alt="Wuffoos Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Right Side - Navigation Links + User Section */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/sitterdashboard"
              className="text-gray-700 hover:text-teal-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/createOrder"
              className="text-gray-700 hover:text-teal-600 transition font-medium"
            >
              Create service
            </Link>
            <Link
              href="/bookingHistory"
              className="text-gray-700 hover:text-teal-600 transition font-medium"
            >
              Bookings
            </Link>
          </div>

          {/* User Section */}
          {isAuthenticated ? (
            <div
              onClick={() => router.push('/settingForSitter')}
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-linear-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow"
            >
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || 'User'}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-base md:text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg">
                Sign Up
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link
              href="/sitterdashboard"
              className="text-gray-700 hover:text-teal-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/createOrder"
              className="text-gray-700 hover:text-teal-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create service
            </Link>
            <Link
              href="/bookingHistory"
              className="text-gray-700 hover:text-teal-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bookings
            </Link>
            {!isAuthenticated && (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-red-400 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
