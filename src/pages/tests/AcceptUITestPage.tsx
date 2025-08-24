import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, Palette, Monitor, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AcceptUITestPageProps {
  environment?: 'production' | 'sandbox';
}

export function AcceptUITestPage({ environment = 'sandbox' }: AcceptUITestPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [isLoading, setIsLoading] = useState(false);

  const themes = [
    { id: 'default', name: 'Default', preview: 'bg-white border-gray-300' },
    { id: 'dark', name: 'Dark', preview: 'bg-gray-900 border-gray-700' },
    { id: 'minimal', name: 'Minimal', preview: 'bg-gray-50 border-gray-200' },
    { id: 'branded', name: 'Branded', preview: 'bg-blue-50 border-blue-300' }
  ];

  const handleLoadForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Accept UI Form Loaded",
        description: `${selectedTheme} theme applied successfully`,
      });
    }, 1500);
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
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Accept UI Testing</h1>
            <Badge variant={environment === 'production' ? 'default' : 'secondary'}>
              {environment}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                UI Configuration
              </CardTitle>
              <CardDescription>
                Customize the Accept UI form appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Theme Selection</h4>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedTheme === theme.id ? 'border-primary bg-primary/10' : 'border-border'
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${theme.preview}`}></div>
                        <span className="text-sm font-medium">{theme.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Form Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" defaultChecked />
                    Enable card validation
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" defaultChecked />
                    Show cardholder name field
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Enable billing address
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Save payment method
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleLoadForm}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load Accept UI Form'}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                Live preview of the Accept UI form with selected configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="desktop" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="desktop" className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="desktop" className="mt-6">
                  <div className="border rounded-lg p-6 bg-card">
                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                        <p className="text-sm text-muted-foreground">
                          Secure payment form powered by Accept UI
                        </p>
                      </div>
                      
                      {/* Mock Accept UI Form */}
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <div className="text-xs text-muted-foreground mb-2">Card Number</div>
                          <div className="h-8 bg-muted rounded flex items-center px-3">
                            <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg bg-background">
                            <div className="text-xs text-muted-foreground mb-2">Expiry</div>
                            <div className="h-8 bg-muted rounded flex items-center px-3">
                              <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg bg-background">
                            <div className="text-xs text-muted-foreground mb-2">CVV</div>
                            <div className="h-8 bg-muted rounded flex items-center px-3">
                              <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-background">
                          <div className="text-xs text-muted-foreground mb-2">Cardholder Name</div>
                          <div className="h-8 bg-muted rounded flex items-center px-3">
                            <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                          </div>
                        </div>
                        
                        <Button className="w-full" disabled>
                          Pay $10.00
                        </Button>
                      </div>
                      
                      <div className="mt-4 text-xs text-muted-foreground text-center">
                        Theme: {themes.find(t => t.id === selectedTheme)?.name} | Environment: {environment}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mobile" className="mt-6">
                  <div className="max-w-sm mx-auto border rounded-2xl p-4 bg-card">
                    <div className="space-y-4">
                      <div className="mb-4">
                        <h3 className="text-base font-semibold mb-1">Payment</h3>
                        <p className="text-xs text-muted-foreground">
                          Mobile-optimized Accept UI
                        </p>
                      </div>
                      
                      {/* Mobile Mock Form */}
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg bg-background">
                          <div className="text-xs text-muted-foreground mb-1">Card Number</div>
                          <div className="h-6 bg-muted rounded"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 border rounded-lg bg-background">
                            <div className="text-xs text-muted-foreground mb-1">MM/YY</div>
                            <div className="h-6 bg-muted rounded"></div>
                          </div>
                          <div className="p-3 border rounded-lg bg-background">
                            <div className="text-xs text-muted-foreground mb-1">CVV</div>
                            <div className="h-6 bg-muted rounded"></div>
                          </div>
                        </div>
                        
                        <Button size="sm" className="w-full" disabled>
                          Pay $10.00
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}