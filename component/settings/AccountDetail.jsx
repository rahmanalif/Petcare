"use client";
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile, updateProfile, uploadProfilePicture } from "@/lib/api/userService";

export default function AccountDetail() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    street: "",
    state: "",
    zipCode: "",
    dob: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  // Load profile data on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProfile();
      
      setFormData({
        fullName: data.fullName || "",
        contact: data.email || data.phone || "",
        street: data.address?.street || "",
        state: data.address?.state || "",
        zipCode: data.address?.zipCode || "",
        dob: data.dateOfBirth || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password fields if changing password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New password and confirm password do not match");
        return;
      }
      if (!formData.currentPassword) {
        setError("Please enter your current password");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const updateData = {
        fullName: formData.fullName,
        email: formData.contact,
        address: {
          street: formData.street,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        dateOfBirth: formData.dob,
      };

      // Include password fields only if changing password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await updateProfile(updateData);
      setSuccess("Profile updated successfully");
      setIsEditing(false);
      
      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      
      // Reload profile to get updated data
      await loadProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      const data = await uploadProfilePicture(file);
      setProfilePicture(data.profilePicture);
      setSuccess("Profile picture updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-[#024B5E]">Account</h2>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsEditing(false);
                loadProfile();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Avatar */}
      <div className="flex justify-center sm:justify-start mb-6 sm:mb-8">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-teal-500 rounded-full flex items-center justify-center">
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="140" height="140" rx="70" fill="#EBFBFE" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.5002 50C47.5002 37.5736 57.5738 27.5 70.0002 27.5C82.4266 27.5 92.5002 37.5736 92.5002 50C92.5002 62.4264 82.4266 72.5 70.0002 72.5C57.5738 72.5 47.5002 62.4264 47.5002 50Z"
                fill="#0B87AC"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.7564 120.527C29.1431 98.0779 47.4601 80 70.0002 80C92.5408 80 110.858 98.0787 111.244 120.528C111.27 122.017 110.412 123.38 109.058 124.001C97.1638 129.459 83.9328 132.5 70.0018 132.5C56.0695 132.5 42.8374 129.458 30.9418 123.999C29.5884 123.378 28.7308 122.015 28.7564 120.527Z"
                fill="#0B87AC"
              />
            </svg>
          )}
          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#024B5E] text-white p-2 rounded-full hover:bg-[#013542] transition-colors"
                disabled={isLoading}
              >
                <Upload className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
        {/* Full Name */}
        <div>
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-[#024B5E]"
          >
            Full Name
          </Label>
          <Input 
            id="fullName" 
            placeholder="Name" 
            className="mt-1 text-[#024B5E]"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
          />
        </div>

        {/* Email or Phone */}
        <div>
          <Label
            htmlFor="contact"
            className="text-sm font-medium text-[#024B5E]"
          >
            E-mail address or phone number
          </Label>
          <Input
            id="contact"
            placeholder="E-mail address or phone number"
            className="mt-1 text-[#024B5E]"
            value={formData.contact}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
          />
        </div>

        {/* Street Address */}
        <div>
          <Label
            htmlFor="street"
            className="text-sm font-medium text-[#024B5E]"
          >
            Street
          </Label>
          <Input
            id="street"
            placeholder="Street Number and Name"
            className="mt-1 text-[#024B5E]"
            value={formData.street}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
          />
        </div>

        {/* State and Zip Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="state"
              className="text-sm font-medium text-[#024B5E]"
            >
              State
            </Label>
            <Input 
              id="state" 
              placeholder="State" 
              className="mt-1 text-[#024B5E]"
              value={formData.state}
              onChange={handleInputChange}
              disabled={!isEditing || isLoading}
            />
          </div>
          <div>
            <Label
              htmlFor="zipCode"
              className="text-sm font-medium text-[#024B5E]"
            >
              Zip Code
            </Label>
            <Input
              id="zipCode"
              placeholder="Zip Code"
              className="mt-1 text-[#024B5E]"
              value={formData.zipCode}
              onChange={handleInputChange}
              disabled={!isEditing || isLoading}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <Label
            htmlFor="dob"
            className="text-sm font-medium text-[#024B5E]"
          >
            Date of birth
          </Label>
          <div className="relative mt-1">
            <Input 
              id="dob" 
              placeholder="DD/MM/YY" 
              className="pr-10 text-[#024B5E]"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={!isEditing || isLoading}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E]" />
          </div>
        </div>

        {/* Password Fields - Only show when editing */}
        {isEditing && (
          <>
            {/* Current Password */}
            <div>
              <Label
                htmlFor="currentPassword"
                className="text-sm font-medium text-[#024B5E]"
              >
                Current Password (required to change password)
              </Label>
              <div className="relative mt-1">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10 text-[#024B5E]"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E] hover:text-[#013542]"
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
                className="text-sm font-medium text-[#024B5E]"
              >
                New Password (leave blank to keep current)
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10 text-[#024B5E]"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E] hover:text-[#013542]"
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
                className="text-sm font-medium text-[#024B5E]"
              >
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10 text-[#024B5E]"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E] hover:text-[#013542]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
