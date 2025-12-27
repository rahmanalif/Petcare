"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Map, MapTileLayer, MapMarker } from "@/components/ui/map";
import Portfolio from "../Portfolio";
import BookingModal from "../Booking/BookingServiceBoarding";

const BoardingIcon = ({ className = "" }) => (
  <img
    src="/icons/boardingIcon.png"
    alt="Boarding"
    className={`${className} object-contain`}
  />
);

const WalkingIcon = ({ className }) => (
  <img
    src="/icons/walking.png"
    alt="Dog Walking"
    className={`${className} object-contain`}
  />
);

export default function BoardingProfile({ sitterName = "Seam Rahman" }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showBooking, setShowBooking] = useState(false);

  const serviceSections = [
    {
      title: "Boarding",
      subtitle: "In the sitter's home",
      price: 99,
      unit: "per night",
      icon: <BoardingIcon className="w-10 h-10" />,
      items: [
        { name: "Holiday Rate", price: 110, unit: "per night" },
        { name: "Puppy Rate", price: 48, unit: "per night" },
        { name: "Cat Care", price: 48, unit: "per night" },
        { name: "Additional Cat", price: 48, unit: "per night" },
        { name: "Stays of 8 Nights or more", price: 48, unit: "per night" },
        { name: "Bathing/ Grooming", price: 48, unit: "each" },
        {
          name: "Sitter Pick-Up and Drop-Off",
          price: 48,
          note: "+ $110 per night",
        },
        {
          name: "Extended Care",
          price: 48,
          note: "50-100% of nightly rate",
        },
      ],
    },
    {
      title: "Dog Walking",
      subtitle: "In your neighbourhood",
      price: 99,
      unit: "Per walk",
      icon: <WalkingIcon className="w-10 h-10" />,
      items: [
        { name: "60 minute rate", price: 15, unit: "Per walk", isPlus: true },
        { name: "Holiday rate", price: 33, unit: "per dog per walk" },
        { name: "Puppy Rate", price: 48, unit: "Per walk" },
      ],
    },
  ];

  const reviews = [
    {
      name: "Etana Jacobs",
      rating: 5,
      date: "03/19/2025",
      text: "I can sincerely thank you for this service. The staff were very professional and friendly. After listening to my problem they quickly provided a solution that exceeded my expectations. Their punctuality and pleasant attitude impressed me. I would definitely travel more often to such hotels.",
    },
    {
      name: "Etana Jacobs",
      rating: 5,
      date: "03/19/2025",
      text: "I can sincerely thank you for this service. The staff were very professional and friendly. After listening to my problem they quickly provided a solution that exceeded my expectations. Their punctuality and pleasant attitude impressed me. I would definitely travel more often to such hotels.",
    },
    {
      name: "Etana Jacobs",
      rating: 5,
      date: "03/19/2025",
      text: "I can sincerely thank you for this service. The staff were very professional and friendly. After listening to my problem they quickly provided a solution that exceeded my expectations. Their punctuality and pleasant attitude impressed me. I would definitely travel more often to such hotels.",
    },
  ];

  const portfolioImages = [
    { id: 1, src: "/portfolio/1.png", alt: "Pet 1" },
    { id: 2, src: "/portfolio/2.png", alt: "Pet 2" },
    { id: 3, src: "/portfolio/3.png", alt: "Pet 3" },
    { id: 4, src: "/portfolio/4.png", alt: "Pet 4" },
    { id: 5, src: "/portfolio/5.png", alt: "Pet 5" },
    { id: 6, src: "/portfolio/6.png", alt: "Pet 6" },
    { id: 7, src: "/portfolio/7.png", alt: "Pet 7" },
  ];

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const totalDaysInMonth = lastDay.getDate();

    const days = [];

    // Add previous month's trailing days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        month: currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
      });
    }

    // Add current month's days
    for (let day = 1; day <= totalDaysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear,
      });
    }

    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        month: currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Example booked days (you can replace this with dynamic data)
  const bookedDays = [12, 13, 14];

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

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (dayInfo) => {
    if (dayInfo.isCurrentMonth) {
      setSelectedDate({
        day: dayInfo.day,
        month: dayInfo.month,
        year: dayInfo.year,
      });
    }
  };

  const isDateSelected = (dayInfo) => {
    return (
      selectedDate &&
      selectedDate.day === dayInfo.day &&
      selectedDate.month === dayInfo.month &&
      selectedDate.year === dayInfo.year
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            {!showBooking ? (
              <Card>
                {/* Profile Card */}
                <div className="p-6 m-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300">
                      <img
                        src="/Ellipse 52.png"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{sitterName}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>New York, NY</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="text-center bg-[#FCF0D980] py-4 border-2 border-amber-50 rounded-lg">
                      <div className="text-2xl font-normal text-[#035F75] font-bakso">
                        $99
                      </div>
                      <div className="text-xs text-[#E26A15]">Per night</div>
                    </div> */}

                  <div className="py-3 space-y-2 border-b">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 fill-current text-gray-700" />
                      <span className="">5.0 (55 reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.18336 5.15771C9.39364 4.94743 9.73458 4.94743 9.94486 5.15771L11.3807 6.59361C11.5347 6.74761 11.5808 6.97921 11.4975 7.18042C11.4141 7.38163 11.2178 7.51282 11 7.51282H9.56411C7.08591 7.51282 5.07692 9.5218 5.07692 12C5.07692 14.4782 7.08608 16.4872 9.56431 16.4872H9.92308C10.2205 16.4872 10.4615 16.7283 10.4615 17.0257C10.4615 17.323 10.2205 17.5641 9.92308 17.5641H9.56431C6.49136 17.5641 4 15.073 4 12C4 8.92703 6.49113 6.4359 9.56411 6.4359H9.70005L9.18336 5.91921C8.97308 5.70893 8.97308 5.36799 9.18336 5.15771ZM12.9744 6.97436C12.9744 6.67698 13.2155 6.4359 13.5128 6.4359H13.8718C16.9448 6.4359 19.4359 8.92703 19.4359 12C19.4359 15.073 16.9448 17.5641 13.8718 17.5641H13.7359L14.2525 18.0808C14.4628 18.2911 14.4628 18.632 14.2525 18.8423C14.0422 19.0526 13.7014 19.0526 13.4911 18.8423L12.0552 17.4064C11.9012 17.2524 11.8551 17.0208 11.9384 16.8196C12.0218 16.6184 12.2182 16.4872 12.4359 16.4872H13.8718C16.35 16.4872 18.359 14.4782 18.359 12C18.359 9.5218 16.35 7.51282 13.8718 7.51282H13.5128C13.2155 7.51282 12.9744 7.27174 12.9744 6.97436Z"
                          fill="#035F75"
                        />
                      </svg>
                      <span>Repeat pet owners</span>
                    </div>
                    <div className="flex items-center bg-[#FCF0D994] gap-2 text-sm text-[#E26A15] rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                          fill="#F3934F"
                        />
                        <path
                          d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                          fill="#F3934F"
                        />
                      </svg>
                      <span>Background check</span>
                    </div>
                  </div>

                  <div className="py-3 text-sm">
                    <Badge className="bg-[#E7F4F6] text-[#035F75] mb-2 text-xs leading-relaxed whitespace-normal">
                      <div className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            opacity="0.4"
                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                            fill="#035F75"
                          />
                          <path
                            d="M18 11.25H12.75V6C12.75 5.59 12.41 5.25 12 5.25C11.59 5.25 11.25 5.59 11.25 6V11.25H6C5.59 11.25 5.25 11.59 5.25 12C5.25 12.41 5.59 12.75 6 12.75H11.25V18C11.25 18.41 11.59 18.75 12 18.75C12.41 18.75 12.75 18.41 12.75 18V12.75H18C18.41 12.75 18.75 12.41 18.75 12C18.75 11.59 18.41 11.25 18 11.25Z"
                            fill="#035F75"
                          />
                        </svg>
                      </div>
                      Still available for 2 more pets today. (3 booked, 2 remaining)
                    </Badge>
                  </div>

                  <Button
                    className="w-full bg-[#035F75] hover:bg-[#024a5c] text-white mb-3"
                    onClick={() => setShowBooking(true)}
                  >
                    Book Service
                  </Button>
                </div>

                {/* Services List */}
                <div className="px-4 pb-4">
                  {serviceSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {sectionIndex > 0 && <div className="border-t my-4" />}

                      {/* Section Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0">
                            {section.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-base">
                              {section.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {section.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 text-base">
                            ${section.price}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {section.unit}
                          </div>
                        </div>
                      </div>

                      {/* Section Items */}
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-start justify-between"
                          >
                            <span className="text-gray-600 text-sm font-medium">
                              {item.name}
                            </span>
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-gray-400 text-sm">-</span>
                                <span className="font-bold text-gray-900 text-sm">
                                  {item.isPlus ? "+" : ""}
                                  ${item.price}
                                </span>
                              </div>
                              {item.unit && (
                                <div className="text-gray-500 text-xs">
                                  {item.unit}
                                </div>
                              )}
                              {item.note && (
                                <div className="text-gray-500 text-xs">
                                  {item.note}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calendar */}
                <div className="p-4 border-t">
                  <h3 className="font-semibold mb-3">Calendar</h3>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#FF4747] rounded shrink-0"></div>
                      <span className="text-xs">Book</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#008364] rounded shrink-0"></div>
                      <span className="text-xs">Available</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className=""
                      onClick={goToPreviousMonth}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-sm">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className=""
                      onClick={goToNextMonth}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-semibold text-gray-600 py-1"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {calendarDays.map((dayInfo, index) => {
                      const isBooked =
                        dayInfo.isCurrentMonth &&
                        bookedDays.includes(dayInfo.day);
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
                              ${!dayInfo.isCurrentMonth
                              ? "text-gray-300"
                              : "text-gray-700"
                            }
                              ${isBooked
                              ? "bg-[#FF4747] text-white font-semibold"
                              : ""
                            }
                              ${isSelected && !isBooked
                              ? "bg-[#008364] text-white font-semibold"
                              : ""
                            }
                              ${isToday && !isBooked && !isSelected
                              ? "border-2 border-[#008364]"
                              : ""
                            }
                              ${dayInfo.isCurrentMonth && !isBooked
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
              </Card>
            ) : (
              <BookingModal
                isOpen={true}
                onClose={() => setShowBooking(false)}
              />
            )}
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            <Card>
              <CardContent className="p-0">
                <div className="flex gap-8 px-6 pt-6 border-b border-gray-200 justify-center">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`pb-3 px-4 font-medium ${activeTab === "about"
                      ? "text-[#035F75] border-b-2 border-[#035F75]"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`pb-3 px-4 font-medium ${activeTab === "portfolio"
                      ? "text-[#035F75] border-b-2 border-[#035F75]"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Portfolio
                  </button>
                </div>

                {activeTab === "about" ? (
                  <>
                    {/* About Section */}
                    <div className="p-6">
                      <h2 className="font-semibold text-xl mb-3">
                        {sitterName}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        I'm a dedicated pet care provider with 8+ years of
                        professional boarding experience. I provide personalized
                        overnight care for your furry family members in a safe,
                        comfortable, and nurturing home environment. Your pets
                        will enjoy a home away from home!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Portfolio Section */}
                    <div className="p-6">
                      <Portfolio images={portfolioImages} />
                    </div>
                  </>
                )}
              </CardContent>
              {activeTab === "about" && (
                <>
                  {/* Skills*/}
                  <Card className="p-2 m-4 mt-2">
                    <CardContent className="p-3">
                      <h3 className="font-semibold mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-3">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-2 py-2 px-3"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <span>CPR experience</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-2 py-2 px-3"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <span>Grooming & bathing</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-2 py-2 px-3"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <span>Basic Training</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-2 py-2 px-3"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Dogs and Cats</span>
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Home Details - Boarding specific */}
                  <Card className="mt-6 mb-6 m-4">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Home Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.5 18H13.5C15.15 18 16.5 16.65 16.5 15V12C16.5 10.35 15.15 9 13.5 9H10.5C8.85 9 7.5 10.35 7.5 12V15C7.5 16.65 8.85 18 10.5 18Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 9V18"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 13.5H16.5"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          text="Lives in a spacious home"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          text="Has fenced yard"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 5L19 19"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                            </svg>
                          }
                          text="Non-smoking household"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 5L19 19"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                            </svg>
                          }
                          text="No children Present"
                        />
                        <DetailItem
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="17"
                              viewBox="0 0 18 17"
                              fill="none"
                            >
                              <path
                                d="M11.9566 9.92122V10.3361M2.34868 7.63706C2.11647 8.53372 1.99937 9.4563 2.0002 10.3825C2.0002 13.844 4.97219 15.7291 8.6378 15.7291C12.3034 15.7291 15.2754 13.844 15.2754 10.3825C15.2712 9.45251 15.1335 8.52791 14.8663 7.63706M5.319 9.92122V10.3361M5.73385 5.35788C5.41525 6.22906 4.83529 7.04051 3.78904 7.43213C2.18689 8.03117 0.822032 7.18571 0.755656 6.60243C0.6619 5.77771 1.73221 1.1845 4.07445 0.794538C5.66996 0.528205 7.10368 1.49563 7.10368 2.64891C8.15308 2.3824 9.25386 2.39441 10.2972 2.68376C10.2972 1.53048 11.8272 0.528205 13.4227 0.794538C15.7649 1.1845 16.8352 5.77771 16.7415 6.60243C16.6751 7.18571 15.3102 8.03117 13.7081 7.43213C12.6618 7.04051 12.169 6.22906 11.8504 5.35788M8.01552 11.788H9.26007L8.6378 12.4103L8.01552 11.788Z"
                                stroke="#101010"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          text="Has no pets"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 17.5H2"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11 12V10.2134C11 9.83272 10.9428 9.70541 10.6497 9.55538C10.0395 9.24292 9.29865 9 8.5 9C7.70135 9 6.96055 9.24292 6.35025 9.55538C6.05721 9.70541 6 9.83272 6 10.2134L6 12"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M18 12V10.2134C18 9.83272 17.9428 9.70541 17.6497 9.55538C17.0395 9.24292 16.2987 9 15.5 9C14.7013 9 13.9605 9.24292 13.3503 9.55538C13.0572 9.70541 13 9.83272 13 10.2134L13 12"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M21 12V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          }
                          text="Dog allowed on bed"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 17V20M18 17V20"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 4L12 14"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4H9C7.13077 4 6.19615 4 5.5 4.40192C5.04394 4.66523 4.66523 5.04394 4.40192 5.5C4 6.19615 4 7.13077 4 9"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 9C18.8954 9 18 9.89543 18 11V13C18 13.8273 17.8273 14 17 14H7C6.17267 14 6 13.8273 6 13V11C6 9.89543 5.10457 9 4 9C2.89543 9 2 9.89543 2 11C2 11.7403 2.4022 12.3866 3 12.7324V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13V12.7324C21.5978 12.3866 22 11.7403 22 11C22 9.89543 21.1046 9 20 9Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          text="Dog allowed on furniture"
                        />
                        <DetailItem
                          icon={
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 7.75V13"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 16.2002V16.3002"
                                stroke="#292D32"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          text="Takes Only One Client At a Time"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  <Card className="mb-6 m-4">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">
                        Location{" "}
                        <span className="text-sm font-normal text-gray-500">
                          - New York, NY
                        </span>
                      </h3>
                      <div className="w-full h-48 rounded overflow-hidden">
                        <Map center={[40.7128, -74.006]} zoom={13}>
                          <MapTileLayer />
                          <MapMarker position={[40.7128, -74.006]} />
                        </Map>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews */}
                  <Card className="m-4">
                    <CardContent className="p-6 ">
                      <h3 className="font-semibold mb-4">Top Reviews</h3>
                      <div className="space-y-4">
                        {reviews.map((review, index) => (
                          <div
                            key={index}
                            className="pb-4 border-b last:border-b-0"
                          >
                            <div className="flex items-start justify-between mb-2 gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0">
                                  <img
                                    src="/Ellipse 10.png"
                                    alt="Pet"
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold truncate">
                                    {review.name}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="w-3 h-3 fill-current text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className=" text-gray-500 shrink-0">
                                {review.date}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {review.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="shrink-0">{icon}</span>
      <span className="wrap-break-word">{text}</span>
    </div>
  );
}
