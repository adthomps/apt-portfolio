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

const projects = rawProjects.map((p) => {
  // Robustly extract figma and lovable links from all possible keys
  const figma = p.meta.figma?.trim()
    || p.meta["UiMock-Figma"]?.trim()
    || p.meta["UiMock_Figma"]?.trim()
    || p.meta["UiMock - Figma"]?.trim()
    || p.meta["UiMock_FIGMA"]?.trim()
    || undefined;
  const lovable = p.meta.lovable?.trim()
    || p.meta["UiMock-Lovable"]?.trim()
    || p.meta["UiMock_Lovable"]?.trim()
    || p.meta["UiMock - Lovable"]?.trim()
    || p.meta["UiMock_LOVABLE"]?.trim()
    || undefined;
  return {
    slug: p.slug,
    title: p.meta.title,
    description: p.meta.summary,
    tags: p.meta.tags || [],
    github: p.meta.github?.trim() || undefined,
    demo: p.meta.demo?.trim() || undefined,
    figma,
    lovable,
    image: p.meta.promoImage,
    isLive: p.meta.isLive,
    // Fallbacks for edge cases
    _rawMeta: p.meta,
  };
});

export function ProjectsSection() {
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const t = p.tags || [];
      if (t.includes("Figma Make")) set.add("Figma Make");
      if (t.includes("Lovable") || t.includes("Lovable Make")) set.add("Lovable");
      if (!t.includes("Figma Make") && !t.includes("Lovable") && !t.includes("Lovable Make")) set.add("General");
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

  // Returns all matching categories for a project (multi-category support)
  const getCategories = (p: (typeof projects)[number]) => {
    const t = p.tags || [];
    const cats: string[] = [];
    if (t.includes("Figma Make")) cats.push("Figma Make");
    if (t.includes("Lovable") || t.includes("Lovable Make")) cats.push("Lovable");
    if (!t.includes("Figma Make") && !t.includes("Lovable") && !t.includes("Lovable Make")) cats.push("General");
    return cats;
  };

  const filtered = React.useMemo(() => {
    return projects.filter((p) => {
      const cats = getCategories(p);
      const catOk = selectedCategories.length
        ? cats.some((cat) => selectedCategories.includes(cat))
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
                <Link to={`/uiux/${project.slug}`} aria-label={`Open ${project.title} details`}>
                  <MediaBanner
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fallbackText={project.image ? "Project Promo" : "No image available"}
                  />
                </Link>

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
                    {getCategories(project).map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <ExpandableTags
                    tags={project.tags}
                    variant="secondary"
                    size="sm"
                    maxVisible={3}
                  />

                  {(project.figma || project._rawMeta?.figma || project.lovable || project._rawMeta?.lovable) && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {/* Show both Figma and Lovable buttons if both are present */}
                      {[{ type: "figma", url: project.figma || project._rawMeta?.figma }, { type: "lovable", url: project.lovable || project._rawMeta?.lovable }]
                        .filter(({ url }) => !!url)
                        .map(({ type, url }) => (
                          <Tooltip key={type}>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant={type === "figma" ? "outline" : "default"}
                                size="lg"
                                className="w-full rounded-md flex items-center justify-center font-medium text-base border-2"
                                aria-label={`Open ${type.charAt(0).toUpperCase() + type.slice(1)} prototype`}
                              >
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                  {type === "figma" ? (
                                    <Figma className="h-5 w-5 mr-2" />
                                  ) : (
                                    <span className="mr-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C10 17.5 2.5 11.25 2.5 7.5C2.5 4.75 4.75 2.5 7.5 2.5C9.16667 2.5 10 4.16667 10 4.16667C10 4.16667 10.8333 2.5 12.5 2.5C15.25 2.5 17.5 4.75 17.5 7.5C17.5 11.25 10 17.5 10 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                  )}
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{`Opens in ${type.charAt(0).toUpperCase() + type.slice(1)}`}</TooltipContent>
                          </Tooltip>
                        ))}
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
