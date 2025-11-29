import React from "react";

export default function DogWalkingForm({
  baseRate,
  setBaseRate,
  walksPerDay,
  setWalksPerDay,
  selectedDays,
  toggleDay,
  selectedTimeSlots,
  toggleTimeSlot,
  days,
  timeSlots,
}) {
  return (
    <>
      {/* Base Rate Section */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-900 mb-3">
          Set your base rate
        </label>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-gray-700">Per walk</span>
          <span className="text-gray-900 font-semibold">${baseRate}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          What you will earn per service: ${(parseFloat(baseRate) * 0.86).toFixed(2)}
        </p>
      </div>

      {/* Availability Section */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Availability</h3>

        <label className="block text-sm font-medium text-gray-900 mb-3">
          How many walks can you do per day?
        </label>
        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white mb-4">
          <span className="text-gray-700">Per day</span>
          <input
            type="number"
            value={walksPerDay}
            onChange={(e) => setWalksPerDay(e.target.value)}
            className="text-gray-900 font-semibold bg-transparent border-none outline-none text-right w-16"
            min="1"
          />
        </div>

        <p className="text-sm text-gray-700 mb-3">
          You can edit any date individually by going to your calendar.
        </p>

        {/* Days of Week */}
        <div className="flex gap-2 mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`flex-1 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                selectedDays.includes(day)
                  ? "bg-[#035F75] text-white border-[#035F75]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <label className="block text-sm font-medium text-gray-900 mb-3">
          What times are you available for Dog walking on weekdays?
        </label>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {timeSlots.map((slot) => (
            <label key={slot} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTimeSlots.includes(slot)}
                onChange={() => toggleTimeSlot(slot)}
                className="w-5 h-5 rounded border-gray-300 text-[#035F75] focus:ring-[#035F75] cursor-pointer"
              />
              <span className="text-gray-700">{slot}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
