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

const BoardingIcon = ({ className = "" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2V4M6 2V4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.05 22C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.4765 5.68186 21.4996 7.80438 21.5 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 8H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 18H21M17 14L17 22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const DaycareIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2V10" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.92969 10.9297L6.33969 12.3397" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 18H4" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 18H22" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.0702 10.9297L17.6602 12.3397" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 22H2" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 6L12 2L16 6" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 18C16 16.9391 15.5786 15.9217 14.8284 15.1716C14.0783 14.4214 13.0609 14 12 14C10.9391 14 9.92172 14.4214 9.17157 15.1716C8.42143 15.9217 8 16.9391 8 18" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const WalkingIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 6C12.1046 6 13 5.10457 13 4C13 2.89543 12.1046 2 11 2C9.89543 2 9 2.89543 9 4C9 5.10457 9.89543 6 11 6Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 10C19.1046 10 20 9.10457 20 8C20 6.89543 19.1046 6 18 6C16.8954 6 16 6.89543 16 8C16 9.10457 16.8954 10 18 10Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 18C21.1046 18 22 17.1046 22 16C22 14.8954 21.1046 14 20 14C18.8954 14 18 14.8954 18 16C18 17.1046 18.8954 18 20 18Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.99975 10C9.65636 10 10.3065 10.1293 10.9132 10.3806C11.5198 10.6319 12.071 11.0002 12.5353 11.4645C12.9996 11.9288 13.3679 12.48 13.6191 13.0866C13.8704 13.6932 13.9997 14.3434 13.9997 15V18.5C13.9995 19.3365 13.6996 20.1452 13.1546 20.7796C12.6095 21.4141 11.8552 21.8324 11.0283 21.9587C10.2015 22.085 9.3567 21.9111 8.64704 21.4683C7.93738 21.0255 7.40976 20.3432 7.15975 19.545C6.73308 18.1683 5.83308 17.2667 4.45975 16.84C3.66193 16.5901 2.97991 16.0629 2.53711 15.3538C2.0943 14.6446 1.91996 13.8004 2.04564 12.9739C2.17131 12.1473 2.58869 11.3931 3.22226 10.8476C3.85582 10.3021 4.66372 10.0015 5.49975 10H8.99975Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const UncheckedIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11.9707 22.75C6.0507 22.75 1.2207 17.93 1.2207 12C1.2207 6.07 6.0507 1.25 11.9707 1.25C17.8907 1.25 22.7207 6.07 22.7207 12C22.7207 17.93 17.9007 22.75 11.9707 22.75ZM11.9707 2.75C6.8707 2.75 2.7207 6.9 2.7207 12C2.7207 17.1 6.8707 21.25 11.9707 21.25C17.0707 21.25 21.2207 17.1 21.2207 12C21.2207 6.9 17.0707 2.75 11.9707 2.75Z" fill="#585858"/>
    <path d="M11.9995 16.98C9.24953 16.98 7.01953 14.75 7.01953 12C7.01953 9.25002 9.24953 7.02002 11.9995 7.02002C14.7495 7.02002 16.9795 9.25002 16.9795 12C16.9795 14.75 14.7495 16.98 11.9995 16.98ZM11.9995 8.52002C10.0795 8.52002 8.51953 10.08 8.51953 12C8.51953 13.92 10.0795 15.48 11.9995 15.48C13.9195 15.48 15.4795 13.92 15.4795 12C15.4795 10.08 13.9195 8.52002 11.9995 8.52002Z" fill="#585858"/>
  </svg>
);

const CheckedIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path opacity="0.4" d="M11.9707 22C17.4936 22 21.9707 17.5228 21.9707 12C21.9707 6.47715 17.4936 2 11.9707 2C6.44786 2 1.9707 6.47715 1.9707 12C1.9707 17.5228 6.44786 22 11.9707 22Z" fill="#035F75"/>
    <path d="M11.9995 16.23C14.3357 16.23 16.2295 14.3362 16.2295 12C16.2295 9.66386 14.3357 7.77002 11.9995 7.77002C9.66337 7.77002 7.76953 9.66386 7.76953 12C7.76953 14.3362 9.66337 16.23 11.9995 16.23Z" fill="#035F75"/>
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



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 font-bakso">
            Find a Match
          </h1>
          <p className="text-gray-600 font-montserrat font-medium">
            Add dates to see sitters who'll be available for your need. These
            are sitters in your area, but they might not be available.
          </p>
        </div>

        <div className="flex gap-6 bg">
          {/* Left Sidebar - Filters or Map */}
          <div className="w-80 shrink-0 bg">
            <div>
              <CardContent className="p-6 space-y-6">
                {/* Filter and Location Buttons */}
                <div className="flex gap-2">
                  <Button
                    className={`font-montserrat transition-all duration-200 ${
                      !showMap
                        ? 'bg-[#035F75] text-white hover:bg-[#024a5c]'
                        : 'bg-white text-[#035F75] border-2 border-[#035F75] hover:bg-[#035F75] hover:text-white'
                    }`}
                    onClick={() => setShowMap(false)}
                  >
                    Filter
                    <FilterIcon />
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-2 border-[#035F75] font-montserrat transition-all duration-200 ${
                      showMap
                        ? 'bg-[#035F75] text-white hover:bg-[#024a5c]'
                        : 'text-[#035F75] bg-white hover:bg-[#035F75] hover:text-white'
                    }`}
                    onClick={() => setShowMap(true)}
                  >
                    Location
                    <LocationIcon />
                  </Button>
                </div>

                {showMap ? (
                  /* Map View */
                  <div className="w-full h-[600px] rounded-lg overflow-hidden">
                    <Map center={[40.7128, -74.0060]} zoom={13} className="h-full w-full">
                      <MapTileLayer />
                      <MapZoomControl />

                      {/* Sitter locations */}
                      <MapMarker position={[40.7128, -74.0060]}>
                        <MapPopup>
                          <div className="font-montserrat">
                            <div className="font-semibold">Seam Rahman</div>
                            <div className="text-sm text-gray-600">New York, NY</div>
                            <div className="text-sm font-semibold text-[#035F75] mt-1">$25/day</div>
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
                  <label className="block text-sm font-semibold mb-2 font-montserrat">
                    Looking For
                  </label>
                  <Select value={lookingFor} onValueChange={setLookingFor} className="font-montserrat">
                    <SelectTrigger className="w-full flex items-center justify-between px-4 py-3 border rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boarding" className={"font-montserrat"}><BoardingIcon className="inline-block mr-2" /> Boarding</SelectItem>
                      <SelectItem value="daycare" className={"font-montserrat"}><DaycareIcon className="inline-block mr-2" />Daycare</SelectItem>
                      <SelectItem value="walking" className={"font-montserrat"}><WalkingIcon className="inline-block mr-2" />Walking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time Inputs - Grouped */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  {/* Date Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 font-montserrat">
                        Start date
                      </label>
                      <Input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-2 text-gray-400 border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0 font-montserrat"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 font-montserrat">
                        End date
                      </label>
                      <Input
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border-2 text-gray-400 border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0 font-montserrat"
                      />
                    </div>
                  </div>

                  {/* Time Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 font-montserrat">
                        Start time
                      </label>
                      <Input
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border-2 text-gray-400 border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0 font-montserrat"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 font-montserrat">
                        End time
                      </label>
                      <Input
                        type="text"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border-2 text-gray-400 border-gray-200 rounded-b-sm px-0 p-2 focus-visible:ring-0 font-montserrat"
                      />
                    </div>
                  </div>
                </div>

                {/* Pet Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 font-montserrat">
                    Pet
                  </label>
                  <div className="mb-2 ">
                    <span className=" text-sm text-black font-medium font-montserrat">Your pets</span>
                  </div>
                  <Select value={selectedPet} onValueChange={setSelectedPet}>
                    <SelectTrigger className="h-18 py-8 px-6">
                      <div className="flex items-center gap-4 ml-2">
                        <img
                          src="/Ellipse.png"
                          alt="Pet"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-left font-montserrat">
                          <div className="font-semibold text-sm font-montserrat ">Bob</div>
                          <div className="text-xs text-gray-500 font-montserrat">
                            Australian Shepherds
                          </div>
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bob" className={"font-montserrat"}>
                        Bob - Australian Shepherds
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2 font-montserrat">
                    Select at least one pet to ensure a more accurate search
                  </p>
                </div>

                {/* Filters Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4 font-montserrat">Filters</h3>

                  {/* Daytime availability */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 font-montserrat">
                      Daytime availability
                    </h4>
                    {/* <FilterOption
                      label="Sitter is home full-time"
                      checked={filters.sitterAtHome}
                      type="radio"
                    /> */}
                  </div>

                  {/* Home features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 font-montserrat">
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
                </div>
                  </>
                )}
              </CardContent>
            </div>
          </div>

          {/* Right Section - Sitter Cards */}
          <div className="flex-1 space-y-4">
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
      <span className="text-sm text-gray-700 font-montserrat">{label}</span>
      {checked ? (
        <CheckedIcon className="w-5 h-5" />
      ) : (
        <UncheckedIcon className="w-5 h-5" />
      )}
    </div>
  );
}
