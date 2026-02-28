"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StripeReturnPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading"); // loading | success | failed

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

        // ✅ Stripe onboarding complete হলে backend কে sync করো
        const res = await fetch(`${SERVER_URL}/api/payments/sync-connect-status`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Stripe sync response:", data);

        // ✅ isStripeOnboardingComplete check করো
        if (
          data?.data?.isStripeOnboardingComplete === true ||
          data?.isStripeOnboardingComplete === true
        ) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Stripe sync error:", err);
        setStatus("failed");
      }
    };

    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">

        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-[#035F75] animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying your account...</h2>
            <p className="text-gray-500 text-sm">Please wait while we confirm your Stripe setup.</p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payout Setup Complete!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your bank account has been successfully connected. You can now receive payments from bookings.
            </p>
            <button
              onClick={() => router.push("/sitter/profile")}
              className="w-full py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024c5d] transition-colors"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {/* Failed */}
        {status === "failed" && (
          <>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Setup Incomplete</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your Stripe account setup is not complete yet. Please try again or contact support if the issue persists.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/sitter/profile")}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={() => router.push("/sitter/profile?retry=true")}
                className="flex-1 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024c5d] transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}