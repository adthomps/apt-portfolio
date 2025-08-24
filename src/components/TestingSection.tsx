import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FilterGroup } from "@/components/shared/FilterGroup";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TestTube, FileText, ExternalLink, Play, Settings, Database, Shield, Code, CheckCircle, CreditCard, Globe, Lock, User, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "@/components/shared/ShareButton";
import { MediaBanner } from "@/components/shared/MediaBanner";

interface TestLink {
  name: string;
  type: string;
  externalUrl?: string;
  url?: string;
  route?: string;
  description: string;
}

interface TestProject {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  technologies: string[];
  features: string[];
  environments: string[];
  goals: string[];
  testingDetails: string;
  testLinks: TestLink[];
  diagram: string;
  image?: string;
}

const testingCategories: {
  [key: string]: {
    title: string;
    icon: React.ElementType;
    projects: TestProject[];
  };
} = {
  "api-testing": {
    title: "Authorize.net Testing",
    icon: Database,
    projects: [{
      id: "accept-suite",
      title: "Accept Suite API Testing",
      summary: "Comprehensive testing framework for Authorize.net Accept Suite integration",
      category: "Payment Processing",
      status: "Active",
      technologies: ["Accept.js", "Accept UI", "Accept Customer", "Accept Hosted"],
      features: ["Payment form integration testing", "Tokenization and security validation", "PCI compliance verification", "Cross-browser compatibility", "Error handling scenarios", "Mobile responsiveness testing"],
      environments: ["Production", "Sandbox"],
      goals: ["Ensure seamless payment processing integration", "Validate security protocols and PCI compliance", "Test various payment methods and scenarios", "Verify error handling and user experience"],
      testingDetails: "This testing suite covers all aspects of Authorize.net Accept Suite integration including Accept.js for tokenization, Accept UI for hosted payment forms, Accept Customer for stored payment methods, and Accept Hosted for complete payment page hosting.",
      // testLinks will be loaded from markdown and should use externalUrl
      testLinks: [
        {
          name: "Accept.js - Production - v1",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptjsp.html",
          description: "Client-side tokenization flow against production endpoints."
        },
        {
          name: "Accept.js - Production - v2",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptjspv2.html",
          description: "Client-side tokenization flow against production endpoints."
        },
        {
          name: "Accept.js - Sandbox - v1",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptjss.html",
          description: "Client-side tokenization flow using sandbox credentials."
        },
        {
          name: "Accept.js - Sandbox - v2",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptjssv2.html",
          description: "Client-side tokenization flow using sandbox credentials."
        },
        {
          name: "Accept UI - Production - v1",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptuipv1.html",
          description: "Hosted payment form (Accept UI) on production."
        },
        {
          name: "Accept UI - Production - v2",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptuipv2.html",
          description: "Hosted payment form (Accept UI) on production."
        },
        {
          name: "Accept UI - Sandbox - v1",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptuisv1.html",
          description: "Hosted payment form (Accept UI) on sandbox."
        },
        {
          name: "Accept UI - Sandbox - v2",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accept/acceptuisv2.html",
          description: "Hosted payment form (Accept UI) on sandbox."
        },
        {
          name: "Accept Customer - Production (JSON)",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/acceptcustomer/acceptcustomerpjson.html",
          description: "Customer profiles and stored payments via XML API (prod)."
        },
        {
          name: "Accept Customer - Sandbox (JSON)",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/acceptcustomer/acceptcustomersjson.html",
          description: "Customer profiles and stored payments via XML API (sandbox)."
        },
        {
          name: "Accept Hosted - Production - v1",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accepthosted/accepthostedp.html",
          description: "Complete hosted checkout page on production."
        },
        {
          name: "Accept Hosted - Production - v2",
          type: "production",
          externalUrl: "https://adthomps.github.io/anet/accepthosted/accepthostedpv2.html",
          description: "Complete hosted checkout page on production."
        },
        {
          name: "Accept Hosted - Sandbox - v1",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accepthosted/accepthosteds.html",
          description: "Complete hosted checkout page on sandbox."
        },
        {
          name: "Accept Hosted - Sandbox - v2",
          type: "sandbox",
          externalUrl: "https://adthomps.github.io/anet/accepthosted/accepthostedsv2.html",
          description: "Complete hosted checkout page on sandbox."
        }
      ],
      diagram: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400"
    }, {
      id: "legacy-hosted",
      title: "Legacy Hosted Payment Forms",
      summary: "Testing legacy hosted payment forms including SIM, DPM, and Simple Checkout methods",
      category: "Payment Processing",
      status: "Active",
      technologies: ["SIM", "DPM", "Simple Checkout", "QR Code"],
      features: ["Server Integration Method testing", "Direct Post Method validation", "Simple Checkout form testing", "QR Code payment testing", "Receipt handling methods", "Multi-environment support"],
      environments: ["Production", "Sandbox"],
      goals: ["Test Server Integration Method (SIM) with various receipt types", "Validate Direct Post Method (DPM) functionality", "Test Simple Checkout and QR Code implementations", "Verify legacy payment form compatibility"],
      testingDetails: "Comprehensive testing of Authorize.Net's legacy hosted payment form methods including Server Integration Method (SIM), Direct Post Method (DPM), and Simple Checkout buttons with various receipt handling options.",
      testLinks: [
        {
          name: "Legacy Hosted Forms",
          description: "Test legacy hosted payment form methods (SIM, DPM, Simple Checkout)",
          externalUrl: "https://adthomps.github.io/anet/hop.html",
          type: "interactive"
        },
        {
          name: "SIM Testing",
          description: "Server Integration Method testing with various receipt types",
          externalUrl: "https://adthomps.github.io/anet/hop.html",
          type: "interactive"
        },
        {
          name: "DPM Testing",
          description: "Direct Post Method testing for direct server integration",
          externalUrl: "https://adthomps.github.io/anet/hop.html",
          type: "interactive"
        },
        {
          name: "Simple Checkout Testing",
          description: "Simple Checkout and QR Code payment testing",
          externalUrl: "https://adthomps.github.io/anet/hop.html",
          type: "interactive"
        }
      ],
      diagram: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400"
    }]
  }
};
interface TestingProjectCardProps {
  project: TestProject;
  onDetailClick: (project: TestProject) => void;
  onTestLinksClick: (project: TestProject) => void;
}

