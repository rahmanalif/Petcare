"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ✅ Inner form — Stripe Elements এর ভেতরে থাকতে হবে
function CheckoutForm({ bookingId, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-status?status=success`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      window.location.href = `/payment-status?status=success`;
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {message && (
        <p className="text-red-500 text-sm">{message}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="flex-1 bg-[#035F75] text-white font-bold py-3 rounded-lg hover:bg-[#024B5E] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ✅ Main component — modal হিসেবে use করো
export default function BookingPayment({ clientSecret, bookingId, amount, currency, onClose }) {
  if (!clientSecret) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-6">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#024B5E]">Complete Payment</h2>
          {amount && currency && (
            <p className="text-sm text-gray-500 mt-1">
              Amount:{" "}
              <span className="font-semibold text-[#024B5E]">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency || "USD",
                }).format(amount)}
              </span>
            </p>
          )}
        </div>

        {/* Stripe Elements */}
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            locale: "en",
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#035F75",
              },
            },
          }}
        >
          <CheckoutForm
            bookingId={bookingId}
            onSuccess={onClose}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}