import React from "react";
import HerosectionHeader from "../LandingPagesSections/herosectionheader";
import HerosectionCards from "../LandingPagesSections/herosectionscards";
import VideoSection from "../LandingPagesSections/videosection";
import MeetingNotesSection from "../LandingPagesSections/meetingnotessection";
import UsecasesSection from "./usecasessection";

function HeroSection() {
  return (
    <main className="flex-grow bg-[#f2f5f8] mt-4">
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-4xl shadow-sm p-8 sm:p-12">
          <HerosectionHeader />
          <HerosectionCards />
          <VideoSection />
        </div>
        <div className="max-w-6xl mx-auto bg-white rounded-4xl shadow-sm p-8 sm:p-12 mt-10">
          <MeetingNotesSection />
        </div>
        <div>
          <UsecasesSection />
        </div>
      </section>
    </main>
  );
}

export default HeroSection;
