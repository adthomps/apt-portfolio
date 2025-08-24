import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  Code,
  Camera,
  TestTube,
  FileText,
  ExternalLink
} from "lucide-react";
const profileAvatar = "/media/profile/avatar.png";

const personalInfo = {
  name: "Adam Thompson",
  title: "Director Service Experience",
  location: "San Francisco, CA",
  email: "test@example.com",
  phone: "+0 (123) 456-7890",
  joinDate: "June 2006",
  bio: "Passionate about technology-driven innovation, I design and implement tools, software, and systems that streamline and enhance processes. I focus on improving user experiences through precise testing and automation, delivering quality and efficiency in every project. Outside of work, I channel my creativity into photography and drone flying, capturing unique perspectives from both ground and sky. I also enjoy writing about my experiences and insights in the tech industry, sharing knowledge and fostering community engagement.",
};

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com", color: "text-gray-600" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "text-blue-600" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "text-blue-400" },
  { name: "Portfolio", icon: Globe, url: "https://example.com", color: "text-green-600" }
];

const projectStats = [
  {
    category: "Coding Projects",
    icon: Code,
    completed: 15,
    total: 20,
    progress: 75,
    color: "text-blue-500"
  },
  {
    category: "Photography",
    icon: Camera,
    completed: 8,
    total: 12,
    progress: 67,
    color: "text-purple-500"
  },
  {
    category: "Testing Suites",
    icon: TestTube,
    completed: 12,
    total: 15,
    progress: 80,
    color: "text-green-500"
  },
  {
    category: "Blog Posts",
    icon: FileText,
    completed: 25,
    total: 30,
    progress: 83,
    color: "text-orange-500"
  }
];

const skills = [
  { name: "React/TypeScript", level: 95 },
  { name: "Node.js", level: 88 },
  { name: "Test Automation", level: 92 },
  { name: "Photography", level: 85 },
  { name: "UI/UX Design", level: 78 },
  { name: "DevOps", level: 82 }
];

const achievements = [
  {
    title: "Payment Testing Certification",
    description: "Certified in Authorize.net payment gateway testing",
    date: "2023",
    type: "Certification"
  },
  {
    title: "Photography Exhibition",
    description: "Featured in local art gallery showcase",
    date: "2023",
    type: "Recognition"
  },
  {
    title: "Open Source Contributor",
    description: "100+ contributions to various projects",
    date: "Ongoing",
    type: "Contribution"
  }
];

export function ProfileSection() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-elegant"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-12">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={profileAvatar} alt={personalInfo.name} />
              <AvatarFallback className="text-2xl">JS</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold">{personalInfo.name}</h1>
              <p className="text-lg text-muted-foreground">{personalInfo.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {personalInfo.joinDate}
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <p className="text-muted-foreground leading-relaxed">{personalInfo.bio}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact & Social */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Social Links</h4>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Button 
                        key={link.name} 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Icon className={`h-4 w-4 mr-2 ${link.color}`} />
                          {link.name}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Project Statistics */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Current status across different project categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.category} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                          <h4 className="font-medium">{stat.category}</h4>
                        </div>
                        <Badge variant="secondary">
                          {stat.completed}/{stat.total}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={stat.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {stat.progress}% Complete
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-b-0">
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      {achievement.type}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}