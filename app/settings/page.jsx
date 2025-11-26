"use client";
import React, { useState } from 'react';
import { User, Eye, EyeOff, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
        
      <div className="max-w-5xl mx-auto">
        {/* Pet Profile and Add Pet Section */}
        <div className="flex gap-4  mb-6">
          {/* Pet Profile */}
          <div className="bg-[#E7F4F6] rounded-lg p-4 border-2 border-[#035F75] flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img
                src="/Ellipse.png"
                alt="Max"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Max</div>
              <div className="text-sm text-gray-600">Australian Shepherds</div>
            </div>
          </div>

          {/* Add another Pet */}
          <button className="flex-1 text-[#035F75] border-2 border-dashed border-[#035F75] rounded-lg p-4 text-sm font-medium hover:bg-[#E7F4F6] transition-colors flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            <span>Add another Pet</span>
          </button>
        </div>
            
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-2">
            
            {/* Navigation Menu */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 border-l-4 ${
                  activeTab === 'account'
                    ? 'border-teal-500 bg-[#E7F4F6] text-[#035F75] font-medium'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className="w-full text-left px-4 py-3 border-l-4 border-transparent hover:bg-gray-50"
              >
                Booking History
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className="w-full text-left px-4 py-3 border-l-4 border-transparent hover:bg-gray-50"
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('switch')}
                className="w-full text-left px-4 py-3 border-l-4 border-transparent hover:bg-gray-50"
              >
                Switch profile
              </button>
            </div>

            <div className="pt-4 space-y-2">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Invite a friend to Wuffoos
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Apply promo codes
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Account</h2>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>

              {/* Avatar */}
              <div className="flex mb-8">
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Name"
                    className="mt-1"
                  />
                </div>

                {/* Email or Phone */}
                <div>
                  <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
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
                  <Label htmlFor="street" className="text-sm font-medium text-gray-700">
                    Street
                  </Label>
                  <Input
                    id="street"
                    placeholder="Street Number and Name"
                    className="mt-1"
                  />
                </div>

                {/* State and Zip Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State
                    </Label>
                    <Input
                      id="state"
                      placeholder="State"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
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
                  <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                    Death of birth
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="dob"
                      placeholder="DD/MM/YY"
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Current Password */}
                <div>
                  <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                    Current Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
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
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          </div>
        </div>
      </div>
    </div>
  );
}