function TestingProjectCard({
  project,
  onDetailClick,
  onTestLinksClick
}: TestingProjectCardProps) {
  const statusColor = project.status === "Active" ? "text-green-500" : "text-yellow-500";
  return <Card className="hover:shadow-glow transition-all duration-300 h-full">
      <MediaBanner
        src={project.image || project.diagram}
        alt={project.title + " promo image"}
        fallbackText="Testing Promo"
      />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
<Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className="text-lg mb-2 clamp-2 md:truncate break-words" title={project.title}>
                  {project.title}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">{project.title}</TooltipContent>
            </Tooltip>
            <CardDescription className="text-sm">{project.summary}</CardDescription>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <CheckCircle className={`h-4 w-4 ${statusColor}`} />
            <span className={`text-xs font-medium ${statusColor}`}>{project.status}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>
          
          <div>
            <h5 className="font-medium text-sm mb-2">Technologies</h5>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map(tech => <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>)}
              {project.technologies.length > 3 && <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 3} more
                </Badge>}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-sm mb-2">Environments</h5>
            <div className="flex flex-wrap gap-1">
              {project.environments.map(env => <Badge key={env} variant="outline" className="text-xs">
                  {env}
                </Badge>)}
            </div>
          </div>
          
          <div className="pt-2 flex gap-2">
            <Button onClick={() => onDetailClick(project)} variant="outline" size="sm" className="flex-1">
              <Settings className="h-3 w-3 mr-2" />
              View Details
            </Button>
            <Button onClick={() => onTestLinksClick(project)} size="sm" className="flex-1">
              <Play className="h-3 w-3 mr-2" />
              Test Links
            </Button>
            {/* ShareButton removed for unsupported type */}
          </div>
        </div>
      </CardContent>
    </Card>;
}

interface TestDetailDialogProps {
  project: TestProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function TestDetailDialog({
  project,
  open,
  onOpenChange
}: TestDetailDialogProps) {
  if (!project) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Testing Details</h4>
              <p className="text-sm text-muted-foreground">{project.testingDetails}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Goals & Objectives</h4>
              <div className="grid grid-cols-1 gap-2">
                {project.goals?.map((goal, index) => <div key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </div>)}
              </div>
            </div>
          </div>

          
          
          {/*<div>
            <h4 className="font-semibold mb-3">Test Environments</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.environments.map(env => <Card key={env} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{env}</h5>
                      <p className="text-sm text-muted-foreground">
                        Last run: 2 hours ago
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Run
                    </Button>
                  </div>
                </Card>)}
            </div>
          </div>*/}
          
          <div>
            <h4 className="font-semibold mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => <div key={index} className="flex items-start text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>)}
            </div>
          </div>
          
          
        </div>
      </DialogContent>
    </Dialog>;
}

