import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

export default function LegacySimpleCheckoutTestPage({ environment = 'sandbox' }: { environment?: 'production' | 'sandbox' }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTestClick = (testType: string, env: string) => {
    toast({
      title: "Simple Checkout Test Launched",
      description: `${testType} test in ${env} environment`,
    });
    console.log(`Launching Simple Checkout ${testType} test in ${env} environment`);
  };

  const simpleCheckoutTests = [
    { label: "OCC - Buy", type: "occ-buy", description: "Standard buy button for OCC environment" },
    { label: "OCE - Buy", type: "oce-buy", description: "Enhanced buy button for OCE environment" },
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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Simple Checkout</h1>
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
                <span className="text-primary font-bold">SC</span>
              </div>
              Simple Checkout
            </CardTitle>
            <CardDescription>
              Simple Checkout using the hosted payment form. Test streamlined payment buttons 
              and QR code functionality for quick and easy customer transactions.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simple Checkout Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Simple Checkout Buttons</CardTitle>
              <CardDescription>
                Test Simple Checkout buy buttons in both production and sandbox environments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-primary">Production Environment</h4>
                  <div className="space-y-3">
                    {simpleCheckoutTests.map((test, index) => (
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
                                Launch Production {test.label}
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
                    {simpleCheckoutTests.map((test, index) => (
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
                                Launch Sandbox {test.label}
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

          {/* QR Code Testing */}
          <Card>
            <CardHeader>
              <CardTitle>Simple Checkout QR Code Test</CardTitle>
              <CardDescription>
                Test QR code payment functionality for mobile and contactless payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-40 h-40 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-foreground/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">QR Code</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Test QR Code</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleTestClick('Production QR Code', 'production')}
                  >
                    Production QR Test
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleTestClick('Sandbox QR Code', 'sandbox')}
                  >
                    Sandbox QR Test
                  </Button>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">QR Code Features</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Mobile-optimized payment experience</li>
                    <li>• Contactless payment processing</li>
                    <li>• Quick scan and pay functionality</li>
                    <li>• Secure transaction handling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Checkout Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Simple Checkout Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Simple Checkout Features</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>One-Click Payments:</strong> Streamlined checkout process</li>
                  <li>• <strong>Buy Buttons:</strong> Easy integration with existing websites</li>
                  <li>• <strong>QR Code Support:</strong> Mobile and contactless payment options</li>
                  <li>• <strong>Secure Processing:</strong> PCI compliant payment handling</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Integration Benefits</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Minimal setup and configuration required</li>
                  <li>• Responsive design for all device types</li>
                  <li>• Built-in fraud protection and security</li>
                  <li>• Real-time transaction processing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}