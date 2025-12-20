"use client";
import React from 'react';

export default function MobileAppSection() {
  return (
    <div className=" bg-[#F8F4EF] py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl text-center text-[#024B5E] mb-16  font-bakso">
          Connect Anywhere with the Wuffoos App
        </h1>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Mobile Phones Image */}
          <div className="shrink-0">
            <img
              src="/Frame.png"
              alt="Wuffoos Mobile App"
              className="w-[500px] h-auto"
            />
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col gap-6">
            {/* App Store Button Placeholder */}
            <a 
              href="#" 
              className="block w-[280px] h-[84px] bg-black rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <img src="/flag/Vector 1.png" alt="App Store" className="h-20" />
                </div>
              </div>
            </a>

            {/* Google Play Button Placeholder */}
            <a
              href="#"
              className="block w-[280px] h-[84px] bg-black rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-full flex items-center justify-center text-white">
                <img src="/flag/Vector.png" alt="Google Play" className="h-20" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}