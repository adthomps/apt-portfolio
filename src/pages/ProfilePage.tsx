import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "@/components/ProfileSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/shared/SEO";

export function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Profile | APT Portfolio"
        description="About the author: background, skills, and contact information."
        og={{ type: "profile", image: "/profile.jpg", siteName: "APT Portfolio" }}
        twitter={{ card: "summary" }}
      />
      {/* Header */}
      <header className="border-b border-glass backdrop-blur-md bg-glass/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <ProfileSection />
      </main>
    </div>
  );
}