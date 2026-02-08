"use client";
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Calendar, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Global cache to store data between route changes
let profileCache = null;

export default function AccountDetail() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize loading based on cache existence
  const [loading, setLoading] = useState(!profileCache);
  const [updating, setUpdating] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize form with cached data if available
  const [formData, setFormData] = useState(profileCache || {
    fullName: "",
    email: "",
    street: "",
    state: "",
    zipCode: "",
    dob: "",
    profilePicture: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; 
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    // If we have cache, we don't need to show loader, but we still fetch latest data in background
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          const userData = result.data;

          let profilePic = userData.profilePicture || "";
          if (profilePic && !profilePic.startsWith("http")) {
            profilePic = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${profilePic.replace(/\\/g, '/')}`;
          }

          const newData = {
            ...formData, // Keep existing password fields if any
            fullName: userData.fullName || "",
            email: userData.email || "",
            street: userData.street || "",
            state: userData.state || "",
            zipCode: userData.zipCode || "",
            dob: formatDateForInput(userData.dob) || "",
            profilePicture: profilePic,
          };

          setFormData(newData);
          profileCache = newData; // Update cache
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("profileImage", file);

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile-image`, {
        method: "POST",
        credentials: "include",
        headers: {
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: formDataUpload,
      });

      const result = await response.json();

      if (response.ok) {
        const imageUrl = result.profilePicture || result.imageUrl || result.data?.profilePicture;
        
        setFormData(prev => {
            const updated = { ...prev, profilePicture: imageUrl };
            profileCache = updated; // Update cache
            return updated;
        });
        toast.success("Profile picture updated!");
      } else {
        toast.error(result.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed due to server error");
    } finally {
      setUpdating(false);
    }
  };

  const updateProfileInfo = async (token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        street: formData.street,
        state: formData.state,
        zipCode: formData.zipCode,
        dob: formData.dob, 
      }),
    });
    return response;
  };

  const changePassword = async (token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitter/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }),
    });
    return response;
  };

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        toast.error("Please enter your current password");
        return;
      }
      if (!formData.newPassword) {
        toast.error("Please enter a new password");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const profileResponse = await updateProfileInfo(token);
      
      let passwordSuccess = true;
      let profileSuccess = profileResponse.ok;

      if (formData.newPassword && formData.currentPassword) {
        const passwordResponse = await changePassword(token);
        const passwordResult = await passwordResponse.json();
        
        if (!passwordResponse.ok) {
          passwordSuccess = false;
          toast.error(passwordResult.message || "Failed to update password");
        } else {
          toast.success("Password changed successfully");
          setFormData(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          }));
        }
      }

      if (profileSuccess && passwordSuccess) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        
        // Update cache with latest data (excluding passwords)
        profileCache = {
            ...formData,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
      } else if (!profileSuccess) {
        toast.error("Failed to update profile details");
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (loading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#024B5E]" /></div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-[#024B5E]">Account</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          disabled={updating}
        >
          {updating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center sm:justify-start mb-6 sm:mb-8">
        <div
          className="relative cursor-pointer group w-20 h-20 sm:w-24 sm:h-24"
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <div className="w-full h-full bg-teal-500 rounded-full flex items-center justify-center overflow-hidden">
            {formData.profilePicture ? (
              <img src={formData.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="140" height="140" rx="70" fill="#EBFBFE" />
                <path fillRule="evenodd" clipRule="evenodd" d="M47.5002 50C47.5002 37.5736 57.5738 27.5 70.0002 27.5C82.4266 27.5 92.5002 37.5736 92.5002 50C92.5002 62.4264 82.4266 72.5 70.0002 72.5C57.5738 72.5 47.5002 62.4264 47.5002 50Z" fill="#0B87AC" />
                <path fillRule="evenodd" clipRule="evenodd" d="M28.7564 120.527C29.1431 98.0779 47.4601 80 70.0002 80C92.5408 80 110.858 98.0787 111.244 120.528C111.27 122.017 110.412 123.38 109.058 124.001C97.1638 129.459 83.9328 132.5 70.0018 132.5C56.0695 132.5 42.8374 129.458 30.9418 123.999C29.5884 123.378 28.7308 122.015 28.7564 120.527Z" fill="#0B87AC" />
              </svg>
            )}
          </div>
          {isEditing && (
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white w-6 h-6" />
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-[#024B5E]">Full Name</Label>
          <Input id="fullName" value={formData.fullName} onChange={handleChange} disabled={!isEditing} placeholder="Name" className="mt-1 text-[#024B5E]" />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-[#024B5E]">E-mail address or phone number</Label>
          <Input id="email" value={formData.email} disabled={true} placeholder="Email" className="mt-1 text-[#024B5E] bg-gray-50" />
        </div>

        <div>
          <Label htmlFor="street" className="text-sm font-medium text-[#024B5E]">Street</Label>
          <Input id="street" value={formData.street} onChange={handleChange} disabled={!isEditing} placeholder="Street" className="mt-1 text-[#024B5E]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state" className="text-sm font-medium text-[#024B5E]">State</Label>
            <Input id="state" value={formData.state} onChange={handleChange} disabled={!isEditing} placeholder="State" className="mt-1 text-[#024B5E]" />
          </div>
          <div>
            <Label htmlFor="zipCode" className="text-sm font-medium text-[#024B5E]">Zip Code</Label>
            <Input id="zipCode" value={formData.zipCode} onChange={handleChange} disabled={!isEditing} placeholder="Zip Code" className="mt-1 text-[#024B5E]" />
          </div>
        </div>

        <div>
          <Label htmlFor="dob" className="text-sm font-medium text-[#024B5E]">Date of birth</Label>
          <div className="relative mt-1">
            <Input 
              id="dob" 
              type="date" 
              value={formData.dob} 
              onChange={handleChange} 
              disabled={!isEditing} 
              className="text-[#024B5E] block w-full" 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
            <h3 className="text-md font-semibold text-[#024B5E] mb-4">Change Password</h3>
            
            <div className="space-y-4">
                <div>
                <Label htmlFor="currentPassword" className="text-sm font-medium text-[#024B5E]">Current Password</Label>
                <div className="relative mt-1">
                    <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="••••••••"
                    className="pr-10 text-[#024B5E]"
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E]">
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                </div>

                <div>
                <Label htmlFor="newPassword" className="text-sm font-medium text-[#024B5E]">New Password</Label>
                <div className="relative mt-1">
                    <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="••••••••"
                    className="pr-10 text-[#024B5E]"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E]">
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                </div>

                <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#024B5E]">Confirm Password</Label>
                <div className="relative mt-1">
                    <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="••••••••"
                    className="pr-10 text-[#024B5E]"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024B5E]">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}