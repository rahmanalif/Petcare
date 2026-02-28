"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchPaymentHistory } from "@/redux/paymentSlice";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const STATUS_CONFIG = {
  success: {
    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
    title: "Payment Successful!",
    message: "Your booking has been confirmed and payment received.",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    titleColor: "text-green-700",
  },
  failed: {
    icon: <XCircle className="w-16 h-16 text-red-500" />,
    title: "Payment Failed",
    message: "Something went wrong with your payment. Please try again.",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    titleColor: "text-red-700",
  },
  pending: {
    icon: <Clock className="w-16 h-16 text-yellow-500" />,
    title: "Payment Pending",
    message: "Your payment is being processed. We'll notify you once confirmed.",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    titleColor: "text-yellow-700",
  },
};

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const status = searchParams.get("status") || "pending";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  useEffect(() => {
    // ✅ Page load হলে fresh data fetch করো
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl border ${config.borderColor} shadow-sm p-8 max-w-md w-full text-center`}>

        <div className="flex justify-center mb-4">
          {config.icon}
        </div>

        <h1 className={`text-2xl font-bold mb-2 ${config.titleColor}`}>
          {config.title}
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          {config.message}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              router.push("/settings");
              router.refresh();
            }}
            className="w-full bg-[#035F75] text-white font-medium py-3 rounded-lg hover:bg-[#024B5E] transition-colors"
          >
            Go to Settings
          </button>

          {status === "failed" && (
            <button
              onClick={() => router.back()}
              className="w-full border border-[#035F75] text-[#035F75] font-medium py-3 rounded-lg hover:bg-[#E7F4F6] transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}