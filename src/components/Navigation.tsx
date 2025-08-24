import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
const navItems = [{
  name: "Home",
  href: "#home"
}, {
  name: "Photography",
  href: "#photography"
}, {
  name: "UI/UX Projects",
  href: "#projects"
}, {
  name: "Coding",
  href: "#coding"
}, {
  name: "Testing",
  href: "#testing"
}, {
  name: "Blogs & Podcasts",
  href: "#blog"
}];
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 supports-[backdrop-filter]:bg-background/50 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => scrollToSection('#home')} className="flex items-center gap-2 group">
              <img
                src="/media/branding/logo.png"
                alt="APT portfolio logo"
                className="h-8 w-8 rounded-md object-cover shadow-elegant transition-transform duration-200 group-hover:scale-105"
                width={32}
                height={32}
                loading="eager"
                decoding="async"
              />
              <h2 className="text-xl font-bold text-foreground">APT Portfolio</h2>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform">
                {item.name}
              </button>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="backdrop-blur-md bg-glass">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map(item => (
                  <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-left text-lg text-muted-foreground hover:text-primary transition-colors duration-200">
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>;
}