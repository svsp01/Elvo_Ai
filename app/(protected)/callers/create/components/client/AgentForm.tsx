"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { agentService } from '@/services/agentService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AgentFormData {
  name: string;
  type: string;
  voice?: string;
  prompt?: string;
  organizationId?: string;
}

interface ApiError {
  message: string;
  code?: string;
}

export default function AgentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    type: "",
    voice: "",
    prompt: "",
    organizationId: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Agent name is required");
      return false;
    }
    if (!formData.type) {
      setError("Agent type is required");
      return false;
    }
    return true;
  };

  const handleInputChange = (field: keyof AgentFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null);
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleTypeChange = (value: string) => {
    setError(null);
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const agent = await agentService.create(formData);
      console.log('Created agent:', agent);
      
      // Reset form
      setFormData({ name: "", type: "", voice: "", prompt: "", organizationId: "" });
      
      // Redirect to the callers page
      router.push('/callers');
    } catch (err) {
      console.error('Error creating agent:', err);
      const error = err as ApiError;
      setError(error.message || "Failed to create agent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
      <CardHeader>
        <CardTitle>Create AI Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Agent Name"
            className="bg-transparent"
          />
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Agent Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="customer-service">Customer Service</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={formData.voice}
            onChange={handleInputChange('voice')}
            placeholder="Voice (optional)"
            className="bg-transparent"
          />
          <Textarea
            value={formData.prompt}
            onChange={handleInputChange('prompt')}
            placeholder="Custom Prompt (optional)"
            className="bg-transparent"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Agent'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}