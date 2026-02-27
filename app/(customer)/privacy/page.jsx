"use client";
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/content/privacy-policy`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContent(data.data.content);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#035F751A]">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="relative mb-8">
          <button
            onClick={() => window.history.back()}
            className="absolute left-0 flex items-center justify-center w-12 bg-transparent h-12 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-5xl font-bold text-center text-gray-900 font-montserrat">Privacy</div>
        </div>

        <div className="p-8">
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : (
            // ✅ API থেকে আসা HTML content render করছে
            <div
              className="prose max-w-none text-gray-700 font-montserrat leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>

      </div>
    </div>
  );
}