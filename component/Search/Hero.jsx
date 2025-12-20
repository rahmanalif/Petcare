"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SitterCard from "./SitterCard";
import { Map, MapTileLayer, MapMarker, MapPopup, MapZoomControl } from "@/components/ui/map";

// Reusable SVG Icons
const FilterIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    className={className}
  >
    <path
      d="M2.75 12.75L2.75 10.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.41797 12.75L9.41797 8.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.41797 2.75L9.41797 0.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.75 4.75L2.75 0.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.75 10.75C2.12874 10.75 1.81812 10.75 1.57309 10.6485C1.24638 10.5132 0.986819 10.2536 0.851494 9.92691C0.75 9.68188 0.75 9.37126 0.75 8.75C0.75 8.12874 0.75 7.81812 0.851494 7.57309C0.986819 7.24638 1.24638 6.98682 1.57309 6.85149C1.81812 6.75 2.12874 6.75 2.75 6.75C3.37126 6.75 3.68188 6.75 3.92691 6.85149C4.25362 6.98682 4.51318 7.24638 4.64851 7.57309C4.75 7.81812 4.75 8.12874 4.75 8.75C4.75 9.37126 4.75 9.68188 4.64851 9.92691C4.51318 10.2536 4.25362 10.5132 3.92691 10.6485C3.68188 10.75 3.37126 10.75 2.75 10.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9.41797 6.75C8.79671 6.75 8.48609 6.75 8.24106 6.64851C7.91435 6.51318 7.65479 6.25362 7.51946 5.92691C7.41797 5.68188 7.41797 5.37126 7.41797 4.75C7.41797 4.12874 7.41797 3.81812 7.51946 3.57309C7.65479 3.24638 7.91435 2.98682 8.24106 2.85149C8.48609 2.75 8.79671 2.75 9.41797 2.75C10.0392 2.75 10.3499 2.75 10.5949 2.85149C10.9216 2.98682 11.1811 3.24638 11.3165 3.57309C11.418 3.81812 11.418 4.12874 11.418 4.75C11.418 5.37126 11.418 5.68188 11.3165 5.92691C11.1811 6.25362 10.9216 6.51318 10.5949 6.64851C10.3499 6.75 10.0392 6.75 9.41797 6.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LocationIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M7.99992 8.95346C9.14867 8.95346 10.0799 8.02221 10.0799 6.87346C10.0799 5.7247 9.14867 4.79346 7.99992 4.79346C6.85117 4.79346 5.91992 5.7247 5.91992 6.87346C5.91992 8.02221 6.85117 8.95346 7.99992 8.95346Z"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2.41379 5.66016C3.72712 -0.113169 12.2805 -0.106502 13.5871 5.66683C14.3538 9.0535 12.2471 11.9202 10.4005 13.6935C9.06046 14.9868 6.94046 14.9868 5.59379 13.6935C3.75379 11.9202 1.64712 9.04683 2.41379 5.66016Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.05 22C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.4765 5.68186 21.4996 7.80438 21.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 18H21M17 14L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UncheckedIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11.9707 22.75C6.0507 22.75 1.2207 17.93 1.2207 12C1.2207 6.07 6.0507 1.25 11.9707 1.25C17.8907 1.25 22.7207 6.07 22.7207 12C22.7207 17.93 17.9007 22.75 11.9707 22.75ZM11.9707 2.75C6.8707 2.75 2.7207 6.9 2.7207 12C2.7207 17.1 6.8707 21.25 11.9707 21.25C17.0707 21.25 21.2207 17.1 21.2207 12C21.2207 6.9 17.0707 2.75 11.9707 2.75Z" fill="#024B5E"/>
    <path d="M11.9995 16.98C9.24953 16.98 7.01953 14.75 7.01953 12C7.01953 9.25002 9.24953 7.02002 11.9995 7.02002C14.7495 7.02002 16.9795 9.25002 16.9795 12C16.9795 14.75 14.7495 16.98 11.9995 16.98ZM11.9995 8.52002C10.0795 8.52002 8.51953 10.08 8.51953 12C8.51953 13.92 10.0795 15.48 11.9995 15.48C13.9195 15.48 15.4795 13.92 15.4795 12C15.4795 10.08 13.9195 8.52002 11.9995 8.52002Z" fill="#024B5E"/>
  </svg>
);

const CheckedIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path opacity="0.4" d="M11.9707 22C17.4936 22 21.9707 17.5228 21.9707 12C21.9707 6.47715 17.4936 2 11.9707 2C6.44786 2 1.9707 6.47715 1.9707 12C1.9707 17.5228 6.44786 22 11.9707 22Z" fill="#024B5E"/>
    <path d="M11.9995 16.23C14.3357 16.23 16.2295 14.3362 16.2295 12C16.2295 9.66386 14.3357 7.77002 11.9995 7.77002C9.66337 7.77002 7.76953 9.66386 7.76953 12C7.76953 14.3362 9.66337 16.23 11.9995 16.23Z" fill="#024B5E"/>
  </svg>
);


export default function FindMatchSection() {
  const [lookingFor, setLookingFor] = useState("boarding");
  const [startDate, setStartDate] = useState("01/09/2025");
  const [endDate, setEndDate] = useState("01/09/2025");
  const [startTime, setStartTime] = useState("11:00am");
  const [endTime, setEndTime] = useState("11:00pm");
  const [selectedPet, setSelectedPet] = useState("bob");
  const [showMap, setShowMap] = useState(false);
  const [schedule, setSchedule] = useState("oneTime"); // "oneTime" or "repeatWeekly"
  const [daycareDate, setDaycareDate] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    M: false,
    T: false,
    W: false,
    T2: false,
    F: false,
    S: false,
  });

  const [filters, setFilters] = useState({
    sitterAtHome: true,
    hasFencedGarden: true,
    petsAllowed: false,
    noSmokingHome: false,
    allTypes: false,
    doesntOwnDogs: true,
    doesntOwnCats: false,
    onlyOneBooking: false,
    doesntOwnCagedPets: false,
    hasNoChildren: true,
    hasNoChildren0to3: false,
    hasNoChildren6to12: false,
    acceptsNonSpayed: true,
    acceptsNonNeutered: false,
    bathingGrooming: false,
    dogFirstAid: false,
  });

  // Daycare specific filters
  const [daycareFilters, setDaycareFilters] = useState({
    sitterAtHome: true,
    atSittersFacility: false,
    atYourHome: false,
    home: true,
    flats: false,
    allTypes: false,
    sitterHomeFullTime: true,
    otherAtHomeFullTime: false,
    hasFencedGarden: true,
    petsAllowedOnFurniture: false,
    noSmokingHome: false,
    doesntOwnDogs: true,
    doesntOwnCats: false,
    onlyOneBooking: false,
    doesntOwnCagedPets: false,
    hasNoChildren: true,
    hasNoChildren0to3: false,
    hasNoChildren6to12: false,
    acceptsNonSpayed: true,
    acceptsNonNeutered: false,
    bathingGrooming: false,
    dogFirstAid: false,
  });

  // Dog Walking specific filters
  const [walkingFilters, setWalkingFilters] = useState({
    availableTime11am3am: false,
    availableTime3am10am: false,
    dogFirstAid: false,
  });

  const sitters = Array(6).fill({
    name: "Seam Rahman",
    location: "New York, NY",
    rating: 5.0,
    reviews: 55,
    repeatPetOwners: true,
    availability:
      "Still available for 2 more pets today. (3 booked, 2 remaining)",
    price: 25,
    backgroundCheck: true,
  });

  const toggleFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const toggleDaycareFilter = (filterKey) => {
    setDaycareFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const toggleWalkingFilter = (filterKey) => {
    setWalkingFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };



  return (
    <div className="min-h-screen bg-[#F8F4EF] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 text-[#024B5E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#024B5E] mb-2 font-bakso">
            Find a Match
          </h1>
          <p className="text-sm sm:text-base text-[#024B5E] font-medium">
            Add dates to see sitters who'll be available for your need. These
            are sitters in your area, but they might not be available.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Sidebar - Filters or Map */}
          <div className="w-full lg:w-80 lg:shrink-0 bg-white rounded-lg shadow-md ">
            <div>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
                {/* Filter and Location Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 sm:flex-none border-2 text-sm sm:text-base ${
                      !showMap
                        ? 'bg-[#024B5E] text-white border-[#024B5E]'
                        : 'bg-white text-[#024B5E] border-[#024B5E]'
                    }`}
                    onClick={() => setShowMap(false)}
                  >
                    Filter
                    <FilterIcon />
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 sm:flex-none border-2 text-sm sm:text-base border-[#024B5E] ${
                      showMap
                        ? 'bg-[#024B5E] text-white'
                        : 'bg-white text-[#024B5E]'
                    }`}
                    onClick={() => setShowMap(true)}
                  >
                    Location
                    <LocationIcon />
                  </Button>
                </div>

                {showMap ? (
                  /* Map View */
                  <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden">
                    <Map center={[40.7128, -74.0060]} zoom={13} className="h-full w-full">
                      <MapTileLayer />
                      <MapZoomControl />

                      {/* Sitter locations */}
                      <MapMarker position={[40.7128, -74.0060]}>
                        <MapPopup>
                          <div className="">
                            <div className="font-semibold">Seam Rahman</div>
                            <div className="text-sm text-[#024B5E]">New York, NY</div>
                            <div className="text-sm font-semibold text-[#024B5E] mt-1">$25/day</div>
                          </div>
                        </MapPopup>
                      </MapMarker>

                      <MapMarker position={[40.7148, -74.0080]} />
                      <MapMarker position={[40.7108, -74.0040]} />
                      <MapMarker position={[40.7138, -74.0050]} />
                      <MapMarker position={[40.7118, -74.0070]} />
                      <MapMarker position={[40.7158, -74.0030]} />
                    </Map>
                  </div>
                ) : (
                  <>
                    {/* Looking For */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Looking For
                  </label>
                  <Select value={lookingFor} onValueChange={setLookingFor} className="">
                    <SelectTrigger className="w-full flex items-center justify-between px-4 py-3 border rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boarding" className={""}>
                        <img src="/icons/boardingIcon.png" alt="Boarding" className="inline-block mr-2 w-6 h-6" />
                        Boarding
                      </SelectItem>
                      <SelectItem value="Doggy Day Care" className={""}>
                        <img src="/icons/doggy.png" alt="Doggy Day Care" className="inline-block mr-2 w-6 h-6" />
                        Doggy Day Care
                      </SelectItem>
                      <SelectItem value="Dog Walking" className={""}>
                        <img src="/icons/walking.png" alt="Dog Walking" className="inline-block mr-2 w-6 h-6" />
                        Dog Walking
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time Inputs - Conditional based on lookingFor */}
                {lookingFor === "Doggy Day Care" ? (
                  /* Daycare specific fields */
                  <>
                    {/* Schedule */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold mb-2">
                        Schedule
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div
                          onClick={() => setSchedule("oneTime")}
                          className={`p-2 sm:p-3 border-2 rounded-lg text-center text-xs sm:text-sm cursor-pointer flex flex-col items-center transition-colors ${
                            schedule === "oneTime"
                              ? "border-[#024B5E] bg-[#024B5E]/5"
                              : "border-gray-200 hover:border-[#024B5E]"
                          }`}
                        >
                          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                          <label className="cursor-pointer">One Time</label>
                        </div>
                        <div
                          onClick={() => setSchedule("repeatWeekly")}
                          className={`p-2 sm:p-3 border-2 rounded-lg text-center text-xs sm:text-sm cursor-pointer flex flex-col items-center transition-colors ${
                            schedule === "repeatWeekly"
                              ? "border-[#024B5E] bg-[#024B5E]/5"
                              : "border-gray-200 hover:border-[#024B5E]"
                          }`}
                        >
                          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                          <label className="cursor-pointer">Repeat Weekly</label>
                        </div>
                      </div>
                    </div>

                    {/* Days of the week - Show only when Repeat Weekly is selected */}
                    {schedule === "repeatWeekly" && (
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-2">
                          Days of the week
                        </label>
                        <div className="flex gap-1 sm:gap-2 justify-between">
                          {[
                            { key: "M", label: "M" },
                            { key: "T", label: "T" },
                            { key: "W", label: "W" },
                            { key: "T2", label: "T" },
                            { key: "F", label: "F" },
                            { key: "S", label: "S" },
                          ].map((day) => (
                            <button
                              key={day.key}
                              onClick={() =>
                                setSelectedDays((prev) => ({
                                  ...prev,
                                  [day.key]: !prev[day.key],
                                }))
                              }
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors ${
                                selectedDays[day.key]
                                  ? "bg-[#024B5E] text-white"
                                  : "bg-gray-200 text-[#024B5E] hover:bg-gray-300"
                              }`}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div>
                      {/* <label className="block text-sm font-semibold mb-2">
                        Dates
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="DD/MM/YY"
                          value={daycareDate}
                          onChange={(e) => setDaycareDate(e.target.value)}
                          className="border-2 border-gray-200 rounded-sm px-2 p-2 pr-8 text-[#024B5E] focus-visible:ring-0"
                        />
                        <svg
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                        </svg>
                      </div> */}
                      <div className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start date
                        </label>
                        <Input
                          type="text"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End date
                        </label>
                        <Input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Time Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start time
                        </label>
                        <Input
                          type="text"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End time
                        </label>
                        <Input
                          type="text"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                    </div>
                  </>
                ) : lookingFor === "Dog Walking" ? (
                  /* Dog Walking specific fields */
                  <>
                    {/* Schedule */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold mb-2">
                        Schedule
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div
                          onClick={() => setSchedule("oneTime")}
                          className={`p-2 sm:p-3 border-2 rounded-lg text-center text-xs sm:text-sm cursor-pointer flex flex-col items-center transition-colors ${
                            schedule === "oneTime"
                              ? "border-[#024B5E] bg-[#024B5E]/5"
                              : "border-gray-200 hover:border-[#024B5E]"
                          }`}
                        >
                          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                          <label className="cursor-pointer">One Time</label>
                        </div>
                        <div
                          onClick={() => setSchedule("repeatWeekly")}
                          className={`p-2 sm:p-3 border-2 rounded-lg text-center text-xs sm:text-sm cursor-pointer flex flex-col items-center transition-colors ${
                            schedule === "repeatWeekly"
                              ? "border-[#024B5E] bg-[#024B5E]/5"
                              : "border-gray-200 hover:border-[#024B5E]"
                          }`}
                        >
                          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                          <label className="cursor-pointer">Repeat Weekly</label>
                        </div>
                      </div>
                    </div>

                    {/* Days of the week - Show only when Repeat Weekly is selected */}
                    {schedule === "repeatWeekly" && (
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-2">
                          Days of the week
                        </label>
                        <div className="flex gap-1 sm:gap-2 justify-between">
                          {[
                            { key: "M", label: "M" },
                            { key: "T", label: "T" },
                            { key: "W", label: "W" },
                            { key: "T2", label: "T" },
                            { key: "F", label: "F" },
                            { key: "S", label: "S" },
                          ].map((day) => (
                            <button
                              key={day.key}
                              onClick={() =>
                                setSelectedDays((prev) => ({
                                  ...prev,
                                  [day.key]: !prev[day.key],
                                }))
                              }
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors ${
                                selectedDays[day.key]
                                  ? "bg-[#024B5E] text-white"
                                  : "bg-gray-200 text-[#024B5E] hover:bg-gray-300"
                              }`}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start date
                        </label>
                        <Input
                          type="text"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End date
                        </label>
                        <Input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Time Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start time
                        </label>
                        <Input
                          type="text"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End time
                        </label>
                        <Input
                          type="text"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                    
                  </>
                ) : (
                  /* Boarding fields */
                  <div className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start date
                        </label>
                        <Input
                          type="text"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End date
                        </label>
                        <Input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Time Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Start time
                        </label>
                        <Input
                          type="text"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          End time
                        </label>
                        <Input
                          type="text"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="border-2 text-[#024B5E] border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pet Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Pet
                  </label>
                  <div className="mb-2 ">
                    <span className=" text-sm text-[#024B5E] font-medium">Your pets</span>
                  </div>
                  <Select value={selectedPet} onValueChange={setSelectedPet}>
                    <SelectTrigger className="h-18 py-8 px-6">
                      <div className="flex items-center gap-4 ml-2">
                        <img
                          src="/Ellipse.png"
                          alt="Pet"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-sm ">Bob</div>
                          <div className="text-xs text-[#024B5E]">
                            Australian Shepherds
                          </div>
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bob" className={""}>
                        Bob - Australian Shepherds
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-[#024B5E] mt-2">
                    Select at least one pet to ensure a more accurate search
                  </p>
                </div>

                {/* Filters Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Filters</h3>

                  {lookingFor === "Dog Walking" ? (
                    /* Dog Walking Filters */
                    <>
                      {/* Other */}
                      <div>
                        
                        <FilterOption
                          label="Dog first aid / CPR"
                          checked={walkingFilters.dogFirstAid}
                          onToggle={() => toggleWalkingFilter("dogFirstAid")}
                        />
                      </div>
                    </>
                  ) : lookingFor === "Doggy Day Care" ? (
                    /* Daycare Filters */
                    <>
                      {/* Day care type */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Day care type
                        </h4>
                        <FilterOption
                          label="In a sitter's home"
                          checked={daycareFilters.sitterAtHome}
                          onToggle={() => toggleDaycareFilter("sitterAtHome")}
                        />
                        <FilterOption
                          label="At a sitter's facility"
                          checked={daycareFilters.atSittersFacility}
                          onToggle={() => toggleDaycareFilter("atSittersFacility")}
                        />
                        <FilterOption
                          label="At your home"
                          checked={daycareFilters.atYourHome}
                          onToggle={() => toggleDaycareFilter("atYourHome")}
                        />
                      </div>

                      {/* Type of home */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Type of home
                        </h4>
                        <FilterOption
                          label="Home"
                          checked={daycareFilters.home}
                          onToggle={() => toggleDaycareFilter("home")}
                        />
                        <FilterOption
                          label="Flats"
                          checked={daycareFilters.flats}
                          onToggle={() => toggleDaycareFilter("flats")}
                        />
                        <FilterOption
                          label="All types"
                          checked={daycareFilters.allTypes}
                          onToggle={() => toggleDaycareFilter("allTypes")}
                        />
                      </div>

                      {/* Daytime availability */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Daytime availability
                        </h4>
                        <FilterOption
                          label="Sitter is home full time"
                          checked={daycareFilters.sitterHomeFullTime}
                          onToggle={() => toggleDaycareFilter("sitterHomeFullTime")}
                        />
                        <FilterOption
                          label="Other is at home full time"
                          checked={daycareFilters.otherAtHomeFullTime}
                          onToggle={() => toggleDaycareFilter("otherAtHomeFullTime")}
                        />
                      </div>

                      {/* Home features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Home features
                        </h4>
                        <FilterOption
                          label="Has fenced garden"
                          checked={daycareFilters.hasFencedGarden}
                          onToggle={() => toggleDaycareFilter("hasFencedGarden")}
                        />
                        <FilterOption
                          label="Pets allowed on furniture"
                          checked={daycareFilters.petsAllowedOnFurniture}
                          onToggle={() => toggleDaycareFilter("petsAllowedOnFurniture")}
                        />
                        <FilterOption
                          label="No smoking home"
                          checked={daycareFilters.noSmokingHome}
                          onToggle={() => toggleDaycareFilter("noSmokingHome")}
                        />
                      </div>

                      {/* Pets in the home */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Pets in the home
                        </h4>
                        <FilterOption
                          label="Doesn't own dogs"
                          checked={daycareFilters.doesntOwnDogs}
                          onToggle={() => toggleDaycareFilter("doesntOwnDogs")}
                        />
                        <FilterOption
                          label="Doesn't own cats"
                          checked={daycareFilters.doesntOwnCats}
                          onToggle={() => toggleDaycareFilter("doesntOwnCats")}
                        />
                        <FilterOption
                          label="Accepts only one booking at a time"
                          checked={daycareFilters.onlyOneBooking}
                          onToggle={() => toggleDaycareFilter("onlyOneBooking")}
                        />
                        <FilterOption
                          label="Does not own caged pets"
                          checked={daycareFilters.doesntOwnCagedPets}
                          onToggle={() => toggleDaycareFilter("doesntOwnCagedPets")}
                        />
                      </div>

                      {/* Children in the home */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Children in the home
                        </h4>
                        <FilterOption
                          label="Has no children"
                          checked={daycareFilters.hasNoChildren}
                          onToggle={() => toggleDaycareFilter("hasNoChildren")}
                        />
                        <FilterOption
                          label="Has no children 0-3 years old"
                          checked={daycareFilters.hasNoChildren0to3}
                          onToggle={() => toggleDaycareFilter("hasNoChildren0to3")}
                        />
                        <FilterOption
                          label="Has no children 6-12 years old"
                          checked={daycareFilters.hasNoChildren6to12}
                          onToggle={() => toggleDaycareFilter("hasNoChildren6to12")}
                        />
                      </div>

                      {/* Others */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Others</h4>
                        <FilterOption
                          label="Accepts non-spayed female dogs"
                          checked={daycareFilters.acceptsNonSpayed}
                          onToggle={() => toggleDaycareFilter("acceptsNonSpayed")}
                        />
                        <FilterOption
                          label="Accepts non-neutered male dogs"
                          checked={daycareFilters.acceptsNonNeutered}
                          onToggle={() => toggleDaycareFilter("acceptsNonNeutered")}
                        />
                        <FilterOption
                          label="Bathing/Grooming"
                          checked={daycareFilters.bathingGrooming}
                          onToggle={() => toggleDaycareFilter("bathingGrooming")}
                        />
                        <FilterOption
                          label="Dog first aid / CPR"
                          checked={daycareFilters.dogFirstAid}
                          onToggle={() => toggleDaycareFilter("dogFirstAid")}
                        />
                      </div>
                    </>
                  ) : (
                    /* Boarding/Walking Filters */
                    <>
                      {/* Daytime availability */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Daytime availability
                        </h4>
                        <FilterOption
                          label="Sitter is home full-time"
                          checked={filters.sitterAtHome}
                          onToggle={() => toggleFilter("sitterAtHome")}
                        />
                      </div>

                      {/* Home features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Home features
                        </h4>
                        <FilterOption
                          label="Has fenced garden"
                          checked={filters.hasFencedGarden}
                          onToggle={() => toggleFilter("hasFencedGarden")}
                        />
                        <FilterOption
                          label="Pets allowed on furniture"
                          checked={filters.petsAllowed}
                          onToggle={() => toggleFilter("petsAllowed")}
                        />
                        <FilterOption
                          label="No smoking home"
                          checked={filters.noSmokingHome}
                          onToggle={() => toggleFilter("noSmokingHome")}
                        />
                        <FilterOption
                          label="All types"
                          checked={filters.allTypes}
                          onToggle={() => toggleFilter("allTypes")}
                        />
                      </div>

                      {/* Pets in the home */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Pets in the home
                        </h4>
                        <FilterOption
                          label="Doesn't own dogs"
                          checked={filters.doesntOwnDogs}
                          onToggle={() => toggleFilter("doesntOwnDogs")}
                        />
                        <FilterOption
                          label="Doesn't own cats"
                          checked={filters.doesntOwnCats}
                          onToggle={() => toggleFilter("doesntOwnCats")}
                        />
                        <FilterOption
                          label="Accepts only one booking at a time"
                          checked={filters.onlyOneBooking}
                          onToggle={() => toggleFilter("onlyOneBooking")}
                        />
                        <FilterOption
                          label="Does not own caged pets"
                          checked={filters.doesntOwnCagedPets}
                          onToggle={() => toggleFilter("doesntOwnCagedPets")}
                        />
                      </div>

                      {/* Children in the home */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Children in the home
                        </h4>
                        <FilterOption
                          label="Has no children"
                          checked={filters.hasNoChildren}
                          onToggle={() => toggleFilter("hasNoChildren")}
                        />
                        <FilterOption
                          label="Has no children 0-3 years old"
                          checked={filters.hasNoChildren0to3}
                          onToggle={() => toggleFilter("hasNoChildren0to3")}
                        />
                        <FilterOption
                          label="Has no children 6-12 years old"
                          checked={filters.hasNoChildren6to12}
                          onToggle={() => toggleFilter("hasNoChildren6to12")}
                        />
                      </div>

                      {/* Others */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Others</h4>
                        <FilterOption
                          label="Accepts non-spayed female dogs"
                          checked={filters.acceptsNonSpayed}
                          onToggle={() => toggleFilter("acceptsNonSpayed")}
                        />
                        <FilterOption
                          label="Accepts non-neutered male dogs"
                          checked={filters.acceptsNonNeutered}
                          onToggle={() => toggleFilter("acceptsNonNeutered")}
                        />
                        <FilterOption
                          label="Bathing/Grooming"
                          checked={filters.bathingGrooming}
                          onToggle={() => toggleFilter("bathingGrooming")}
                        />
                        <FilterOption
                          label="Dog first aid / CPR"
                          checked={filters.dogFirstAid}
                          onToggle={() => toggleFilter("dogFirstAid")}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Apply Filters Button */}
                <div className="pt-4">
                  <Button
                    className="w-full bg-[#024B5E] hover:bg-[#024a5c] text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Apply filters
                  </Button>
                </div>
                  </>
                )}
              </CardContent>
            </div>
          </div>

          {/* Right Section - Sitter Cards */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {sitters.map((sitter, index) => (
              <SitterCard key={index} sitter={sitter} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterOption({ label, checked, onToggle }) {
  return (
    <div
      className="flex items-center justify-between py-2 cursor-pointer"
      onClick={onToggle}
    >
      <span className="text-sm text-[#024B5E]">{label}</span>
      {checked ? (
        <CheckedIcon className="w-5 h-5" />
      ) : (
        <UncheckedIcon className="w-5 h-5" />
      )}
    </div>
  );
}
