import Image from "next/image";
import React from "react";

function VideoSection() {
  return (
    <div className="bg-black rounded-xl overflow-hidden">
      <div className="relative pt-[56.25%]">
        <Image
          src="https://sjc.microlink.io/EAKjnjgd83ijCiu-dx-XErpt-AI4uQBJ3MdCpA9vlira30kaTIAar3RGTb8Am_8F41mXbK5burpdwn65g0QRVg.jpeg"
          alt="Evlo.Ai.ai in action"
          fill
          className="absolute inset-0 object-cover"
        />
        <div className="absolute top-4 left-4 bg-green-500 h-3 w-3 rounded-full"></div>
        <div className="absolute top-4 right-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          Zoom Meeting
        </div>
        <div className="absolute bottom-4 right-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
