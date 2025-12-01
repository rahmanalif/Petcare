"use client";
import React from "react";

export default function Payments() {
  const paymentHistory = [
    {
      id: 1,
      dateRange: "03/20/2024-03/25/2024",
      service: "Chabela's stay with Joye E. from 03/20/2024 to 03/25/2024",
      tip: "$45.00",
      subtotal: "$333.00",
      charge: "$45.00",
      paymentMethod: "American Express XXXX-1002",
      total: "$45.00",
      status: "Pending",
    },
    {
      id: 2,
      dateRange: "03/20/2024-03/25/2024",
      service: "Chabela's stay with Joye E. from 03/20/2024 to 03/25/2024",
      tip: "$45.00",
      subtotal: "$333.00",
      charge: "$45.00",
      paymentMethod: "American Express XXXX-1002",
      total: "$45.00",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8">Payments</h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Add Payment Method Button */}
        <div>
          <button className="w-full max-w-md px-4 md:px-6 py-2.5 md:py-3 border-2 border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors text-sm md:text-base">
            Add or Modify a payment Method
          </button>
        </div>

        {/* Right Column - Payment History */}
        <div>
          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
            Payment History
          </h3>

          {/* Pending Status */}
          <div className="mb-4 md:mb-6">
            <span className="text-[#035F75] font-medium text-base md:text-lg">Pending</span>
          </div>

          {/* Payment History Items */}
          <div className="space-y-4 md:space-y-6">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="border-b border-gray-200 pb-4 md:pb-6 last:border-b-0"
              >
                {/* Date and Total */}
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="text-[#035F75] font-medium text-xs md:text-sm">
                    {payment.dateRange}
                  </div>
                  <div className="text-base md:text-xl font-semibold text-gray-900">
                    {payment.total}
                  </div>
                </div>

                {/* Service Description */}
                <div className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3">
                  {payment.service}
                </div>

                {/* Payment Details */}
                <div className="space-y-1 text-xs md:text-sm text-gray-600">
                  <div>Tip: {payment.tip}</div>
                  <div>{payment.paymentMethod}: {payment.subtotal}</div>
                  <div>{payment.paymentMethod}: {payment.charge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
