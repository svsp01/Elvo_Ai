import Link from "next/link";
import React from "react";

function AnnouncementBar(props: any) {
  const { scrolled } = props;
  return (
    <div
      className={`bg-[#001a33] text-white py-2 px-4 text-sm transition-all duration-300 text-center  ${
        scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <p className="max-w-6xl mx-auto">
        📢 Elvo.ai Hits $100M+ ARR Milestone and Introduces Groundbreaking AI
        Calling Agent Platform.{" "}
        <Link href="#" className="underline font-medium">
          Learn more
        </Link>
      </p>
    </div>
  );
}

export default AnnouncementBar;
