"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import autocompleteLeadData from "../server/autocompleteLeadData";
import processLead from "../server/processLead";
import VoiceToTextInput from "./VoiceToTextInput";


export default function FullInfoInput() {
  const [mobile, setMobile] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTyping = async (text: string) => {
    const suggestion = await autocompleteLeadData(text);
    setInfo(text + (suggestion ? `\n${suggestion}` : ""));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await processLead({ mobile, info });
    setLoading(false);
    alert("Lead created successfully!");
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Mobile number with country code"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Textarea
        placeholder="Enter known details..."
        value={info}
        onChange={(e) => handleTyping(e.target.value)}
      />
      <VoiceToTextInput setInfo={setInfo} />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Create Lead"}
      </Button>
    </div>
  );
}