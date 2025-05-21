"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import processLead from "../server/processLead";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function MobileOnlyInput() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debouncedMobile = useDebounce(mobile, 500);

  // Mock API call to /ai/phone-number-analyse
  const fetchAiInsight = useCallback(async (phone: string) => {
    if (!phone || phone.length < 7) {
      setAiInsight(null);
      return;
    }

    try {
      // Replace with actual API call
      const response = await fetch("/api/ai/phone-number-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI insight");

      const data = await response.json();
      setAiInsight(data.insight || "No insight available");
      setError(null);
    } catch (err) {
      setError("Failed to load AI insights. Please try again.");
      setAiInsight(null);
    }
  }, []);

  useEffect(() => {
    fetchAiInsight(debouncedMobile);
  }, [debouncedMobile, fetchAiInsight]);

  const handleSubmit = useCallback(async () => {
    if (!mobile || mobile.length < 7) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await processLead({ phoneNumber: mobile });
      setMobile("");
      setAiInsight(null);
      alert("Lead created successfully!");
    } catch (err) {
      setError("Failed to create lead. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [mobile]);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-none w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white text-center">
          Mobile Number Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input */}
        <div className="relative">
          <Input
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, "")); // Only digits
              setError(null);
            }}
            placeholder="Enter mobile number"
            className="bg-transparent border-0 border-b-2 border-gray-300 focus:border-indigo-500 text-white placeholder-gray-400 text-lg rounded-none px-0 pb-2"
            disabled={loading}
            aria-label="Mobile number"
          />
        </div>

        {/* AI Insight */}
        <AnimatePresence>
          {aiInsight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="bg-indigo-900/50 border-indigo-500 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{aiInsight}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading || !mobile}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Create Lead"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}