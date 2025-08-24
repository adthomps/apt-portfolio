import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
const socialLinks = [{
  icon: Github,
  href: "https://github.com/johnsmith",
  label: "GitHub"
}, {
  icon: Linkedin,
  href: "https://linkedin.com/in/johnsmith",
  label: "LinkedIn"
}, {
  icon: Twitter,
  href: "https://twitter.com/johnsmith",
  label: "Twitter"
}, {
  icon: Mail,
  href: "mailto:john.smith@example.com",
  label: "Email"
}];
const quickLinks = [{
  name: "Photography",
  href: "#photography"
}, {
  name: "Projects",
  href: "#projects"
}, {
  name: "Coding",
  href: "#coding"
}, {
  name: "Blog",
  href: "#blog"
}, {
  name: "Sitemap",
  href: "/sitemap"
}];
export function Footer() {
  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const onHome = typeof window !== 'undefined' && window.location.pathname === '/';
    if (!onHome) {
      window.location.assign(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign(`/#${sectionId}`);
    }
  };
  return <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Adam Thompson</h3>
            <p className="text-muted-foreground leading-relaxed">
              Developer, photographer, and explorer creating digital experiences and capturing moments through the lens.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors" aria-label={link.label}>
                  <link.icon className="h-4 w-4" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {quickLinks.map(link => (
                link.href.startsWith('#') ? (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Get In Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>john.smith@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} John Smith. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with using Cloudflare + React + Vite + Tailwind CSS + Typescript + shadcn-ui and AI.
          </p>
        </div>
      </div>
    </footer>;
}