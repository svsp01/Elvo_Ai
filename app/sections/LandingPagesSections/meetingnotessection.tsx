import Image from "next/image";
import React from "react";

function MeetingNotesSection() {
  const features = [
    {
      id: 1,
      title: "Never miss a lead with AI-powered calls",
      description:
        "Our intelligent agent app automatically places calls to your customers, engaging leads in real-time conversations so you don’t have to. The AI handles follow-ups and collects essential information, letting your sales team focus on closing deals. Monitor calls live via the web dashboard or mobile app for seamless lead management.",
    },
    {
      id: 2,
      title: "AI That Understands Your Customer Calls",
      description:
        "Automatically connect, converse, and capture key information from customer calls with AI-driven transcription and intelligent summaries—designed to align with your sales goals and improve lead engagement.",
    },
    {
      id: 3,
      title: "Smart Insights & Follow-Ups",
      description:
        "Our AI identifies key moments during customer calls, extracts actionable follow-up tasks, and makes it easy to review important details—so your team can act quickly without listening to entire conversations.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`grid md:grid-cols-2 gap-12 items-center ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Left side - Mockup Meeting Transcript */}
          <div className="bg-gray-200 rounded-xl p-10 relative">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Meeting header */}
              <div className="p-4 border-b border-gray-100 flex items-center">
                <div className="mr-3">
                  <div className="text-[#10B981] font-bold text-xl mr-1">
                    <span className="inline-block w-6 h-6 rounded-full bg-[#10B981] relative overflow-hidden">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                        O
                      </span>
                    </span>
                  </div>
                </div>
                <div className="font-medium text-gray-800">Product Meeting</div>
                <div className="ml-auto flex space-x-2">
                  <div className="w-10 h-10 bg-[#5b5fc7] rounded-md flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-6 h-6"
                    >
                      <path d="M4 4h16v16H4V4z" />
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-6 h-6"
                    >
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                      <path d="M3 5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H3z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mockup transcript */}
              <div className="p-4 space-y-6">
                {/* Charlie message */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Charlie"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="font-medium">Charlie</div>
                    <div className="text-xs text-gray-500 ml-2">0:36</div>
                  </div>
                  <div className="text-gray-700 pl-11">
                    Launch day for Project Genesis is just six weeks away. How
                    hyped is everyone?
                  </div>
                </div>

                {/* Jane message */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Jane"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="font-medium">Jane</div>
                    <div className="text-xs text-gray-500 ml-2">1:04</div>
                  </div>
                  <div className="text-gray-700 pl-11">
                    Beyond hyped! The user testing last week was phenomenal.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Dynamic Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#10B981] mb-6 leading-tight">
              {feature.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MeetingNotesSection;
