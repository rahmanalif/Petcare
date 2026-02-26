"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllBookings, 
  fetchCalendarEvents, 
  updateBookingStatus 
} from "@/redux/sitter/bookingSlice"; 

const SERVER_URL = "http://16.176.51.106:5001";

export default function DashboardOverview() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { bookings, stats, calendarEvents, loading } = useSelector((state) => state.booking);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchAllBookings());
    dispatch(fetchCalendarEvents());
  }, [dispatch]);


  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/100";
    if (path.startsWith("http") || path.startsWith("https")) {
      return path;
    }
    return `${SERVER_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, dateStr: null });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = new Date(year, month, i).toLocaleDateString('en-CA'); 
      days.push({ day: i, isCurrentMonth: true, dateStr: dateStr });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, dateStr: null });
    }
    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // FIXED: Safer filtering with lowerCase check
  const pendingBookings = Array.isArray(bookings) 
    ? bookings.filter(b => b?.status?.toLowerCase() === 'pending') 
    : [];

  const handleAction = (e, id, status) => {
    e.stopPropagation();
    if(confirm(`Are you sure you want to ${status}?`)) {
      dispatch(updateBookingStatus({ id, status }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="text-[#024B5E] text-sm font-medium mb-2 uppercase tracking-wide font-bakso">Total Bookings</h3>
            <p className="text-4xl font-bold text-teal-600 font-bakso">{stats?.total || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="text-[#024B5E] text-sm font-medium mb-2 uppercase tracking-wide font-bakso">On Going Services</h3>
            <p className="text-4xl font-bold text-blue-600 font-bakso">{stats?.ongoing || 0}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-[#024B5E] text-sm font-medium mb-2 uppercase tracking-wide font-bakso">Completed Services</h3>
            <p className="text-4xl font-bold text-teal-500 font-bakso">{stats?.completed || 0}</p>
          </div>
          <div className="bg-white border border-red-200 rounded-xl p-6">
            <h3 className="text-[#024B5E] text-sm font-medium mb-2 uppercase tracking-wide font-bakso">Upcoming Services</h3>
            <p className="text-4xl font-bold text-red-400 font-bakso">{stats?.upcoming || 0}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#024B5E] mb-4">Pet sitter Availability</h2>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FF4747] rounded"></div>
                <span className="text-sm text-[#024B5E]">Booked</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                 <svg className="w-5 h-5 text-[#024B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h3 className="text-base font-semibold text-[#024B5E]">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
              <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">
                 <svg className="w-5 h-5 text-[#024B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-[#024B5E]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-[#024B5E] py-2">{day}</div>
              ))}

              {calendarDays.map((dayInfo, index) => {
                const isBooked = dayInfo.isCurrentMonth && calendarEvents.some(event => event.date === dayInfo.dateStr);
                return (
                  <div key={index} className={`aspect-square flex items-center justify-center text-sm rounded ${!dayInfo.isCurrentMonth ? "text-gray-300" : "text-[#024B5E]"} ${isBooked ? "bg-[#FE6C5D] text-white font-semibold" : ""} ${dayInfo.isCurrentMonth && !isBooked ? "hover:bg-gray-100 cursor-pointer" : ""}`}>
                    {dayInfo.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Requests List */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#024B5E] mb-4">
              New Requests ({pendingBookings.length})
            </h2>
            
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            
            {!loading && pendingBookings.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                <p>No pending requests found.</p>
              </div>
            )}

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {pendingBookings.map((booking) => (
                <div key={booking._id} onClick={() => router.push(`/settingForSitter/ongoing?id=${booking._id}`)} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                          src={getImageUrl(booking.owner?.profilePicture)} 
                          alt="User" 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.target.src = "https://placehold.co/100" }} 
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#024B5E]">{booking.owner?.fullName || "Client"}</h3>
                        <div className="flex items-center gap-1 text-xs text-[#024B5E]">
                           <span>{booking.owner?.address || "Address N/A"}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-[#024B5E]">{booking.startTime}</span>
                  </div>

                  <div className="mb-3">
                    <p className="font-medium text-[#024B5E] mb-1 capitalize">{booking.serviceType}</p>
                    <p className="text-xs text-[#024B5E] mb-2">{new Date(booking.startDate).toDateString()}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#024B5E]">{booking.startTime} - {booking.endTime}</span>
                      <span className="text-[#024B5E] font-medium">{booking.currency} {booking.totalPrice}</span>
                    </div>
                  </div>

                  {booking.pets && booking.pets.length > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3">
                       <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                          <img 
                            src={getImageUrl(booking.pets[0].image)} 
                            alt="Pet" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = "https://placehold.co/100" }}
                          />
                       </div>
                       <div>
                         <p className="font-semibold text-[#024B5E] text-sm">{booking.pets[0].name}</p>
                         <p className="text-xs text-[#024B5E]">{booking.pets[0].breed}</p>
                       </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#FE6C5D] hover:bg-[#f16859] text-white font-medium py-2 px-4 rounded-lg text-sm" onClick={(e) => handleAction(e, booking._id, 'rejected')}>Reject</button>
                    <button className="flex-1 bg-[#024B5E] hover:bg-[#023846] text-white font-medium py-2 px-4 rounded-lg text-sm" onClick={(e) => handleAction(e, booking._id, 'confirmed')}>Accept</button>
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