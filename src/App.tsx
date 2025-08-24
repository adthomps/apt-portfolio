import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ProfilePage } from "./pages/ProfilePage";
import { AcceptJsTestPage } from "./pages/tests/AcceptJsTestPage";
import { EnhancedAcceptJsTestPage } from "./pages/tests/EnhancedAcceptJsTestPage";
import { AcceptUITestPage } from "./pages/tests/AcceptUITestPage";
import { AcceptCustomerTestPage } from "./pages/tests/AcceptCustomerTestPage";
import { AcceptHostedTestPage } from "./pages/tests/AcceptHostedTestPage";
import LegacyHostedTestPage from "./pages/tests/LegacyHostedTestPage";
import LegacySIMTestPage from "./pages/tests/LegacySIMTestPage";
import LegacyDPMTestPage from "./pages/tests/LegacyDPMTestPage";
import LegacySimpleCheckoutTestPage from "./pages/tests/LegacySimpleCheckoutTestPage";
import { ContentDetailPage } from "./pages/ContentDetailPage";
import SitemapPage from "./pages/SitemapPage";

const queryClient = new QueryClient();

const App = () => {
  // Removed legacy navigation state and handler

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog/:slug" element={<ContentDetailPage />} />
          <Route path="/podcast/:slug" element={<ContentDetailPage />} />
          <Route path="/guide/:slug" element={<ContentDetailPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/test-acceptjs-production" element={<AcceptJsTestPage environment="production" />} />
          <Route path="/test-acceptjs-sandbox" element={<AcceptJsTestPage environment="sandbox" />} />
          <Route path="/test-enhanced-acceptjs" element={<EnhancedAcceptJsTestPage environment="sandbox" />} />
          <Route path="/test-acceptui-production" element={<AcceptUITestPage environment="production" />} />
          <Route path="/test-acceptui-sandbox" element={<AcceptUITestPage environment="sandbox" />} />
          <Route path="/test-acceptcustomer-production" element={<AcceptCustomerTestPage environment="production" />} />
          <Route path="/test-acceptcustomer-sandbox" element={<AcceptCustomerTestPage environment="sandbox" />} />
          <Route path="/test-accepthosted-production" element={<AcceptHostedTestPage environment="production" />} />
          <Route path="/test-accepthosted-sandbox" element={<AcceptHostedTestPage environment="sandbox" />} />
          <Route path="/test-legacyhosted-production" element={<LegacyHostedTestPage environment="production" />} />
          <Route path="/test-legacyhosted-sandbox" element={<LegacyHostedTestPage environment="sandbox" />} />
          <Route path="/test-sim-production" element={<LegacySIMTestPage environment="production" />} />
          <Route path="/test-sim-sandbox" element={<LegacySIMTestPage environment="sandbox" />} />
          <Route path="/test-dpm-production" element={<LegacyDPMTestPage environment="production" />} />
          <Route path="/test-dpm-sandbox" element={<LegacyDPMTestPage environment="sandbox" />} />
          <Route path="/test-simplecheckout-production" element={<LegacySimpleCheckoutTestPage environment="production" />} />
          <Route path="/test-simplecheckout-sandbox" element={<LegacySimpleCheckoutTestPage environment="sandbox" />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
