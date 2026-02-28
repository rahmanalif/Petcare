"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSitterProfile } from "@/redux/sitter/sitterSlice";
import { createConnectAccount, fetchOnboardingLink, fetchEarningsHistory } from "@/redux/paymentSlice";
import { CheckCircle, ShieldCheck, Trash2, Loader2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function Payments() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { profile: sitterData, loading } = useSelector((state) => state.sitter);
  const { loading: paymentLoading, earningsLoading, earningsHistory, error } = useSelector((state) => state.payment);

  const [showModal, setShowModal] = useState(false);
  const [savedCard, setSavedCard] = useState(null);
  const [cardForm, setCardForm] = useState({
    name: "", cardNumber: "", expiry: "", cvv: "",
    country: "Bangladesh", street: "", addressExtra: "", city: "", postcode: "",
  });

  useEffect(() => {
    if (!sitterData) dispatch(fetchSitterProfile());
    dispatch(fetchEarningsHistory());
  }, [dispatch]);

  // ✅ sitterData.profile থেকে isStripeOnboardingComplete নেওয়া
  const isStripeConnected = sitterData?.profile?.isStripeOnboardingComplete === true;

  const handleSetupPayouts = async () => {
    try {
      // ✅ প্রথমে onboarding-link চেষ্টা করো (account আগে থেকে থাকলে)
      const linkAction = await dispatch(fetchOnboardingLink());
      if (fetchOnboardingLink.fulfilled.match(linkAction)) {
        const url = linkAction.payload.url || linkAction.payload.data?.url;
        if (url) { window.location.href = url; return; }
      }

      // ✅ onboarding-link fail হলে নতুন account create করো
      const createAction = await dispatch(createConnectAccount());
      if (createConnectAccount.fulfilled.match(createAction)) {
        const url = createAction.payload.url || createAction.payload.data?.url;
        if (url) { window.location.href = url; return; }
      }
    } catch (err) {
      console.error("Failed to initiate stripe connect", err);
    }
  };

  const handleCardFormChange = (e) => {
    const { id, value } = e.target;
    if (id === "cardNumber") {
      const formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
      setCardForm((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }
    if (id === "expiry") {
      const raw = value.replace(/\D/g, "").slice(0, 4);
      const formatted = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
      setCardForm((prev) => ({ ...prev, expiry: formatted }));
      return;
    }
    if (id === "cvv") {
      setCardForm((prev) => ({ ...prev, cvv: value.replace(/\D/g, "").slice(0, 3) }));
      return;
    }
    setCardForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveCard = () => {
    const digits = cardForm.cardNumber.replace(/\s/g, "");
    if (!cardForm.name || digits.length < 16 || !cardForm.expiry || !cardForm.cvv) return;
    setSavedCard({ name: cardForm.name, last4: digits.slice(-4), expiry: cardForm.expiry, brand: "Visa" });
    setShowModal(false);
    setCardForm({ name: "", cardNumber: "", expiry: "", cvv: "", country: "Bangladesh", street: "", addressExtra: "", city: "", postcode: "" });
  };

  // ✅ API থেকে আসা earnings — status দিয়ে group করা
  const pendingEarnings = earningsHistory?.filter((e) => e.status === "pending") || [];
  const completedEarnings = earningsHistory?.filter((e) => e.status === "completed") || [];

  if (loading && !sitterData) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-[#035F75]" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">{t("settings.payments_sitter.title")}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column — Payment Methods + Stripe */}
          <div className="space-y-6">

            {/* Card Section */}
            {savedCard ? (
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-[#035F75] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#035F75]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{savedCard.brand} - {savedCard.last4}</p>
                      <p className="text-gray-600 text-sm">{savedCard.name}</p>
                      <p className="text-gray-600 text-sm">{savedCard.expiry}</p>
                      <span className="mt-1 inline-block text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5">DEFAULT</span>
                    </div>
                  </div>
                  <button onClick={() => setSavedCard(null)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => setShowModal(true)} className="w-full px-6 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024c5d] transition-colors text-sm">
                  {t("settings.payments_sitter.add_default_method")}
                </button>
              </div>
            ) : (
              <button onClick={() => setShowModal(true)} className="w-full px-6 py-3 border-2 border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors text-sm">
                {t("settings.payments_sitter.add_modify_method")}
              </button>
            )}

            {/* Stripe */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t("settings.payments_sitter.payout_configuration")}</h3>
              {isStripeConnected ? (
                <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{t("settings.payments_sitter.bank_connected")}</p>
                    <p className="text-xs text-green-600 mt-0.5">{t("settings.payments_sitter.payouts_ready")}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-3">
                    {t("settings.payments_sitter.connect_bank")}
                  </p>
                  <button
                    onClick={handleSetupPayouts}
                    disabled={paymentLoading}
                    className="w-full px-6 py-3 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024c5d] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paymentLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> {t("settings.payments_sitter.processing")}</>
                    ) : (
                      <>{t("settings.payments_sitter.setup_payouts")} <ExternalLink className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Payment History from API */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">{t("settings.payments_sitter.payment_history")}</h3>

            {earningsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin w-6 h-6 text-[#035F75]" />
              </div>
            ) : earningsHistory?.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">{t("settings.payments_sitter.no_history")}</p>
            ) : (
              <>
                {/* Pending */}
                {pendingEarnings.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[#035F75] font-medium text-sm mb-3">{t("settings.payments_sitter.pending")}</p>
                    <div className="space-y-4">
                      {pendingEarnings.map((item) => (
                        <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[#035F75] font-medium text-xs">{item.dateRange}</span>
                            <span className="text-base font-semibold text-gray-900">${item.amount?.toFixed(2)}</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 mb-1">{item.description}</p>
                          <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">{t("settings.payments_sitter.pending")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed */}
                {completedEarnings.length > 0 && (
                  <div>
                    <p className="text-[#035F75] font-medium text-sm mb-3">{t("settings.payments_sitter.completed")}</p>
                    <div className="space-y-4">
                      {completedEarnings.map((item) => (
                        <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[#035F75] font-medium text-xs">{item.dateRange}</span>
                            <span className="text-base font-semibold text-gray-900">${item.amount?.toFixed(2)}</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 mb-1">{item.description}</p>
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{t("settings.payments_sitter.completed")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-sm mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-semibold text-gray-900 mb-5">
              {t("settings.payments_sitter.enter_payment_info")}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">{t("settings.payments_sitter.name_on_card")}</Label>
                <Input id="name" placeholder={t("settings.payments_sitter.name_on_card_placeholder")} value={cardForm.name} onChange={handleCardFormChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cardNumber" className="text-sm text-gray-700">{t("settings.payments_sitter.card_number")}</Label>
                <Input id="cardNumber" placeholder={t("settings.payments_sitter.card_number_placeholder")} value={cardForm.cardNumber} onChange={handleCardFormChange} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry" className="text-sm text-gray-700">{t("settings.payments_sitter.expiration_date")}</Label>
                  <Input id="expiry" placeholder={t("settings.payments_sitter.expiration_placeholder")} value={cardForm.expiry} onChange={handleCardFormChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm text-gray-700">{t("settings.payments_sitter.cvv")}</Label>
                  <Input id="cvv" placeholder={t("settings.payments_sitter.cvv_placeholder")} value={cardForm.cvv} onChange={handleCardFormChange} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="country" className="text-sm text-gray-700">{t("settings.payments_sitter.country")}</Label>
                <select
                  id="country"
                  value={cardForm.country}
                  onChange={(e) => setCardForm((prev) => ({ ...prev, country: e.target.value }))}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Bangladesh">{t("settings.payments_sitter.countries.bangladesh")}</option>
                  <option value="United States">{t("settings.payments_sitter.countries.us")}</option>
                  <option value="United Kingdom">{t("settings.payments_sitter.countries.uk")}</option>
                  <option value="Canada">{t("settings.payments_sitter.countries.canada")}</option>
                  <option value="Australia">{t("settings.payments_sitter.countries.australia")}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="street" className="text-sm text-gray-700">{t("settings.payments_sitter.street")}</Label>
                <Input id="street" placeholder={t("settings.payments_sitter.street_placeholder")} value={cardForm.street} onChange={handleCardFormChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="addressExtra" className="text-sm text-gray-700">{t("settings.payments_sitter.address_extra")}</Label>
                <Input id="addressExtra" placeholder={t("settings.payments_sitter.address_extra_placeholder")} value={cardForm.addressExtra} onChange={handleCardFormChange} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm text-gray-700">{t("settings.payments_sitter.city")}</Label>
                  <Input id="city" placeholder={t("settings.payments_sitter.city_placeholder")} value={cardForm.city} onChange={handleCardFormChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postcode" className="text-sm text-gray-700">{t("settings.payments_sitter.postcode")}</Label>
                  <Input id="postcode" placeholder={t("settings.payments_sitter.postcode_placeholder")} value={cardForm.postcode} onChange={handleCardFormChange} className="mt-1" />
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#E7F4F6] rounded-lg p-3">
                <ShieldCheck className="w-8 h-8 text-[#035F75] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">{t("settings.payments_sitter.info_secure")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t("settings.payments_sitter.secure_desc")}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                  {t("settings.payments_sitter.cancel")}
                </button>
                <button onClick={handleSaveCard} className="flex-1 px-4 py-3 bg-[#035F75] text-white rounded-lg font-medium text-sm hover:bg-[#024c5d] transition-colors">
                  {t("settings.payments_sitter.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}