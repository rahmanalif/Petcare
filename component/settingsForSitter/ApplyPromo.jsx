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
import { useTranslation } from "react-i18next";

export default function ApplyPromo() {
  const { t } = useTranslation();
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
    if (item.discountType === "percentage") return t("settings.apply_promo.off_percentage", { value: item.discountValue });
    if (item.discountType === "flat") return t("settings.apply_promo.off_flat", { value: item.discountValue });
    return t("settings.apply_promo.discount_applied");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
        {t("settings.apply_promo.title")}
      </h2>

      {/* Input Section */}
      <div className="max-w-md mb-6 md:mb-8">
        <Label
          htmlFor="promo"
          className="text-xs md:text-sm font-medium text-gray-700 mb-2 block"
        >
          {t("settings.apply_promo.promo_code")}
        </Label>
        <div className="flex gap-2">
          <Input
            id="promo"
            placeholder={t("settings.apply_promo.enter_promo")}
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoError) dispatch(clearPromoError());
            }}
            onKeyPress={(e) =>
              e.key === "Enter" && !promoLoading && handleApplyPromo()
            }
            className="flex-1 text-sm md:text-base"
            disabled={promoLoading}
          />
          <Button
            onClick={handleApplyPromo}
            disabled={promoLoading || !promoCode.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm px-3 md:px-4 disabled:opacity-50"
          >
            {promoLoading ? t("settings.apply_promo.checking") : t("settings.apply_promo.apply")}
          </Button>
        </div>

        {/* Error Message */}
        {promoError && (
          <p className="mt-2 text-xs md:text-sm text-red-600">{promoError}</p>
        )}
      </div>

      {/* Applied Codes Section */}
      {appliedPromos.length > 0 && (
        <div>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">
            {t("settings.apply_promo.applied_codes")}
          </h3>
          <div className="space-y-2">
            {appliedPromos.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200"
              >
                <div>
                  <div className="font-medium text-gray-900 text-sm md:text-base">
                    {item.code}
                  </div>
                  <div className="text-xs text-teal-600 font-medium">
                    {formatDiscount(item)}
                  </div>
                  {item.applyTo && (
                    <div className="text-xs text-gray-500">{item.applyTo}</div>
                  )}
                </div>
                <button
                  onClick={() => handleRemovePromo(item.code)}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  {t("settings.apply_promo.remove")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {appliedPromos.length === 0 && !promoLoading && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-sm md:text-base">
            {t("settings.apply_promo.no_promos")}
          </p>
        </div>
      )}
    </div>
  );
}