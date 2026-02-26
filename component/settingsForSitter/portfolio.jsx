"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Camera, Loader2 } from "lucide-react";
import { 
  fetchSitterProfile, 
  uploadPortfolioImage, 
  deletePortfolioImage 
} from "@/redux/sitter/sitterSlice"; 

export default function Portfolio() {
  const dispatch = useDispatch();
  
  const { portfolio, loading, uploading } = useSelector((state) => state.sitter);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    dispatch(fetchSitterProfile());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this image?")) {
       await dispatch(deletePortfolioImage(id));
    }
  };

  const handleAddPortfolio = () => {
    setShowUploadModal(true);
  };
  const handlePublish = () => {
    setIsPublished(!isPublished);
    // dispatch(updateSitterProfile({ isPortfolioPublished: !isPublished })); 
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // API কল করা হচ্ছে
      const result = await dispatch(uploadPortfolioImage(file));
      
      if (uploadPortfolioImage.fulfilled.match(result)) {
        setShowUploadModal(false); // আপলোড সফল হলে মোডাল বন্ধ
      }
    }
  };

  // --- VIEW 1: EMPTY STATE ---
  // যদি পোর্টফোলিও খালি থাকে এবং লোডিং না হয়
  if (!loading && (!portfolio || portfolio.length === 0)) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
          <h2 className="text-lg md:text-2xl font-medium text-gray-800">Portfolio</h2>
          <button
            onClick={handlePublish}
            className="px-3 md:px-6 py-2 md:py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors text-xs md:text-sm"
          >
            {isPublished ? "Published" : "Publish"}
          </button>
        </div>

        {/* Click to open modal even in empty state */}
        <div 
          onClick={handleAddPortfolio}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] hover:bg-gray-50 transition"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-3 md:mb-4">
            <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <p className="text-gray-500 text-center text-sm md:text-base">
            No portfolio images yet. Click to add.
          </p>
        </div>
        
        {/* Modal Logic Reuse */}
        {showUploadModal && (
          <UploadModal 
            onClose={() => setShowUploadModal(false)} 
            onUpload={handleFileUpload} 
            uploading={uploading} 
            handlePublish={handlePublish}
          />
        )}
      </div>
    );
  }

  // --- VIEW 2: LIST STATE ---
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200 gap-2">
          <h2 className="text-lg md:text-2xl font-medium text-gray-800">Portfolio</h2>
          <button
            onClick={handleAddPortfolio}
            className="px-3 md:px-6 py-2 md:py-2.5 border-2 border-dashed border-[#035F75] text-[#035F75] rounded-lg font-medium hover:bg-[#E7F4F6] transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            Add Portfolio
          </button>
        </div>

        {/* Loading Spinner for initial fetch */}
        {loading && (
           <div className="flex justify-center p-8 text-[#035F75]">
             <Loader2 className="animate-spin w-8 h-8" />
           </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {portfolio && portfolio.map((image) => (
            <div key={image._id || image.id} className="relative group">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-[4/3]">
                <img
                  src={image.url || image.secure_url} // Backend field name support
                  alt={image.alt || "Portfolio"}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => handleDelete(image._id || image.id)}
                className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)} 
          onUpload={handleFileUpload} 
          uploading={uploading}
          handlePublish={handlePublish}
        />
      )}
    </>
  );
}

// Helper Component for Modal (Clean Code)
function UploadModal({ onClose, onUpload, uploading, handlePublish }) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 max-w-3xl w-full relative">
        <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
          <h2 className="text-lg md:text-2xl font-medium text-gray-800">Upload to Portfolio</h2>
          <button
            onClick={handlePublish}
            className="px-3 md:px-6 py-2 md:py-2.5 bg-[#035F75] text-white rounded-lg font-medium hover:bg-[#024a5c] transition-colors text-xs md:text-sm"
          >
            Publish
          </button>
        </div>

        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] hover:border-[#035F75] hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? (
              <div className="flex flex-col items-center text-[#035F75]">
                <Loader2 className="w-10 h-10 animate-spin mb-2" />
                <p>Uploading...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#035F75] rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-gray-500 text-center text-sm md:text-base">Click to upload portfolio image</p>
              </>
            )}
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
          className="hidden"
        />

        <div className="mt-3 md:mt-4 flex justify-end">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 md:px-6 py-2 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}