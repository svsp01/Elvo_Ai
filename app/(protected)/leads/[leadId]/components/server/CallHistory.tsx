import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Call {
  id: string;
  createdAt: Date;
  recordingUrl: string | null;
  agent: {
    name: string;
  };
}

interface CallHistoryProps {
  calls: Call[];
}

export default function CallHistory({ calls }: CallHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{call.agent.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(call.createdAt).toLocaleString()}
                  </p>
                </div>
                {call.recordingUrl && (
                  <Button variant="outline" size="sm">
                    Play Recording
                  </Button>
                )}
              </div>
            </div>
          ))}
          {calls.length === 0 && (
            <p className="text-muted-foreground">No calls recorded yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}