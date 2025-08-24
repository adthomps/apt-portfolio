import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Check, AlertCircle, Shield, Key, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

export function EnhancedAcceptJsTestPage({ environment }: { environment?: 'production' | 'sandbox' }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    zipCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  type SecureData = {
    opaqueData: {
      dataDescriptor: string;
      dataValue: string;
    };
    encryptedCardData: {
      cardNumber: string;
      expDate: string;
      bin: string;
    };
    cardBrand: string;
    timestamp: string;
  };
  const [secureData, setSecureData] = useState<SecureData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Accept.js tokenization with enhanced response
    setTimeout(() => {
      const token = `tok_${Math.random().toString(36).substr(2, 16)}`;
      const securePaymentData = {
        opaqueData: {
          dataDescriptor: "COMMON.ACCEPT.INAPP.PAYMENT",
          dataValue: token
        },
        encryptedCardData: {
          cardNumber: "XXXX" + formData.cardNumber.slice(-4),
          expDate: `${formData.expiryMonth}/${formData.expiryYear}`,
          bin: formData.cardNumber.slice(0, 6)
        },
        cardBrand: getCardBrand(formData.cardNumber),
        timestamp: new Date().toISOString()
      };
      
      setTestResult(token);
      setSecureData(securePaymentData);
      setIsLoading(false);
      
      toast({
        title: "Accept.js Success!",
        description: "Secure payment token generated successfully",
      });
    }, 2000);
  };

  const getCardBrand = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.slice(0, 2);
    
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5') || (parseInt(firstTwoDigits) >= 22 && parseInt(firstTwoDigits) <= 27)) return 'Mastercard';
    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'American Express';
    if (cardNumber.startsWith('6011') || cardNumber.startsWith('65')) return 'Discover';
    return 'Unknown';
  };

  const testCards = [
    { name: "Visa Test", number: "4111111111111111", exp: "12/25", cvv: "123", brand: "Visa" },
    { name: "Mastercard Test", number: "5555555555554444", exp: "11/25", cvv: "456", brand: "Mastercard" },
    { name: "Amex Test", number: "378282246310005", exp: "10/25", cvv: "1234", brand: "American Express" },
    { name: "Discover Test", number: "6011111111111117", exp: "09/25", cvv: "789", brand: "Discover" }
  ];

  const fillTestCard = (card: typeof testCards[0]) => {
    const [month, year] = card.exp.split('/');
    setFormData({
      cardNumber: card.number,
      expiryMonth: month,
      expiryYear: year,
      cvv: card.cvv,
      cardholderName: "Test User",
      zipCode: "12345"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Enhanced Accept.js Integration</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive Accept.js testing with advanced features and documentation
            </p>
          </div>
          <Badge variant={environment === 'production' ? 'destructive' : 'secondary'}>
            {environment || 'sandbox'}
          </Badge>
        </div>

        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payment">Payment Form</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Secure Payment Form
                  </CardTitle>
                  <CardDescription>
                    Test Accept.js tokenization with various card types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Month</Label>
                        <Input
                          id="expiryMonth"
                          value={formData.expiryMonth}
                          onChange={(e) => setFormData({...formData, expiryMonth: e.target.value})}
                          placeholder="MM"
                          maxLength={2}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Year</Label>
                        <Input
                          id="expiryYear"
                          value={formData.expiryYear}
                          onChange={(e) => setFormData({...formData, expiryYear: e.target.value})}
                          placeholder="YY"
                          maxLength={2}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        value={formData.cardholderName}
                        onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                        placeholder="12345"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Tokenizing...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Generate Secure Token
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Test Cards */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Credit Cards</CardTitle>
                    <CardDescription>
                      Pre-configured test cards for different brands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {testCards.map((card, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{card.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {card.number.replace(/(.{4})/g, '$1 ').trim()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Exp: {card.exp} | CVV: {card.cvv}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fillTestCard(card)}
                          >
                            Use Card
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                {testResult && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        Token Generated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {testResult}
                        </div>
                        
                        {secureData && (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Brand:</span>
                              <span>{secureData.cardBrand}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Masked:</span>
                              <span>{secureData.encryptedCardData.cardNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Descriptor:</span>
                              <span className="text-xs">{secureData.opaqueData.dataDescriptor}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  JavaScript Integration
                </CardTitle>
                <CardDescription>
                  Complete Accept.js implementation code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">1. Include Accept.js Library</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`<script type="text/javascript" 
  src="https://js.authorize.net/v3/AcceptCore.js">
</script>`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">2. Tokenization Function</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`function sendPaymentDataToAnet() {
  var authData = {};
  authData.clientKey = "YOUR_CLIENT_KEY";
  authData.apiLoginID = "YOUR_API_LOGIN_ID";

  var cardData = {};
  cardData.cardNumber = document.getElementById("cardNumber").value;
  cardData.month = document.getElementById("expMonth").value;
  cardData.year = document.getElementById("expYear").value;
  cardData.cardCode = document.getElementById("cardCode").value;

  var secureData = {};
  secureData.authData = authData;
  secureData.cardData = cardData;

  Accept.dispatchData(secureData, responseHandler);
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">3. Response Handler</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`function responseHandler(response) {
  if (response.messages.resultCode === "Error") {
    // Handle errors
    for (var i = 0; i < response.messages.message.length; i++) {
      console.error(response.messages.message[i].text);
    }
  } else {
    // Success - use the token
    var token = response.opaqueData.dataValue;
    var descriptor = response.opaqueData.dataDescriptor;
    
    // Submit to your server for processing
    submitTokenToServer(token, descriptor);
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>React Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import { useEffect } from 'react';

const AcceptJsComponent = () => {
  useEffect(() => {
    // Load Accept.js script
    const script = document.createElement('script');
    script.src = 'https://js.authorize.net/v3/AcceptCore.js';
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  const handleTokenize = () => {
    window.Accept.dispatchData(secureData, responseHandler);
  };
  
  return (
    <form onSubmit={handleTokenize}>
      {/* Form fields */}
    </form>
  );
};`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Server-Side Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`// Node.js/Express example
app.post('/process-payment', (req, res) => {
  const { token, descriptor } = req.body;
  
  const paymentRequest = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: process.env.API_LOGIN_ID,
        transactionKey: process.env.TRANSACTION_KEY
      },
      transactionRequest: {
        transactionType: "authCaptureTransaction",
        amount: "10.00",
        payment: {
          opaqueData: {
            dataDescriptor: descriptor,
            dataValue: token
          }
        }
      }
    }
  };
  
  // Send to Authorize.Net API
});`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-green-700">PCI Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        Sensitive card data never touches your server, reducing PCI DSS scope
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-700">Tokenization</h4>
                      <p className="text-sm text-muted-foreground">
                        Card data is replaced with secure tokens that can't be reverse-engineered
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-purple-700">Client-Side Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        Data is encrypted in the browser before transmission
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>External Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                      <a href="https://developer.authorize.net/api/reference/features/acceptjs.html" target="_blank">
                        Accept.js Developer Guide
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                      <a href="https://github.com/AuthorizeNet/accept-sample-app" target="_blank">
                        Sample Application Repository
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                      <a href="https://developer.authorize.net/api/reference/index.html" target="_blank">
                        Complete API Reference
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                      <a href="https://www.authorize.net/support/testing/" target="_blank">
                        Testing Guide & Test Cards
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}