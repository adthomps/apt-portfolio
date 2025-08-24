import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Plus, Edit, Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";
interface AcceptCustomerTestPageProps {
  environment?: 'production' | 'sandbox';
}

type PaymentMethod = { id: string; type: string; last4: string; expiry: string };
type Customer = { id: string; name: string; email: string; phone: string; paymentMethods: PaymentMethod[] };

export function AcceptCustomerTestPage({ environment = 'sandbox' }: AcceptCustomerTestPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockCustomers: Customer[] = [
    {
      id: 'cust_001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      paymentMethods: [
        { id: 'pm_001', type: 'Visa', last4: '1111', expiry: '12/25' },
        { id: 'pm_002', type: 'MasterCard', last4: '4444', expiry: '03/26' }
      ]
    },
    {
      id: 'cust_002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      paymentMethods: [
        { id: 'pm_003', type: 'Amex', last4: '0005', expiry: '09/25' }
      ]
    }
  ];

  const handleCreateCustomer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Customer Profile Created",
        description: "New customer profile created successfully",
      });
    }, 1500);
  };

  const handleAddPaymentMethod = (customerId: string) => {
    toast({
      title: "Payment Method Added",
      description: "New payment method added to customer profile",
    });
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
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Accept Customer Testing</h1>
            <Badge variant={environment === 'production' ? 'default' : 'secondary'}>
              {environment}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customers">Customer Profiles</TabsTrigger>
            <TabsTrigger value="create">Create Customer</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCustomers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{customer.name}</CardTitle>
                        <CardDescription className="text-sm">{customer.email}</CardDescription>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Customer ID</div>
                      <div className="font-mono text-xs">{customer.id}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Payment Methods</div>
                      <div className="space-y-2">
                        {customer.paymentMethods.map((pm) => (
                          <div key={pm.id} className="flex items-center gap-2 text-xs">
                            <CreditCard className="h-3 w-3" />
                            <span>{pm.type} •••• {pm.last4}</span>
                            <span className="text-muted-foreground">({pm.expiry})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleAddPaymentMethod(customer.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Card
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Create New Customer Profile</CardTitle>
                <CardDescription>
                  Add a new customer to the Accept Customer system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input id="description" placeholder="Customer description or notes" />
                  </div>
                  
                  <Button 
                    type="button"
                    onClick={handleCreateCustomer}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Customer Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Management</CardTitle>
                <CardDescription>
                  Test adding, updating, and removing payment methods from customer profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCustomer ? (
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-2">Selected Customer</h4>
                      <div className="text-sm">
                        <div><strong>Name:</strong> {selectedCustomer.name}</div>
                        <div><strong>Email:</strong> {selectedCustomer.email}</div>
                        <div><strong>ID:</strong> {selectedCustomer.id}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Existing Payment Methods</h4>
                      <div className="space-y-2">
                        {selectedCustomer.paymentMethods.map((pm: PaymentMethod) => (
                          <div key={pm.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4" />
                              <div>
                                <div className="font-medium">{pm.type} •••• {pm.last4}</div>
                                <div className="text-sm text-muted-foreground">Expires {pm.expiry}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Payment Method
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a customer from the "Customer Profiles" tab to manage their payment methods
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}