import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadDetailsProps {
  lead: {
    phoneNumber: string;
    email: string | null;
    public: boolean;
    createdAt: Date;
    data: any;
    summary: string | undefined;
    keywords: string[];
    cluster: string | undefined;
    publicSearch: string[] | undefined;
  };
}

export default function LeadDetails({ lead }: LeadDetailsProps) {
  return (
    <div>
      <h3 className="font-semibold">Lead Details</h3>
      <div className="space-y-2 mt-2">
        <p><span className="font-medium">Email:</span> {lead.email || 'Not provided'}</p>
        <p><span className="font-medium">Status:</span> {lead.public ? 'Public' : 'Private'}</p>
        <p><span className="font-medium">Created:</span> {new Date(lead.createdAt).toLocaleDateString()}</p>
        {lead.summary && (
          <p><span className="font-medium">Summary:</span> {lead.summary}</p>
        )}
        {lead.keywords.length > 0 && (
          <p><span className="font-medium">Keywords:</span> {lead.keywords.join(', ')}</p>
        )}
        {lead.cluster && (
          <p><span className="font-medium">Cluster:</span> {lead.cluster}</p>
        )}
        {lead.publicSearch && (
          <p><span className="font-medium">Public Search Keywords:</span> {lead.publicSearch.join(', ')}</p>
        )}
      </div>
    </div>
  );
}