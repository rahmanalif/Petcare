"use client";

import { useRouter } from "next/navigation";

const HeroImage = ({className}) => (
    <img src="/Hero01.png" className={className} alt="heroImage" />
);

const PawGreenImage = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="115" viewBox="0 0 108 115" fill="none">
  <g opacity="0.4">
    <path d="M51.5987 56.3557C40.0034 53.8179 34.417 63.7711 21.1659 70.9491C2.01084 81.5581 1.20263 94.9187 9.80225 99.8942C18.4019 104.87 29.2529 96.1685 39.3831 99.3835C49.557 101.876 54.478 114.695 64.4713 114.287C74.4428 114.241 80.871 102.144 69.8815 83.7068C62.4294 71.5319 62.7731 59.9655 51.5987 56.3557Z" fill="#024B5E"/>
    <path d="M24.8833 38.6641C28.2701 49.922 25.882 61.3815 19.6062 64.2588C12.9921 67.1255 4.9284 60.3336 1.54162 49.0758C-1.84515 37.8179 0.543009 26.3584 6.81877 23.4811C13.4329 20.6144 21.4966 27.4063 24.8833 38.6641Z" fill="#024B5E"/>
    <path d="M81.647 53.9635C72.6869 61.3363 69.216 71.7997 73.4888 77.4039C77.7615 83.008 88.4717 81.8887 97.4318 74.5159C106.392 67.1431 109.863 56.6798 105.59 51.0756C100.963 45.4602 90.2529 46.5795 81.647 53.9635Z" fill="#024B5E"/>
    <path d="M57.0514 24.0781C55.9384 36.6549 48.6606 46.3611 41.3028 45.746C33.945 45.1309 28.9676 34.2723 30.0805 21.6955C31.1935 9.1188 38.4714 -0.587499 45.8292 0.0276175C53.187 0.642734 58.1643 11.5014 57.0514 24.0781Z" fill="#024B5E"/>
    <path d="M63.2467 25.3261C58.146 35.9932 59.5446 46.8661 65.8751 49.861C72.5477 52.8667 81.821 46.8727 86.9005 36.5542C92.0012 25.8871 90.6026 15.0142 84.2721 12.0193C77.9627 8.67572 68.3473 14.6589 63.2467 25.3261Z" fill="#024B5E"/>
  </g>
</svg>
);

const PawWhiteImage = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="80" viewBox="0 0 108 80" fill="none">
<g opacity="0.6">
<path d="M51.5987 56.3557C40.0034 53.8179 34.417 63.7711 21.1659 70.9491C2.01084 81.5581 1.20263 94.9187 9.80225 99.8942C18.4019 104.87 29.2529 96.1685 39.3831 99.3835C49.557 101.876 54.478 114.695 64.4713 114.287C74.4428 114.241 80.871 102.144 69.8815 83.7068C62.4294 71.5319 62.7731 59.9655 51.5987 56.3557Z" fill="white"/>
<path d="M24.8833 38.6641C28.2701 49.922 25.882 61.3815 19.6062 64.2588C12.9921 67.1255 4.9284 60.3336 1.54162 49.0758C-1.84515 37.8179 0.543009 26.3584 6.81877 23.4811C13.4329 20.6144 21.4966 27.4063 24.8833 38.6641Z" fill="white"/>
<path d="M81.647 53.9635C72.6869 61.3363 69.216 71.7997 73.4888 77.4039C77.7615 83.008 88.4717 81.8887 97.4318 74.5159C106.392 67.1431 109.863 56.6798 105.59 51.0756C100.963 45.4602 90.2529 46.5795 81.647 53.9635Z" fill="white"/>
<path d="M57.0514 24.0781C55.9384 36.6549 48.6606 46.3611 41.3028 45.746C33.945 45.1309 28.9676 34.2723 30.0805 21.6955C31.1935 9.1188 38.4714 -0.587499 45.8292 0.0276175C53.187 0.642734 58.1643 11.5014 57.0514 24.0781Z" fill="white"/>
<path d="M63.2467 25.3261C58.146 35.9932 59.5446 46.8661 65.8751 49.861C72.5477 52.8667 81.821 46.8727 86.9005 36.5542C92.0012 25.8871 90.6026 15.0142 84.2721 12.0193C77.9627 8.67572 68.3473 14.6589 63.2467 25.3261Z" fill="white"/>
</g>
</svg>
);

export default function NewHero() {
    const router = useRouter();
    return (
        <div className="relative bg-[#F5F3EF] min-h-screen overflow-hidden">
            {/* Top Right Orange Background - Responsive sizing */}
            <div className="absolute top-0 right-0 w-[300px] h-[400px] sm:w-[400px] sm:h-[600px] md:w-[450px] md:h-[700px] lg:w-[500px] lg:h-[850px] xl:w-[600px] xl:h-[900px] bg-[#FE6C5D]"></div>

            {/* Bottom Right Paw - Hidden on small screens, visible on larger */}
            <div className="hidden sm:block absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-60">
                <PawWhiteImage className="w-full h-full" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                        {/* Paw Icon - Responsive positioning */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:ml-32 xl:ml-40">
                            <PawGreenImage className="w-full h-full" />
                        </div>

                        {/* Main Heading - Responsive text sizes */}
                        <h1 className="font-bakso text-[#024B5E] text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight">
                            GET PAID TO HANG<br />
                            OUT WITH PETS
                        </h1>

                        {/* Description - Responsive text and spacing */}
                        <div className="space-y-3 font-montserrat text-[#024B5E] text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-justify max-w-xl">
                            Turn your free time into income doing something that feels good. Join the Wuffoos community of trusted pet care. Set your availability, connect with local pet parents, and earn money taking care of pets you'll love. Do what you enjoy. Get paid for it.
                        </div>

                        {/* CTA Button - Responsive sizing */}
                        <button
                            onClick={() => router.push('/signup?role=pet_sitter')}
                            className="bg-[#FE6C5D] hover:bg-[#FF5252] text-white font-bakso text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                            GET STARTED
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Right Image - Fully responsive */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                        <HeroImage className="w-full max-w-[280px] h-auto sm:max-w-[350px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[552px] object-contain lg:-mr-8 xl:-mr-12 2xl:-mr-16"/>
                    </div>
                </div>
            </div>
        </div>
    );
}