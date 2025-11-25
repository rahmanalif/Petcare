"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
      <div className="relative w-32 h-12">
        <Image
          src="/Logo.png"
          alt="Wuffoos Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-700 hover:text-teal-600 transition">Home</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 transition">Home</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 transition">Home</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 transition">FAQ's</a>
      </div>
      <button className="bg-coral-500 bg-red-400 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg">
        Sign Up
      </button>
    </nav>
    </header>
  );
}
