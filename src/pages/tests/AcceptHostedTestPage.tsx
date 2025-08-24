import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Lock, ExternalLink, Eye, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";
interface AcceptHostedTestPageProps {
  environment?: 'production' | 'sandbox';
}

export function AcceptHostedTestPage({ environment = 'sandbox' }: AcceptHostedTestPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hostedFormConfig, setHostedFormConfig] = useState({
    amount: '25.00',
    currency: 'USD',
    billingAddress: false,
    shippingAddress: false,
    customerReceipt: true,
    returnUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel'
  });
  const [formToken, setFormToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateForm = async () => {
    setIsLoading(true);
    
    // Simulate form token generation
    setTimeout(() => {
      const mockToken = `aht_${Math.random().toString(36).substr(2, 12)}`;
      setFormToken(mockToken);
      setIsLoading(false);
      
      toast({
        title: "Hosted Form Generated",
        description: "Accept Hosted form token created successfully",
      });
    }, 2000);
  };

  const handleLaunchHostedForm = () => {
    if (!formToken) return;
    
    // In a real implementation, this would redirect to the hosted form
    toast({
      title: "Launching Hosted Form",
      description: "Redirecting to Accept Hosted payment form...",
    });
    
    // Simulate opening hosted form in new window
    const hostedFormUrl = `https://${environment === 'sandbox' ? 'test' : 'accept'}.authorize.net/payment/payment?token=${formToken}`;
    window.open(hostedFormUrl, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
  };

  const previewHostedForm = () => {
    return (
      <div className="border rounded-lg p-6 bg-card max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p className="text-sm text-muted-foreground">
            Complete your payment securely with Accept Hosted
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Total Amount</span>
              <span className="text-xl font-bold">${hostedFormConfig.amount}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {hostedFormConfig.currency} • {environment} environment
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm font-medium">Form Features:</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Payment Card Input</span>
                <Badge variant="outline" className="text-xs">✓ Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Billing Address</span>
                <Badge variant={hostedFormConfig.billingAddress ? "outline" : "secondary"} className="text-xs">
                  {hostedFormConfig.billingAddress ? '✓ Enabled' : '✗ Disabled'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping Address</span>
                <Badge variant={hostedFormConfig.shippingAddress ? "outline" : "secondary"} className="text-xs">
                  {hostedFormConfig.shippingAddress ? '✓ Enabled' : '✗ Disabled'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Receipt</span>
                <Badge variant={hostedFormConfig.customerReceipt ? "outline" : "secondary"} className="text-xs">
                  {hostedFormConfig.customerReceipt ? '✓ Enabled' : '✗ Disabled'}
                </Badge>
              </div>
            </div>
          </div>
          
          <Button className="w-full" disabled>
            <Lock className="h-4 w-4 mr-2" />
            Pay ${hostedFormConfig.amount}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground">
            Powered by Authorize.Net Accept Hosted
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Testing
          </Button>
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Accept Hosted Testing</h1>
            <Badge variant={environment === 'production' ? 'default' : 'secondary'}>
              {environment}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Hosted Form Configuration
              </CardTitle>
              <CardDescription>
                Configure the Accept Hosted payment form settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={hostedFormConfig.amount}
                    onChange={(e) => setHostedFormConfig({
                      ...hostedFormConfig,
                      amount: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={hostedFormConfig.currency} onValueChange={(value) => 
                    setHostedFormConfig({...hostedFormConfig, currency: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="returnUrl">Success Return URL</Label>
                <Input
                  id="returnUrl"
                  value={hostedFormConfig.returnUrl}
                  onChange={(e) => setHostedFormConfig({
                    ...hostedFormConfig,
                    returnUrl: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="cancelUrl">Cancel Return URL</Label>
                <Input
                  id="cancelUrl"
                  value={hostedFormConfig.cancelUrl}
                  onChange={(e) => setHostedFormConfig({
                    ...hostedFormConfig,
                    cancelUrl: e.target.value
                  })}
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Form Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={hostedFormConfig.billingAddress}
                      onChange={(e) => setHostedFormConfig({
                        ...hostedFormConfig,
                        billingAddress: e.target.checked
                      })}
                    />
                    Require billing address
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={hostedFormConfig.shippingAddress}
                      onChange={(e) => setHostedFormConfig({
                        ...hostedFormConfig,
                        shippingAddress: e.target.checked
                      })}
                    />
                    Require shipping address
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={hostedFormConfig.customerReceipt}
                      onChange={(e) => setHostedFormConfig({
                        ...hostedFormConfig,
                        customerReceipt: e.target.checked
                      })}
                    />
                    Send customer email receipt
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleGenerateForm}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Hosted Form'}
                </Button>
                
                {formToken && (
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Form Token</div>
                      <div className="font-mono text-xs break-all">{formToken}</div>
                    </div>
                    
                    <Button 
                      onClick={handleLaunchHostedForm}
                      variant="outline"
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Launch Hosted Form
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Form Preview
              </CardTitle>
              <CardDescription>
                Preview of the Accept Hosted payment form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {previewHostedForm()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}