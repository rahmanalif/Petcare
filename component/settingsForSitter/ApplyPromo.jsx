"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ApplyPromo() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCodes, setAppliedCodes] = useState([]);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setAppliedCodes([...appliedCodes, promoCode]);
      setPromoCode("");
    }
  };

  const handleRemovePromo = (index) => {
    setAppliedCodes(appliedCodes.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
        Apply promo codes
      </h2>

      {/* Input Section */}
      <div className="max-w-md mb-6 md:mb-8">
        <Label
          htmlFor="promo"
          className="text-xs md:text-sm font-medium text-gray-700 mb-2 block"
        >
          Promo Code
        </Label>
        <div className="flex gap-2">
          <Input
            id="promo"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
            className="flex-1 text-sm md:text-base"
          />
          <Button
            onClick={handleApplyPromo}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm px-3 md:px-4"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Applied Codes Section */}
      {appliedCodes.length > 0 && (
        <div>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">
            Applied Codes
          </h3>
          <div className="space-y-2">
            {appliedCodes.map((code, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200"
              >
                <div>
                  <div className="font-medium text-gray-900 text-sm md:text-base">{code}</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
                <button
                  onClick={() => handleRemovePromo(index)}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {appliedCodes.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-sm md:text-base">No promo codes applied yet.</p>
        </div>
      )}
    </div>
  );
}