function TestLinksDialog({ project, open, onOpenChange }: { project: TestProject | null; open: boolean; onOpenChange: (open: boolean) => void; }) {
  const navigate = useNavigate();
  if (!project) return null;
  const handleTestLinkClick = (testLink: TestLink) => {
    if (testLink.externalUrl) {
      window.open(testLink.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (testLink.url) {
      window.open(testLink.url, '_blank', 'noopener,noreferrer');
    } else if (testLink.route) {
      navigate(testLink.route);
    }
    onOpenChange(false);
  };
  const getIconForTestType = (name: string) => {
    if (name.includes('Accept.js') || name.includes('Acceptjs')) return CreditCard;
    if (name.includes('Accept UI')) return Globe;
    if (name.includes('Accept Customer')) return User;
    if (name.includes('Accept Hosted')) return Lock;
    return ExternalLink;
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{project.title} - Test Links</DialogTitle>
          <p className="text-sm text-muted-foreground">Test example API Accept Suite products.</p>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.testLinks?.map((testLink: TestLink, index: number) => {
              const Icon = getIconForTestType(testLink.name);
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CardTitle className="text-base mb-1 clamp-1 md:truncate break-words" title={testLink.name}>
                              {testLink.name}
                            </CardTitle>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="start">{testLink.name}</TooltipContent>
                        </Tooltip>
                        <Badge variant={testLink.type === 'production' ? 'default' : 'secondary'} className="text-xs mb-2">
                          {testLink.type}
                        </Badge>
                        <CardDescription className="text-xs">
                          {testLink.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button onClick={() => handleTestLinkClick(testLink)} size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Launch Test
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
// Get all unique categories, technologies, and environments for filtering
const allCategories = ["All", ...Array.from(new Set(Object.values(testingCategories).flatMap(cat => cat.projects.map(p => p.category))))];
const allTechnologies = Array.from(new Set(Object.values(testingCategories).flatMap(cat => cat.projects.flatMap(p => p.technologies))));
const allEnvironments = Array.from(new Set(Object.values(testingCategories).flatMap(cat => cat.projects.flatMap(p => p.environments))));

export function TestingSection() {
  const [selectedProject, setSelectedProject] = React.useState<TestProject | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [testLinksDialogOpen, setTestLinksDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<string[]>([]);
  const [selectedEnvironments, setSelectedEnvironments] = React.useState<string[]>([]);
  const handleProjectDetail = (project: TestProject) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };
  const handleTestLinks = (project: TestProject) => {
    setSelectedProject(project);
    setTestLinksDialogOpen(true);
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const toggleEnvironment = (env: string) => {
    setSelectedEnvironments(prev => 
      prev.includes(env) 
        ? prev.filter(e => e !== env)
        : [...prev, env]
    );
  };

  const filterProjects = (projects: TestProject[]) => {
    return projects.filter(project => {
      const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
      const technologyMatch = selectedTechnologies.length === 0 || selectedTechnologies.some(tech => project.technologies.includes(tech));
      const environmentMatch = selectedEnvironments.length === 0 || selectedEnvironments.some(env => project.environments.includes(env));
      return categoryMatch && technologyMatch && environmentMatch;
    });
  };
  const allProjects = React.useMemo(() => Object.values(testingCategories).flatMap(cat => cat.projects), []);
  const filteredProjects = filterProjects(allProjects);
  return (
    <>
      <section id="testing" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Testing Framework"
            subtitle="Comprehensive testing solutions for financial technology and payment processing systems"
            Icon={TestTube}
          />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <FilterGroup
              label="Technologies"
              options={allTechnologies}
              selected={selectedTechnologies}
              onToggle={toggleTechnology}
              onClear={() => setSelectedTechnologies([])}
            />
            <FilterGroup
              label="Environments"
              options={allEnvironments}
              selected={selectedEnvironments}
              onToggle={toggleEnvironment}
              onClear={() => setSelectedEnvironments([])}
            />
          </div>
          <TooltipProvider delayDuration={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <TestingProjectCard
                  key={project.id}
                  project={project}
                  onDetailClick={handleProjectDetail}
                  onTestLinksClick={handleTestLinks}
                />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No testing projects found matching your filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedTechnologies([]);
                    setSelectedEnvironments([]);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TooltipProvider>
        </div>
      </section>
      <TestDetailDialog project={selectedProject} open={dialogOpen} onOpenChange={setDialogOpen} />
      <TestLinksDialog 
        project={selectedProject} 
        open={testLinksDialogOpen} 
        onOpenChange={setTestLinksDialogOpen}
      />
    </>
  );
}