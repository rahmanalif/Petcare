"use client";

const pawImage = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="62" viewBox="0 0 61 62" fill="none">
  <g opacity="0.6">
    <path d="M31.5345 29.6491C25.0757 31.0418 24.5621 37.2951 19.524 43.9207C12.2953 53.6146 14.9923 60.4736 20.5016 60.9858C26.011 61.4981 29.4802 54.6623 35.3549 53.944C41.0839 52.8549 46.5547 58.1286 51.518 55.6324C56.5542 53.3216 56.9954 45.8042 47.1468 39.1162C40.5446 34.7446 38.0295 28.8884 31.5345 29.6491Z" fill="white"/>
    <path d="M13.8998 26.9416C18.2312 31.7878 19.6867 38.0597 17.1792 40.9368C14.498 43.8861 8.83762 42.3437 4.50618 37.4975C0.174735 32.6513 -1.28067 26.3794 1.22681 23.5023C3.90802 20.5529 9.56837 22.0954 13.8998 26.9416Z" fill="white"/>
    <path d="M46.187 21.5602C43.366 27.2986 44.0418 33.3213 47.5073 35.1403C50.9728 36.9593 56.1334 33.9429 58.9544 28.2045C61.7753 22.4661 61.0996 16.4433 57.6341 14.6244C53.9868 12.881 48.8261 15.8974 46.187 21.5602Z" fill="white"/>
    <path d="M26.7903 12.2755C29.1509 18.8129 27.7238 25.3309 23.8568 26.7118C19.9897 28.0927 14.946 23.8108 12.5854 17.2734C10.2248 10.736 11.6519 4.218 15.519 2.83714C19.3861 1.45627 24.4298 5.73817 26.7903 12.2755Z" fill="white"/>
    <path d="M30.2161 11.4775C30.1144 17.9759 33.3501 23.086 37.2505 23.1296C41.3265 23.1 44.6265 17.9784 44.7986 11.659C44.9003 5.16051 41.6647 0.0504128 37.7643 0.00689055C33.7936 -0.215616 30.3178 4.97903 30.2161 11.4775Z" fill="white"/>
  </g>
</svg>
);

const pawImageWhite = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="62" viewBox="0 0 61 62" fill="none">
    <path d="M31.5345 29.6491C25.0757 31.0418 24.5621 37.2951 19.524 43.9207C12.2953 53.6146 14.9923 60.4736 20.5016 60.9858C26.011 61.4981 29.4802 54.6623 35.3549 53.944C41.0839 52.8549 46.5547 58.1286 51.518 55.6324C56.5542 53.3216 56.9954 45.8042 47.1468 39.1162C40.5446 34.7446 38.0295 28.8884 31.5345 29.6491Z" fill="#024B5E" />
    <path d="M13.8998 26.9416C18.2312 31.7878 19.6867 38.0597 17.1792 40.9368C14.498 43.8861 8.83762 42.3437 4.50618 37.4975C0.174735 32.6513 -1.28067 26.3794 1.22681 23.5023C3.90802 20.5529 9.56837 22.0954 13.8998 26.9416Z" fill="#024B5E" />
    <path d="M46.187 21.5602C43.366 27.2986 44.0418 33.3213 47.5073 35.1403C50.9728 36.9593 56.1334 33.9429 58.9544 28.2045C61.7753 22.4661 61.0996 16.4433 57.6341 14.6244C53.9868 12.881 48.8261 15.8974 46.187 21.5602Z" fill="#024B5E" />
    <path d="M26.7903 12.2755C29.1509 18.8129 27.7238 25.3309 23.8568 26.7118C19.9897 28.0927 14.946 23.8108 12.5854 17.2734C10.2248 10.736 11.6519 4.218 15.519 2.83714C19.3861 1.45627 24.4298 5.73817 26.7903 12.2755Z" fill="#024B5E" />
    <path d="M30.2161 11.4775C30.1144 17.9759 33.3501 23.086 37.2505 23.1296C41.3265 23.1 44.6265 17.9784 44.7986 11.659C44.9003 5.16051 41.6647 0.0504128 37.7643 0.00689055C33.7936 -0.215616 30.3178 4.97903 30.2161 11.4775Z" fill="#024B5E" />
  </svg>
);

export default function WhatUserSay() {
  const PawImage = pawImage;

  const testimonials = [
    {
      name: "Edgar Davids",
      image: "/i1.png",
      rating: 4,
      text: "UI Wiki's grid section templates are visually impressive and easy to customize. They've elevated my project presentations.",
    },
    {
      name: "Edgar Davids",
      image: "/i2.png",
      rating: 4,
      text: "UI Wiki's grid section templates are visually impressive and easy to customize. They've elevated my project presentations.",
    },
    {
      name: "Edgar Davids",
      image: "/i3.png",
      rating: 4,
      text: "UI Wiki's grid section templates are visually impressive and easy to customize. They've elevated my project presentations.",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10.6772 4.31229C11.0937 3.0303 12.9074 3.0303 13.3239 4.31229L14.4998 7.93129C14.6861 8.50462 15.2204 8.89279 15.8232 8.89279H19.6285C20.9764 8.89279 21.5369 10.6177 20.4464 11.41L17.3678 13.6467C16.8801 14.001 16.6761 14.6291 16.8624 15.2024L18.0382 18.8214C18.4548 20.1034 16.9875 21.1695 15.897 20.3771L12.8185 18.1405C12.3308 17.7861 11.6704 17.7861 11.1827 18.1405L8.10416 20.3771C7.01363 21.1695 5.54634 20.1034 5.96288 18.8214L7.13877 15.2024C7.32505 14.6291 7.12098 14.001 6.63328 13.6467L3.55478 11.41C2.46425 10.6177 3.0247 8.89279 4.37267 8.89279H8.17791C8.78074 8.89279 9.31501 8.50462 9.50129 7.93129L10.6772 4.31229Z"
              fill="#FE6C5D"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#FE6C5D] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with paw prints */}
        <div className="flex justify-between items-start mb-8">
          <div className="w-16">
            <PawImage className="" />
          </div>
          <div className="flex-1 text-center px-8">
            <h1 className="font-bakso text-[48px] text-[#FFF] mb-4">
              WHAT OUR USERS SAY
            </h1>
            <p className="font-montserrat text-[18px] text-[#FFF]">
              Hear the trusted feedback from customers who have put their faith
              in us
            </p>
          </div>
          <div className="w-16 mt-28">
            <PawImage className="" />
          </div>
          
        </div>



        {/* Testimonial Cards with side paw prints */}
        <div className="flex gap-8 mt-12 items-center">
          {/* Left side paw prints */}
          <div className="flex flex-col gap-32">
            {/* <div className="w-16">
              <PawImage className="" />
            </div> */}
            <div className="w-16 mt-38 ">
              <PawImage className="" />
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6 rounded-lg">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className=""
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat font-semibold text-lg text-[#024B5E] mb-2">
                    {testimonial.name}
                  </h3>
                  <div className="mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <p className="font-montserrat text-sm text-[#024B5E] leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side paw prints */}
          <div className="flex flex-col gap-32">
            <div className="w-16 mt-92 ">
              <PawImage className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
