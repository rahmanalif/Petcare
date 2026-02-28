"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const resolveImage = (path) => {
  if (!path) return "/Ellipse.png";
  if (/^https?:\/\//i.test(path)) return path;
  const base = String(API_BASE || "").replace(/\/+$/, "");
  const clean = String(path).replace(/^\/+/, "");
  return base ? `${base}/${clean}` : path;
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

const formatPrice = (amount, currency = "MXN") => {
  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) return `${currency} 0`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numeric);
};

export default function BookingHistory() {
  const { t } = useTranslation();
  const [activeStatus, setActiveStatus] = useState("ongoing");
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const router = useRouter();

  const statuses = [
    { key: "ongoing", label: t("settings.booking_history.tabs.ongoing") },
    { key: "upcoming", label: t("settings.booking_history.tabs.upcoming") },
    { key: "completed", label: t("settings.booking_history.tabs.completed") },
    { key: "cancelled", label: t("settings.booking_history.tabs.cancelled") },
    { key: "rejected", label: t("settings.booking_history.tabs.rejected") },
  ];

  useEffect(() => {
    const loadBookings = async () => {
      if (!API_BASE) {
        setBookingData([]);
        setLoadError(t("settings.booking_history.error_api"));
        return;
      }
      setLoading(true);
      setLoadError("");
      try {
        const response = await fetchWithAuth(
          `${API_BASE}/api/bookings?type=${encodeURIComponent(activeStatus)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        if (!response.ok || !result?.success) {
          throw new Error(result?.message || t("settings.booking_history.error_fetch"));
        }
        setBookingData(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        setBookingData([]);
        setLoadError(error?.message || t("settings.booking_history.error_fetch"));
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, [activeStatus]);

  const normalizedBookings = useMemo(
    () =>
      bookingData.map((booking) => ({
        id: booking?._id || Math.random().toString(36),
        sitterName: booking?.sitter?.fullName || t("settings.booking_history.unknown_sitter"),
        sitterImage: resolveImage(booking?.sitter?.profilePicture),
        rating: Number(booking?.sitter?.averageRating ?? 0),
        ratingCount: booking?.sitter?.reviewsCount ?? 0,
        date: formatDate(booking?.startDate),
        service: booking?.serviceType || t("settings.booking_history.service"),
        price: formatPrice(booking?.totalPrice, booking?.currency || "MXN"),
        priceType: "Total",
        contact: booking?.sitter?.phoneNumber || "N/A",
        pickupTime: booking?.startTime || "N/A",
        dropoffTime: booking?.endTime || "N/A",
        status: String(booking?.status || activeStatus).toLowerCase(),
      })),
    [bookingData, activeStatus, t]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing": return "bg-[#D9F5FC] text-[#024B5E]";
      case "completed": return "bg-gray-200 text-[#024B5E]";
      case "cancelled": return "bg-red-100 text-red-700";
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "rejected": return "bg-rose-100 text-rose-700";
      default: return "bg-gray-200 text-[#024B5E]";
    }
  };

  const formatStatusLabel = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "ongoing") return t("settings.booking_history.status.ongoing");
    if (normalized === "upcoming") return t("settings.booking_history.status.upcoming");
    if (normalized === "completed") return t("settings.booking_history.status.completed");
    if (normalized === "cancelled") return t("settings.booking_history.status.cancelled");
    if (normalized === "rejected") return t("settings.booking_history.status.rejected");
    return normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : t("settings.booking_history.status.unknown");
  };

  // ✅ Status অনুযায়ী সঠিক page এ navigate করো
  const handleBookingClick = (booking) => {
    const status = booking.status;
    if (status === "ongoing") {
      router.push(`/settings/ongoing?id=${booking.id}`);
    } else if (status === "upcoming" || status === "confirmed") {
      router.push(`/settings/upcoming?id=${booking.id}`);
    } else {
      router.push(`/settings/ongoing?id=${booking.id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-[#024B5E] mb-4 sm:mb-6">{t("settings.booking_history.title")}</h2>

      {/* Status Tabs */}
      <div className="flex flex-wrap w-full gap-1 sm:gap-2 mb-4 sm:mb-8">
        {statuses.map((status) => {
          const isActive = activeStatus === status.key;
          return (
            <button
              key={status.key}
              onClick={() => setActiveStatus(status.key)}
              className={`flex-1 min-w-[88px] sm:min-w-[110px] px-1 sm:px-3 py-2 rounded-md text-[9px] sm:text-sm font-medium transition-colors whitespace-nowrap text-center ${isActive
                  ? "bg-[#024B5E] text-white"
                  : "bg-gray-100 text-[#024B5E] hover:bg-gray-200"
                }`}
            >
              {status.label}
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#024B5E]" />
          </div>
        ) : loadError ? (
          <div className="text-center py-12">
            <p className="text-red-600">{loadError}</p>
          </div>
        ) : normalizedBookings.length > 0 ? (
          normalizedBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => handleBookingClick(booking)}
              className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow bg-white cursor-pointer"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                <div className="flex gap-3 items-start w-full sm:w-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 overflow-hidden">
                    <img
                      src={booking.sitterImage}
                      alt={booking.sitterName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#024B5E] text-base sm:text-lg">
                      {booking.sitterName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">
                        {Number.isFinite(booking.rating) ? booking.rating.toFixed(1) : "0.0"}
                        ({booking.ratingCount})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 w-full sm:w-auto">
                  <div className="text-xs sm:text-sm font-medium bg-[#D9F5FC] text-[#024B5E] px-2 sm:px-3 py-1 rounded">
                    {booking.date}
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold text-[#024B5E]">
                    {booking.price}
                    <span className="text-xs sm:text-sm text-[#024B5E] font-normal ml-1">
                      {booking.priceType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Name */}
              <div className="text-sm sm:text-base font-semibold text-[#024B5E] mb-3">
                {booking.service}
              </div>

              {/* Contact */}
              <div className="text-sm font-semibold text-[#024B5E] mb-2">{t("settings.booking_history.contact")}</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
                {/* Column 1 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#024B5E]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{booking.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#024B5E]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{booking.date}</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <div className="text-sm text-[#024B5E]">
                    {t("settings.booking_history.pickup_time")}<span className="font-semibold">{booking.pickupTime}</span>
                  </div>
                  <div className="text-sm text-[#024B5E]">
                    {t("settings.booking_history.dropoff_time")}<span className="font-semibold">{booking.dropoffTime}</span>
                  </div>
                </div>

                {/* Column 3: Status */}
                <div className="flex justify-start md:justify-end items-start">
                  <span className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${getStatusColor(booking.status)}`}>
                    {formatStatusLabel(booking.status)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-[#024B5E]">{t("settings.booking_history.no_bookings")}</p>
          </div>
        )}
      </div>
    </div>
  );
}