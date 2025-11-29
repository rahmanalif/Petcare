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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Earnings Summary */}
        <div className="border border-gray-300 rounded-lg m-2 p-6 bg-white shadow-sm">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 font-montserrat mb-1">
              Earnings Summary
            </h2>
          </div>

          {/* Total Income and Promo Code */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 font-montserrat">$900.50</p>
            </div>
            <button className="text-[#035F75] text-sm font-medium underline">
              Apply Promo Code
            </button>
          </div>

          {/* This Month, Last Month, Pending */}
          <div className="grid grid-cols-3 gap-6">
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            >
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-lg font-bold text-gray-900 font-montserrat">$842.00</p>
            </div>
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            >
              <p className="text-sm text-gray-600 mb-1">Last Month</p>
              <p className="text-lg font-bold text-gray-900 font-montserrat">$753.50</p>
            </div>
            <div
              onClick={handleNavigateToOngoing}
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            >
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-lg font-bold text-gray-900 font-montserrat">$135.00</p>
            </div>
          </div>
        </div>
        

        <div className="grid grid-cols-12 gap-6 boarder-2 rounded-2xl bg-[#FFF] p-4 shadow-md">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-2">
            {/* Navigation Menu */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "account"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "booking"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Change password
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "payments"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "services"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "portfolio"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab("switch")}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === "switch"
                    ? "border-[#035F75] bg-[#E7F4F6] text-[#035F75] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                Switch profile
              </button>
            </div>

            <div className="pt-4 space-y-2">
              <button 
                onClick={() => setActiveTab("friend")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Invite a friend to Wuffoos
              </button>
              <button 
                onClick={() => setActiveTab("promo")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Apply promo codes
              </button>
            </div>
            <div className="pt-4 space-y-2">
              <div
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                Logout
              </div>
              <div className="w-full text-left px-4 py-2 text-[#FE6C5D] hover:bg-gray-100 rounded cursor-pointer">
                Delete account
              </div>
            </div>
          </div>

          {/* Account Detail*/}
          <div className="col-span-9">
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
