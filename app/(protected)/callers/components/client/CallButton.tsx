"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CallButtonProps {
  agentId: string;
}

export default function CallButton({ agentId }: CallButtonProps) {
  const handleCall = async () => {
    try {
      // Implement call functionality here
      console.log("Initiating call with agent:", agentId);
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  };

  return (
    <Button 
      onClick={handleCall}
      className="bg-green-600 hover:bg-green-700"
    >
      <Phone className="w-4 h-4 mr-2" />
      Call
    </Button>
  );
}