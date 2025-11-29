"use client";
import React, { useState } from "react";

export default function OngoingDetails() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedDates, setSelectedDates] = useState([
    { day: 13, month: 10, year: 2025 },
  ]);
  const [showPetDetails, setShowPetDetails] = useState(false);
  const [activeView, setActiveView] = useState("details"); // "details", "reschedule", "chat"
  const [message, setMessage] = useState("");

  // Booked dates (red) and Available dates (green)
  const bookedDays = [12, 14];
  const availableDays = [13];

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  const handleDateClick = (dayInfo) => {
    if (!dayInfo.isCurrentMonth) return;

    const isBooked = bookedDays.includes(dayInfo.day);
    if (isBooked) return;

    setSelectedDates([dayInfo]);
  };

  const isDateSelected = (dayInfo) => {
    return selectedDates.some(
      (date) =>
        date.day === dayInfo.day &&
        date.month === dayInfo.month &&
        date.year === dayInfo.year
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl border-2 border-gray-200 rounded-lg bg-white m-2 p-2 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 p-6 mb-2">
          On going details
        </h1>

        {activeView === "reschedule" ? (
          /* Reschedule View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Calendar Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pet sitter Availability
            </h2>

            {/* Legend */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FF4747] rounded"></div>
                <span className="text-sm text-gray-700">Book</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#008364] rounded"></div>
                <span className="text-sm text-gray-700">Available</span>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-600 py-1"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((dayInfo, index) => {
                const isBooked =
                  dayInfo.isCurrentMonth && bookedDays.includes(dayInfo.day);
                const isSelected = isDateSelected(dayInfo);
                const today = new Date();
                const isToday =
                  dayInfo.day === today.getDate() &&
                  dayInfo.month === today.getMonth() &&
                  dayInfo.year === today.getFullYear();

                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(dayInfo)}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded
                      ${
                        !dayInfo.isCurrentMonth
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                      ${isBooked ? "bg-[#FF4747] text-white font-semibold" : ""}
                      ${
                        isSelected && !isBooked
                          ? "bg-[#008364] text-white font-semibold"
                          : ""
                      }
                      ${
                        isToday && !isBooked && !isSelected
                          ? "border-2 border-[#008364]"
                          : ""
                      }
                      ${
                        dayInfo.isCurrentMonth && !isBooked
                          ? "hover:bg-gray-100 cursor-pointer"
                          : ""
                      }
                      ${!dayInfo.isCurrentMonth ? "cursor-default" : ""}
                    `}
                  >
                    {dayInfo.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reschedule Form Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Note</h2>

            {/* Note Textarea */}
            <textarea
              className="w-full border-2 border-[#035F75] rounded-lg p-3 mb-6 h-24 focus:outline-none focus:border-[#035F75] text-sm"
              placeholder="Please ensure all windows are securely locked after cleaning. Kindly use eco-friendly cleaning products as we prefer them."
              defaultValue="Please ensure all windows are securely locked after cleaning. Kindly use eco-friendly cleaning products as we prefer them."
            />

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start date</label>
                <input
                  type="text"
                  defaultValue="01/09/2025"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#035F75]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">End date</label>
                <input
                  type="text"
                  defaultValue="01/09/2025"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#035F75]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start time</label>
                <input
                  type="text"
                  defaultValue="11:00pm"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#035F75]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">End time</label>
                <input
                  type="text"
                  defaultValue="11:00pm"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#035F75]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button className="flex-1 border-2 border-[#FE6C5D] text-[#FE6C5D] font-medium py-3 px-6 rounded-lg hover:bg-[#FE6C5D] hover:text-white transition-colors">
                Cancel
              </button>
              <button className="flex-1 bg-[#035F75] hover:bg-[#035569] text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Send
              </button>
            </div>

            {/* Reschedule Notice */}
            <p className="text-center text-xs text-[#FE6C5D]">You can reschedule the time only once.</p>

            {/* Back Button */}
            <div className="mt-4">
              <button
                onClick={() => setActiveView("details")}
                className="text-[#035F75] hover:underline text-sm">
                ← Back to details
              </button>
            </div>
          </div>
          </div>
        ) : activeView === "chat" ? (
          /* Chat View */
          <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-6 min-h-[600px] flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Chat</h2>

              {/* Chat Messages */}
              <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                {/* Message from Mike */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                    <img src="/Ellipse.png" alt="Mike" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800 text-white rounded-lg p-3 max-w-md">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Mike</span>
                        <span className="text-xs text-gray-300">14 days ago</span>
                      </div>
                      <p className="text-sm">Hi Bryan, our priorities have just changed 😊</p>
                    </div>
                  </div>
                </div>

                {/* Message from Bryan */}
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-[#035F75] text-white rounded-lg p-3 max-w-md">
                      <div className="flex items-center gap-2 mb-1 justify-end">
                        <span className="text-xs text-gray-200">5 days ago</span>
                        <span className="font-semibold text-sm">Bryan</span>
                      </div>
                      <p className="text-sm">No problem, I'm listening for the changes 🔊</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                    <img src="/Ellipse.png" alt="Bryan" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Message from Mike */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                    <img src="/Ellipse.png" alt="Mike" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800 text-white rounded-lg p-3 max-w-md">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Mike</span>
                        <span className="text-xs text-gray-300">3 days ago</span>
                      </div>
                      <p className="text-sm">Can you prioritize the task from yesterday 🙏</p>
                    </div>
                  </div>
                </div>

                {/* Message from Bryan */}
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-[#035F75] text-white rounded-lg p-3 max-w-md">
                      <div className="flex items-center gap-2 mb-1 justify-end">
                        <span className="text-xs text-gray-200">1 day ago</span>
                        <span className="font-semibold text-sm">Bryan</span>
                      </div>
                      <p className="text-sm">Consider it done Mike 🎉🎉</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                    <img src="/Ellipse.png" alt="Bryan" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t pt-4">
                <div className="flex gap-2 items-center mb-3">
                  <button className="p-2 bg-[#E7F4F6] rounded-lg hover:bg-[#D9F5FC] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#035F75" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-[#E7F4F6] rounded-lg hover:bg-[#D9F5FC] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#035F75" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#035F75]"
                  />
                  <button className="bg-[#035F75] text-white p-2 rounded-lg hover:bg-[#035569] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M16 12l-4-4-4 4M12 16V8"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-4">
                <button
                  onClick={() => setActiveView("details")}
                  className="text-[#035F75] hover:underline text-sm">
                  ← Back to details
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Default Details View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Calendar Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pet sitter Availability
              </h2>

              {/* Legend */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF4747] rounded"></div>
                  <span className="text-sm text-gray-700">Book</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#008364] rounded"></div>
                  <span className="text-sm text-gray-700">Available</span>
                </div>
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}

                {calendarDays.map((dayInfo, index) => {
                  const isBooked =
                    dayInfo.isCurrentMonth && bookedDays.includes(dayInfo.day);
                  const isSelected = isDateSelected(dayInfo);
                  const today = new Date();
                  const isToday =
                    dayInfo.day === today.getDate() &&
                    dayInfo.month === today.getMonth() &&
                    dayInfo.year === today.getFullYear();

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateClick(dayInfo)}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded
                        ${
                          !dayInfo.isCurrentMonth
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                        ${isBooked ? "bg-[#FF4747] text-white font-semibold" : ""}
                        ${
                          isSelected && !isBooked
                            ? "bg-[#008364] text-white font-semibold"
                            : ""
                        }
                        ${
                          isToday && !isBooked && !isSelected
                            ? "border-2 border-[#008364]"
                            : ""
                        }
                        ${
                          dayInfo.isCurrentMonth && !isBooked
                            ? "hover:bg-gray-100 cursor-pointer"
                            : ""
                        }
                        ${!dayInfo.isCurrentMonth ? "cursor-default" : ""}
                      `}
                    >
                      {dayInfo.day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Details Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Sitter Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="Tamim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tamim</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-700">3.8(1,200)</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600">02/09/2025</span>
            </div>

            {/* Service Type */}
            <div className="mb-4">
              <p className="text-gray-900 font-medium">Dog walking</p>
            </div>

            {/* Contact Info */}
            <div className="mb-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Contact</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(229) 555-0109</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>01/09/2025</span>
              </div>
            </div>

            {/* Time Info */}
            <div className="mb-4 space-y-1 text-sm">
              <p className="text-gray-700">
                Pick-up time: <span className="font-medium">10:00 AM</span>
              </p>
              <p className="text-gray-700">
                Drop-off time: <span className="font-medium">10:00 AM</span>
              </p>
            </div>

            {/* Live Location */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Live location</span>
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Bathing / Grooming</span>
                  <span className="font-medium text-gray-900">$60.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Extended Care</span>
                  <span className="font-medium text-gray-900">$40.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Additional Pet Rate</span>
                  <span className="font-medium text-gray-900">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pick Up And Drop Off</span>
                  <span className="font-medium text-gray-900">$50.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">$170.00</span>
                </div>
              </div>
            </div>

            {/* Pet Info Card - Click to toggle dropdown */}
            <div className="mb-4">
              <div
                onClick={() => setShowPetDetails(!showPetDetails)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
                      alt="Max"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Max</h4>
                    <p className="text-sm text-gray-600">Labrador</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showPetDetails ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Pet Details Dropdown */}
              {showPetDetails && (
                <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Pet Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
                          alt="Max"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          Max
                        </h2>
                        <p className="text-sm text-gray-600">Labrador</p>
                      </div>
                    </div>
                  </div>

                  {/* Pet Information */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Pet Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Pet Name:
                        </span>
                        <span className="text-gray-600">Max boy</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Type:
                        </span>
                        <span className="text-gray-600">Dog</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Weight (lbs):
                        </span>
                        <span className="text-gray-600">8kg</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Age:
                        </span>
                        <span className="text-gray-600">3 Yer 4Month</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Breed:
                        </span>
                        <span className="text-gray-600">Mix</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Gender:
                        </span>
                        <span className="text-gray-600">Male</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-40">
                          Dates of birth:
                        </span>
                        <span className="text-gray-600">5kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Additional details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">
                          Microchipped?
                        </p>
                        <p className="text-gray-600">Microchipped</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Spayed/Neutered?
                        </p>
                        <p className="text-gray-600">Spayed/Neutered</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          House Trained?
                        </p>
                        <p className="text-gray-600">Not House Trained</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          friendly with children?
                        </p>
                        <p className="text-gray-600">Friendly with children</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Friendly with dogs?
                        </p>
                        <p className="text-gray-600">Friendly with children</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Adoption Date
                        </p>
                        <p className="text-gray-600">10/12/2025</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          About your pet
                        </p>
                        <p className="text-gray-600">
                          Good for eating my share 😋
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Care Info */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M12.248 12.6323C13.3363 12.7041 14.01 13.2402 14.7197 14.0962C15.0903 14.5431 15.4351 15.0311 15.8682 15.5942C16.2379 16.0749 16.6527 16.5828 17.1504 17.0835L17.3691 17.2983C19.0068 18.8986 19.5805 20.3299 19.5654 21.353C19.5508 22.3445 18.9908 23.0129 18.1455 23.2319L18.1367 23.2338L18.1279 23.2368C17.2878 23.4867 16.4886 23.1449 15.4717 22.6049C14.5178 22.0984 13.3652 21.4077 12.0479 21.4223C10.7226 21.361 9.55485 22.0128 8.58301 22.5083C7.53893 23.0405 6.7195 23.3949 5.87109 23.1606C5.03306 22.929 4.5066 22.2685 4.53027 21.2915C4.55507 20.2742 5.18664 18.8506 6.88867 17.2534C7.52315 16.6695 8.03742 16.0768 8.48828 15.5249C8.94885 14.961 9.31833 14.4727 9.70703 14.0337C10.4512 13.1931 11.1444 12.6794 12.248 12.6323ZM1.12109 7.99068C1.55069 7.66536 2.17307 7.62796 2.91895 7.98092C3.66816 8.33556 4.46845 9.06052 5.1084 10.0981C5.74871 11.1364 6.09189 12.2473 6.1416 13.1889C6.19216 14.147 5.9389 14.8256 5.5293 15.1577C5.09952 15.4854 4.47653 15.5244 3.72852 15.1704C2.97919 14.8157 2.17905 14.091 1.53906 13.0532C0.89875 12.0148 0.555551 10.904 0.505859 9.96236C0.458417 9.06165 0.67892 8.40706 1.0459 8.05611L1.12109 7.99068ZM21.2773 8.38131C22.0723 8.07932 22.7642 8.13542 23.2393 8.47115C23.6707 8.81054 23.9176 9.45296 23.8516 10.3296C23.7858 11.2013 23.4095 12.2285 22.7031 13.1899C21.9971 14.1508 21.1359 14.8021 20.3389 15.1049C19.5348 15.4104 18.8702 15.3419 18.4404 15.0083C18.0049 14.6702 17.7558 14.0251 17.8223 13.144C17.8881 12.2723 18.2634 11.245 18.9697 10.2837L18.9766 10.2758C19.6426 9.32879 20.482 8.68347 21.2773 8.38131ZM7.93945 0.994591C8.49667 0.901125 9.158 1.19405 9.78125 1.94186C10.3949 2.67833 10.8996 3.78257 11.1211 5.07467C11.3413 6.35985 11.2077 7.56014 10.8496 8.45162C10.486 9.35675 9.93575 9.8548 9.37109 9.94967C8.81389 10.0431 8.15253 9.75114 7.5293 9.00338C6.91549 8.26691 6.41094 7.16193 6.18945 5.86959C5.96923 4.58444 6.10285 3.38411 6.46094 2.49264C6.8245 1.58757 7.37485 1.08952 7.93945 0.994591ZM14.8633 2.18893C15.4819 1.53958 16.1276 1.30999 16.6592 1.436L16.6699 1.43893L16.6807 1.44088C17.2141 1.54233 17.717 1.9996 18.0371 2.81783C18.3142 3.52627 18.4283 4.45245 18.2969 5.47115L18.2246 5.91354C17.9849 7.06745 17.4826 8.03772 16.8799 8.67721C16.2726 9.32146 15.6182 9.58152 15.041 9.48385C14.51 9.37995 14.0102 8.92281 13.6914 8.10787C13.3747 7.29814 13.2717 6.20374 13.5039 5.01217C13.7358 3.82222 14.2525 2.83019 14.8633 2.18893Z"
                          stroke="#035F75"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Care info
                      </h3>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Potty break
                        </p>
                        <p className="text-gray-600">
                          Needs a potty break every hour
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Energy level
                        </p>
                        <p className="text-gray-600">High energy level</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Feeding schedule
                        </p>
                        <p className="text-gray-600">
                          Needs to be fed in the morning
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Can be left alone
                        </p>
                        <p className="text-gray-600">
                          Can be left alone for 1 hour or less
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Medications
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Pill</p>
                        <p className="text-gray-600">ABCD Pill</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1 ">
                          Anything else a sitter should know?
                        </p>
                        <p className="text-gray-600">
                          Add instructions for walking, feeding or other care
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Veterinary Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M12.248 12.6323C13.3363 12.7041 14.01 13.2402 14.7197 14.0962C15.0903 14.5431 15.4351 15.0311 15.8682 15.5942C16.2379 16.0749 16.6527 16.5828 17.1504 17.0835L17.3691 17.2983C19.0068 18.8986 19.5805 20.3299 19.5654 21.353C19.5508 22.3445 18.9908 23.0129 18.1455 23.2319L18.1367 23.2338L18.1279 23.2368C17.2878 23.4867 16.4886 23.1449 15.4717 22.6049C14.5178 22.0984 13.3652 21.4077 12.0479 21.4223C10.7226 21.361 9.55485 22.0128 8.58301 22.5083C7.53893 23.0405 6.7195 23.3949 5.87109 23.1606C5.03306 22.929 4.5066 22.2685 4.53027 21.2915C4.55507 20.2742 5.18664 18.8506 6.88867 17.2534C7.52315 16.6695 8.03742 16.0768 8.48828 15.5249C8.94885 14.961 9.31833 14.4727 9.70703 14.0337C10.4512 13.1931 11.1444 12.6794 12.248 12.6323ZM1.12109 7.99068C1.55069 7.66536 2.17307 7.62796 2.91895 7.98092C3.66816 8.33556 4.46845 9.06052 5.1084 10.0981C5.74871 11.1364 6.09189 12.2473 6.1416 13.1889C6.19216 14.147 5.9389 14.8256 5.5293 15.1577C5.09952 15.4854 4.47653 15.5244 3.72852 15.1704C2.97919 14.8157 2.17905 14.091 1.53906 13.0532C0.89875 12.0148 0.555551 10.904 0.505859 9.96236C0.458417 9.06165 0.67892 8.40706 1.0459 8.05611L1.12109 7.99068ZM21.2773 8.38131C22.0723 8.07932 22.7642 8.13542 23.2393 8.47115C23.6707 8.81054 23.9176 9.45296 23.8516 10.3296C23.7858 11.2013 23.4095 12.2285 22.7031 13.1899C21.9971 14.1508 21.1359 14.8021 20.3389 15.1049C19.5348 15.4104 18.8702 15.3419 18.4404 15.0083C18.0049 14.6702 17.7558 14.0251 17.8223 13.144C17.8881 12.2723 18.2634 11.245 18.9697 10.2837L18.9766 10.2758C19.6426 9.32879 20.482 8.68347 21.2773 8.38131ZM7.93945 0.994591C8.49667 0.901125 9.158 1.19405 9.78125 1.94186C10.3949 2.67833 10.8996 3.78257 11.1211 5.07467C11.3413 6.35985 11.2077 7.56014 10.8496 8.45162C10.486 9.35675 9.93575 9.8548 9.37109 9.94967C8.81389 10.0431 8.15253 9.75114 7.5293 9.00338C6.91549 8.26691 6.41094 7.16193 6.18945 5.86959C5.96923 4.58444 6.10285 3.38411 6.46094 2.49264C6.8245 1.58757 7.37485 1.08952 7.93945 0.994591ZM14.8633 2.18893C15.4819 1.53958 16.1276 1.30999 16.6592 1.436L16.6699 1.43893L16.6807 1.44088C17.2141 1.54233 17.717 1.9996 18.0371 2.81783C18.3142 3.52627 18.4283 4.45245 18.2969 5.47115L18.2246 5.91354C17.9849 7.06745 17.4826 8.03772 16.8799 8.67721C16.2726 9.32146 15.6182 9.58152 15.041 9.48385C14.51 9.37995 14.0102 8.92281 13.6914 8.10787C13.3747 7.29814 13.2717 6.20374 13.5039 5.01217C13.7358 3.82222 14.2525 2.83019 14.8633 2.18893Z"
                          stroke="#035F75"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Veterinary info
                      </h3>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Veterinary info
                        </p>
                        <p className="text-gray-600">
                          Vet's Name: Dr. Emily Carter
                        </p>
                        <p className="text-gray-600">
                          Clinic: Happy Paws Animal Clinic
                        </p>
                        <p className="text-gray-600">
                          Address: 45 Green Park Rd, Boston,MA
                        </p>
                        <p className="text-gray-600">Number: (406) 555-0120</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Pet insurance provider
                        </p>
                        <p className="text-gray-600">Labrador</p>
                      </div>
                      <div className="border rounded-sm m-2 p-2">
                        <p className="font-medium text-gray-700 mb-1">Note</p>
                        <p className="text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
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
