import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

export default function LegacyDPMTestPage({ environment = 'sandbox' }: { environment?: 'production' | 'sandbox' }) {
  const navigate = useNavigate();
  // Updated test links with externalUrl
  const dpmTests = [
    { label: "OCC", type: "occ", description: "Test OCC environment with Direct Post Method", externalUrl: "https://adthomps.github.io/anet/hop.html" },
    { label: "OCE", type: "oce", description: "Test OCE environment with Direct Post Method", externalUrl: "https://adthomps.github.io/anet/hop.html" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">DPM</span>
              </div>
              Direct Post Method
            </CardTitle>
            <CardDescription>
              Direct Post Method using the hosted payment form. Test direct posting of payment data 
              to your server with enhanced security and control over the payment process.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* DPM Tests */}
        <Card>
          <CardHeader>
            <CardTitle>DPM Test Options</CardTitle>
            <CardDescription>
              Test Direct Post Method in both OCC and OCE environments with various configurations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-primary">Production Environment</h4>
                <div className="space-y-3">
                  {dpmTests.map((test, index) => (
                    <Card key={`prod-${index}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h5 className="font-medium">Production - {test.label}</h5>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
                          <a
                            href={test.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button variant="outline" size="sm" className="w-full">
                              Launch Production {test.label} Test
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-secondary-foreground">Sandbox Environment</h4>
                <div className="space-y-3">
                  {dpmTests.map((test, index) => (
                    <Card key={`sandbox-${index}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h5 className="font-medium">Sandbox - {test.label}</h5>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
                          <a
                            href={test.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button variant="outline" size="sm" className="w-full">
                              Launch Sandbox {test.label} Test
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DPM Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>DPM Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Direct Post Method Features</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Direct Server Integration:</strong> Payment data posted directly to your server</li>
                  <li>• <strong>Enhanced Security:</strong> Reduced exposure of sensitive payment data</li>
                  <li>• <strong>Custom Processing:</strong> Full control over payment processing workflow</li>
                  <li>• <strong>Response Handling:</strong> Direct response from Authorize.Net to your server</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Test Environments</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>OCC:</strong> Standard test environment for DPM integration</li>
                  <li>• <strong>OCE:</strong> Extended test environment with additional validation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Integration Benefits</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Seamless integration with existing server infrastructure</li>
                  <li>• Real-time payment processing and response handling</li>
                  <li>• Enhanced customer experience with minimal redirects</li>
                  <li>• Comprehensive error handling and validation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}