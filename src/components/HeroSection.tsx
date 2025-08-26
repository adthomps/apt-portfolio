import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { m } from "motion/react";
const heroBackground = "/media/branding/hero-bg.png";
const profileAvatar = "/media/profile/avatar.png";
const typewriterPhrases = [
  "Hobby Developer.",
  "Photographer.",
  "Drone Pilot.",
  "Creative Explorer.",
  "Innovator.",
  "Problem Solver."
];
export function HeroSection() {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    const phrase = typewriterPhrases[currentPhrase];
    if (isTyping) {
      if (displayText.length < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(phrase.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentPhrase(prev => (prev + 1) % typewriterPhrases.length);
        setIsTyping(true);
      }
    }
  }, [currentPhrase, displayText, isTyping]);
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{
    backgroundImage: `url(${heroBackground})`
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <Card className="p-8 backdrop-blur-md bg-glass border-glass shadow-elegant">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-glow cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => navigate('/profile')}>
              <AvatarImage src={profileAvatar} alt="Adam Thompson profile photo" />
              <AvatarFallback>APT</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-left">
              <m.h1
                className="text-4xl md:text-6xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Adam Thompson
              </m.h1>
              
              <m.div
                className="text-xl md:text-2xl text-muted-foreground mb-8 h-8 flex items-center"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
              >
                <span className="mr-1">I'm a </span>
                <span className="text-primary font-semibold min-w-[120px]">
                  {displayText}
                  <span className="animate-blink">|</span>
                </span>
              </m.div>
              
              <m.p
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
              >
                Crafting digital experiences through code and capturing moments through the lens. 
                Welcome to my creative journey.
              </m.p>
              
              <m.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
              >
                <Button size="lg" className="shadow-elegant hover:shadow-glow transition-all duration-300" onClick={() => scrollToSection('projects')}>
                  View My Work
                </Button>
                <Button variant="outline" size="lg" className="backdrop-blur-sm hover:bg-primary/10 transition-all duration-300" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </m.div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float animation-delay-1000" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/30 rounded-full animate-float animation-delay-2000" />
      <div className="absolute top-1/2 right-8 w-12 h-12 bg-primary-glow/40 rounded-full animate-float animation-delay-3000" />
    </section>;
}