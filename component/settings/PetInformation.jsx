"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Activity,
  Calendar,
  Home,
  Users,
  Dog,
  Pill,
  Clock,
  Coffee,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PetProfile() {
  const router = useRouter();
  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 m-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#024B5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span className="text-[#024B5E] font-medium text-lg">Pet Profile</span>
        </button>
      </div>
      {/* Hero Image Section */}
      <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=1200&h=400&fit=crop"
          alt="Max boy - Husky puppy"
          className="w-full h-96 object-cover"
        />
        <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium transition-colors">
          📷 Update Pet Photo
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pet Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl text-[#024B5E]">Pet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-[#024B5E]">Pet Name</p>
              <p className="text-[#024B5E]">Max boy</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Type</p>
              <p className="text-[#024B5E]">Dog</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Weight (lbs)</p>
              <p className="text-[#024B5E]">8kg</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Age</p>
              <p className="text-[#024B5E]">3 Year 4Month</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Breed</p>
              <p className="text-[#024B5E]">Mix</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Gender</p>
              <p className="text-[#024B5E]">Male</p>
            </div>
            <div>
              <p className="text-sm text-[#024B5E]">Dates of birth</p>
              <p className="text-[#024B5E]">5kg</p>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Additional Details & Care Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#024B5E]">Additional details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Microchipped?</p>
                  <p className="text-sm text-[#024B5E]">Microchipped</p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Spayed/Neutered?</p>
                  <p className="text-sm text-[#024B5E]">Spayed/Neutered</p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">House Trained?</p>
                  <p className="text-sm text-[#024B5E]">Not House Trained</p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">
                    Friendly with children?
                  </p>
                  <p className="text-sm text-[#024B5E]">
                    Friendly with children
                  </p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">
                    Friendly with dogs?
                  </p>
                  <p className="text-sm text-[#024B5E]">
                    Friendly with children
                  </p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Adoption Date</p>
                  <p className="text-sm text-[#024B5E]">10/12/2025</p>
                </div>
              </div>
              <div>
                <p className="text-[#024B5E] font-medium mb-1">About your pet</p>
                <p className="text-sm text-[#024B5E]">
                  Good for eating my share 😁
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Care Info and Health Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Care Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-[#024B5E]">
                  <Heart className="w-5 h-5 text-[#024B5E]" />
                  Care info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Potty break</p>
                  <p className="text-sm text-[#024B5E]">
                    Needs a potty break every hour
                  </p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Energy level</p>
                  <p className="text-sm text-[#024B5E]">High energy level</p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Feeding schedule</p>
                  <p className="text-sm text-[#024B5E]">
                    Needs to be fed in the morning
                  </p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Can be left alone</p>
                  <p className="text-sm text-[#024B5E]">
                    Can be left alone for 1 hour or less
                  </p>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Medications</p>
                  <div className="mt-2">
                    <p className="text-xs text-[#024B5E] mb-1">Pill</p>
                    <Badge variant="secondary" className="text-xs">
                      ABCD Pill
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">
                    Anything else a sitter should know?
                  </p>
                  <p className="text-sm text-[#024B5E]">
                    Add instructions for walking, feeding or other care
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Health Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-[#024B5E]">
                  <Activity className="w-5 h-5 text-[#024B5E]" />
                  Health info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-[#024B5E] font-medium mb-1">Veterinary info</p>
                  <div className="text-sm text-[#024B5E] space-y-1">
                    <p className="font-medium">Vet's Name: Dr. Emily Carter</p>
                    <p>Clinic: Happy Paws Animal Clinic</p>
                    <p>Address: 45 Green Park Rd, Boston, MA</p>
                    <p>Number: (408) 555-0120</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[#024B5E] font-medium mb-1">
                    Pet insurance provider
                  </p>
                  <p className="text-sm text-[#024B5E]">Labrador</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
