"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Image from "next/image";

export default function WuffoosFooter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribe email:', email);
    // Handle subscription logic here
  };

  return (
    <footer className="bg-[#E7F4F6] py-8 px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Section - Brand and Description */}
          <div className="space-y-4">
            <div className="mb-6">
              {/* Logo Placeholder */}
              <div className="relative w-32 h-12">
                      <Image
                        src="/Logo.png"
                        alt="Wuffoos Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
            </div>
            <p className="text-gray-600 leading-relaxed font-montserrat font-medium">
              Book your next service in seconds with AI assistance. Instantly reserve your favorite services with no hassle, just results.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-xl text-gray-800 mb-6 font-montserrat font-medium">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  Contract Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-montserrat font-medium">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Stay Updated */}
          <div>
            <h3 className="text-xl text-gray-800 mb-6 font-montserrat font-medium">Stay Updated</h3>
            <p className="text-gray-600 mb-6 leading-relaxed font-montserrat font-medium">
              Stay updated with the latest services & AI booking features.
            </p>
            
            {/* Email Input */}
            <div className="space-y-3 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-gray-800 border-none text-white placeholder:text-gray-400 rounded-md"
              />
              <Button
                onClick={handleSubscribe}
                className="w-full h-12 bg-[#689FAC] hover:bg-teal-600 text-white font-semibold rounded-md"
              >
                Subcribe
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#689FAC] hover:bg-teal-500 flex items-center justify-center text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#689FAC] hover:bg-teal-500 flex items-center justify-center text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#689FAC] hover:bg-teal-500 flex items-center justify-center text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#689FAC] hover:bg-teal-500 flex items-center justify-center text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}