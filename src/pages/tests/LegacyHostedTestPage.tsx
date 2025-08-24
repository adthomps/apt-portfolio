import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

export default function LegacyHostedTestPage({ environment = 'sandbox' }: { environment?: 'production' | 'sandbox' }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTestClick = (testType: string, method: string, env: string) => {
    toast({
      title: "Test Launched",
      description: `${testType} test for ${method} in ${env} environment`,
    });
    // In a real implementation, this would redirect to the actual test URL
    console.log(`Launching ${testType} test for ${method} in ${env} environment`);
  };

  const simTests = [
    { label: "OCC - Receipt Link", type: "receipt-link" },
    { label: "OCE - Receipt Link", type: "receipt-link" },
    { label: "OCC - Receipt Post", type: "receipt-post" },
    { label: "OCE - Receipt Post", type: "receipt-post" },
    { label: "OCC - Receipt Get", type: "receipt-get" },
    { label: "OCE - Receipt Get", type: "receipt-get" },
    { label: "OCC - Relay", type: "relay" },
    { label: "OCE - Relay", type: "relay" },
  ];

  const dpmTests = [
    { label: "OCC", type: "occ" },
    { label: "OCE", type: "oce" },
  ];

  const simpleCheckoutTests = [
    { label: "OCC - Buy", type: "occ-buy" },
    { label: "OCE - Buy", type: "oce-buy" },
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
            <h1 className="text-3xl font-bold">Legacy Hosted Payment Forms</h1>
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
                <span className="text-primary font-bold">L</span>
              </div>
              Legacy Hosted Payment Forms
            </CardTitle>
            <CardDescription>
              Tests linking a site and button to the Authorize.net Hosted Payment Form powered by 
              Server Integration Method (SIM), Direct Post Method (DPM) and Simple Checkout buttons.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-8">
          {/* Server Integration Method (SIM) */}
          <Card>
            <CardHeader>
              <CardTitle>Server Integration Method (SIM)</CardTitle>
              <CardDescription>
                Server Integration Method using the hosted payment form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 text-primary">Production Environment</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {simTests.map((test, index) => (
                      <Button
                        key={`prod-${index}`}
                        variant="outline"
                        className="h-auto py-3 px-4 text-left justify-start"
                        onClick={() => handleTestClick(`Production - ${test.label}`, 'SIM', 'production')}
                      >
                        <span className="text-sm">Production - {test.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-secondary-foreground">Sandbox Environment</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {simTests.map((test, index) => (
                      <Button
                        key={`sandbox-${index}`}
                        variant="outline"
                        className="h-auto py-3 px-4 text-left justify-start"
                        onClick={() => handleTestClick(`Sandbox - ${test.label}`, 'SIM', 'sandbox')}
                      >
                        <span className="text-sm">Sandbox - {test.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Direct Post Method (DPM) and Simple Checkout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Direct Post Method */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Post Method (DPM)</CardTitle>
                <CardDescription>
                  Direct Post Method using the hosted payment form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Production</h4>
                    <div className="space-y-2">
                      {dpmTests.map((test, index) => (
                        <Button
                          key={`dpm-prod-${index}`}
                          variant="outline"
                          className="w-full"
                          onClick={() => handleTestClick(`Production - ${test.label}`, 'DPM', 'production')}
                        >
                          Production - {test.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary-foreground">Sandbox</h4>
                    <div className="space-y-2">
                      {dpmTests.map((test, index) => (
                        <Button
                          key={`dpm-sandbox-${index}`}
                          variant="outline"
                          className="w-full"
                          onClick={() => handleTestClick(`Sandbox - ${test.label}`, 'DPM', 'sandbox')}
                        >
                          Sandbox - {test.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Checkout */}
            <Card>
              <CardHeader>
                <CardTitle>Simple Checkout</CardTitle>
                <CardDescription>
                  Simple Checkout using the hosted payment form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Production</h4>
                    <div className="space-y-2">
                      {simpleCheckoutTests.map((test, index) => (
                        <Button
                          key={`checkout-prod-${index}`}
                          variant="outline"
                          className="w-full"
                          onClick={() => handleTestClick(`Production - ${test.label}`, 'Simple Checkout', 'production')}
                        >
                          Production - {test.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary-foreground">Sandbox</h4>
                    <div className="space-y-2">
                      {simpleCheckoutTests.map((test, index) => (
                        <Button
                          key={`checkout-sandbox-${index}`}
                          variant="outline"
                          className="w-full"
                          onClick={() => handleTestClick(`Sandbox - ${test.label}`, 'Simple Checkout', 'sandbox')}
                        >
                          Sandbox - {test.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Checkout QR Code */}
            <Card>
              <CardHeader>
                <CardTitle>Simple Checkout QR Code Test</CardTitle>
                <CardDescription>
                  Simple Checkout QR Code test using the hosted payment form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground text-center">QR Code<br/>Placeholder</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleTestClick('Production QR Code', 'Simple Checkout QR', 'production')}
                    >
                      Production QR Test
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleTestClick('Sandbox QR Code', 'Simple Checkout QR', 'sandbox')}
                    >
                      Sandbox QR Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}