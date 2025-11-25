import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, RefreshCw, CheckCircle } from "lucide-react";

const SitterCard = ({ sitter }) => {
  return (
    <Link href="/profile">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              {/* Top Section - Profile and Name */}
              <div className="flex gap-4">
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full bg-gray-300 shrink-0">
                  <img
                    src="/Ellipse 52.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name and Location */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 font-montserrat">
                    {sitter.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 font-montserrat">
                    <MapPin className="w-4 h-4" />
                    <span>{sitter.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Stats under profile */}
              <div className="flex flex-col gap-2 text-sm font-montserrat">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-gray-700" />
                  <span className="font-semibold">{sitter.rating}</span>
                  <span className="text-gray-600">({sitter.reviews} reviews)</span>
                </div>

                {/* Repeat pet owners */}
                <div className="flex items-center gap-1 text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                  <span>Repeat pet owners</span>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{sitter.availability}</span>
                </div>
              </div>
            </div>

            {/* Price and Background Check */}
            <div className="text-right">
              {sitter.backgroundCheck && (
                <div className="flex items-center gap-1 text-sm bg-[#FCF0D994] text-orange-500 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-montserrat">Background Check</span>
                </div>
              )}
              <div className="font-bold text-[#035F75] font-montserrat">
                ${sitter.price}
              </div>
              <div className="text-xs text-gray-500 font-montserrat">
                Total per day
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SitterCard;
