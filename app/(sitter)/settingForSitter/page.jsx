"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import AccountDetail from "@/component/settingsForSitter/AccountDetail";
import BookingHistory from "@/component/settingsForSitter/ChangePassword";
import Payments from "@/component/settingsForSitter/Payments";
import SwitchProfile from "@/component/settingsForSitter/SwitchProfile";
import ApplyPromo from "@/component/settingsForSitter/ApplyPromo";
import InviteFriend from "@/component/settingsForSitter/InviteFriend";
import Services from "@/component/settingsForSitter/Services";
import Portfolio from "@/component/settingsForSitter/portfolio";

export default function AccountSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("account");

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleNavigateToOngoing = () => {
    router.push('/settingForSitter/ongoing');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Earnings Summary */}
        <div className="border border-gray-300 rounded-lg m-1 md:m-2 p-4 md:p-6 bg-white shadow-sm">
          {/* Header */}
          <div className="mb-3 md:mb-4">
            <h2 className="text-base md:text-lg font-semibold text-[#024B5E] font-montserrat mb-1">
              Earnings Summary
            </h2>
          </div>

          {/* Total Income and Promo Code */}
          <div className="flex items-end justify-between mb-4 md:mb-6">
            <div>
              <p className="text-xs md:text-sm text-[#024B5E] mb-1">Total Income</p>
              <p className="text-xl md:text-2xl font-bold text-[#024B5E] font-montserrat">$900.50</p>
            </div>
            <button className="text-[#035F75] text-xs md:text-sm font-medium underline">
              Apply Promo Code
            </button>
          </div>

          {/* This Month, Last Month, Pending */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-2 md:p-3 rounded-lg transition-colors"
            >
              <p className="text-xs md:text-sm text-[#024B5E] mb-1">This Month</p>
              <p className="text-sm md:text-lg font-bold text-[#024B5E] font-montserrat">$842.00</p>
            </div>
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-2 md:p-3 rounded-lg transition-colors"
            >
              <p className="text-xs md:text-sm text-[#024B5E] mb-1 flex items-center justify-center">Last Month</p>
              <p className="text-sm md:text-lg font-bold text-[#024B5E] font-montserrat flex items-center justify-center">$753.50</p>
            </div>
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-2 md:p-3 rounded-lg transition-colors"
            >
              <p className="text-xs md:text-sm text-[#024B5E] mb-1 text-right">Pending</p>
              <p className="text-sm md:text-lg font-bold text-[#024B5E] font-montserrat text-right">$135.00</p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 boarder-2 rounded-2xl bg-[#FFF] p-3 md:p-4 shadow-md">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {/* Navigation Menu */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-2 md:mt-4">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "account"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "booking"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Change password
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "payments"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "services"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "portfolio"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab("switch")}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 border-l-4 text-sm md:text-base ${activeTab === "switch"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                Switch profile
              </button>
            </div>

            <div className="pt-2 md:pt-4 space-y-2">
              <button
                onClick={() => setActiveTab("friend")}
                className="w-full text-left px-3 md:px-4 py-2 text-sm md:text-base text-[#024B5E] hover:bg-gray-100 rounded"
              >
                Invite a friend to Wuffoos
              </button>
              <button
                onClick={() => setActiveTab("promo")}
                className="w-full text-left px-3 md:px-4 py-2 text-sm md:text-base text-[#024B5E] hover:bg-gray-100 rounded"
              >
                Apply promo codes
              </button>
            </div>
            <div className="pt-2 md:pt-4 space-y-2">
              <div
                onClick={handleLogout}
                className="w-full text-left px-3 md:px-4 py-2 text-sm md:text-base text-[#024B5E] hover:bg-gray-100 rounded cursor-pointer"
              >
                Logout
              </div>
              <div className="w-full text-left px-3 md:px-4 py-2 text-sm md:text-base text-[#FE6C5D] hover:bg-gray-100 rounded cursor-pointer">
                Delete account
              </div>
            </div>
          </div>

          {/* Account Detail*/}
          <div className="lg:col-span-9">
            {activeTab === "account" && <AccountDetail />}
            {activeTab === "booking" && <BookingHistory />}
            {activeTab === "payments" && <Payments />}
            {activeTab === "services" && <Services />}
            {activeTab === "portfolio" && <Portfolio />}
            {activeTab === "switch" && <SwitchProfile />}
            {activeTab === "promo" && <ApplyPromo />}
            {activeTab === "friend" && <InviteFriend />}
          </div>
        </div>
      </div>
    </div>
  );
}
