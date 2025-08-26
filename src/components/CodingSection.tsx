import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpandableTags } from "@/components/ui/expandable-tags";
import { Github, ExternalLink, Figma, MonitorSmartphone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FilterGroup } from "@/components/shared/FilterGroup";
import { ShareButton } from "@/components/shared/ShareButton";
import { MediaBanner } from "@/components/shared/MediaBanner";
import { getAllCodingProjects } from "@/lib/coding";
import { Link } from "react-router-dom";
import { m } from "motion/react";


export function CodingSection() {

  const allProjects = React.useMemo(() => getAllCodingProjects().map((p) => {
    // Robustly read GitHub and LiveDemo fields, fallback for missing
    const github = p.meta.github?.trim() || undefined;
    const demo = p.meta.demo?.trim() || undefined;
    return {
      slug: p.slug,
      title: p.meta.title,
      description: p.meta.summary,
      tags: p.meta.tags || [],
      github,
      demo,
      image: p.meta.promoImage,
      category: p.meta.category || "General",
      status: p.meta.status || "",
      isLive: p.meta.isLive,
    };
  }), []);


  const categories = React.useMemo(() => {
    const s = new Set<string>();
    allProjects.forEach((p) => s.add(p.category));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [allProjects]);
  const allTags = React.useMemo(() => {
    const s = new Set<string>();
    allProjects.forEach((p) => p.tags?.forEach((t: string) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [allProjects]);
  const allStatuses = React.useMemo(() => {
    const s = new Set<string>();
    allProjects.forEach((p) => { if (p.status) s.add(p.status); });
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [allProjects]);


  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  const toggleCategory = (value: string) =>
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  const toggleTag = (value: string) => setSelectedTags((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  const toggleStatus = (value: string) => setSelectedStatuses((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedStatuses([]);
  };

  const filtered = React.useMemo(() => {
    return allProjects.filter((p) => {
      const categoryOk = selectedCategories.length ? selectedCategories.includes(p.category) : true;
      const tagsOk = selectedTags.length ? selectedTags.every((t) => p.tags?.includes(t)) : true;
      const statusOk = selectedStatuses.length ? selectedStatuses.includes(p.status) : true;
      return categoryOk && tagsOk && statusOk;
    });
  }, [allProjects, selectedCategories, selectedTags, selectedStatuses]);


  return (
    <section id="coding" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Coding Projects"
          subtitle="Exploring the intersection of traditional development and artificial intelligence"
        />

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <FilterGroup
            label="Categories"
            options={categories}
            selected={selectedCategories}
            onToggle={toggleCategory}
            onClear={() => setSelectedCategories([])}
          />
          <FilterGroup
            label="Technologies"
            options={allTags}
            selected={selectedTags}
            onToggle={toggleTag}
            onClear={() => setSelectedTags([])}
          />
          <FilterGroup
            label="Status"
            options={allStatuses}
            selected={selectedStatuses}
            onToggle={toggleStatus}
            onClear={() => setSelectedStatuses([])}
          />
          {(selectedCategories.length || selectedTags.length || selectedStatuses.length) ? (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          ) : null}
        </div>

        <TooltipProvider delayDuration={200}>
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
          >
            {filtered.map((project) => (
              <m.div
                key={project.slug}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
              <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 h-full">
                  <Link to={`/code/${project.slug}`} aria-label={`Open ${project.title} details`}>
                    <MediaBanner
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fallbackText={project.image ? "Coding Promo" : "No image available"}
                    />
                  </Link>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link to={`/code/${project.slug}`} className="hover:underline">
                              <CardTitle className="text-lg clamp-2 md:truncate break-words" title={project.title}>
                                {project.title}
                              </CardTitle>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="start">{project.title}</TooltipContent>
                        </Tooltip>
                        {project.status && (
                          <Badge
                            variant={
                              project.status === "Pilot" ? "default"
                              : project.status === "POC" ? "destructive"
                              : project.status === "On-Hold" ? "secondary"
                              : project.status === "Active" ? "default"
                              : "outline"
                            }
                            className="text-xs"
                            title="Status"
                          >
                            {project.status}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{project.category} Project</Badge>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Technologies</h5>
                      <ExpandableTags tags={project.tags} variant="outline" size="sm" maxVisible={3} />
                    </div>

                    {(project.github || project.demo) && (
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        {project.github && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full rounded-md flex items-center justify-center font-medium text-base border-2"
                                aria-label="Open GitHub source"
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-5 w-5 mr-2" />
                                  Source
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
                                variant="default"
                                size="lg"
                                className="w-full rounded-md flex items-center justify-center font-medium text-base"
                                aria-label="Open Live Demo"
                              >
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-5 w-5 mr-2" />
                                  {(project.isLive ?? /\blive|prod|production\b/i.test(project.demo)) ? 'Live' : 'Demo'}
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {(project.isLive ?? /\blive|prod|production\b/i.test(project.demo)) ? 'Opens Live' : 'Opens Demo'}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    )}
                    {/* Optional share button for coding projects */}
                    <div className="pt-2">
                      <ShareButton
                        title={project.title}
                        text={project.description}
                        shareType="project"
                        slug={`code/${project.slug}`}
                        size="sm"
                        variant="outline"
                      />
                    </div>
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
