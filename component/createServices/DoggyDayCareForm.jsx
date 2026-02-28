"use client";
import React, { useState } from "react";
import { ChevronDown, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";

export default function DoggyDayCareForm() {
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation();

  const [baseRate, setBaseRate] = useState("35.00");
  const [updateRates, setUpdateRates] = useState(true);
  const [showAdditionalRates, setShowAdditionalRates] = useState(false);
  const [petsPerDay, setPetsPerDay] = useState("3");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [useHomeAddress, setUseHomeAddress] = useState(true);
  const [location, setLocation] = useState("1000, BD");
  const [distanceType, setDistanceType] = useState("miles");
  const [serviceArea, setServiceArea] = useState("0");
  const [travelModes, setTravelModes] = useState(["Walking"]);
  const [petSizes, setPetSizes] = useState(["Small dog (0-15 lbs)"]);
  const [acceptPuppies, setAcceptPuppies] = useState("yes");
  const [cancellationPolicies, setCancellationPolicies] = useState(["One day"]);

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

  // --- API INTEGRATION ---
  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        message: "Service settings updated",
        settings: {
          serviceType: "daycare",
          dayCareType: "in_sitter_home", // Defaulting based on form context
          rates: {
            dayCare: parseFloat(baseRate) || 0,
            base: parseFloat(baseRate) || 0,
            pickupDropoff: 48, // Example default
            additionalRate: 28
          },
          availability: {
            isHomeFullTime: false,
            availableDays: selectedDays,
            timeSlots: selectedTimeSlots,
            pottyBreakFrequency: "2-4 hours"
          },
          serviceArea: {
            useHomeAddress,
            location,
            radius: parseInt(serviceArea) || 0,
            distanceType,
            travelModes
          },
          petPreferences: {
            allowedSizes: petSizes.map(s => s.split(" ")[0].toLowerCase()),
            puppiesUnderOneYear: acceptPuppies === "yes",
            maxPetsPerDay: parseInt(petsPerDay) || 1
          },
          cancellationPolicy: cancellationPolicies,
          homeDetails: {
            homeType: ["Apartment"],
            yardType: ["No yard"],
            homeAttributes: []
          }
        }
      };

      const response = await fetchWithAuth(`${API_BASE}/api/sitter/services/daycare`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t("create_services.daycare.success"));
      } else {
        toast.error(data.message || t("create_services.daycare.error"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("create_services.daycare.server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Update Rates Checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={updateRates}
            onChange={(e) => setUpdateRates(e.target.checked)}
            className="custom-checkbox mt-0.5"
          />
          <div>
            <span className="text-[#024B5E] font-medium">
              {t("create_services.daycare.update_rates")}
            </span>
            <p className="text-sm text-[#024B5E] mt-1">
              {t("create_services.daycare.update_rates_hint")}
            </p>
          </div>
        </label>
      </div>

      {/* Show Additional Rates Button */}
      <button
        onClick={() => setShowAdditionalRates(!showAdditionalRates)}
        className="w-full px-4 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors flex items-center justify-center gap-2 mb-8"
      >
        {showAdditionalRates ? t("create_services.daycare.hide_additional") : t("create_services.daycare.show_additional")}
        <ChevronDown className={`w-5 h-5 transition-transform ${showAdditionalRates ? "rotate-180" : ""}`} />
      </button>

      {/* Additional Rates Section */}
      {showAdditionalRates && (
        <div className="mb-8 space-y-6">
          <div>
            <h4 className="text-base font-semibold text-[#024B5E] mb-3">{t("create_services.daycare.60_min_rate")}</h4>
            <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-[#024B5E]">{t("create_services.daycare.per_day")}</span>
              <span className="text-[#024B5E] font-semibold">$35.00</span>
            </div>
            <p className="text-sm text-[#024B5E] mt-2">{t("create_services.daycare.you_keep")}30.00</p>
          </div>
          {/* ... other rates ... */}
        </div>
      )}

      {/* Base Rate Section */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-[#024B5E] mb-3">
          {t("create_services.daycare.base_rate")}
        </label>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-[#024B5E]">{t("create_services.daycare.per_day")}</span>
          <div className="flex items-center">
            <span className="text-[#024B5E] font-semibold mr-1">$</span>
            <input
              type="number"
              value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)}
              className="w-20 bg-transparent text-[#024B5E] font-semibold focus:outline-none"
            />
          </div>
        </div>
        <p className="text-sm text-[#024B5E] mt-2">
          {t("create_services.daycare.earn_per_service")} {(parseFloat(baseRate || 0) * 0.86).toFixed(2)}
        </p>
      </div>

      {/* Availability Section */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-[#024B5E] mb-4">{t("create_services.daycare.availability")}</h3>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">
          {t("create_services.daycare.pets_per_day")}
        </label>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white mb-4">
          <span className="text-[#024B5E]">{t("create_services.daycare.per_day")}</span>
          <input
            type="number"
            value={petsPerDay}
            onChange={(e) => setPetsPerDay(e.target.value)}
            className="text-[#024B5E] font-semibold bg-transparent border-none outline-none text-right w-16"
            min="1"
          />
        </div>

        {/* Days of Week */}
        <div className="flex gap-2 mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`flex-1 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${selectedDays.includes(day)
                ? "bg-[#035F75] text-white border-[#035F75]"
                : "bg-white text-[#024B5E] border-gray-300 hover:bg-gray-50"
                }`}
            >
              {t(`create_services.daycare.days_of_week.${day}`)}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {timeSlots.map((slot) => (
            <label key={slot} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTimeSlots.includes(slot)}
                onChange={() => toggleTimeSlot(slot)}
                className="custom-checkbox"
              />
              <span className="text-[#024B5E]">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-[#024B5E] mb-3">
          {t("create_services.daycare.cancellation_policy")}
        </label>
        <div className="space-y-3">
          {cancellationOptions.map((policy) => (
            <label key={policy} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cancellationPolicies.includes(policy)}
                onChange={() => toggleCancellationPolicy(policy)}
                className="custom-checkbox"
              />
              <span className="text-[#024B5E]">{policy}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-semibold text-[#024B5E]">{t("create_services.daycare.use_home_address")}</label>
          <button onClick={() => setUseHomeAddress(!useHomeAddress)} className={`relative w-12 h-6 rounded-full transition-colors ${useHomeAddress ? "bg-[#035F75]" : "bg-gray-300"}`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useHomeAddress ? "translate-x-6" : ""}`} />
          </button>
        </div>

        <label className="block text-sm font-semibold text-[#024B5E] mb-2">{t("create_services.daycare.location")}</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035F75] mb-6" />

        <label className="block text-sm font-semibold text-[#024B5E] mb-3">{t("create_services.daycare.distance_type")}</label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="distanceType" value="miles" checked={distanceType === "miles"} onChange={(e) => setDistanceType(e.target.value)} className="w-4 h-4 text-[#035F75]" />
            <span className="text-[#024B5E]">Miles</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="distanceType" value="minutes" checked={distanceType === "minutes"} onChange={(e) => setDistanceType(e.target.value)} className="w-4 h-4 text-[#035F75]" />
            <span className="text-[#024B5E]">Minutes</span>
          </label>
        </div>

        <label className="block text-sm font-semibold text-[#024B5E] mb-2">{t("create_services.daycare.service_area")}</label>
        <div className="flex items-center gap-2 mb-4">
          <input type="text" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035F75]" />
          <span className="text-[#024B5E] capitalize">{distanceType}</span>
        </div>

        <label className="block text-sm font-semibold text-[#024B5E] mb-3">{t("create_services.daycare.travel_mode")}</label>
        <div className="space-y-3 mb-8">
          {travelOptions.map((mode) => (
            <label key={mode} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={travelModes.includes(mode)} onChange={() => toggleTravelMode(mode)} className="custom-checkbox" />
              <span className="text-[#024B5E]">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pet Types Section */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-[#024B5E] mb-3">{t("create_services.daycare.pet_preferences")}</label>
        <div className="space-y-3 mb-6">
          {petSizeOptions.map((size) => (
            <label key={size} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={petSizes.includes(size)} onChange={() => togglePetSize(size)} className="custom-checkbox" />
              <span className="text-[#024B5E]">{size}</span>
            </label>
          ))}
        </div>

        <label className="block text-sm font-semibold text-[#024B5E] mb-3">{t("create_services.daycare.accept_puppies")}</label>
        <div className="flex gap-4 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="acceptPuppiesDaycare" value="yes" checked={acceptPuppies === "yes"} onChange={(e) => setAcceptPuppies(e.target.value)} className="w-4 h-4 text-[#035F75]" />
            <span className="text-[#024B5E]">{t("create_services.daycare.yes")}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="acceptPuppiesDaycare" value="no" checked={acceptPuppies === "no"} onChange={(e) => setAcceptPuppies(e.target.value)} className="w-4 h-4 text-[#035F75]" />
            <span className="text-[#024B5E]">{t("create_services.daycare.no")}</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 border-t pt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full px-6 py-4 bg-[#035F75] text-white text-lg font-bold rounded-lg hover:bg-[#024a5c] transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : t("create_services.daycare.save_settings")}
        </button>
      </div>
    </>
  );
}
