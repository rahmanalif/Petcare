"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

// Custom icons to match the design
const BoardingIcon = ({ className }) => (
  <svg
    width="41"
    height="43"
    viewBox="0 0 41 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32.5 1.5V5.5M8.5 1.5V5.5"
      stroke="#035F75"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.6 41.5C10.539 41.5 6.50847 41.5 4.00424 38.7927C1.5 36.0854 1.5 31.7281 1.5 23.0135V21.9865C1.5 13.2719 1.5 8.91457 4.00424 6.20728C6.50847 3.5 10.539 3.5 18.6 3.5H22.4C30.461 3.5 34.4915 3.5 36.9958 6.20728C39.453 8.86371 39.4991 13.1088 39.5 21.5"
      stroke="#035F75"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 13.5H38.5"
      stroke="#035F75"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.5 33.5H38.5M30.5 25.5L30.5 41.5"
      stroke="#035F75"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DaycareIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M20 3.33337V16.6667"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.2168 18.2162L10.5668 20.5662"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.33398 30H6.66732"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M33.334 30H36.6673"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M31.7836 18.2162L29.4336 20.5662"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M36.6673 36.6666H3.33398"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.334 10L20.0007 3.33337L26.6673 10"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M26.6673 30C26.6673 28.2319 25.9649 26.5362 24.7147 25.286C23.4645 24.0358 21.7688 23.3334 20.0007 23.3334C18.2325 23.3334 16.5368 24.0358 15.2866 25.286C14.0364 26.5362 13.334 28.2319 13.334 30"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const WalkingIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M18.3333 10C20.1743 10 21.6667 8.50766 21.6667 6.66671C21.6667 4.82576 20.1743 3.33337 18.3333 3.33337C16.4924 3.33337 15 4.82576 15 6.66671C15 8.50766 16.4924 10 18.3333 10Z"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M29.9993 16.6667C31.8403 16.6667 33.3327 15.1743 33.3327 13.3333C33.3327 11.4924 31.8403 10 29.9993 10C28.1584 10 26.666 11.4924 26.666 13.3333C26.666 15.1743 28.1584 16.6667 29.9993 16.6667Z"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M33.3333 30C35.1743 30 36.6667 28.5077 36.6667 26.6667C36.6667 24.8258 35.1743 23.3334 33.3333 23.3334C31.4924 23.3334 30 24.8258 30 26.6667C30 28.5077 31.4924 30 33.3333 30Z"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.0002 16.6666C16.0946 16.6666 17.1782 16.8822 18.1893 17.301C19.2003 17.7198 20.119 18.3336 20.8928 19.1074C21.6666 19.8812 22.2804 20.7999 22.6992 21.8109C23.118 22.822 23.3336 23.9056 23.3336 25V30.8333C23.3331 32.2274 22.8334 33.5752 21.9249 34.6327C21.0165 35.6901 19.7593 36.3873 18.3812 36.5978C17.0031 36.8084 15.5952 36.5184 14.4124 35.7804C13.2296 35.0425 12.3503 33.9053 11.9336 32.575C11.2225 30.2805 9.72246 28.7777 7.43357 28.0666C6.10387 27.6502 4.96718 26.7715 4.22917 25.5896C3.49116 24.4077 3.20059 23.0006 3.41004 21.6231C3.6195 20.2455 4.31513 18.9884 5.37108 18.0793C6.42702 17.1702 7.77351 16.6691 9.1669 16.6666H15.0002Z"
      stroke="#035F75"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const PawIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="106"
    height="89"
    viewBox="0 0 106 89"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.4559 37.117C32.8586 44.2371 35.202 53.5918 30.2215 57.2494C25.2409 60.9069 15.1165 58.3626 7.40195 50.8134C-0.000628678 43.6933 -2.3441 34.3386 2.63633 30.681C7.61693 27.0235 17.6637 29.8991 25.4559 37.117ZM46.7011 16.8613C50.2124 26.5102 47.6495 35.6849 40.7204 37.0995C33.7914 38.5138 25.0657 31.7622 21.5544 22.1135C18.0431 12.4648 20.6055 3.29081 27.5345 1.87619C34.3859 0.792804 42.8002 7.11484 46.7011 16.8613ZM79.0949 19.3968C78.7912 29.4895 72.5673 36.692 65.3251 35.924C57.6936 35.058 52.314 26.3425 52.5401 16.5811C52.7662 6.81962 59.0678 -0.713979 66.3099 0.0538818C73.9414 0.919741 79.3209 9.63543 79.0949 19.3968ZM81.151 59.887C98.2125 71.5383 97.2868 82.5261 88.4123 85.2052C79.5376 87.8841 70.0311 79.1838 59.9869 79.8155C49.9426 80.4472 43.6421 89.7346 34.1411 88.0483C24.2507 86.264 19.7266 75.6592 32.7201 62.4437C41.8236 53.5105 42.8285 43.9445 54.1187 43.2751C65.3312 42.937 69.3872 52.0215 81.151 59.887ZM100.203 26.0984C106.435 29.4179 107.61 38.4801 102.477 46.307C97.7329 54.2318 88.6252 57.9041 82.3933 54.5848C76.1616 51.2655 74.9867 42.204 80.1196 34.377C85.2528 26.55 94.361 22.8769 100.203 26.0984Z"
      fill="#357F91"
    />
  </svg>
);

