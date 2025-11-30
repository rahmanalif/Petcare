"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function SitterNavbar() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/sitterdashboard" className="relative w-32 h-12 cursor-pointer">
          <Image
            src="/Logo.png"
            alt="Wuffoos Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Right Side - Navigation Links + User Section */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
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
              className="relative w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow"
            >
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || 'User'}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
