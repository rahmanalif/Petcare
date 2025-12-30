"use client";

import { useRouter } from "next/navigation";

const HeroImage = ({ className }) => (
    <img src="/Hero01.png" className={className} alt="heroImage" />
);

const PawGreenImage = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="115" viewBox="0 0 108 115" fill="none">
        <g opacity="0.4">
            <path d="M51.5987 56.3557C40.0034 53.8179 34.417 63.7711 21.1659 70.9491C2.01084 81.5581 1.20263 94.9187 9.80225 99.8942C18.4019 104.87 29.2529 96.1685 39.3831 99.3835C49.557 101.876 54.478 114.695 64.4713 114.287C74.4428 114.241 80.871 102.144 69.8815 83.7068C62.4294 71.5319 62.7731 59.9655 51.5987 56.3557Z" fill="#024B5E" />
            <path d="M24.8833 38.6641C28.2701 49.922 25.882 61.3815 19.6062 64.2588C12.9921 67.1255 4.9284 60.3336 1.54162 49.0758C-1.84515 37.8179 0.543009 26.3584 6.81877 23.4811C13.4329 20.6144 21.4966 27.4063 24.8833 38.6641Z" fill="#024B5E" />
            <path d="M81.647 53.9635C72.6869 61.3363 69.216 71.7997 73.4888 77.4039C77.7615 83.008 88.4717 81.8887 97.4318 74.5159C106.392 67.1431 109.863 56.6798 105.59 51.0756C100.963 45.4602 90.2529 46.5795 81.647 53.9635Z" fill="#024B5E" />
            <path d="M57.0514 24.0781C55.9384 36.6549 48.6606 46.3611 41.3028 45.746C33.945 45.1309 28.9676 34.2723 30.0805 21.6955C31.1935 9.1188 38.4714 -0.587499 45.8292 0.0276175C53.187 0.642734 58.1643 11.5014 57.0514 24.0781Z" fill="#024B5E" />
            <path d="M63.2467 25.3261C58.146 35.9932 59.5446 46.8661 65.8751 49.861C72.5477 52.8667 81.821 46.8727 86.9005 36.5542C92.0012 25.8871 90.6026 15.0142 84.2721 12.0193C77.9627 8.67572 68.3473 14.6589 63.2467 25.3261Z" fill="#024B5E" />
        </g>
    </svg>
);

const PawWhiteImage = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="80" viewBox="0 0 108 80" fill="none">
        <g opacity="0.6">
            <path d="M51.5987 56.3557C40.0034 53.8179 34.417 63.7711 21.1659 70.9491C2.01084 81.5581 1.20263 94.9187 9.80225 99.8942C18.4019 104.87 29.2529 96.1685 39.3831 99.3835C49.557 101.876 54.478 114.695 64.4713 114.287C74.4428 114.241 80.871 102.144 69.8815 83.7068C62.4294 71.5319 62.7731 59.9655 51.5987 56.3557Z" fill="white" />
            <path d="M24.8833 38.6641C28.2701 49.922 25.882 61.3815 19.6062 64.2588C12.9921 67.1255 4.9284 60.3336 1.54162 49.0758C-1.84515 37.8179 0.543009 26.3584 6.81877 23.4811C13.4329 20.6144 21.4966 27.4063 24.8833 38.6641Z" fill="white" />
            <path d="M81.647 53.9635C72.6869 61.3363 69.216 71.7997 73.4888 77.4039C77.7615 83.008 88.4717 81.8887 97.4318 74.5159C106.392 67.1431 109.863 56.6798 105.59 51.0756C100.963 45.4602 90.2529 46.5795 81.647 53.9635Z" fill="white" />
            <path d="M57.0514 24.0781C55.9384 36.6549 48.6606 46.3611 41.3028 45.746C33.945 45.1309 28.9676 34.2723 30.0805 21.6955C31.1935 9.1188 38.4714 -0.587499 45.8292 0.0276175C53.187 0.642734 58.1643 11.5014 57.0514 24.0781Z" fill="white" />
            <path d="M63.2467 25.3261C58.146 35.9932 59.5446 46.8661 65.8751 49.861C72.5477 52.8667 81.821 46.8727 86.9005 36.5542C92.0012 25.8871 90.6026 15.0142 84.2721 12.0193C77.9627 8.67572 68.3473 14.6589 63.2467 25.3261Z" fill="white" />
        </g>
    </svg>
);

export default function NewHero() {
    const router = useRouter();
    return (
        <div className="relative bg-[#F5F3EF] lg:h-screen overflow-hidden">
            {/* Top Right Orange Background - Responsive sizing */}
            <div className="absolute top-0 right-0 w-[250px] h-[300px] sm:w-[350px] sm:h-[400px] md:w-[450px] md:h-[500px] lg:w-[500px] lg:h-[650px] xl:w-[600px] xl:h-[750px] 2xl:w-[700px] 2xl:h-[850px] bg-[#FE6C5D]"></div>

            {/* Bottom Right Paw - Hidden on small screens, visible on larger */}
            <div className="hidden 2xl:block absolute bottom-10 right-16 w-28 h-28 opacity-60">
                <PawWhiteImage className="w-full h-full" />
            </div>

            {/* Container for content - Proper flex layout */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-full lg:h-screen">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between h-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 gap-4 sm:gap-6 md:gap-8 lg:gap-8">

                    {/* Right Image - Shown first on mobile */}
                    <div className="w-full lg:w-[48%] xl:w-[50%] flex justify-center lg:justify-end items-start order-1 lg:order-2 relative z-20">
                        <HeroImage className="w-full max-w-40 sm:max-w-[220px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[450px] 2xl:max-w-[550px] h-auto object-contain" />
                    </div>

                    {/* Left Content - Shown second on mobile */}
                    <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-start order-2 lg:order-1 mt-22 sm:mt-20 md:mt-24 lg:mt-0 pb-6 lg:pb-0">
                        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8">
                            {/* Paw Icon - Hidden on mobile, visible on desktop */}
                            <div className="hidden lg:block lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28  lg:ml-84 xl:ml-140">
                                <PawGreenImage className="w-full h-full" />
                            </div>

                            {/* Main Heading - Responsive text sizes */}
                            <h1 className="font-bakso text-[#024B5E] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl leading-tight">
                                GET PAID TO HANG<br />
                                OUT WITH PETS
                            </h1>

                            {/* Description - Responsive text and spacing */}
                            <div className="font-montserrat text-[#024B5E] text-[11px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg text-justify leading-relaxed max-w-full lg:max-w-lg xl:max-w-xl">
                                Turn your free time into income doing something that feels good. Join the Wuffoos community of trusted pet care. Set your availability, connect with local pet parents, and earn money taking care of pets you'll love. Do what you enjoy. Get paid for it.
                            </div>

                            {/* CTA Button - Responsive sizing */}
                            <button
                                onClick={() => router.push('/signup?role=pet_sitter')}
                                className="bg-[#FE6C5D] hover:bg-[#FF5252] text-white font-bakso text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 lg:px-8 lg:py-3 xl:px-10 xl:py-4 2xl:px-12 2xl:py-5 rounded-lg transition-colors flex items-center gap-2 sm:gap-2.5 md:gap-3 w-full sm:w-auto justify-center sm:justify-start">
                                GET STARTED
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}