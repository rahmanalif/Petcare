"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Helper for Images
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/100";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default function OngoingDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get ID from URL



  const booking = bookingData?.data;

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPetDetails, setShowPetDetails] = useState(false);
  const [activeView, setActiveView] = useState("details"); 
  const [message, setMessage] = useState("");

  // Map Booking Data to Calendar
  const bookedDays = [];
  if (booking) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    // Simple logic to highlight start and end date for demo
    bookedDays.push(start.getDate());
    if (end.getDate() !== start.getDate()) {
        bookedDays.push(end.getDate());
    }
  }

  // Calendar Logic
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    // Next month
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
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

  // Loading State
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-[#024B5E]">Loading details...</div>;
  }

  // Error State
  if (!id || error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-red-500 mb-4">Booking not found or ID missing.</p>
        <button onClick={() => router.back()} className="text-[#024B5E] underline">Go Back</button>
      </div>
    );
  }

  // Extract Pet Info (First pet)
  const pet = booking.pets && booking.pets.length > 0 ? booking.pets[0] : null;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl border-2 border-gray-200 rounded-lg bg-white m-2 p-2 mx-auto">
        <div className="p-6 pb-0">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#024B5E] hover:underline mb-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        
        <div className="flex justify-between items-center px-6 pb-6 pt-2 mb-2">
            <h1 className="text-2xl font-semibold text-[#024B5E]">
            Details (#{booking._id.slice(-6)})
            </h1>
            <span className="px-3 py-1 bg-[#E7F4F6] text-[#024B5E] rounded-full text-sm font-medium capitalize">
                {booking.status}
            </span>
        </div>

        {activeView === "reschedule" ? (
          /* Reschedule View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Calendar Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#024B5E] mb-4">
                Select New Date
              </h2>

              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-[#024B5E] hover:text-white rounded-lg transition-colors">
                    {"<"}
                </button>
                <h3 className="text-lg font-semibold text-[#024B5E]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-[#024B5E] hover:text-white rounded-lg transition-colors">
                    {">"}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-[#024B5E] py-1">
                    {day}
                  </div>
                ))}

                {calendarDays.map((dayInfo, index) => (
                    <div
                      key={index}
                      className={`
                      aspect-square flex items-center justify-center text-sm rounded
                      ${!dayInfo.isCurrentMonth ? "text-gray-300" : "text-[#024B5E] hover:bg-gray-100 cursor-pointer"}
                    `}
                    >
                      {dayInfo.day}
                    </div>
                ))}
              </div>
            </div>

            {/* Reschedule Form Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#024B5E] mb-4">Request Reschedule</h2>

              <textarea
                className="w-full border-2 border-[#035F75] rounded-lg p-3 mb-6 h-24 focus:outline-none text-sm"
                placeholder="Reason for rescheduling..."
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#024B5E] mb-2">Start date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#024B5E] mb-2">End date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button onClick={() => setActiveView("details")} className="flex-1 border-2 border-[#FE6C5D] text-[#FE6C5D] font-medium py-3 px-6 rounded-lg">
                  Cancel
                </button>
                <button className="flex-1 bg-[#035F75] text-white font-medium py-3 px-6 rounded-lg">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        ) : activeView === "chat" ? (
          /* Chat View (Static for now) */
          <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-6 min-h-[600px] flex flex-col">
              <h2 className="text-xl font-semibold text-[#024B5E] text-center mb-6">Chat with {booking.owner?.fullName}</h2>
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Chat functionality coming soon...
              </div>
              <div className="mt-4">
                <button onClick={() => setActiveView("details")} className="text-[#035F75] hover:underline text-sm">
                  ← Back to details
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Default Details View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            
            {/* Left: Calendar & Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#024B5E] mb-4">
                Booking Date
              </h2>
              
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF4747] rounded"></div>
                  <span className="text-sm text-[#024B5E]">Booked Dates</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-[#024B5E]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-[#024B5E] py-1">
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
                        ${!dayInfo.isCurrentMonth ? "text-gray-300" : "text-[#024B5E]"}
                        ${isBooked ? "bg-[#FF4747] text-white font-semibold" : ""}
                      `}
                    >
                      {dayInfo.day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Booking Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              
              {/* Client Info (Mapped from API) */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={getImageUrl(booking.owner?.profilePicture)}
                      alt={booking.owner?.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#024B5E]">{booking.owner?.fullName}</h3>
                    <div className="flex items-center gap-1 text-sm text-[#024B5E]">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                       <span>{booking.owner?.address || "No address"}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-[#024B5E] capitalize">{booking.serviceType}</p>
                    <span className="text-xs text-gray-500">{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-4 space-y-2">
                <h4 className="font-semibold text-[#024B5E]">Contact</h4>
                <div className="flex items-center gap-2 text-sm text-[#024B5E]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>{booking.owner?.phoneNumber || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#024B5E]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>{booking.owner?.email || "N/A"}</span>
                </div>
              </div>

              {/* Time Info */}
              <div className="mb-4 space-y-1 text-sm bg-[#F9FAFB] p-3 rounded">
                <p className="text-[#024B5E] flex justify-between">
                  <span>Pick-up time:</span> <span className="font-bold">{booking.startTime}</span>
                </p>
                <p className="text-[#024B5E] flex justify-between">
                  <span>Drop-off time:</span> <span className="font-bold">{booking.endTime}</span>
                </p>
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-semibold text-[#024B5E] mb-3">Pricing Breakdown</h4>
                <div className="space-y-2 text-sm">
                    {booking.priceBreakdown && Object.entries(booking.priceBreakdown).map(([key, value]) => (
                         key !== 'platformFee' && (
                            <div key={key} className="flex justify-between">
                                <span className="text-[#024B5E] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="font-medium text-[#024B5E]">${value}</span>
                            </div>
                         )
                    ))}
                  <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span className="font-bold text-[#024B5E]">Total Earning</span>
                    <span className="font-bold text-[#024B5E]">${booking.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Pet Info Card */}
              {pet && (
                <div className="mb-4">
                    <div
                    onClick={() => setShowPetDetails(!showPetDetails)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                        <img
                            src={getImageUrl(pet.image)}
                            alt={pet.name}
                            className="w-full h-full object-cover"
                        />
                        </div>
                        <div>
                        <h4 className="font-semibold text-[#024B5E]">{pet.name}</h4>
                        <p className="text-sm text-[#024B5E]">{pet.breed}</p>
                        </div>
                    </div>
                    <svg className={`w-5 h-5 text-[#024B5E] transition-transform ${showPetDetails ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </div>

                    {/* Pet Details Dropdown */}
                    {showPetDetails && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden p-4">
                        <h3 className="text-lg font-semibold text-[#024B5E] mb-2">Pet Details</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Age:</span> {pet.ageYears} Yrs {pet.ageMonths} Mon</p>
                            <p><span className="font-medium">Weight:</span> {pet.weight} {pet.weightUnit}</p>
                            <p><span className="font-medium">Gender:</span> {pet.gender}</p>
                            <p><span className="font-medium">Vaccinated:</span> {pet.vaccinated ? "Yes" : "No"}</p>
                            {pet.vetInfo && (
                                <div className="mt-3 pt-3 border-t">
                                    <p className="font-semibold mb-1">Vet Info:</p>
                                    <p>{pet.vetInfo.name} - {pet.vetInfo.clinic}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveView("reschedule")}
                  className="flex-1 bg-[#FE6C5D] hover:bg-[#ee6758] text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Reschedule
                </button>
                <button
                  onClick={() => setActiveView("chat")}
                  className="flex-1 bg-[#035F75] hover:bg-[#035569] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}