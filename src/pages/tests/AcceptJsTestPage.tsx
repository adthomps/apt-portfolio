import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AcceptJsTestPageProps {
  environment?: 'production' | 'sandbox';
}

type TokenizationResult = {
  status: 'success' | 'error';
  token: string;
  cardType: string;
  lastFourDigits: string;
  environment: 'production' | 'sandbox';
};

export function AcceptJsTestPage({ environment = 'sandbox' }: AcceptJsTestPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    amount: '10.00'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TokenizationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Accept.js tokenization process
    setTimeout(() => {
      const mockResult: TokenizationResult = {
        status: 'success',
        token: `tok_${Math.random().toString(36).substr(2, 9)}`,
        cardType: 'Visa',
        lastFourDigits: formData.cardNumber.slice(-4),
        environment: environment
      };
      
      setTestResult(mockResult);
      setIsLoading(false);
      
      toast({
        title: "Tokenization Successful",
        description: "Payment token generated successfully",
      });
    }, 2000);
  };

  const testCards = [
    { number: '4111111111111111', type: 'Visa', description: 'Valid Visa test card' },
    { number: '5555555555554444', type: 'MasterCard', description: 'Valid MasterCard test card' },
    { number: '378282246310005', type: 'Amex', description: 'Valid American Express test card' },
    { number: '4000000000000002', type: 'Visa', description: 'Declined test card' }
  ];

  const fillTestCard = (cardNumber: string) => {
    setFormData({
      ...formData,
      cardNumber,
      expiryDate: '12/25',
      cvv: '123',
      cardholderName: 'Test User'
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
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
            <CreditCard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Accept.js Testing</h1>
            <Badge variant={environment === 'production' ? 'default' : 'secondary'}>
              {environment}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Payment Tokenization Test
              </CardTitle>
              <CardDescription>
                Test Accept.js payment form tokenization in {environment} environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="4111111111111111"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Generate Token'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Test Cards & Results */}
          <div className="space-y-6">
            {/* Test Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Test Cards</CardTitle>
                <CardDescription>
                  Pre-configured test card numbers for testing different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {testCards.map((card, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-mono text-sm">{card.number}</div>
                      <div className="text-xs text-muted-foreground">{card.type} - {card.description}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => fillTestCard(card.number)}
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {testResult.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Status</div>
                      <div className="font-mono">{testResult.status}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Environment</div>
                      <div className="font-mono">{testResult.environment}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Token</div>
                      <div className="font-mono text-xs break-all">{testResult.token}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Card Type</div>
                      <div className="font-mono">{testResult.cardType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}