export default function HeroSection() {
  const [activeService, setActiveService] = useState("boarding");
  const [startDate, setStartDate] = useState("01/09/2025");
  const [endDate, setEndDate] = useState("01/09/2025");
  const [startTime, setStartTime] = useState("11:00pm");
  const [endTime, setEndTime] = useState("11:00pm");
  const [schedule, setSchedule] = useState("onetime");

  const services = [
    { id: "boarding", label: "Boarding", icon: BoardingIcon },
    { id: "daycare", label: "Doggy Day Care", icon: DaycareIcon },
    { id: "walking", label: "Dog Walking", icon: WalkingIcon },
  ];

  // Render form fields based on active service
  const renderFormFields = () => {
    if (activeService === "boarding") {
      // Boarding: 4 columns - Start date, End date, Start time, End time
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-2 border-gray-200 shadow-amber-50 rounded-lg  p-3">
          <div className="space-y-2 ">
            <label className="text-sm text-gray-500 font-medium">
              Start date
            </label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#035F75] font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-medium">
              End date
            </label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-medium">
              Start time
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#035F75] font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-medium">
              End time
            </label>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      );
    } else {
      // Daycare & Walking: 5 columns - Start date, End date, Start time, End time, Schedule
      return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 items-stretch">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-2 border-gray-200 shadow-amber-50 rounded-lg p-3 col-span-4">
            <div className="space-y-2 ">
              <label className="text-sm text-gray-500 font-medium">
                Start date
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-teal-600 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">
                End date
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">
                Start time
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-teal-600 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">
                End time
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-2 border-2 border-gray-200 rounded-lg p-3 h-full flex flex-col">
            <label className="text-sm text-gray-500 font-medium">
              Schedule
            </label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden flex-1">
              <button
                onClick={() => setSchedule("onetime")}
                className={`flex-1 px-2 py-2 text-sm font-medium transition-colors ${
                  schedule === "onetime"
                    ? "bg-white text-teal-600 border-r border-gray-200"
                    : "bg-gray-50 text-gray-500 border-r border-gray-200 hover:bg-gray-100"
                }`}
              >
                One Time
              </button>
              <button
                onClick={() => setSchedule("repeat")}
                className={`flex-1 px-2 py-2 text-sm font-medium transition-colors ${
                  schedule === "repeat"
                    ? "bg-white text-teal-600"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                Repeat Weekly
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative w-full max-w-[1669px] mx-auto pb-8">
      {/* Background Image Container */}
      <div
        className="w-full h-[777px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/IMAGE (2).png')" }}
      >
        <div className="max-w-7xl mx-auto px-8 pt-8 pb-16">
          {/* Left Content */}
          <div className="max-w-xl py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6 font-bakso">
              Trusted Pet Care,
              <br />
              Whenever You Need It.
            </h1>
            <p className="text-gray-600 text-lg mb-8 uppercase tracking-wide font-bakso">
              Find reliable sitters, walkers, and groomers near you—book in
              minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Service Selection Cards - positioned to overlap the background */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto -mt-32 relative z-10">
        {/* Service Tabs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                activeService === service.id
                  ? "border-teal-600 bg-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <service.icon
                className={`w-8 h-8 ${
                  activeService === service.id
                    ? "text-teal-600"
                    : "text-teal-600"
                }`}
              />
              <span className="font-semibold uppercase tracking-wide text-sm font-bakso text-gray-800">
                {service.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Form Fields */}
        {renderFormFields()}

        {/* Bottom row with paw and search button */}
        <div className="flex items-center justify-between pt-4">
          <PawIcon className="w-16 h-16 text-teal-600" />
          <Link
            href="/search"
            className="flex items-center gap-2 bg-[#035F75] hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-medium transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Search here
          </Link>
        </div>
      </div>
    </div>
  );
}
