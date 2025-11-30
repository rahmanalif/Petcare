"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountDetail() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Account</h2>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center sm:justify-start mb-6 sm:mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-500 rounded-full flex items-center justify-center">
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="140" height="140" rx="70" fill="#EBFBFE" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47.5002 50C47.5002 37.5736 57.5738 27.5 70.0002 27.5C82.4266 27.5 92.5002 37.5736 92.5002 50C92.5002 62.4264 82.4266 72.5 70.0002 72.5C57.5738 72.5 47.5002 62.4264 47.5002 50Z"
              fill="#0B87AC"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.7564 120.527C29.1431 98.0779 47.4601 80 70.0002 80C92.5408 80 110.858 98.0787 111.244 120.528C111.27 122.017 110.412 123.38 109.058 124.001C97.1638 129.459 83.9328 132.5 70.0018 132.5C56.0695 132.5 42.8374 129.458 30.9418 123.999C29.5884 123.378 28.7308 122.015 28.7564 120.527Z"
              fill="#0B87AC"
            />
          </svg>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
        {/* Full Name */}
        <div>
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <Input id="fullName" placeholder="Name" className="mt-1" />
        </div>

        {/* Email or Phone */}
        <div>
          <Label
            htmlFor="contact"
            className="text-sm font-medium text-gray-700"
          >
            E-mail address or phone number
          </Label>
          <Input
            id="contact"
            placeholder="E-mail address or phone number"
            className="mt-1"
          />
        </div>

        {/* Street Address */}
        <div>
          <Label
            htmlFor="street"
            className="text-sm font-medium text-gray-700"
          >
            Street
          </Label>
          <Input
            id="street"
            placeholder="Street Number and Name"
            className="mt-1"
          />
        </div>

        {/* State and Zip Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State
            </Label>
            <Input id="state" placeholder="State" className="mt-1" />
          </div>
          <div>
            <Label
              htmlFor="zipCode"
              className="text-sm font-medium text-gray-700"
            >
              Zip Code
            </Label>
            <Input
              id="zipCode"
              placeholder="Zip Code"
              className="mt-1"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <Label
            htmlFor="dob"
            className="text-sm font-medium text-gray-700"
          >
            Death of birth
          </Label>
          <div className="relative mt-1">
            <Input id="dob" placeholder="DD/MM/YY" className="pr-10" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Current Password */}
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-sm font-medium text-gray-700"
          >
            Current Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <Label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
