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
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-200 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const statuses = ["On going", "Completed", "Cancelled", "Upcoming"];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-6xl">
        {/* Header with Title and Status Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order history</h2>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const statusKey = status.toLowerCase().replace(" ", "-");
            const isActive = activeStatus === statusKey;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(statusKey)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => router.push('/settingForSitter/ongoing')}
              className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white cursor-pointer overflow-hidden"
            >
              {/* Background Paw Print - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-48 h-48 opacity-10">
                  <Image
                    src="/flag/Union.png"
                    alt="Paw print"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Top Row: Profile, Service, Date & Status */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left: Profile */}
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

                  {/* Right: Date & Status */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium text-[#035F75]">
                      {booking.date}
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-md text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status === "on-going"
                        ? "On going"
                        : booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Service Name */}
                <div className="text-base font-semibold text-gray-900 mb-4">
                  {booking.service}
                </div>

                {/* Contact Section */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{booking.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{booking.date}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price, Times & Buttons */}
                <div className="flex items-center justify-between">
                  {/* Left: Price & Times */}
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {booking.price}
                      <span className="text-sm text-gray-500 font-normal ml-1">
                        {booking.priceType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Pick-up time: <span className="font-semibold text-gray-900">{booking.pickupTime}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Drop-off time: <span className="font-semibold text-gray-900">{booking.dropoffTime}</span>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-[#FE6C5D] hover:bg-[#ee6758] text-white text-sm font-medium rounded-md transition-colors">
                      Reschedule
                    </button>
                    <button className="px-6 py-2 bg-[#035F75] hover:bg-[#024d61] text-white text-sm font-medium rounded-md transition-colors">
                      Ask for complete
                    </button>
                  </div>
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