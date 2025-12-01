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
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 md:mb-8 pb-2 border-b-2 border-grey-600">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Account</h2>
        <Button variant="outline" size="sm" className="text-xs md:text-sm">
          Edit
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex mb-6 md:mb-8 justify-center md:justify-start">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-teal-500 rounded-full flex items-center justify-center">
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
      <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
        {/* Full Name */}
        <div>
          <Label
            htmlFor="fullName"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <Input id="fullName" placeholder="Name" className="mt-1 text-sm md:text-base" />
        </div>

        {/* Email or Phone */}
        <div>
          <Label
            htmlFor="contact"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            E-mail address
          </Label>
          <Input
            id="contact"
            placeholder="E-mail address"
            className="mt-1 text-sm md:text-base"
          />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor="contact"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Phone Number
          </Label>
          <Input
            id="contact"
            placeholder="Phone Number"
            className="mt-1 text-sm md:text-base"
          />
        </div>

        {/* Street Address */}
        <div>
          <Label
            htmlFor="street"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Street
          </Label>
          <Input
            id="street"
            placeholder="Street Number and Name"
            className="mt-1 text-sm md:text-base"
          />
        </div>
        {/* State and Zip Code */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div>
            <Input id="state" placeholder="State" className="mt-1 text-sm md:text-base" />
          </div>
          <div>
            <Input
              id="zipCode"
              placeholder="Zip Code"
              className="mt-1 text-sm md:text-base"
            />
          </div>
        </div>

        {/* About you */}
        <div>
          <Label
            htmlFor="dob"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            About
          </Label>
          <div className="relative mt-1">
            <Input
              id="textarea"
              placeholder="Introduce yourself to potential clients..."
              className="pb-20 w-full h-32 text-sm md:text-base"
            />
          </div>
        </div>

        {/* pet number */}
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Pet number
          </Label>
          <div className="relative mt-1">
            <Input
              id="pet"
              placeholder="03"
              className="mt-1 text-sm md:text-base"
            />
          </div>
        </div>

        {/* home size */}
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Home Size (sq ft)
          </Label>
          <div className="relative mt-1">
            <Input
              id="size"
              placeholder="e.g. 800"
              className="mt-1 text-sm md:text-base"
            />
          </div>
        </div>



        {/* Confirm Password */}
       <div>
          <Label
            htmlFor="currentPassword"
            className="text-xs md:text-sm font-medium text-gray-700"
          >
            Outdoor Space
          </Label>
          <div className="relative mt-1">
            <Input
              id="zipCode"
              placeholder="No outdoor space"
              className="mt-1 text-sm md:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
