"use client";
import React from "react";

export default function HowItWorks() {
  return (
    <div className=" py-16 px-4">
        <div className=" border border-gray-200 rounded-lg bg-white shadow-lg bg-linear-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 mx-50">
            <div className="max-w-7xl mx-auto">
        {/* Testimonial Images Section */}
        <div className="grid md:grid-cols-2  mb-16">
          {/* Left Testimonial */}
          <div className="relative">
            {/* Image Placeholder */}
            <div className="w-full h-[400px] bg-linear-to-br from-amber-200 to-orange-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop"
                alt="Happy dog"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quote Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-6  mx-38">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                It's easy. I go to the calendar and mark myself as available when I want to be.
              </p>
            </div>
          </div>

          {/* Right Testimonial */}
          <div className="relative">
            {/* Image Placeholder */}
            <div className="w-full h-[400px] bg-linear-to-br from-blue-200 to-cyan-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=600&fit=crop"
                alt="Happy dog at beach"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quote Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-6 mx-34">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Thanks to the Wuffoos App, I know about my clients schedule immediately and I'm quick to respond!
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 font-bakso">
            HOW iT WORKS
          </h2>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-left max-w-5xl mx-auto mb-12">
            {/* Step 1 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-montserrat">
                Create your profile
              </h3>
              <p className="text-gray-600 leading-relaxed font-montserrat">
                Tell us a little about yourself and what pet services you want to offer.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-montserrat">
                Accept requests
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us the types of pets you want to care for and the dates that work for you. You make your own schedule.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-montserrat">
                Get paid
              </h3>
              <p className="text-gray-600 leading-relaxed font-montserrat">
                Payments are sent directly to your bank once you have completed a service.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-[#035F75] hover:bg-[#044c5e] text-white font-semibold px-12 py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 font-montserrat">
            Get started
          </button>
        </div>
      </div>
        </div>
      
    </div>
  );
}