"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function HowItWorks() {
  const router = useRouter();
  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 rounded-lg bg-white shadow-lg bg-linear-to-br from-blue-50 via-cyan-50 to-teal-50 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <div className="w-full">
        {/* Testimonial Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Left Testimonial */}
          <div className="relative mb-6 md:mb-0">
            {/* Image Placeholder */}
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-linear-to-br from-amber-200 to-orange-300 overflow-hidden rounded-lg md:rounded-none">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop"
                alt="Happy dog"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quote Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                It's easy. I go to the calendar and mark myself as available when I want to be.
              </p>
            </div>
          </div>

          {/* Right Testimonial */}
          <div className="relative mb-6 md:mb-0">
            {/* Image Placeholder */}
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-linear-to-br from-blue-200 to-cyan-300 overflow-hidden rounded-lg md:rounded-none">
              <img
                src="https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=600&fit=crop"
                alt="Happy dog at beach"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quote Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                Thanks to the Wuffoos App, I know about my clients schedule immediately and I'm quick to respond!
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 font-bakso">
            HOW iT WORKS
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-left max-w-5xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            {/* Step 1 */}
            <div className="p-4 sm:p-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 font-montserrat">
                Create your profile
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-montserrat">
                Tell us a little about yourself and what pet services you want to offer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 sm:p-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 font-montserrat">
                Accept requests
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-montserrat">
                Tell us the types of pets you want to care for and the dates that work for you. You make your own schedule.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 sm:p-0 sm:col-span-2 md:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 font-montserrat">
                Get paid
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-montserrat">
                Payments are sent directly to your bank once you have completed a service.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/signup?role=pet_sitter')}
            className="bg-[#035F75] hover:bg-[#044c5e] text-white font-semibold px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 font-montserrat text-sm sm:text-base w-full sm:w-auto"
          >
            Get started
          </button>
        </div>
      </div>
        </div>

    </div>
  );
}