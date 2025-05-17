import React from "react";

function HerosectionCards() {
  const features = [
    {
      title: "Ai Calling Agent",
      description:
        "Elvo calls your leads—so you don’t have to. AI-powered voice calls that qualify leads, capture intent, and summarize results instantly.",
      isNew: false,
    },
    {
      title: "Elvo AI Chat",
      description:
        "Get answers and generate content like emails and status updates, using the power of Evlo.Ai AI Chat across all your meetings.",
      isNew: true,
    },
    {
      title: "AI Channels",
      description:
        "Combine live conversations with async updates. Chat with Evlo and teammates to get answers and drive projects forward.",
      isNew: true,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 bg-[#D1FAE5] p-6 rounded-xl mb-5">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl relative shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {feature.isNew && (
            <div className="absolute -top-2 -right-2 bg-[#74eb25] text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>
          )}
          <h3 className="text-xl font-semibold text-[#10B981] mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HerosectionCards;
