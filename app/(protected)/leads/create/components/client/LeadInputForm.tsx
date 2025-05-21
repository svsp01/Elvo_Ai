"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileOnlyInput from "./MobileOnlyInput";
import FullInfoInput from "./FullInfoInput";

export default function LeadInputForm() {
  const [mode, setMode] = useState<"mobile" | "full" | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const aiTexts = [
    "Unlock insights with AI-driven lead management",
    "Transform your data into opportunities",
    "Simplify lead entry with smart automation",
    "Discover hidden patterns in your leads",
    "Elevate engagement with cosmic insights",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % aiTexts.length);
    }, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, [aiTexts.length]);

  if (!mode) {
    return (
      <div className="min-h-screen bg-background  flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8">
          {/* Animated AI Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTextIndex}
                className="text-3xl md:text-4xl font-bold text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {aiTexts[currentTextIndex]}
              </motion.h1>
            </AnimatePresence>
            <p className="mt-2 text-lg text-gray-700">
              Choose how you want to add your leads
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Only Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                className="bg-white/10 backdrop-blur-md border-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setMode("mobile")}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Mobile Only</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Enter just a mobile number with AI insights</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Full Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                className="bg-white/10 backdrop-blur-md border-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setMode("full")}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Full Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Enter number and additional information</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {mode === "mobile" ? <MobileOnlyInput /> : <FullInfoInput />}
      </div>
    </div>
  );
}