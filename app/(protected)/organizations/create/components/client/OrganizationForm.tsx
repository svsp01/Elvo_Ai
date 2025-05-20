"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { organizationService } from '@/services/organizationService';

interface OrganizationFormData {
  name: string;
  description: string;
}

interface ApiError {
  message: string;
  code?: string;
}

export default function OrganizationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Organization name is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Organization description is required");
      return false;
    }
    if (formData.description.length < 3) {
      setError("Organization description must be at least 3 characters long");
      return false;
    }
    if (!/^[a-z0-9-]+$/.test(formData.description)) {
      setError("Description can only contain lowercase letters, numbers, and hyphens");
      return false;
    }
    return true;
  };

  const handleInputChange = (field: keyof OrganizationFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError(null);
    
    if (field === 'description') {
      const sanitizedDescription = value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, [field]: sanitizedDescription }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const organization = await organizationService.create(formData);
      console.log('Created organization:', organization);
      
      // Reset form
      setFormData({ name: "", description: "" });
      
      // Redirect to the organization page using the ID
      router.push(`/organizations/${organization.id}`);
    } catch (err) {
      console.error('Error creating organization:', err);
      const error = err as ApiError;
      setError(error.message || "Failed to create organization. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
      <CardHeader>
        <CardTitle>Create Organization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Organization Name"
            className="bg-transparent"
          />
          <Input
            value={formData.description}
            onChange={handleInputChange('description')}
            placeholder="Organization Description"
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
            'Create Organization'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
