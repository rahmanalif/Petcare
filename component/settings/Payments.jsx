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
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Payments</h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Add Payment Method Button */}
        <div>
          <button className="w-full max-w-md px-6 py-3 border-2 border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors">
            Add or Modify a payment Method
          </button>
        </div>

        {/* Right Column - Payment History */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Payment History
          </h3>

          {/* Pending Status */}
          <div className="mb-6">
            <span className="text-[#035F75] font-medium text-lg">Pending</span>
          </div>

          {/* Payment History Items */}
          <div className="space-y-6">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                {/* Date and Total */}
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[#035F75] font-medium">
                    {payment.dateRange}
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {payment.total}
                  </div>
                </div>

                {/* Service Description */}
                <div className="text-sm font-semibold text-gray-900 mb-3">
                  {payment.service}
                </div>

                {/* Payment Details */}
                <div className="space-y-1 text-sm text-gray-600">
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
