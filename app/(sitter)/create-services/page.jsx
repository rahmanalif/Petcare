"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DogWalkingForm from "@/component/createServices/DogWalkingForm";
import DoggyDayCareForm from "@/component/createServices/DoggyDayCareForm";
import BoardingForm from "@/component/createServices/BoardingForm";

export default function ServiceSetupForm() {
  const [serviceType, setServiceType] = useState("Dog Walking");

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-2xl">
        {/* Service Name Section */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-[#024B5E] mb-3">
            Service name
          </label>
          <div className="relative">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-[#024B5E] focus:outline-none focus:ring-2 focus:ring-[#035F75] focus:border-transparent"
            >
              <option>Dog Walking</option>
              <option>Boarding</option>
              <option>Doggy Day Care</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#024B5E] pointer-events-none" />
          </div>

          <div className="mt-4 flex gap-2 p-3 bg-[#E3E6F0] border border-grey-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2973_14392)">
                <path
                  d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                  fill="#024B5E"
                />
                <path
                  d="M15.3156 4H8.68444L4 8.68444V15.3156L8.68444 20H15.3156L20 15.3156V8.68444L15.3156 4ZM18.2222 14.5778L14.5778 18.2222H9.42222L5.77778 14.5778V9.42222L9.42222 5.77778H14.5778L18.2222 9.42222V14.5778Z"
                  fill="#024B5E"
                />
                <path
                  d="M11.1094 7.55566H12.8872V13.7779H11.1094V7.55566Z"
                  fill="#024B5E"
                />
              </g>
              <defs>
                <clipPath id="clip0_2973_14392">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-sm text-[#024B5E]">
              We have suggested some default settings based on what works well
              for new sitters and walkers. You can edit now, or at any time in
              the future.
            </p>
          </div>
        </div>

        {/* Render appropriate form based on service type */}
        {serviceType === "Dog Walking" && <DogWalkingForm />}
        {serviceType === "Doggy Day Care" && <DoggyDayCareForm />}
        {serviceType === "Boarding" && <BoardingForm />}

        {/* Create Service Button */}
        <button className="w-full px-6 py-4 bg-[#035F75] text-white rounded-lg font-semibold text-lg hover:bg-[#024a5c] transition-colors">
          Create Service
        </button>
      </div>
    </div>
  );
}
