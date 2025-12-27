"Use client" ;

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
    return (
        <div className="relative bg-[#F5F3EF] min-h-screen overflow-hidden">
            {/* Top Right Orange Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[850px] bg-[#FE6C5D] "></div>

            {/* Bottom Right Paw */}
            <div className="absolute bottom-15 right-10 w-32 h-32 opacity-60">
                <PawWhiteImage />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        {/* Paw Icon */}
                        <div className="relative w-20 h-20 left-170 ">
                            <PawGreenImage />
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bakso text-[#024B5E] text-4xl sm:text-5xl lg:text-6xl leading-tight">
                            GET PAiD TO<br />
                            PLAY WiTH PETS!
                        </h1>

                        {/* Subheading */}
                        <h2 className="font-montserrat font-bold text-[#024B5E] text-xl sm:text-2xl">
                            GET PAID TO HANG OUT WITH PETS
                        </h2>

                        {/* Description */}
                        <div className="space-y-3 font-montserrat text-[#024B5E] text-base sm:text-lg">
                            <p>Turn your free time into income doing something that feels good.</p>
                            <p>Join the Wuffoos community of trusted pet care. Set your availability, connect with local pet parents, and earn money taking care of pets you'll love.</p>
                            <p>Do what you enjoy. Get paid for it.</p>
                        </div>

                        {/* CTA Button */}
                        <button className="bg-[#FE6C5D] hover:bg-[#FF5252] text-white font-bakso text-lg px-8 py-4 rounded-lg transition-colors flex items-center gap-2">
                            GET STARTED
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="relative -right-35 ">
                        <HeroImage className="h-[669px] w-[552px] "/>
                    </div>
                </div>
            </div>
        </div>
    );
}