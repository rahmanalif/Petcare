"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import {
  fetchPaymentHistory,
  createBookingIntent,
  transferToSitter,
  createConnectAccount,
  resetConnectAccount,
} from "@/redux/paymentSlice"; // ✅ path adjust করো
import BookingPayment from "@/component/settings/Bookingpayment"; // ✅ path adjust করো
import { useTranslation } from "react-i18next";

const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount || 0);
};

const formatDateRange = (start, end) => {
  if (!start || !end) return "N/A";
  return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
};

export default function Payments() {
  const dispatch = useDispatch();
  const {
    paymentHistory,
    paymentHistoryLoading,
    stripeConnected,
    stripeOnboardingUrl,
    clientSecret,
    transferLoading,
    loading,
    error,
  } = useSelector((state) => state.payment);

  const { t } = useTranslation();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [savedCard, setSavedCard] = useState(null);
  const [payingBookingId, setPayingBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "Bangladesh",
    street: "",
    additional: "",
    city: "",
    postcode: "",
  });

  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  // Stripe onboarding URL এলে redirect করো
  useEffect(() => {
    if (stripeOnboardingUrl) {
      window.location.href = stripeOnboardingUrl;
    }
  }, [stripeOnboardingUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.nameOnCard) {
      toast.error(t("settings.payments.fill_required"));
      return;
    }
    setSavedCard({
      last4: formData.cardNumber.slice(-4),
      brand: "Visa",
      expiry: formData.expiryDate || "12/25",
      name: formData.nameOnCard,
    });
    setShowModal(false);
    toast.success(t("settings.payments.payment_added"));
  };

  const handleDeleteCard = () => {
    setSavedCard(null);
    toast.success(t("settings.payments.payment_removed"));
  };

  const handleConnectStripe = () => {
    if (stripeConnected) {
      dispatch(fetchOnboardingLink());
    } else {
      dispatch(createConnectAccount());
    }
  };

  const handlePayNow = (booking) => {
    setPayingBookingId(booking._id);
    dispatch(createBookingIntent(booking._id))
      .unwrap()
      .then(() => {
        // ✅ clientSecret Redux এ আছে, modal খোলো
        setSelectedBooking(booking);
      })
      .catch((err) => {
        toast.error(err || t("settings.payments.payment_failed"));
      })
      .finally(() => setPayingBookingId(null));
  };

  const handleTransfer = (bookingId) => {
    dispatch(transferToSitter(bookingId))
      .unwrap()
      .then(() => toast.success(t("settings.payments.transfer_success")))
      .catch((err) => toast.error(err || t("settings.payments.transfer_failed")));
  };

  if (paymentHistoryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#035F75] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8 min-h-[600px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: Payment Methods + Stripe Connect */}
        <div className="lg:col-span-5 space-y-4">

          {/* ✅ Stripe Connect Status */}
          <div className={`rounded-lg p-4 border ${stripeConnected ? "border-green-300 bg-green-50" : "border-orange-300 bg-orange-50"}`}>
            <p className={`text-sm font-semibold ${stripeConnected ? "text-green-700" : "text-orange-700"}`}>
              {stripeConnected ? t("settings.payments.stripe_connected") : t("settings.payments.stripe_not_connected")}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stripeConnected ? t("settings.payments.stripe_connected_desc") : t("settings.payments.stripe_not_connected_desc")}
            </p>
            <button
              onClick={handleConnectStripe}
              disabled={loading}
              className="mt-2 text-xs font-medium text-[#035F75] underline disabled:opacity-50"
            >
              {loading ? t("settings.payments.loading") : stripeConnected ? t("settings.payments.manage_account") : t("settings.payments.connect_stripe")}
            </button>
          </div>

          {/* ✅ Card Section */}
          {!savedCard ? (
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 px-4 border border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors"
            >
              {t("settings.payments.add_modify_payment_method")}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input type="radio" checked readOnly className="mt-1 w-4 h-4 text-[#035F75]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{savedCard.brand} - {savedCard.last4}</p>
                        <p className="text-sm text-gray-600">{savedCard.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{savedCard.expiry}</p>
                      </div>
                      <button onClick={handleDeleteCard} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mt-3">
                      <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded">{t("settings.payments.default")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 px-4 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024B5E] transition-colors shadow-sm"
              >
                {t("settings.payments.add_default_payment_method")}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Payment History */}
        <div className="lg:col-span-7 border-l border-gray-100 pl-0 lg:pl-8">
          <h3 className="text-lg font-bold text-[#035F75] mb-4">{t("settings.payments.payment_history")}</h3>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {paymentHistory.length === 0 ? (
            <p className="text-gray-400 text-sm">{t("settings.payments.no_history")}</p>
          ) : (
            <div className="space-y-6">
              {paymentHistory.map((booking) => (
                <div key={booking._id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[#035F75] text-sm font-medium">
                      {formatDateRange(booking.startDate, booking.endDate)}
                    </span>
                    <span className="text-[#035F75] font-bold text-sm">
                      {formatCurrency(booking.totalPrice, booking.currency)}
                    </span>
                  </div>

                  <div className="text-sm text-[#035F75] font-medium mb-2">
                    {booking.pets?.[0]?.name || "Pet"}{t("settings.payments.stay_with")}{booking.sitter?.fullName || "Sitter"}{t("settings.payments.from")}
                    {new Date(booking.startDate).toLocaleDateString()}{t("settings.payments.to")}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>

                  <div className="space-y-1 text-xs text-gray-500 mb-3">
                    <p>{t("settings.payments.tip")}</p>
                    {savedCard ? (
                      <p>{savedCard.brand} XXXX-{savedCard.last4}: {formatCurrency(booking.totalPrice)}</p>
                    ) : (
                      <p>{t("settings.payments.card")}{formatCurrency(booking.totalPrice)}</p>
                    )}
                    <p className={`capitalize font-medium ${booking.paymentStatus === "paid" ? "text-green-600" : "text-orange-500"}`}>
                      {t("settings.payments.status")}{booking.paymentStatus || t("settings.payments.pending")}
                    </p>
                  </div>

                  {/* ✅ Action Buttons */}
                  <div className="flex gap-2">
                    {booking.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePayNow(booking)}
                        disabled={payingBookingId === booking._id}
                        className="text-xs bg-[#035F75] text-white px-3 py-1.5 rounded-md hover:bg-[#024B5E] disabled:opacity-50"
                      >
                        {payingBookingId === booking._id ? t("settings.payments.processing") : t("settings.payments.pay_now")}
                      </button>
                    )}
                    {booking.paymentStatus === "paid" && booking.status === "completed" && (
                      <button
                        onClick={() => handleTransfer(booking._id)}
                        disabled={transferLoading}
                        className="text-xs border border-[#035F75] text-[#035F75] px-3 py-1.5 rounded-md hover:bg-[#E7F4F6] disabled:opacity-50"
                      >
                        {transferLoading ? t("settings.payments.transferring") : t("settings.payments.transfer_to_sitter")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
            <div className="p-6 pb-2">
              <h2 className="text-xl font-bold text-gray-700">{t("settings.payments.enter_payment_info")}</h2>
            </div>

            <form onSubmit={handleSaveCard} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.name_on_card")}</label>
                <input name="nameOnCard" value={formData.nameOnCard} onChange={handleInputChange} type="text" placeholder={t("settings.payments.name_on_card_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.card_number")}</label>
                <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder={t("settings.payments.card_number_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.expiration_date")}</label>
                  <input name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} type="text" placeholder={t("settings.payments.expiration_date_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.cvv")}</label>
                  <input name="cvv" value={formData.cvv} onChange={handleInputChange} type="text" placeholder={t("settings.payments.cvv_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.country")}</label>
                <select name="country" value={formData.country} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-1 focus:ring-[#035F75]">
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.street")}</label>
                <input name="street" value={formData.street} onChange={handleInputChange} type="text" placeholder={t("settings.payments.street_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.additional")}</label>
                <input name="additional" value={formData.additional} onChange={handleInputChange} type="text" placeholder={t("settings.payments.additional_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.city")}</label>
                <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder={t("settings.payments.city_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("settings.payments.postcode")}</label>
                <input name="postcode" value={formData.postcode} onChange={handleInputChange} type="text" placeholder={t("settings.payments.postcode_placeholder")} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#035F75]" />
              </div>

              <div className="bg-[#E7F4F6] rounded-lg p-4 flex items-start gap-3">
                <User className="text-[#035F75] mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{t("settings.payments.secure_info")}</h4>
                  <p className="text-xs text-gray-600 mt-1">{t("settings.payments.secure_desc")}</p>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#035F75] text-white font-bold py-3 rounded-lg hover:bg-[#024B5E] transition-colors">
                  {t("settings.payments.save")}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="w-full mt-3 text-gray-500 font-medium py-2 hover:text-gray-700">
                  {t("settings.payments.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ✅ Stripe Payment Modal — key কখনো URL এ যায় না */}
      {clientSecret && selectedBooking && (
        <BookingPayment
          clientSecret={clientSecret}
          bookingId={selectedBooking._id}
          amount={selectedBooking.totalPrice}
          currency={selectedBooking.currency}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}