"use client";
import { Mic, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VoiceToTextInput({ setInfo }: { setInfo: (val: string) => void }) {
  const [loading, setLoading] = useState(false);

    const handleVoiceInput = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/voice-to-text");
    const { text } = await res.json();
    setInfo(text);
    setLoading(false);
  };

  return (
    <button
      className="p-2 rounded-full border hover:bg-gray-100"
      onClick={handleVoiceInput}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Mic />}
    </button>
  );
}