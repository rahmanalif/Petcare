"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Loader2, Info, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { updateServiceSettings, fetchServiceSettings } from "@/redux/sitter/sitterSlice";
import { useTranslation } from "react-i18next";

// ─────────────────────────────────────────
// SHARED SERVICE FORM (Boarding / Daycare / Walking)
// ─────────────────────────────────────────
const SharedServiceForm = forwardRef(({ serviceType }, ref) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { updating } = useSelector((state) => state.sitter);

  // ── Rates ──
  const [isAway, setIsAway] = useState(false);
  const [baseRate, setBaseRate] = useState("28.00");
  const [updateRates, setUpdateRates] = useState(true);
  const [showAdditionalRates, setShowAdditionalRates] = useState(false);
  const [holidayRate, setHolidayRate] = useState("28.00");
  const [puppyRate, setPuppyRate] = useState("28.00");
  const [extendedStayRate, setExtendedStayRate] = useState("28.00");
  const [bathingRate, setBathingRate] = useState("28.00");
  const [bathingFree, setBathingFree] = useState(false);
  const [pickupRate, setPickupRate] = useState("28.00");

  // ── Availability ──
  const [isHomeFullTime, setIsHomeFullTime] = useState("Yes");
  const [selectedDays, setSelectedDays] = useState([]);
  const [pottyBreak, setPottyBreak] = useState("2-4 hours");

  // ── Pet Preferences ──
  const [maxPetsPerDay, setMaxPetsPerDay] = useState(1);
  const [petSizes, setPetSizes] = useState([]);

  // ── Walking specific ──
  const [maxWalksPerDay, setMaxWalksPerDay] = useState(4);
  const [timeSlots, setTimeSlots] = useState([]);

  // ── About Your Home ──
  const [homeTypes, setHomeTypes] = useState([]);
  const [yardTypes, setYardTypes] = useState([]);
  const [homeExpectations, setHomeExpectations] = useState([]);
  const [hostingCapabilities, setHostingCapabilities] = useState([]);

  // ── Cancellation ──
  const [cancellationPolicies, setCancellationPolicies] = useState([]);

  const days = [
    t("create_services.boarding.days_of_week.Sun") || "Sun",
    t("create_services.boarding.days_of_week.Mon") || "Mon",
    t("create_services.boarding.days_of_week.Tue") || "Tue",
    t("create_services.boarding.days_of_week.Wed") || "Wed",
    t("create_services.boarding.days_of_week.Thu") || "Thu",
    t("create_services.boarding.days_of_week.Fri") || "Fri",
    t("create_services.boarding.days_of_week.Sat") || "Sat",
  ];
  const dayValues = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const pottyBreakOptions = [
    { label: t("create_service_form.potty_options.0_2"), value: "0-2 hours" },
    { label: t("create_service_form.potty_options.2_4"), value: "2-4 hours" },
    { label: t("create_service_form.potty_options.4_8"), value: "4-8 hours" },
    { label: t("create_service_form.potty_options.8_plus"), value: "8+ hours" },
  ];

  const timeSlotsOptions = [
    { label: t("create_service_form.time_slots.6am_11am"), value: "6am - 11am" },
    { label: t("create_service_form.time_slots.11am_3pm"), value: "11am - 3pm" },
    { label: t("create_service_form.time_slots.3pm_10pm"), value: "3pm - 10pm" },
    { label: t("create_service_form.time_slots.none"), value: "None" },
  ];

  const petSizeOptions = [
    { label: t("create_service_form.pet_sizes.small"), value: "small" },
    { label: t("create_service_form.pet_sizes.medium"), value: "medium" },
    { label: t("create_service_form.pet_sizes.large"), value: "large" },
    { label: t("create_service_form.pet_sizes.giant"), value: "giant" },
  ];

  const homeTypeOptions = [
    { label: t("create_service_form.home_types.house"), value: "House" },
    { label: t("create_service_form.home_types.apartment"), value: "Apartment" },
    { label: t("create_service_form.home_types.farm"), value: "Farm" },
  ];

  const yardTypeOptions = [
    { label: t("create_service_form.yard_types.fenced"), value: "Fenced yard" },
    { label: t("create_service_form.yard_types.unfenced"), value: "Unfenced yard" },
    { label: t("create_service_form.yard_types.no_yard"), value: "No yard" },
  ];

  const homeExpectationOptions = [
    { label: t("create_service_form.home_expectation_options.smoking"), value: "Smoking inside home" },
    { label: t("create_service_form.home_expectation_options.children_0_5"), value: "Children age 0-5" },
    { label: t("create_service_form.home_expectation_options.children_6_12"), value: "Children age 6-12" },
    { label: t("create_service_form.home_expectation_options.dogs_on_bed"), value: "Dogs are allowed on bed" },
    { label: t("create_service_form.home_expectation_options.cats_in_home"), value: "Cats in home" },
    { label: t("create_service_form.home_expectation_options.caged_pets"), value: "Caged pets in home" },
    { label: t("create_service_form.home_expectation_options.none"), value: "None of the above" },
  ];

  const hostingCapabilityOptions = [
    { label: t("create_service_form.hosting_options.different_families"), value: "Pets from different families at the same time" },
    { label: t("create_service_form.hosting_options.puppies"), value: "Puppies under 1 year old" },
    { label: t("create_service_form.hosting_options.not_crate_trained"), value: "Dogs that are not crate trained" },
    { label: t("create_service_form.hosting_options.unneutered_male"), value: "Unneudtered male dog" },
    { label: t("create_service_form.hosting_options.unsprayed_female"), value: "Unsprayed female dogs" },
    { label: t("create_service_form.hosting_options.female_in_heat"), value: "Female dogs in heat" },
    { label: t("create_service_form.hosting_options.none"), value: "None of the above" },
  ];

  const cancellationOptions = [
    { label: t("create_service_form.cancellation_options.same_day"), value: "Same day" },
    { label: t("create_service_form.cancellation_options.one_day"), value: "One day" },
    { label: t("create_service_form.cancellation_options.two_day"), value: "Two day" },
    { label: t("create_service_form.cancellation_options.three_day"), value: "Three day" },
  ];

  const toggle = (arr, setArr, val) =>
    setArr((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const isWalking = serviceType === "walking";
  const isDaycare = serviceType === "daycare";
  const isBoarding = serviceType === "boarding";

  const handleSave = async () => {
    try {
      const payload = {
        isAway,
        rates: {
          base: parseFloat(baseRate) || 0,
          holiday: parseFloat(holidayRate) || 0,
          puppy: parseFloat(puppyRate) || 0,
          extendedStay: parseFloat(extendedStayRate) || 0,
          bathing: parseFloat(bathingRate) || 0,
          bathingFree,
          pickup: parseFloat(pickupRate) || 0,
        },
        availability: {
          isHomeFullTime: isHomeFullTime === "Yes",
          availableDays: selectedDays,
          pottyBreakFrequency: pottyBreak,
          ...(isWalking && { maxWalksPerDay }),
          ...(!isWalking && { timeSlots }),
        },
        petPreferences: {
          maxPetsPerDay,
          allowedSizes: petSizes,
        },
        homeDetails: {
          homeTypes,
          yardTypes,
          homeExpectations,
          hostingCapabilities,
        },
        cancellationPolicy: cancellationPolicies,
      };

      await dispatch(updateServiceSettings({ serviceType, serviceData: payload })).unwrap();
      toast.success(t("create_service_form.save_success"));
    } catch (error) {
      toast.error(typeof error === "string" ? error : t("create_service_form.save_error"));
    }
  };

  useImperativeHandle(ref, () => ({ handleSave }));

  const RateRow = ({ label, value, onChange, showKeep = true }) => (
    <div className="mb-6">
      <h4 className="text-base font-semibold text-[#024B5E] mb-3">{label}</h4>
      <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
        <span className="text-[#024B5E]">{isWalking ? t("create_service_form.per_walk") : t("create_service_form.per_day")}</span>
        <div className="flex items-center gap-1">
          <span className="text-[#024B5E] font-semibold">$</span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 bg-transparent text-[#024B5E] font-semibold focus:outline-none text-right"
          />
        </div>
      </div>
      {showKeep && (
        <p className="text-sm text-[#024B5E] mt-2">
          {t("create_service_form.you_keep")}{(parseFloat(value || 0) * 0.86).toFixed(2)}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Set Yourself as Away */}
      <div className="flex items-center justify-between mb-6 p-4 border border-gray-200 rounded-lg">
        <span className="text-[#024B5E] font-medium">{t("create_service_form.set_away")}</span>
        <button
          onClick={() => setIsAway(!isAway)}
          className={`relative w-12 h-6 rounded-full transition-colors ${isAway ? "bg-[#035F75]" : "bg-gray-300"}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isAway ? "translate-x-6" : ""}`} />
        </button>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 p-3 bg-[#E3E6F0] rounded-lg mb-6">
        <Info className="w-5 h-5 text-[#024B5E] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#024B5E]">
          {t("create_service_form.info_text")}
        </p>
      </div>

      {/* Base Rate */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-[#024B5E] mb-3">{t("create_service_form.set_base_rate")}</label>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-[#024B5E]">{isWalking ? t("create_service_form.per_walk") : t("create_service_form.per_day")}</span>
          <div className="flex items-center gap-1">
            <span className="text-[#024B5E] font-semibold">$</span>
            <input
              type="number"
              value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)}
              className="w-20 bg-transparent text-[#024B5E] font-semibold focus:outline-none text-right"
            />
          </div>
        </div>
        <p className="text-sm text-[#024B5E] mt-2">
          {t("create_service_form.earn_per_service")}{(parseFloat(baseRate || 0) * 0.86).toFixed(2)}
        </p>
      </div>

      {/* Update Rates Checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={updateRates}
            onChange={(e) => setUpdateRates(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#035F75]"
          />
          <div>
            <span className="text-[#024B5E] font-medium">{t("create_service_form.update_rates")}</span>
            <p className="text-sm text-[#024B5E] mt-1">{t("create_service_form.turn_off_hint")}</p>
          </div>
        </label>
      </div>

      {/* Additional Rates */}
      <RateRow label={t("create_service_form.holiday_rate")} value={holidayRate} onChange={setHolidayRate} />
      <RateRow label={t("create_service_form.puppy_rate")} value={puppyRate} onChange={setPuppyRate} />
      {(isBoarding || isDaycare) && (
        <RateRow label={t("create_service_form.extended_stay_rate")} value={extendedStayRate} onChange={setExtendedStayRate} />
      )}

      {/* Bathing / Grooming */}
      <div className="mb-6">
        <h4 className="text-base font-semibold text-[#024B5E] mb-3">{t("create_service_form.bathing_grooming")}</h4>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-[#024B5E]">{isWalking ? t("create_service_form.per_walk") : t("create_service_form.per_day")}</span>
          <div className="flex items-center gap-1">
            <span className="text-[#024B5E] font-semibold">$</span>
            <input type="number" value={bathingRate} onChange={(e) => setBathingRate(e.target.value)} className="w-20 bg-transparent text-[#024B5E] font-semibold focus:outline-none text-right" />
          </div>
        </div>
        <p className="text-sm text-[#024B5E] mt-2">{t("create_service_form.you_keep")}{(parseFloat(bathingRate || 0) * 0.86).toFixed(2)}</p>
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input type="checkbox" checked={bathingFree} onChange={(e) => setBathingFree(e.target.checked)} className="w-4 h-4 accent-[#035F75]" />
          <span className="text-[#024B5E] text-sm">{t("create_service_form.offer_free")}</span>
        </label>
      </div>

      {/* Daily Sitter Pick-Up/Drop-Off */}
      <div className="mb-6">
        <h4 className="text-base font-semibold text-[#024B5E] mb-3">{t("create_service_form.pickup_dropoff")}</h4>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-[#024B5E]">{isWalking ? t("create_service_form.per_walk") : t("create_service_form.per_day")}</span>
          <div className="flex items-center gap-1">
            <span className="text-[#024B5E] font-semibold">$</span>
            <input type="number" value={pickupRate} onChange={(e) => setPickupRate(e.target.value)} className="w-20 bg-transparent text-[#024B5E] font-semibold focus:outline-none text-right" />
          </div>
        </div>
        <p className="text-sm text-[#024B5E] mt-2">{t("create_service_form.you_keep_80")}</p>
      </div>

      {/* Show/Hide Additional Rates Button */}
      <button
        onClick={() => setShowAdditionalRates(!showAdditionalRates)}
        className="w-full px-4 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors flex items-center justify-center gap-2 mb-8"
      >
        {showAdditionalRates ? t("create_service_form.hide_additional") : t("create_service_form.show_additional")}
        <ChevronDown className={`w-5 h-5 transition-transform ${showAdditionalRates ? "rotate-180" : ""}`} />
      </button>

      {/* ── AVAILABILITY ── */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-[#024B5E] mb-4">{t("create_service_form.availability")}</h3>

        {/* Walking: walks per day */}
        {isWalking ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.walks_per_day")}</label>
            <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <span className="text-[#024B5E]">{t("create_service_form.per_day")}</span>
              <input type="number" value={maxWalksPerDay} onChange={(e) => setMaxWalksPerDay(parseInt(e.target.value) || 1)} min="1" className="text-[#024B5E] font-semibold bg-transparent border-none outline-none text-right w-16" />
            </div>
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.home_full_time")}</label>
            <div className="flex gap-4 mb-4">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={`homeFullTime_${serviceType}`} value={val} checked={isHomeFullTime === val} onChange={() => setIsHomeFullTime(val)} className="w-4 h-4 accent-[#035F75]" />
                  <span className="text-[#024B5E]">{val === "Yes" ? t("create_service_form.yes") : t("create_service_form.no")}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-[#024B5E] mb-4">{t("create_service_form.edit_calendar")}</p>
          </>
        )}

        {/* Days */}
        <div className="flex gap-1 sm:gap-2 mb-6">
          {days.map((day, i) => (
            <button
              key={dayValues[i]}
              onClick={() => toggle(selectedDays, setSelectedDays, dayValues[i])}
              className={`flex-1 py-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedDays.includes(dayValues[i]) ? "bg-[#035F75] text-white border-[#035F75]" : "bg-white text-[#024B5E] border-gray-300 hover:bg-gray-50"}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Walking: time slots */}
        {isWalking && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {timeSlotsOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={timeSlots.includes(value)} onChange={() => toggle(timeSlots, setTimeSlots, value)} className="w-4 h-4 accent-[#035F75]" />
                <span className="text-[#024B5E] text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Potty break (boarding/daycare) */}
        {!isWalking && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.potty_break")}</label>
            <div className="grid grid-cols-2 gap-3">
              {pottyBreakOptions.map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={`potty_${serviceType}`} value={value} checked={pottyBreak === value} onChange={() => setPottyBreak(value)} className="w-4 h-4 accent-[#035F75]" />
                  <span className="text-[#024B5E] text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── PET PREFERENCES ── */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-[#024B5E] mb-4">{t("create_service_form.pet_preferences")}</h3>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">
          {t("create_service_form.max_pets")}
        </label>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setMaxPetsPerDay((p) => Math.max(1, p - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <Minus className="w-4 h-4 text-[#024B5E]" />
          </button>
          <span className="text-[#024B5E] font-semibold w-6 text-center">{maxPetsPerDay}</span>
          <button onClick={() => setMaxPetsPerDay((p) => p + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <Plus className="w-4 h-4 text-[#024B5E]" />
          </button>
        </div>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.pet_types")}</label>
        <div className="space-y-3 mb-6">
          {petSizeOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={petSizes.includes(value)} onChange={() => toggle(petSizes, setPetSizes, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── ABOUT YOUR HOME ── */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-[#024B5E] mb-4">{t("create_service_form.about_home")}</h3>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.home_type")}</label>
        <div className="space-y-3 mb-6">
          {homeTypeOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={homeTypes.includes(value)} onChange={() => toggle(homeTypes, setHomeTypes, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.yard_type")}</label>
        <div className="space-y-3 mb-6">
          {yardTypeOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={yardTypes.includes(value)} onChange={() => toggle(yardTypes, setYardTypes, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.home_expectations")}</label>
        <div className="space-y-3 mb-6">
          {homeExpectationOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={homeExpectations.includes(value)} onChange={() => toggle(homeExpectations, setHomeExpectations, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>

        <label className="block text-sm font-medium text-[#024B5E] mb-3">{t("create_service_form.hosting_capabilities")}</label>
        <div className="space-y-3 mb-6">
          {hostingCapabilityOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hostingCapabilities.includes(value)} onChange={() => toggle(hostingCapabilities, setHostingCapabilities, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── CANCELLATION POLICY ── */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-[#024B5E] mb-3">
          {isBoarding
            ? t("create_service_form.cancellation_policy_boarding")
            : isDaycare
              ? t("create_service_form.cancellation_policy_daycare")
              : t("create_service_form.cancellation_policy_walking")}
        </label>
        <div className="space-y-3">
          {cancellationOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={cancellationPolicies.includes(value)} onChange={() => toggle(cancellationPolicies, setCancellationPolicies, value)} className="w-4 h-4 accent-[#035F75]" />
              <span className="text-[#024B5E] text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
});
SharedServiceForm.displayName = "SharedServiceForm";

// ─────────────────────────────────────────
// MAIN WRAPPER
// ─────────────────────────────────────────
export default function ServiceSetupForm() {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = useState("boarding");
  const formRef = React.useRef(null);
  const dispatch = useDispatch();
  const { updating } = useSelector((state) => state.sitter);

  const handleCreateService = () => {
    if (formRef.current) formRef.current.handleSave();
  };

  const serviceOptions = [
    { value: "boarding", label: t("create_service_form.boarding") },
    { value: "daycare", label: t("create_service_form.doggy_day_care") },
    { value: "walking", label: t("create_service_form.dog_walking") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 w-full max-w-2xl">

        {/* Service Type Selector */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-[#024B5E] mb-3">{t("create_service_form.service_name")}</label>
          <div className="relative">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-[#024B5E] focus:outline-none focus:ring-2 focus:ring-[#035F75]"
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E] pointer-events-none" />
          </div>
        </div>

        <SharedServiceForm key={serviceType} ref={formRef} serviceType={serviceType} />

        {/* Create Service Button */}
        <button
          onClick={handleCreateService}
          disabled={updating}
          className="w-full px-6 py-4 bg-[#035F75] text-white rounded-lg font-semibold text-lg hover:bg-[#024a5c] transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {updating && <Loader2 className="w-5 h-5 animate-spin" />}
          {updating ? t("create_service_form.saving") : t("create_service_form.create_service")}
        </button>
      </div>
    </div>
  );
}