"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { fetchPets } from "@/redux/petSlice"; // Import action
import { clearAuthStorage } from "@/lib/auth";

import AccountDetail from "@/component/settings/AccountDetail";
import BookingHistory from "@/component/settings/BookingHistory";
import Payments from "@/component/settings/Payments";
import SwitchProfile from "@/component/settings/SwitchProfile";
import ApplyPromo from "@/component/settings/ApplyPromo";
import InviteFriend from "@/component/settings/InviteFriend";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AccountSettings() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("account");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Redux state
  const { list: pets, loading } = useSelector((state) => state.pets);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch pets if list is empty
  useEffect(() => {
    if (pets.length === 0) {
      dispatch(fetchPets());
    }
  }, [dispatch, pets.length]);

  const handleLogout = () => {
    clearAuthStorage();
    dispatch(logout());
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError("");
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/account`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to delete account");
      }
      // Clean up and redirect
      clearAuthStorage();
      dispatch(logout());
      router.push("/");
    } catch (err) {
      setDeleteError(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">

        {/* Dynamic Pet Profiles Section */}
        <div className="flex flex-wrap gap-3 mb-4 sm:mb-6">
          {loading && pets.length === 0 ? (
            <div className="flex items-center p-4"><Loader2 className="animate-spin text-[#024B5E]" /></div>
          ) : (
            Array.isArray(pets) && pets.map((pet) => (
              <button
                key={pet._id}
                onClick={() => router.push(`/settings/pet-Information/${pet._id}`)}
                className="bg-[#E7F4F6] rounded-lg p-3 border-2 border-[#0993b6] flex items-center gap-3 min-w-[180px]"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white">
                  <img
                    src={pet.gallery && pet.gallery.length > 0
                      ? `${API_BASE}/${pet.gallery[pet.gallery.length - 1]}`
                      : "/Ellipse.png"}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-left text-[#024B5E] text-sm truncate">{pet.name}</div>
                  <div className="text-xs text-[#024B5E] truncate text-left">{pet.breed}</div>
                </div>
              </button>
            ))
          )}

          {/* Add another Pet Button */}
          <button
            onClick={() => router.push('/settings/pet-form')}
            className="text-[#024B5E] border-2 border-dashed border-[#024B5E] rounded-lg px-6 py-3 text-xs font-medium hover:bg-[#E7F4F6] transition-colors flex items-center justify-center gap-2 h-[68px]">
            <span className="text-lg font-bold">+</span>
            <span>{t("owner_settings.add_another_pet")}</span>
          </button>
        </div>

        {/* Rest of the component remains EXACTLY same */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 rounded-2xl bg-[#FFF] p-3 sm:p-4 shadow-md">
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-0 lg:mt-4">
              <div className="px-3 sm:px-4 py-3 text-[#024B5E] text-xl sm:text-lg font-bakso">
                {t("owner_settings.account_info")}
              </div>
              {/* Tab Buttons */}
              {[
                { key: 'account', label: t("owner_settings.account") },
                { key: 'booking', label: t("owner_settings.booking_history") },
                { key: 'payments', label: t("owner_settings.payments") },
                { key: 'switch', label: t("owner_settings.switch_profile") },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-l-4 ${activeTab === key
                    ? "border-[#024B5E] bg-[#E7F4F6] text-[#024B5E] font-medium"
                    : "border-transparent hover:bg-gray-50 capitalize"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Other Sidebar Sections (Same as original) */}
            <div className="pt-2 sm:pt-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-3 text-[#024B5E] text-lg sm:text-xl font-bakso">{t("owner_settings.policy_center")}</div>
                <Link href="/privacy" className="block w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#024B5E] hover:bg-gray-100">{t("owner_settings.privacy_policy")}</Link>
                <Link href="/terms" className="block w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#024B5E] hover:bg-gray-100">{t("owner_settings.terms")}</Link>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-3 text-[#024B5E] text-lg sm:text-xl font-bakso">{t("owner_settings.referrals_promos")}</div>
                <button onClick={() => setActiveTab("friend")} className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#024B5E] hover:bg-gray-100">{t("owner_settings.invite_friend")}</button>
                <button onClick={() => setActiveTab("promo")} className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#024B5E] hover:bg-gray-100">{t("owner_settings.apply_promo_codes")}</button>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-3 text-[#024B5E] text-lg sm:text-xl font-bakso">{t("owner_settings.account_actions")}</div>
                <div onClick={handleLogout} className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#024B5E] hover:bg-gray-100 cursor-pointer">{t("owner_settings.logout")}</div>
                <div
                  onClick={() => { setDeleteError(""); setShowDeleteModal(true); }}
                  className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-[#FE6C5D] hover:bg-gray-100 cursor-pointer"
                >
                  {t("owner_settings.delete_account")}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 mt-4 lg:mt-0">
            {activeTab === "account" && <AccountDetail />}
            {activeTab === "booking" && <BookingHistory />}
            {activeTab === "payments" && <Payments />}
            {activeTab === "switch" && <SwitchProfile />}
            {activeTab === "promo" && <ApplyPromo />}
            {activeTab === "friend" && <InviteFriend />}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Account</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="text-sm text-red-500 mb-4">{deleteError}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
