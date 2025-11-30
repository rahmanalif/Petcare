"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookingHistory() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState("on-going");

  const bookingData = [
    {
      id: 1,
      sitterName: "Tamim",
      rating: 5,
      ratingCount: "1200",
      date: "02/09/2025",
      service: "Dog walking",
      price: "$99",
      priceType: "Per walk",
      contact: "(229) 555-0109",
      pickupTime: "10:00 AM",
      dropoffTime: "10:00 AM",
      status: "on-going",
    },
    {
      id: 2,
      sitterName: "Tamim",
      rating: 3,
      ratingCount: "1200",
      date: "02/09/2025",
      service: "Dog walking",
      price: "$99",
      priceType: "Per walk",
      contact: "(229) 555-0109",
      pickupTime: "10:00 AM",
      dropoffTime: "10:00 AM",
      status: "on-going",
    },
    {
      id: 3,
      sitterName: "Tamim",
      rating: 3,
      ratingCount: "1200",
      date: "02/09/2025",
      service: "Dog walking",
      price: "$99",
      priceType: "Per walk",
      contact: "(229) 555-0109",
      pickupTime: "10:00 AM",
      dropoffTime: "10:00 AM",
      status: "on-going",
    },
    {
      id: 4,
      sitterName: "Tamim",
      rating: 3,
      ratingCount: "1200",
      date: "02/09/2025",
      service: "Dog walking",
      price: "$99",
      priceType: "Per walk",
      contact: "(229) 555-0109",
      pickupTime: "10:00 AM",
      dropoffTime: "10:00 AM",
      status: "on-going",
    },
    {
      id: 5,
      sitterName: "Tamim",
      rating: 3,
      ratingCount: "811,200",
      date: "02/09/2025",
      service: "Dog walking",
      price: "$99",
      priceType: "Per walk",
      contact: "(229) 555-0109",
      pickupTime: "10:00 AM",
      dropoffTime: "10:00 AM",
      status: "completed",
    },
  ];

  const filteredBookings = bookingData.filter(
    (booking) => booking.status === activeStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "on-going":
        return "text-green-700";
      case "completed":
        return "text-gray-700";
      case "cancelled":
        return "text-red-700";
      case "upcoming":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  const statuses = ["On going", "Completed", "Cancelled", "Upcoming"];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-2 sm:p-4 pt-4 sm:pt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6 w-full max-w-6xl">
        {/* Header with Title and Status Tabs */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Order history</h2>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => {
              const statusKey = status.toLowerCase().replace(" ", "-");
              const isActive = activeStatus === statusKey;
              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(statusKey)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-[#035F75] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => router.push('/settingForSitter/ongoing')}
                className="relative border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow bg-white cursor-pointer overflow-hidden"
              >
                {/* MOBILE LAYOUT (< 768px) */}
                <div className="md:hidden flex flex-col gap-4">
                  {/* Top Row: Profile & Status */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-start">
                      <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gray-200">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt={booking.sitterName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {booking.sitterName}
                        </h3>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          New York, NY
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status === "on-going"
                          ? "On going"
                          : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <div className="text-xs font-medium text-[#035F75]">
                        {booking.date}
                      </div>
                    </div>
                  </div>

                  {/* Service Name */}
                  <div className="text-sm font-semibold text-gray-900">
                    {booking.service}
                  </div>

                  {/* Price & Times */}
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-bold text-gray-900">
                      {booking.price}
                      <span className="text-xs text-gray-500 font-normal ml-1">
                        {booking.priceType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 text-right">
                      <div>Pick-up: <span className="font-semibold">{booking.pickupTime}</span></div>
                      <div>Drop-off: <span className="font-semibold">{booking.dropoffTime}</span></div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 mb-1">Contact</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{booking.contact}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#FE6C5D] hover:bg-[#ee6758] text-white text-xs font-medium rounded-md transition-colors">
                      Reschedule
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#035F75] hover:bg-[#024d61] text-white text-xs font-medium rounded-md transition-colors">
                      Ask for complete
                    </button>
                  </div>
                </div>

                {/* TABLET/DESKTOP LAYOUT (≥ 768px) */}
                <div className="hidden md:flex justify-around items-center relative">
                  {/* LEFT COLUMN - Profile Info */}
                  <div className="flex flex-col gap-3 flex-1">
                    {/* Profile */}
                    <div className="flex gap-3 items-start">
                      <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gray-200">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt={booking.sitterName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">
                          {booking.sitterName}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          New York, NY
                        </p>
                      </div>
                    </div>

                    {/* Service Name */}
                    <div className="text-base font-semibold text-gray-900">
                      {booking.service}
                    </div>

                    {/* Contact Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>{booking.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>01/09/2025</span>
                      </div>
                    </div>

                    {/* Reschedule Button */}
                    <button className="px-6 py-2 bg-[#FE6C5D] hover:bg-[#ee6758] text-white text-sm font-medium rounded-md transition-colors w-fit">
                      Reschedule
                    </button>
                  </div>

                  {/* MIDDLE COLUMN - Huge Paw Logo */}
                  <div className="flex items-center justify-center px-4 lg:px-8">
                    <div className="relative w-32 h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 opacity-20">
                      <Image
                        src="/flag/Union.png"
                        alt="Paw print"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Booking Details */}
                  <div className="flex flex-col gap-4 items-end flex-1">
                    {/* Date */}
                    <div className="text-base font-medium text-[#035F75]">
                      {booking.date}
                    </div>

                    {/* Status */}
                    <span className={`text-base font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status === "on-going"
                        ? "On going"
                        : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>

                    {/* Price */}
                    <div className="text-xl font-bold text-gray-900 text-right">
                      {booking.price}
                      <span className="text-sm text-gray-500 font-normal ml-1">
                        {booking.priceType}
                      </span>
                    </div>

                    {/* Times */}
                    <div className="text-sm text-gray-700 text-right">
                      <div>
                        Pick-up time: <span className="font-semibold text-gray-900">{booking.pickupTime}</span>
                      </div>
                      <div className="mt-1">
                        Drop-off time: <span className="font-semibold text-gray-900">{booking.dropoffTime}</span>
                      </div>
                    </div>

                    {/* Ask for Complete Button */}
                    <button className="px-6 py-2 bg-[#035F75] hover:bg-[#024d61] text-white text-sm font-medium rounded-md transition-colors w-fit">
                      Ask for complete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found for this status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}