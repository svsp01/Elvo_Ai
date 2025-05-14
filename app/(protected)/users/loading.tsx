'use client';

import { Loader2, PhoneCall, Sparkles, Bot, Wifi, SatelliteDish } from 'lucide-react'; // Add more icons here

// 🔁 Easily change the icon here:
const Icon = SatelliteDish; // <--- Change this line to switch the icon

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="flex flex-col items-center text-center p-8 animate-fade-in">
        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
          <div className="absolute w-full h-full rounded-full bg-indigo-500 opacity-30 animate-ping"></div>
          <Icon size={40} className="text-indigo-600 dark:text-indigo-400 animate-bounce-slow" />
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent mb-6" />

        <p
          className="font-light tracking-wide text-gray-600 dark:text-gray-300"
          style={{
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Connecting with customers...
        </p>
      </div>
    </div>
  );
}
