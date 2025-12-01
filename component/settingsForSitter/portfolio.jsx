"use client";
import React, { useState } from "react";
import { Trash2, Camera } from "lucide-react";

export default function Portfolio() {
  const [portfolioImages, setPortfolioImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
      alt: "Woman with dog in autumn"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
      alt: "Woman with dog in autumn"
    }
  ]);
  const [isPublished, setIsPublished] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDelete = (id) => {
    setPortfolioImages(portfolioImages.filter(img => img.id !== id));
  };

  const handleAddPortfolio = () => {
    setShowUploadModal(true);
  };

  const handlePublish = () => {
    setIsPublished(!isPublished);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload the file and get a URL
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(files[0]),
        alt: "New portfolio image"
      };
      setPortfolioImages([...portfolioImages, newImage]);
      setShowUploadModal(false);
    }
  };

  // Empty state view
  if (portfolioImages.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
          <h2 className="text-lg md:text-2xl font-medium text-gray-800">Order history</h2>
          <button
            onClick={handlePublish}
            className="px-3 md:px-6 py-2 md:py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors text-xs md:text-sm"
          >
            Publish
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px]">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-3 md:mb-4">
            <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <p className="text-gray-500 text-center text-sm md:text-base">No portfolio images yet</p>
        </div>
      </div>
    );
  }

  // Images view
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200 gap-2">
          <h2 className="text-lg md:text-2xl font-medium text-gray-800">Order history</h2>
          <button
            onClick={handleAddPortfolio}
            className="px-3 md:px-6 py-2 md:py-2.5 border-2 border-dashed border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            Add Portfolio
          </button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {portfolioImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 transition-colors group"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
              <h2 className="text-lg md:text-2xl font-medium text-gray-800">Order history</h2>
              <button
                onClick={handlePublish}
                className="px-3 md:px-6 py-2 md:py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors text-xs md:text-sm"
              >
                Publish
              </button>
            </div>

            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] hover:border-[#035F75] hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-gray-500 text-center text-sm md:text-base">Click to upload portfolio image</p>
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="mt-3 md:mt-4 flex justify-end">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 md:px-6 py-2 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}