import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpandableTags } from "@/components/ui/expandable-tags";
import { ExternalLink, Github, Figma, MonitorSmartphone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShareButton } from "@/components/shared/ShareButton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FilterGroup } from "@/components/shared/FilterGroup";
import { MediaBanner } from "@/components/shared/MediaBanner";
import { getAllProjects as getAllUiuxProjects } from "@/lib/projects";
import { Link } from "react-router-dom";
import { m } from "motion/react";

const rawProjects = getAllUiuxProjects();

const projects = rawProjects.map((p) => ({
  slug: p.slug,
  title: p.meta.title,
  description: p.meta.summary,
  tags: p.meta.tags || [],
  github: p.meta.github?.trim() || undefined,
  demo: p.meta.demo?.trim() || undefined,
  uiMock: p.meta.uiMock?.trim() || undefined,
  image: p.meta.promoImage,
  isLive: p.meta.isLive,
}));

export function ProjectsSection() {
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const t = p.tags || [];
      if (t.includes("Figma Make")) set.add("Figma Make");
      else if (t.includes("Lovable") || t.includes("Lovable Make"))
        set.add("Lovable");
      else set.add("General");
    });
    return Array.from(set).sort();
  }, []);

  const allTags = React.useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const getCategory = (p: (typeof projects)[number]) => {
    const t = p.tags || [];
    if (t.includes("Figma Make")) return "Figma Make";
    if (t.includes("Lovable") || t.includes("Lovable Make")) return "Lovable";
    return "General";
  };

  const filtered = React.useMemo(() => {
    return projects.filter((p) => {
      const cat = getCategory(p);
      const catOk = selectedCategories.length
        ? selectedCategories.includes(cat)
        : true;
      const tagsOk = selectedTags.length
        ? selectedTags.every((t) => p.tags.includes(t))
        : true;
      return catOk && tagsOk;
    });
  }, [selectedCategories, selectedTags]);
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="UI/UX Projects"
          subtitle="Interface and prototype work across Figma and Lovable"
        />

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <FilterGroup
            label="Categories"
            options={categories}
            selected={selectedCategories}
            onToggle={(v) =>
              setSelectedCategories((prev) =>
                prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
              )
            }
            onClear={() => setSelectedCategories([])}
          />
          <FilterGroup
            label="Technologies"
            options={allTags}
            selected={selectedTags}
            onToggle={(v) =>
              setSelectedTags((prev) =>
                prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
              )
            }
            onClear={() => setSelectedTags([])}
          />
          {selectedCategories.length || selectedTags.length ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedTags([]);
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        <TooltipProvider delayDuration={200}>
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06 },
              },
            }}
          >
            {filtered.map((project) => (
              <m.div
                key={project.slug}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
              <Card
                className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-2"
              >
                {project.image && (
                  <Link to={`/uiux/${project.slug}`} aria-label={`Open ${project.title} details`}>
                    <MediaBanner
                      src={project.image}
                      alt={project.title}
                      fallbackText="Project Promo"
                    />
                  </Link>
                )}

                <CardHeader>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`/uiux/${project.slug}`} className="hover:underline">
                        <CardTitle
                          className="text-xl clamp-2 md:truncate break-words"
                          title={project.title}
                        >
                          {project.title}
                        </CardTitle>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start">
                      {project.title}
                    </TooltipContent>
                  </Tooltip>
                  <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getCategory(project)}
                    </Badge>
                  </div>
                  <ExpandableTags
                    tags={project.tags}
                    variant="secondary"
                    size="sm"
                    maxVisible={3}
                  />

                  {(project.github || project.demo || project.uiMock) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {project.github && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button asChild size="sm" className="w-full">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Opens GitHub</TooltipContent>
                        </Tooltip>
                      )}
                      {project.demo && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {(project.isLive ?? /\blive|prod|production\b/i.test(project.demo)) ? 'Live' : 'Demo'}
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {(project.isLive ?? /\blive|prod|production\b/i.test(project.demo)) ? 'Opens Live' : 'Opens Demo'}
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {project.uiMock && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button asChild size="sm" className="w-full" variant="ghost">
                              <a href={project.uiMock} target="_blank" rel="noopener noreferrer">
                                {/^https?:\/\/[^\s]*figma\.com\//i.test(project.uiMock) ? (
                                  <Figma className="h-4 w-4 mr-2" />
                                ) : /lovable\.app/i.test(project.uiMock) ? (
                                  <MonitorSmartphone className="h-4 w-4 mr-2" />
                                ) : (
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                )}
                                UI Mock
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {/^https?:\/\/[^\s]*figma\.com\//i.test(project.uiMock) ? "Opens in Figma" : /lovable\.app/i.test(project.uiMock) ? "Opens in Lovable" : "Opens link"}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  )}
                  {/* Share button for project deep link */}
                  <div className="pt-2">
                    <ShareButton
                      title={project.title}
                      text={project.description}
                      shareType="project"
                      slug={`uiux/${project.slug}`}
                      size="sm"
                      variant="outline"
                    />
                  </div>
                </CardContent>
              </Card>
              </m.div>
            ))}
          </m.div>
        </TooltipProvider>
      </div>
    </section>
  );
}
