"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validatePromoCode,
  removePromoCode,
  clearPromoError,
} from "@/redux/bookingSlice";

export default function ApplyPromo() {
  const dispatch = useDispatch();
  const { appliedPromos, promoLoading, promoError } = useSelector(
    (state) => state.booking
  );

  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    dispatch(validatePromoCode(code));
    setPromoCode("");
  };

  const handleRemovePromo = (code) => {
    dispatch(removePromoCode(code));
  };

  const formatDiscount = (item) => {
    if (item.discountType === "percentage") return `${item.discountValue}% off`;
    if (item.discountType === "flat") return `৳${item.discountValue} off`;
    return "Discount applied";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Apply promo codes
      </h2>

      {/* Input Section */}
      <div className="max-w-md mb-6 sm:mb-8">
        <Label htmlFor="promo" className="text-sm font-medium text-gray-700 mb-2 block">
          Promo Code
        </Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="promo"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoError) dispatch(clearPromoError());
            }}
            onKeyPress={(e) => e.key === "Enter" && !promoLoading && handleApplyPromo()}
            className="flex-1 w-full"
            disabled={promoLoading}
          />
          <Button
            onClick={handleApplyPromo}
            disabled={promoLoading || !promoCode.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto disabled:opacity-50"
          >
            {promoLoading ? "Checking..." : "Apply"}
          </Button>
        </div>

        {/* Error Message */}
        {promoError && (
          <p className="mt-2 text-sm text-red-600">{promoError}</p>
        )}
      </div>

      {/* Applied Codes Section */}
      {appliedPromos.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Applied Codes</h3>
          <div className="space-y-2">
            {appliedPromos.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div>
                  <div className="font-medium text-gray-900">{item.code}</div>
                  <div className="text-xs text-teal-600 font-medium">{formatDiscount(item)}</div>
                  {item.applyTo && (
                    <div className="text-xs text-gray-500">{item.applyTo}</div>
                  )}
                </div>
                <button
                  onClick={() => handleRemovePromo(item.code)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {appliedPromos.length === 0 && !promoLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No promo codes applied yet.</p>
        </div>
      )}
    </div>
  );
}