import type React from "react";
import {
  Briefcase,
  PresentationIcon as PresentationChart,
  Megaphone,
  MapPin,
  Radio,
  Book,
} from "lucide-react";

function UsecasesSection() {
  type UseCase = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    iconBgColor: string;
  };

  // Create a single object with all the use case data
  const useCases: UseCase[] = [
    {
      id: "sales-teams",
      title: "Sales Teams",
      description:
        "Our AI Calling App delivers real-time sales insights, auto-generates follow-up messages, and syncs call summaries directly to your CRM and HubSpot—helping your team move faster and close more deals",
      icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
      iconBgColor: "bg-indigo-100",
    },
    {
      id: "business",
      title: "Business",
      description:
        "Let your team focus on closing, not calling. Our AI agent handles lead conversations in real time—capturing summaries, action items, and key insights—so your team stays productive and engaged where it matters most.",
      icon: <PresentationChart className="h-8 w-8 text-teal-500" />,
      iconBgColor: "bg-teal-100",
    },
    {
      id: "marketing-teams",
      title: "Marketing Teams",
      description:
        "Our AI Agent automatically identifies and assigns follow-ups from every customer call, keeping your sales and support teams aligned and proactive",
      icon: <Megaphone className="h-8 w-8 text-pink-500" />,
      iconBgColor: "bg-pink-100",
    },
    {
      id: "recruiting-teams",
      title: "Recruiting Teams",
      description:
        "Our AI Agent transcribes and summarizes sales or support calls, cutting down the time and effort needed to qualify leads and take action.",
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      iconBgColor: "bg-red-100",
    },
    {
      id: "media",
      title: "Media",
      description:
        "Elvo helps you tell the stories that matter through automated, real-time transcription.",
      icon: <Radio className="h-8 w-8 text-blue-500" />,
      iconBgColor: "bg-blue-100",
    },
    {
      id: "education",
      title: "Education",
      description:
        "Elvo provides faculty and students with real time captions and notes for in-person and virtual lectures, classes or meetings.",
      icon: <Book className="h-8 w-8 text-green-500" />,
      iconBgColor: "bg-green-100",
    },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-14 h-14 ${useCase.iconBgColor} rounded-xl flex items-center justify-center mb-6`}
              >
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UsecasesSection;
