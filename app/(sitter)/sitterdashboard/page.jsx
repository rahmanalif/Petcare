"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardOverview() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const bookedDays = [12, 14];

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const bookings = [
    {
      id: 1,
      name: "Tamim",
      location: "New York, NY",
      service: "Dog walking",
      date: "Mon, Oct 02, 2025 at 10:00AM",
      duration: "For 2 hours",
      price: "$40",
      hourlyRate: "$20/hr",
      pet: {
        name: "Max",
        breed: "Labrador"
      },
      time: "10:20 PM"
    },
    {
      id: 2,
      name: "Tamim",
      location: "New York, NY",
      service: "Dog walking",
      date: "Mon, Oct 02, 2025 at 10:00AM",
      duration: "For 2 hours",
      price: "$40",
      hourlyRate: "$20/hr",
      pet: {
        name: "Max",
        breed: "Labrador"
      },
      time: "10:20 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-  md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {/* Total Bookings */}
          <div className="bg-linear-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide font-bakso">
              Total Bookings
            </h3>
            <p className="text-4xl font-bold text-teal-600 font-bakso">800</p>
          </div>

          {/* On Going Services */}
          <div className="bg-linear-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide font-bakso">
              On Going Services
            </h3>
            <p className="text-4xl font-bold text-blue-600 font-bakso">06</p>
          </div>

          {/* Completed Services */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 ">
            <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide font-bakso">
              Completed Services
            </h3>
            <p className="text-4xl font-bold text-teal-500 font-bakso">400</p>
          </div>

          {/* Upcoming Services */}
          <div className="bg-white border border-red-200 rounded-xl p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide font-bakso">
              Upcoming Services
            </h3>
            <p className="text-4xl font-bold text-red-400 font-bakso">14</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pet sitter Availability
            </h2>

            {/* Legend */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FF4747] rounded"></div>
                <span className="text-sm text-gray-700">Book</span>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-base font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((dayInfo, index) => {
                const isBooked = dayInfo.isCurrentMonth && bookedDays.includes(dayInfo.day);

                return (
                  <div
                    key={index}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded
                      ${!dayInfo.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                      ${isBooked ? "bg-[#FF4747] text-white font-semibold" : ""}
                      ${dayInfo.isCurrentMonth && !isBooked ? "hover:bg-gray-100 cursor-pointer" : ""}
                    `}
                  >
                    {dayInfo.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Bookings
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => router.push("/settingForSitter/ongoing")}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-semibold">
                        T
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{booking.time}</span>
                  </div>

                  {/* Service Details */}
                  <div className="mb-3">
                    <p className="font-medium text-gray-900 mb-1">{booking.service}</p>
                    <p className="text-xs text-gray-500 mb-2">{booking.date}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{booking.duration}</span>
                      <span className="text-gray-900 font-medium">{booking.price}</span>
                    </div>
                  </div>

                  {/* Pet Info */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
                          alt={booking.pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{booking.pet.name}</p>
                        <p className="text-xs text-gray-500">{booking.pet.breed}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#FE6C5D] hover:bg-[#f16859] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      Cancel
                    </button>
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}