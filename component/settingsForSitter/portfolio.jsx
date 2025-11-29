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
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-medium text-gray-800">Order history</h2>
          <button
            onClick={handlePublish}
            className="px-6 py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors"
          >
            Publish
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-14 h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-4">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-center">No portfolio images yet</p>
        </div>
      </div>
    );
  }

  // Images view
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-medium text-gray-800">Order history</h2>
          <button
            onClick={handleAddPortfolio}
            className="px-6 py-2.5 border-2 border-dashed border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors"
          >
            Add Portfolio
          </button>
        </div>

        <div className="space-y-6">
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
                className="absolute top-3 right-3 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 transition-colors group"
              >
                <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800">Order history</h2>
              <button
                onClick={handlePublish}
                className="px-6 py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors"
              >
                Publish
              </button>
            </div>

            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 flex flex-col items-center justify-center min-h-[300px] hover:border-[#035F75] hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-500 text-center">Click to upload portfolio image</p>
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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