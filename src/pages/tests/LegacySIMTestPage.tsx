import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function LegacySIMTestPage({ environment = 'sandbox' }: { environment?: 'production' | 'sandbox' }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Remove toast and log, use externalUrl from testLinks

  // Example testLinks array, replace with actual data source if needed
  const testLinks = [
    // ...existing code...
  ];

  // Replace simTests with testLinks from markdown
  // ...existing code...

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
             <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
               <ArrowLeft className="h-4 w-4" />
               Back
             </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Server Integration Method (SIM)</h1>
            <Badge variant={environment === 'production' ? 'destructive' : 'secondary'}>
              {environment}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">SIM</span>
              </div>
              Server Integration Method
            </CardTitle>
            <CardDescription>
              Server Integration Method using the hosted payment form. Test various receipt handling methods 
              and relay response configurations for comprehensive SIM integration testing.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* SIM Tests */}
        <Card>
          <CardHeader>
            <CardTitle>SIM Test Options</CardTitle>
            <CardDescription>
              Select from various SIM testing scenarios including different receipt types and relay configurations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-primary">Production Environment</h4>
                <div className="grid grid-cols-2 gap-3">
                  {testLinks.filter(t => t.type === 'production').map((test, index) => (
                    <a
                      key={`prod-${index}`}
                      href={test.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="h-auto py-3 px-4 text-left justify-start w-full">
                        <span className="text-sm">Production - {test.name}</span>
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-secondary-foreground">Sandbox Environment</h4>
                <div className="grid grid-cols-2 gap-3">
                  {testLinks.filter(t => t.type === 'sandbox').map((test, index) => (
                    <a
                      key={`sandbox-${index}`}
                      href={test.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="h-auto py-3 px-4 text-left justify-start w-full">
                        <span className="text-sm">Sandbox - {test.name}</span>
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>SIM Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Receipt Types</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Receipt Link:</strong> Customer receives a link to view their receipt</li>
                  <li>• <strong>Receipt Post:</strong> Receipt data is posted back to your server</li>
                  <li>• <strong>Receipt Get:</strong> Receipt data is sent via GET parameters</li>
                  <li>• <strong>Relay:</strong> Use relay response for custom processing</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Test Environments</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>OCC:</strong> Authorize.Net's test environment</li>
                  <li>• <strong>OCE:</strong> Extended test environment with additional features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}