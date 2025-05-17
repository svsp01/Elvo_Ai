import Link from "next/link";
import React from "react";

function HerosectionHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#001a33] mb-6">
        The #1 AI Calling Agent <span className="text-yellow-400">✨</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-8">
        Stop chasing leads. Elvo's AI Calling Agent calls, qualifies, and
        updates you—all while you focus on closing
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="#"
          className="bg-[#10B981] hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-full w-full sm:w-auto"
        >
          Start for Free
        </Link>
        <Link
          href="#"
          className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-full w-full sm:w-auto"
        >
          See Live Demo
        </Link>
      </div>
    </div>
  );
}

export default HerosectionHeader;
