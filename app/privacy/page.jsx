"use client";
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      items: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      ]
    },
    {
      title: "2. How We Use Information",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      items: [
        "At vero eos et accusamus et iusto odio dignissimos ducimus.",
        "Et harum quidem rerum facilis est et expedita distinctio.",
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus."
      ]
    },
    {
      title: "3. Sharing of Information",
      content: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      items: [
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
      ]
    },
    {
      title: "4. Data Security",
      content: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      items: []
    },
    {
      title: "5. Your Rights",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      items: []
    },
    {
      title: "6. Changes to This Policy",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      items: []
    }
  ];

  return (
    <div className="min-h-screen bg-[#035F751A]">
      <div className="max-w-4xl mx-auto px-6 py-12">


        <div className="relative mb-8">

        <button
          onClick={() => window.history.back()}
          className="absolute left-0 flex items-center justify-center w-12 bg-transparent h-12 rounded-full "
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <div className="text-5xl font-bold text-center text-gray-900 font-montserrat">Privacy</div>
        </div>
        

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 font-montserrat">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed font-montserrat">
                {section.content}
              </p>
              {section.items.length > 0 && (
                <ul className="space-y-2 ml-6">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 leading-relaxed list-disc font-montserrat">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}