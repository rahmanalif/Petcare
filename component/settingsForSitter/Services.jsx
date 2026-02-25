"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Services() {
  const [selectedService, setSelectedService] = useState(1);

  const services = [
    {
      id: 1,
      name: "Boarding",
      location: "In the sitter's home",
      price: "$99",
      priceUnit: "Per day",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#035F75]"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 3V21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Doggy Day Care",
      location: "In the sitter's home",
      price: "$99",
      priceUnit: "Per visit",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#035F75]"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Dog Walking",
      location: "In your neighbourhood",
      price: "$99",
      priceUnit: "Per walk",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#035F75]"
        >
          <path
            d="M14 16C14 17.77 13.23 19 12 19C10.77 19 10 17.77 10 16C10 14.23 10.77 13 12 13C13.23 13 14 14.23 14 16Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 9C7 10.1 6.55 11 6 11C5.45 11 5 10.1 5 9C5 7.9 5.45 7 6 7C6.55 7 7 7.9 7 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M19 9C19 10.1 18.55 11 18 11C17.45 11 17 10.1 17 9C17 7.9 17.45 7 18 7C18.55 7 19 7.9 19 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 13V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8 max-w-3xl">
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
        <h2 className="text-lg md:text-2xl font-medium text-gray-800">Services</h2>
      </div>

      <div className="space-y-3 md:space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`flex items-center justify-between p-3 md:p-5 rounded-lg border-2 transition-all cursor-pointer ${
              selectedService === service.id
                ? "border-[#035F75] bg-[#E7F4F6]"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <div className={`flex-shrink-0 ${selectedService === service.id ? "text-[#035F75]" : "text-gray-500"}`}>
                {service.icon}
              </div>
              <div>
                <h3 className="text-sm md:text-base font-medium text-gray-900">{service.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-0.5">{service.location}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-sm md:text-base font-semibold text-gray-900">{service.price}</div>
              <div className="text-xs md:text-sm text-gray-600 mt-0.5">{service.priceUnit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
