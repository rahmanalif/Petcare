"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import AccountDetail from "@/component/settings/AccountDetail";
import BookingHistory from "@/component/settings/BookingHistory";
import Payments from "@/component/settings/Payments";
import SwitchProfile from "@/component/settings/SwitchProfile";
import ApplyPromo from "@/component/settings/ApplyPromo";
import InviteFriend from "@/component/settings/InviteFriend";

export default function AccountSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("account");

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Pet Profile and Add Pet Section */}
        <div className="flex gap-3 mb-6">
          {/* Pet Profile */}
          <div className="bg-[#E7F4F6] rounded-lg p-3 border-2 border-[#035F75] flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img
                src="/Ellipse.png"
                alt="Max"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Max</div>
              <div className="text-xs text-gray-600">Australian Shepherds</div>
            </div>
          </div>

          {/* Add another Pet */}
          <button className="text-[#035F75] border-2 border-dashed border-[#035F75] rounded-lg px-4 py-3 text-xs font-medium hover:bg-[#E7F4F6] transition-colors flex items-center justify-center gap-2 w-fit">
            <span className="text-lg">+</span>
            <span>Add another Pet</span>
          </button>
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
                Booking History
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
            {activeTab === "switch" && <SwitchProfile />}
            {activeTab === "promo" && <ApplyPromo />}
            {activeTab === "friend" && <InviteFriend />}
          </div>
        </div>
      </div>
    </div>
  );
}
