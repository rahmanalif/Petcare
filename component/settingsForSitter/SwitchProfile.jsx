"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SwitchProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSwitch = async () => {
    const newRole = isProvider ? "owner" : "sitter";
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const result = await response.json();

      if (result.success) {
        setIsProvider(!isProvider);
        setMessage(t("settings.switch_profile_sitter.switched_successfully", { role: newRole }));

        // role অনুযায়ী redirect
        setTimeout(() => {
          if (newRole === "owner") {
            router.push("/dashboard/owner");
          } else {
            router.push("/dashboard/sitter");
          }
        }, 1000);
      } else {
        setMessage(result.message || t("settings.switch_profile_sitter.switch_failed"));
      }
    } catch (error) {
      setMessage(t("settings.switch_profile_sitter.something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
        {t("settings.switch_profile_sitter.title")}
      </h2>

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <span className="text-sm md:text-base font-medium text-gray-900">
            {t("settings.switch_profile_sitter.switch_as_provider")}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {t("settings.switch_profile_sitter.currently")} <span className="font-medium text-[#035F75]">{isProvider ? t("settings.switch_profile_sitter.sitter") : t("settings.switch_profile_sitter.owner")}</span>
          </p>
        </div>

        <button
          onClick={handleSwitch}
          disabled={loading}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60 ${isProvider ? "bg-teal-600" : "bg-gray-200"
            }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isProvider ? "translate-x-6" : "translate-x-1"
              }`}
          />
        </button>
      </div>

      {loading && (
        <p className="text-sm text-[#035F75] animate-pulse">{t("settings.switch_profile_sitter.switching")}</p>
      )}

      {message && !loading && (
        <p className={`text-sm mt-2 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}