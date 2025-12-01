"use client";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <div id="services" className="bg-linear-to-br from-gray-50 to-stone-100 py-12 sm:py-16 md:py-24 lg:py-36 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* Left Column - Services */}
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-8 sm:mb-10 md:mb-12 tracking-wide font-bakso"
              //   style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Services for Every Dog and Cat
            </h2>

            {/* Dog Boarding */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              <div className="shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <svg
                    width="41"
                    height="43"
                    viewBox="0 0 41 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.5 1.5V5.5M8.5 1.5V5.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.6 41.5C10.539 41.5 6.50847 41.5 4.00424 38.7927C1.5 36.0854 1.5 31.7281 1.5 23.0135V21.9865C1.5 13.2719 1.5 8.91457 4.00424 6.20728C6.50847 3.5 10.539 3.5 18.6 3.5H22.4C30.461 3.5 34.4915 3.5 36.9958 6.20728C39.453 8.86371 39.4991 13.1088 39.5 21.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 13.5H38.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.5 33.5H38.5M30.5 25.5L30.5 41.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl text-gray-800 mb-2 font-bakso"
                  //   style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Dog Boarding
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Your pets stay overnight in your sitter's home. They'll be
                  treated like part of the family in a familiar environment.
                </p>
              </div>
            </div>

            {/* Doggy Day Care */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              <div className="shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <svg
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 1.5V17.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.35938 19.36L10.1794 22.18"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.5 33.5H5.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M37.5 33.5H41.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M35.6403 19.36L32.8203 22.18"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M41.5 41.5H1.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5 9.5L21.5 1.5L29.5 9.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M29.5 33.5C29.5 31.3783 28.6571 29.3434 27.1569 27.8431C25.6566 26.3429 23.6217 25.5 21.5 25.5C19.3783 25.5 17.3434 26.3429 15.8431 27.8431C14.3429 29.3434 13.5 31.3783 13.5 33.5"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl text-gray-800 mb-2 font-bakso"
                  //   style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Doggy Day Care
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Your dog spends the day at your sitter's home. Drop them off
                  in the morning and pick your pup in the evening.
                </p>
              </div>
            </div>

            {/* Dog Walking */}
            <div className="flex gap-3 sm:gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <svg
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4883 9.5C21.6974 9.5 23.4883 7.70914 23.4883 5.5C23.4883 3.29086 21.6974 1.5 19.4883 1.5C17.2791 1.5 15.4883 3.29086 15.4883 5.5C15.4883 7.70914 17.2791 9.5 19.4883 9.5Z"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M33.4883 17.5C35.6974 17.5 37.4883 15.7091 37.4883 13.5C37.4883 11.2909 35.6974 9.5 33.4883 9.5C31.2791 9.5 29.4883 11.2909 29.4883 13.5C29.4883 15.7091 31.2791 17.5 33.4883 17.5Z"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M37.4883 33.5C39.6974 33.5 41.4883 31.7091 41.4883 29.5C41.4883 27.2909 39.6974 25.5 37.4883 25.5C35.2791 25.5 33.4883 27.2909 33.4883 29.5C33.4883 31.7091 35.2791 33.5 37.4883 33.5Z"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.4878 17.5C16.801 17.5 18.1014 17.7587 19.3146 18.2612C20.5279 18.7638 21.6303 19.5003 22.5588 20.4289C23.4874 21.3575 24.224 22.4599 24.7266 23.6732C25.2291 24.8864 25.4878 26.1868 25.4878 27.5V34.5C25.4872 36.1729 24.8876 37.7903 23.7974 39.0593C22.7073 40.3282 21.1987 41.1648 19.545 41.4174C17.8912 41.6701 16.2017 41.3221 14.7824 40.4366C13.363 39.551 12.3078 38.1864 11.8078 36.59C10.9544 33.8367 9.15445 32.0333 6.40778 31.18C4.81215 30.6802 3.44811 29.6258 2.5625 28.2075C1.67689 26.7893 1.32821 25.1008 1.57955 23.4478C1.8309 21.7947 2.66566 20.2862 3.93279 19.1952C5.19992 18.1043 6.81571 17.5029 8.48778 17.5H15.4878Z"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl text-gray-800 mb-2 font-bakso"
                  //   style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Dog Walking
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Your dog gets a walk around your neighborhood. Perfect for
                  busy days and dogs with extra energy to burn.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Wuffoos Protect Card */}
          <div className="relative mt-8 lg:mt-0">
            {/* Image Container - Half outside card */}
            <div className="absolute -top-16 sm:-top-20 md:-top-24 lg:-top-32 right-2 sm:right-4 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 z-10">
              <Image
                src="/Union.png"
                alt="Pet sitter with dog"
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 relative pt-28 sm:pt-32 md:pt-36 lg:pt-8">

              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M23.9964 4.00024C17.9809 4.00024 14.0804 8.03823 9.46743 9.51005C7.59177 10.1085 6.65394 10.4077 6.2744 10.8295C5.89486 11.2514 5.78372 11.8677 5.56144 13.1005C3.18287 26.2922 8.3818 38.4882 20.7806 43.2352C22.1128 43.7452 22.7789 44.0003 24.003 44.0002C25.2271 44.0002 25.8931 43.7452 27.2252 43.2352C39.6232 38.4881 44.8172 26.2922 42.4379 13.1005C42.2156 11.8675 42.1044 11.251 41.7248 10.8292C41.3451 10.4074 40.4074 10.1083 38.5318 9.51022C33.9171 8.03853 30.0122 4.00024 23.9964 4.00024Z"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24 14.0002L24 18.0002"
                      stroke="#035F75"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl sm:text-2xl text-gray-800 font-bakso"
                //   style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Wuffoos Protect
                </h3>
              </div>

              <p
                className="text-gray-800 mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl font-bakso"
                // style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Find peace of mind with every
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                booking.
              </p>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="text-[#357F91] font-semibold">
                      Screened pet sitters
                    </span>{" "}
                    have already passed a third-party background check and show
                    verified reviews from other pet parents, like you.
                  </p>
                </div>

                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="text-[#357F91] font-semibold">
                      Messaging & photo updates
                    </span>{" "}
                    from your sitter during each stay.
                  </p>
                </div>

                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="text-[#357F91] font-semibold">
                      The Rover Guarantee
                    </span>{" "}
                    can protect you and your pet for up to $25,000 in eligible
                    vet care.{" "}
                    <span className="text-[#357F91] underline cursor-pointer">
                      Learn more
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="text-[#357F91] font-semibold">
                      24/7 support
                    </span>{" "}
                    from the Rover team–here to help if you ever need someone to
                    talk to.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/search" className="w-full bg-[#035F75] hover:bg-[#024d5e] text-white font-semibold py-3 sm:py-4 rounded-xl transition-all hover:shadow-lg block text-center text-sm sm:text-base">
                Book a local sitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
