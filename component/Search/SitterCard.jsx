import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, RefreshCw, CheckCircle } from "lucide-react";

const SitterCard = ({ sitter }) => {
  return (
    <Link href="/profile">
      <Card className="hover:shadow-md transition-shadow p-2 sm:p-3 md:p-4 m-2 sm:m-3 md:m-4">
        <CardContent className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Top Section - Profile and Name */}
              <div className="flex gap-3 sm:gap-4">
                {/* Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-300 shrink-0">
                  <img
                    src="/Ellipse 52.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name and Location */}
                <div className="flex-1">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 pt-4 sm:pt-6 md:pt-8">
                    {sitter.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{sitter.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Stats under profile */}
              <div className="flex flex-col gap-2 text-xs sm:text-sm">
                {/* Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-gray-700" />
                    <span className="font-semibold">{sitter.rating}</span>
                    <span className="text-gray-600">
                      ({sitter.reviews} reviews)
                    </span>
                  </div>
                  {/* Repeat pet owners */}
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.18336 0.15771C5.39364 -0.0525701 5.73458 -0.0525701 5.94486 0.15771L7.38074 1.59361C7.53474 1.74761 7.58083 1.97921 7.49748 2.18042C7.41412 2.38163 7.21776 2.51282 7.00001 2.51282H5.56411C3.08591 2.51282 1.07692 4.5218 1.07692 7.00001C1.07692 9.47815 3.08608 11.4872 5.56431 11.4872H5.92308C6.22047 11.4872 6.46155 11.7283 6.46155 12.0257C6.46155 12.323 6.22047 12.5641 5.92308 12.5641H5.56431C2.49136 12.5641 0 10.073 0 7.00001C0 3.92703 2.49113 1.4359 5.56411 1.4359H5.70005L5.18336 0.919211C4.97308 0.70893 4.97308 0.367991 5.18336 0.15771ZM8.97437 1.97436C8.97437 1.67698 9.21546 1.4359 9.51283 1.4359H9.87181C12.9448 1.4359 15.4359 3.92703 15.4359 7.00001C15.4359 10.073 12.9448 12.5641 9.87181 12.5641H9.7359L10.2525 13.0808C10.4628 13.2911 10.4628 13.632 10.2525 13.8423C10.0422 14.0526 9.70137 14.0526 9.49108 13.8423L8.05518 12.4064C7.90118 12.2524 7.85509 12.0208 7.93844 11.8196C8.0218 11.6184 8.21815 11.4872 8.43591 11.4872H9.87181C12.35 11.4872 14.359 9.47823 14.359 7.00001C14.359 4.5218 12.35 2.51282 9.87181 2.51282H9.51283C9.21546 2.51282 8.97437 2.27174 8.97437 1.97436Z"
                        fill="#035F75"
                      />
                    </svg>
                    <span>Repeat pet owners</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0 text-green-600" />
                  <span className="text-xs sm:text-sm">{sitter.availability}</span>
                </div>
              </div>
            </div>

            {/* Price and Background Check */}
            <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
              <div className="order-2 sm:order-1">
                {sitter.backgroundCheck && (
                  <div className="flex items-center gap-1 text-xs sm:text-sm bg-[#FCF0D994] text-orange-500 mb-0 sm:mb-2 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Background Check</span>
                  </div>
                )}
              </div>
              <div className="order-1 sm:order-2">
                <div className="font-bold text-lg sm:text-xl text-[#035F75]">
                  ${sitter.price}
                </div>
                <div className="text-xs text-gray-500">
                  Total per day
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SitterCard;
