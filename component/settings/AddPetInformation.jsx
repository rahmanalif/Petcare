"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Dog, Cat, Camera, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PetDetailsForm() {
  const router = useRouter();
  const [selectedPetType, setSelectedPetType] = useState('');
  const [microchipped, setMicrochipped] = useState('');
  const [spayedNeutered, setSpayedNeutered] = useState('');
  const [houseTrained, setHouseTrained] = useState('');
  const [friendlyChildren, setFriendlyChildren] = useState('');
  const [friendlyDogs, setFriendlyDogs] = useState('');
  const [gender, setGender] = useState('male');
  const [pottyBreak, setPottyBreak] = useState('every-hour');
  const [energyLevel, setEnergyLevel] = useState('high');
  const [feedingSchedule, setFeedingSchedule] = useState('morning');
  const [canBeLeftAlone, setCanBeLeftAlone] = useState('1-hour');
  const [medicationType, setMedicationType] = useState('pill');

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white px-6 py-4 flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="text-[#024B5E] hover:text-teal-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-[#024B5E]">Pet Profile Edit</h1>
      </div>

      <div className="relative mb-6 mx-6">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=1200&h=400&fit=crop"
            alt="Husky puppy"
            className="w-full h-96 object-cover"
          />
          <button className="absolute bottom-6 right-6 bg-gray-800/70 hover:bg-gray-800/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Update Pet Photo
          </button>
        </div>
      </div>

      <div className="bg-white mx-6 rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Dog className="w-5 h-5 text-[#024B5E]" />
            <h2 className="text-xl font-semibold text-[#024B5E]">Pet details</h2>
          </div>
          <p className="text-sm text-[#024B5E]">
            Provide your sitter with a description of your pet
          </p>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            What type of pet?
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPetType('dog')}
              className={`p-6 border-2 rounded-lg transition-all ${selectedPetType === 'dog'
                ? 'border-[#024B5E] bg-[#024B5E] text-white'
                : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                }`}
            >
              <Dog className="w-12 h-12 mx-auto" />
            </button>
            <button
              onClick={() => setSelectedPetType('cat')}
              className={`p-6 border-2 rounded-lg transition-all ${selectedPetType === 'cat'
                ? 'border-[#024B5E] bg-[#024B5E] text-white'
                : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                }`}
            >
              <Cat className="w-12 h-12 mx-auto" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="name" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Pet Name"
            className="w-full text-[#024B5E]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="weight" className="text-sm font-medium text-[#024B5E] mb-2 block">
              Weight (lbs)
            </Label>
            <Input
              id="weight"
              placeholder="8kg"
              className="w-full text-[#024B5E]"
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-sm font-medium text-[#024B5E] mb-2 block">
              Age (Year)
            </Label>
            <Input
              id="age"
              placeholder="3kg"
              className="w-full text-[#024B5E]"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="ageMonths" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Age (Month)
          </Label>
          <Input
            id="ageMonths"
            placeholder="8kg"
            className="w-full text-[#024B5E]"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="dob" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Dates of birth
          </Label>
          <div className="relative">
            <Input
              id="dob"
              placeholder="DD/MM/YY"
              className="w-full pr-10 text-[#024B5E]"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E]" />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="breed" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Breed
          </Label>
          <div className="relative">
            <Input
              id="breed"
              placeholder="Search"
              className="w-full text-[#024B5E]"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Gender
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setGender('male')}
              className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${gender === 'male'
                ? 'border-[#024B5E] bg-[#024B5E] text-white'
                : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${gender === 'female'
                ? 'border-[#024B5E] bg-[#024B5E] text-white'
                : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#024B5E] mb-4">Additional details</h3>

          <div className="mb-4">
            <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
              Microchipped?
            </Label>
            <div className="flex gap-3">
              <button
                onClick={() => setMicrochipped('microchipped')}
                className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${microchipped === 'microchipped'
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                  }`}
              >
                Microchipped
              </button>
              <button
                onClick={() => setMicrochipped('not-microchipped')}
                className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${microchipped === 'not-microchipped'
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                  }`}
              >
                Not microchipped
              </button>
            </div>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
              Spayed/Neutered?
            </Label>
            <div className="flex gap-3">
              <button
                onClick={() => setSpayedNeutered('spayed')}
                className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${spayedNeutered === 'spayed'
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                  }`}
              >
                Spayed/Neutered
              </button>
              <button
                onClick={() => setSpayedNeutered('not-spayed')}
                className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${spayedNeutered === 'not-spayed'
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                  }`}
              >
                Not Spayed/Neutered
              </button>
            </div>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
              House Trained?
            </Label>
            <div className="space-y-2">
              <div className="flex gap-3">
                <button
                  onClick={() => setHouseTrained('trained')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${houseTrained === 'trained'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  House Trained
                </button>
                <button
                  onClick={() => setHouseTrained('not-trained')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${houseTrained === 'not-trained'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Not House Trained
                </button>
              </div>
              <p className="text-xs text-[#024B5E] mt-2">
                House Trained means your dog does not soil inside. Dogs who are not house trained may soil inside.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
              Friendly with children?
            </Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFriendlyChildren('friendly')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyChildren === 'friendly'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Friendly with children
                </button>
                <button
                  onClick={() => setFriendlyChildren('not-friendly')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyChildren === 'not-friendly'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  not friendly with children
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFriendlyChildren('unsure')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyChildren === 'unsure'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Unsure if friendly with children
                </button>
                <button
                  onClick={() => setFriendlyChildren('depends')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyChildren === 'depends'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Depends if friendly with children
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
              Friendly with dogs?
            </Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFriendlyDogs('friendly')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyDogs === 'friendly'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Friendly with children
                </button>
                <button
                  onClick={() => setFriendlyDogs('not-friendly')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyDogs === 'not-friendly'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  not friendly with dogs
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFriendlyDogs('unsure')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyDogs === 'unsure'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Unsure if friendly with dogs
                </button>
                <button
                  onClick={() => setFriendlyDogs('depends')}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${friendlyDogs === 'depends'
                    ? 'border-[#024B5E] bg-[#024B5E] text-white'
                    : 'border-gray-200 text-[#024B5E] hover:border-gray-300'
                    }`}
                >
                  Depends if friendly with dogs
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="adoptionDate" className="text-sm font-medium text-[#024B5E] mb-2 block">
              Adoption Date
            </Label>
            <div className="relative">
              <Input
                id="adoptionDate"
                placeholder="DD/MM/YY"
                className="w-full pr-10 text-[#024B5E]"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E]" />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="about" className="text-sm font-medium text-[#024B5E] mb-2 block">
              About your pet
            </Label>
            <Textarea
              id="about"
              placeholder="Add a description of your pet"
              className="w-full min-h-[100px] resize-none text-[#024B5E]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white mx-6 rounded-2xl shadow-sm p-6 mt-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-[#024B5E]" />
            <h2 className="text-xl font-semibold text-[#024B5E]">Care Info</h2>
          </div>
          <p className="text-sm text-[#024B5E]">
            Provide your sitter with instructions for walking, feeding and other care
          </p>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Potty break
          </Label>
          <div className="space-y-2">
            {[
              { label: 'Needs a potty break every hour', value: 'every-hour' },
              { label: 'Needs a potty break every 2 hours', value: 'every-2-hours' },
              { label: 'Needs a potty break every 4 hours', value: 'every-4-hours' },
              { label: 'Needs a potty break every 8 hours', value: 'every-8-hours' },
              { label: 'Special instructions for potty breaks', value: 'special' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPottyBreak(option.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm text-left font-medium transition-all ${pottyBreak === option.value
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Energy level
          </Label>
          <div className="space-y-2">
            {[
              { label: 'High energy level', value: 'high' },
              { label: 'Moderate energy level', value: 'moderate' },
              { label: 'Low energy level', value: 'low' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setEnergyLevel(option.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm text-left font-medium transition-all ${energyLevel === option.value
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Feeding schedule
          </Label>
          <div className="space-y-2">
            {[
              { label: 'Needs to be fed in the morning', value: 'morning' },
              { label: 'Needs to be fed twice a day', value: 'twice' },
              { label: 'Special instructions for feeding', value: 'special' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFeedingSchedule(option.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm text-left font-medium transition-all ${feedingSchedule === option.value
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Can be left alone
          </Label>
          <div className="space-y-2">
            {[
              { label: 'Can be left alone for 1 hour or less', value: '1-hour' },
              { label: 'Can be left alone for 1-4 hours', value: '1-4-hours' },
              { label: 'Can be left alone for 4-8 hours', value: '4-8-hours' },
              { label: 'Special instructions for time alone', value: 'special' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setCanBeLeftAlone(option.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm text-left font-medium transition-all ${canBeLeftAlone === option.value
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Medications
          </Label>
          <div className="flex gap-3 mb-3">
            {[
              { label: 'Pill', value: 'pill' },
              { label: 'Topical', value: 'topical' },
              { label: 'Injection', value: 'injection' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setMedicationType(option.value)}
                className={`px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all ${medicationType === option.value
                  ? 'border-[#024B5E] bg-[#024B5E] text-white'
                  : 'border-gray-200 hover:border-gray-300 text-[#024B5E]'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Input
            placeholder="Name of the pill..."
            className="w-full text-[#024B5E]"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="sitterInfo" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Anything else a sitter should know?
          </Label>
          <Textarea
            id="sitterInfo"
            placeholder="Add instructions for walking, feeding or other care"
            className="w-full min-h-[100px] resize-none text-[#024B5E]"
          />
        </div>
      </div>

      {/* Health Info Section */}
      <div className="bg-white mx-6 rounded-2xl shadow-sm p-6 mt-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-[#024B5E]" />
            <h2 className="text-xl font-semibold text-[#024B5E]">Health info</h2>
          </div>
          <p className="text-sm text-[#024B5E]">
            Add details about your pet's health care providers
          </p>
        </div>

        {/* Veterinary info */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-[#024B5E] mb-3 block">
            Veterinary info
          </Label>
          <Textarea
            placeholder="Add your vet's name, address and phone number"
            className="w-full min-h-[120px] resize-none text-[#024B5E]"
          />
        </div>

        {/* Pet insurance provider */}
        <div className="mb-4">
          <Label htmlFor="insurance" className="text-sm font-medium text-[#024B5E] mb-2 block">
            Pet insurance provider
          </Label>
          <p className="text-xs text-[#024B5E] mb-3">
            This helps your track your pet info all in one place but is not required to book on Wuffoos
          </p>
          <div className="relative">
            <Input
              id="insurance"
              placeholder="Labrador"
              className="w-full text-[#024B5E]"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#024B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="bg-white mx-6 rounded-2xl shadow-sm p-6 mt-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-5 h-5 text-[#024B5E]" />
            <h2 className="text-xl font-semibold text-[#024B5E]">Photo gallery</h2>
          </div>
          <p className="text-sm text-[#024B5E]">
            Sho of your pet thorough photo
          </p>
        </div>

        {/* Upload Photo Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex items-center justify-center">
          <button className="w-16 h-16 bg-[#024B5E] hover:bg-[#023b4a] rounded-full flex items-center justify-center transition-colors">
            <Camera className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mx-6 mb-8">
        <button className="w-full bg-[#024B5E] hover:bg-[#023b4a] text-white py-4 rounded-xl font-semibold text-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}