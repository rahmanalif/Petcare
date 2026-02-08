"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Loader2, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PetProfile() {
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE}/api/pets`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data = await response.json();
        if (response.ok && data.length > 0) {
          setPet(data[0]);
        }
      } catch (error) {
        toast.error("Failed to load pet data");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [API_BASE]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !pet?._id) return;

    const formData = new FormData();
    // Using "petImage" as the key for backend compatibility
    formData.append("petImage", file); 

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE}/api/pets/${pet._id}/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await response.json();

      if (response.ok) {
        setPet((prev) => ({ ...prev, gallery: result.gallery }));
        toast.success("Pet image updated");
      } else {
        toast.error(result.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-[#024B5E] w-10 h-10" />
      </div>
    );
  }

  if (!pet) return <div className="p-10 text-center">No pet found.</div>;

  const displayImage = pet.gallery && pet.gallery.length > 0 
    ? (pet.gallery[pet.gallery.length - 1].startsWith('http') 
        ? pet.gallery[pet.gallery.length - 1] 
        : `${API_BASE}/${pet.gallery[pet.gallery.length - 1]}`)
    : "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=1200&h=400&fit=crop";

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50">
      <div>
        <button onClick={() => router.back()} className="flex items-center gap-2 m-2 p-2 hover:bg-gray-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#024B5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          <span className="text-[#024B5E] font-medium text-lg">Pet Profile</span>
        </button>
      </div>

      <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg h-96">
        <img src={displayImage} alt={pet.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium flex items-center gap-2 transition-all"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          Update Pet Photo
        </button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-xl text-[#024B5E]">Pet Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><p className="text-sm text-[#024B5E]">Pet Name</p><p className="text-[#024B5E] font-bold">{pet.name}</p></div>
            <div><p className="text-sm text-[#024B5E]">Type</p><p className="text-[#024B5E]">{pet.type}</p></div>
            <div><p className="text-sm text-[#024B5E]">Weight</p><p className="text-[#024B5E]">{pet.weight} {pet.weightUnit}</p></div>
            <div><p className="text-sm text-[#024B5E]">Breed</p><p className="text-[#024B5E]">{pet.breed}</p></div>
            <div><p className="text-sm text-[#024B5E]">Gender</p><p className="text-[#024B5E]">{pet.gender}</p></div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-xl text-[#024B5E]">Additional details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-[#024B5E]">
                <p>Microchipped: <strong>{pet.microchipped}</strong></p>
                <p>Spayed/Neutered: <strong>{pet.spayedNeutered}</strong></p>
                <p>House Trained: <strong>{pet.houseTrained}</strong></p>
                <p>Friendly with Kids: <strong>{pet.friendlyWithChildren}</strong></p>
              </div>
              <p className="text-sm text-[#024B5E]"><span className="font-medium">About:</span> {pet.about}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2 text-[#024B5E]"><Heart size={18}/> Care info</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-2 text-[#024B5E]">
                <p>Potty Break: {pet.pottyBreakSchedule}</p>
                <p>Energy Level: {pet.energyLevel}</p>
                <p>Feeding: {pet.feedingSchedule}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2 text-[#024B5E]"><Activity size={18}/> Health info</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-2 text-[#024B5E]">
                <p className="font-medium">Vet Info:</p>
                <p className="text-gray-600">{pet.vetInfo}</p>
                <p className="mt-2 font-medium">Insurance Provider:</p>
                <p className="text-gray-600">{pet.insuranceProvider}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}