"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CallButtonProps {
  phoneNumber: string;
}

export default function CallButton({ phoneNumber }: CallButtonProps) {
  const handleCall = async () => {
    // Implement call functionality here
    console.log(`Initiating call to ${phoneNumber}`);
  };

  return (
    <Button onClick={handleCall} variant="outline" className="flex items-center gap-2">
      <Phone className="h-4 w-4" />
      Start Call
    </Button>
  );
}