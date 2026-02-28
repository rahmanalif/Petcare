"use client";
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function WuffoosFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#D4E8EC] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Brand Logo */}
          <div className="flex items-center">
            <div className="relative w-82 h-24">
              <Image
                src="/wuffoos.png"
                alt="Wuffoos Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Right Section - Quick Links */}
          <div className="md:text-right">
            <h3 className="text-xl text-[#024B5E] mb-6 font-bakso uppercase tracking-wider">
              {t("footer.quick_links")}
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a href="#" className="text-[#024B5E] hover:text-[#035F75] transition-colors font-montserrat">
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#024B5E] hover:text-[#035F75] transition-colors font-montserrat">
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#024B5E] hover:text-[#035F75] transition-colors font-montserrat">
                  {t("footer.testimonial")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#024B5E] hover:text-[#035F75] transition-colors font-montserrat">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#024B5E] hover:text-[#035F75] transition-colors font-montserrat">
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="md:flex md:flex-col md:items-end">
              <h4 className="text-[#024B5E] font-montserrat font-medium mb-4">{t("footer.follow_us")}</h4>
              <div className="flex gap-3 md:justify-end">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#024B5E] hover:bg-[#035F75] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#024B5E] hover:bg-[#035F75] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}