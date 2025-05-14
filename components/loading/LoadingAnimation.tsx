'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Heart, Search, CheckCircle, Bell } from "lucide-react";

// This is your custom loading component
export default function LoadingAnimation() {
  const [stageIndex, setStageIndex] = useState(0);
  
  // Loading stages with professional Lucide React icons
  const loadingStages = [
    {
      icon: <PhoneCall size={40} className="text-indigo-500" />,
      description: "Initiating connection"
    },
    {
      icon: <Heart size={40} className="text-rose-500" />,
      description: "Building relationship"
    },
    {
      icon: <Search size={40} className="text-amber-500" />,
      description: "Exploring opportunities"
    },
    {
      icon: <CheckCircle size={40} className="text-emerald-500" />,
      description: "Finding solutions"
    },
    {
      icon: <Bell size={40} className="text-blue-500" />,
      description: "Creating opportunities"
    }
  ];

  useEffect(() => {
    // Set total loading time to 10 seconds
    const stageTime = 2000; // 2 seconds per stage
    
    // Story progression
    const storyInterval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % loadingStages.length);
    }, stageTime);

    return () => clearInterval(storyInterval);
  }, []);

  const currentStage = loadingStages[stageIndex];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="relative">
        {/* Decorative circle */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 -z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <div className="flex flex-col items-center text-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              {currentStage.icon}
            </motion.div>
          </AnimatePresence>
          
          {/* Elegant line */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent mb-6" />
          
          {/* Description with beautiful typography */}
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-light tracking-wide text-gray-600 dark:text-gray-300"
              style={{ fontFamily: "'Inter', 'SF Pro Display', sans-serif", letterSpacing: "0.05em" }}
            >
              {currentStage.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}