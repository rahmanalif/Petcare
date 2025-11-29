"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Info, MapPin } from "lucide-react";
import DogWalkingForm from "@/component/createServices/DogWalkingForm";
import DoggyDayCareForm from "@/component/createServices/DoggyDayCareForm";

export default function ServiceSetupForm() {
  const [serviceType, setServiceType] = useState("Dog Walking");
  const [baseRate, setBaseRate] = useState("28.00");
  const [updateRates, setUpdateRates] = useState(true);
  const [showAdditionalRates, setShowAdditionalRates] = useState(false);
  const [walksPerDay, setWalksPerDay] = useState("4");
  const [petsPerDay, setPetsPerDay] = useState("3");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [useHomeAddress, setUseHomeAddress] = useState(true);
  const [location, setLocation] = useState("1000, BD");
  const [distanceType, setDistanceType] = useState("miles");
  const [serviceArea, setServiceArea] = useState("0");
  const [travelModes, setTravelModes] = useState(["Walking"]);
  const [petSizes, setPetSizes] = useState([
    "Small dog (0-15 lbs)",
    "Medium dog (16-40 lbs)",
    "Large dog (41-100 lbs)",
    "Giant dog (100+ lbs)",
  ]);
  const [acceptPuppies, setAcceptPuppies] = useState("yes");
  const [cancellationPolicies, setCancellationPolicies] = useState([
    "Same day",
    "One day",
    "Two day",
    "Three day",
  ]);

  // Handle service type change
  useEffect(() => {
    if (serviceType === "Dog Walking") {
      setBaseRate("28.00");
      setWalksPerDay("4");
    } else if (serviceType === "Doggy Day Care") {
      setBaseRate("35.00");
      setPetsPerDay("3");
    } else if (serviceType === "Boarding") {
      setBaseRate("45.00");
    }
  }, [serviceType]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = ["6am - 11am", "11am - 3am", "3am - 10am", "None"];
  const travelOptions = ["Walking", "Cycling", "Driving"];
  const petSizeOptions = [
    "Small dog (0-15 lbs)",
    "Medium dog (16-40 lbs)",
    "Large dog (41-100 lbs)",
    "Giant dog (100+ lbs)",
  ];
  const cancellationOptions = ["Same day", "One day", "Two day", "Three day"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const toggleTravelMode = (mode) => {
    setTravelModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const togglePetSize = (size) => {
    setPetSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleCancellationPolicy = (policy) => {
    setCancellationPolicies((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-2xl">
        {/* Service Name Section */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-900 mb-3">
            Service name
          </label>
          <div className="relative">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#035F75] focus:border-transparent"
            >
              <option>Dog Walking</option>
              <option>Boarding</option>
              <option>Doggy Day Care</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="mt-4 flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              We have suggested some default settings based on what works well for new sitters and walkers. You can edit now, or at any time in the future.
            </p>
          </div>
        </div>

        {/* Render appropriate form based on service type */}
        {serviceType === "Dog Walking" && (
          <DogWalkingForm
            baseRate={baseRate}
            setBaseRate={setBaseRate}
            updateRates={updateRates}
            setUpdateRates={setUpdateRates}
            walksPerDay={walksPerDay}
            setWalksPerDay={setWalksPerDay}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            selectedTimeSlots={selectedTimeSlots}
            toggleTimeSlot={toggleTimeSlot}
            days={days}
            timeSlots={timeSlots}
          />
        )}

        {serviceType === "Doggy Day Care" && (
          <DoggyDayCareForm
            baseRate={baseRate}
            setBaseRate={setBaseRate}
            updateRates={updateRates}
            setUpdateRates={setUpdateRates}
            petsPerDay={petsPerDay}
            setPetsPerDay={setPetsPerDay}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            selectedTimeSlots={selectedTimeSlots}
            toggleTimeSlot={toggleTimeSlot}
            days={days}
            timeSlots={timeSlots}
            cancellationPolicies={cancellationPolicies}
            toggleCancellationPolicy={toggleCancellationPolicy}
            cancellationOptions={cancellationOptions}
          />
        )}

        {/* Show Additional Rates Button */}
        <button
          onClick={() => setShowAdditionalRates(!showAdditionalRates)}
          className="w-full px-4 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors flex items-center justify-center gap-2 mb-8"
        >
          Show additional rates
          <ChevronDown className={`w-5 h-5 transition-transform ${showAdditionalRates ? 'rotate-180' : ''}`} />
        </button>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-semibold text-gray-900">
              Use my home address
            </label>
            <button
              onClick={() => setUseHomeAddress(!useHomeAddress)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                useHomeAddress ? "bg-[#035F75]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  useHomeAddress ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035F75] focus:border-transparent mb-6"
          />

          {/* Service Area */}
          <label className="block text-base font-semibold text-gray-900 mb-2">
            Service Area
          </label>
          <p className="text-sm text-gray-700 mb-4">
            The service area you define here will be for house sitting.
          </p>

          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-sm font-medium text-gray-900 mb-2">Location</div>
            <div className="text-sm text-gray-600 mb-3">New York, NY</div>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Distance Type */}
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Distance type
          </label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="distanceType"
                value="miles"
                checked={distanceType === "miles"}
                onChange={(e) => setDistanceType(e.target.value)}
                className="w-4 h-4 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
              />
              <span className="text-gray-700">Miles</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="distanceType"
                value="minutes"
                checked={distanceType === "minutes"}
                onChange={(e) => setDistanceType(e.target.value)}
                className="w-4 h-4 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
              />
              <span className="text-gray-700">Minutes</span>
            </label>
          </div>

          {/* Service Area Input */}
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Service area
          </label>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035F75] focus:border-transparent"
            />
            <span className="text-gray-600">Miles</span>
          </div>

          {/* Travel Mode */}
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Travel mode
          </label>
          <div className="space-y-3 mb-8">
            {travelOptions.map((mode) => (
              <label key={mode} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={travelModes.includes(mode)}
                  onChange={() => toggleTravelMode(mode)}
                  className="w-5 h-5 rounded border-gray-300 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
                />
                <span className="text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pet Types Section */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-900 mb-3">
            What type of pets can you host in your home?
          </label>
          <div className="space-y-3 mb-6">
            {petSizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={petSizes.includes(size)}
                  onChange={() => togglePetSize(size)}
                  className="w-5 h-5 rounded border-gray-300 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
                />
                <span className="text-gray-700">{size}</span>
              </label>
            ))}
          </div>

          {/* Accept Puppies */}
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Do you accept puppies under 1 year old?
          </label>
          <div className="flex gap-4 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="acceptPuppies"
                value="yes"
                checked={acceptPuppies === "yes"}
                onChange={(e) => setAcceptPuppies(e.target.value)}
                className="w-4 h-4 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="acceptPuppies"
                value="no"
                checked={acceptPuppies === "no"}
                onChange={(e) => setAcceptPuppies(e.target.value)}
                className="w-4 h-4 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Create Service Button */}
        <button className="w-full px-6 py-4 bg-[#035F75] text-white rounded-lg font-semibold text-lg hover:bg-[#024a5c] transition-colors">
          Create Service
        </button>
      </div>
    </div>
  );
}