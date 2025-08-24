import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Headphones, FileText, Activity, Clock, Archive } from "lucide-react";
import { getAllContent, ContentItem } from "@/lib/content";
import { getStatusBucket, parseDateSafe } from "@/lib/dateStatus";
// import { AudioPlayer } from "./AudioPlayer";
import { TagGroups } from "./TagGroups";
import { ShareButton } from "../shared/ShareButton";
import { FilterGroup } from "../shared/FilterGroup";
import { MediaBanner } from "../shared/MediaBanner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CommentButtonModal } from "./CommentButtonModal";
export function BlogSection() {
  const navigate = useNavigate();
  // Modal state
  const [likeModalSlug, setLikeModalSlug] = useState<string | null>(null);
  // Like and comment state (frontend only)
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (slug: string) => {
    setLikes((prev) => ({ ...prev, [slug]: (prev[slug] || 0) + 1 }));
  };

  const all = useMemo(() => getAllContent(), []);

  // Status helper imported; respects frontmatter override and configurable window
  const getStatus = (iso: string, override?: ContentItem["meta"]["status"]) => getStatusBucket(iso, override);

  const [selectedCategory, setSelectedCategory] = useState<"All" | "Blog" | "Podcast">("All");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

  const allSubjectTags = useMemo(() =>
    Array.from(new Set(all.flatMap((i) => i.meta.subjectTags || []))).sort(),
    [all]
  );
  const allAudienceTags = useMemo(() =>
    Array.from(new Set(all.flatMap((i) => i.meta.audienceTags || []))).sort(),
    [all]
  );

  const filtered: ContentItem[] = useMemo(() => {
    const filtered = all.filter((i) => {
      const catOk =
        selectedCategory === "All" || i.meta.type.toLowerCase() === selectedCategory.toLowerCase();
      const subjOk =
        selectedSubjects.length === 0 || selectedSubjects.some((t) => (i.meta.subjectTags || []).includes(t));
      const audOk =
        selectedAudience.length === 0 || selectedAudience.some((t) => (i.meta.audienceTags || []).includes(t));
      return catOk && subjOk && audOk;
    });
    // Enhanced sort: group by status, then sort by date descending within each group
  // Sort all posts by date descending (most recent first), regardless of type or status
  return filtered.sort((a, b) => parseDateSafe(b.meta.date) - parseDateSafe(a.meta.date));
  }, [all, selectedCategory, selectedSubjects, selectedAudience]);

  const handleOpenDetail = (slug: string, type: string) => {
    if (type === "blog") {
      navigate(`/blog/${slug}`);
    } else if (type === "podcast") {
      navigate(`/podcast/${slug}`);
    } else if (type === "guide") {
      navigate(`/guide/${slug}`);
    } else {
      navigate(`/blog/${slug}`);
    }
  };

  // Group posts by status
  const recentPosts = filtered.filter(post => getStatus(post.meta.date, post.meta.status) === "Recent");
  const scheduledPosts = filtered
    .filter(post => getStatus(post.meta.date, post.meta.status) === "Scheduled")
    .sort((a, b) => parseDateSafe(a.meta.date) - parseDateSafe(b.meta.date));
  const archivedPosts = filtered.filter(post => getStatus(post.meta.date, post.meta.status) === "Archived");

  return (
    <section id="blog" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blogs & Podcasts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on development, photography, and the intersection of technology and creativity
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto mt-4">
            <b>Note on AI:</b> To explore ideas and accelerate my workflow, I use AI tools like OpenAI, Gemini, and NotebookLM for brainstorming, writing assistance, and generating audio/video content.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex gap-2">
            {...(["All", "Blog", "Podcast"] as const).map((category) => (
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
            label="Subject Tags"
            options={allSubjectTags}
            selected={selectedSubjects}
            onToggle={(tag) => setSelectedSubjects((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
            onClear={() => setSelectedSubjects([])}
          />
          <FilterGroup
            label="Audience Tags"
            options={allAudienceTags}
            selected={selectedAudience}
            onToggle={(tag) => setSelectedAudience((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
            onClear={() => setSelectedAudience([])}
          />

          {(selectedSubjects.length > 0 || selectedAudience.length > 0 || selectedCategory !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSubjects([]);
                setSelectedAudience([]);
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Recent/Published */}
        {recentPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-foreground">Recent / Published</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => {
                const status = getStatus(post.meta.date);
                const statusVariant = status === "Recent" ? "default" : status === "Scheduled" ? "secondary" : "outline";
                return (
                  <Card key={post.slug} className="hover:shadow-glow transition-all duration-300 h-full flex flex-col overflow-hidden">
                    {post.meta.promoImage && (
                      <MediaBanner src={post.meta.promoImage} alt={`${post.meta.title} promo image`} />
                    )}
                    <div className="flex flex-col flex-1">
                      <CardHeader className="pb-3 flex-shrink-0">
                        <div className="mb-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {post.meta.type}
                          </Badge>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg mb-0 font-semibold leading-tight line-clamp-2">
                            {post.meta.title}
                          </CardTitle>
                          <Badge variant={statusVariant} className="shrink-0 text-[10px] uppercase tracking-wide">
                            <Activity className="h-3 w-3 mr-1" />
                            {status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.meta.summary}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* No audio/video player in podcast cards; only in detail/content view */}
                          <div className="flex items-center justify-start text-sm text-muted-foreground">
                            <span>
                              {new Date(post.meta.date).toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {(post.meta.subjectTags || post.meta.audienceTags) && (
                            <TagGroups
                              subjectTags={post.meta.subjectTags || []}
                              audienceTags={post.meta.audienceTags || []}
                            />
                          )}
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOpenDetail(post.slug, post.meta.type)}
                          >
                            {post.meta.type === "podcast" ? (
                              <>
                                <Headphones className="h-3 w-3 mr-2" />
                                Listen & View
                              </>
                            ) : post.meta.type === "guide" ? (
                              <>
                                <FileText className="h-3 w-3 mr-2" />
                                View Guide
                              </>
                            ) : (
                              <>
                                <FileText className="h-3 w-3 mr-2" />
                                Read More
                              </>
                            )}
                          </Button>
                          {["blog", "podcast", "guide"].includes(post.meta.type) && (
                            <ShareButton title={post.meta.title} text={post.meta.summary} shareType={post.meta.type} slug={post.slug} className="flex-1" size="sm" variant="outline" />
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Scheduled */}
        {scheduledPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-foreground">Scheduled</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheduledPosts.map((post) => {
                const status = getStatus(post.meta.date);
                const statusVariant = "secondary";
                return (
                  <Card key={post.slug} className="hover:shadow-glow transition-all duration-300 h-full flex flex-col overflow-hidden">
                    {post.meta.promoImage && (
                      <MediaBanner src={post.meta.promoImage} alt={`${post.meta.title} promo image`} />
                    )}
                    <div className="flex flex-col flex-1">
                      <CardHeader className="pb-3 flex-shrink-0">
                        <div className="mb-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {post.meta.type}
                          </Badge>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg mb-0 font-semibold leading-tight line-clamp-2">
                            {post.meta.title}
                          </CardTitle>
                          <Badge variant={statusVariant} className="shrink-0 text-[10px] uppercase tracking-wide">
                            <Clock className="h-3 w-3 mr-1" />
                            {status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.meta.summary}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* No audio/video player in podcast cards; only in detail/content view */}
                          <div className="flex items-center justify-start text-sm text-muted-foreground">
                            <span>
                              {new Date(post.meta.date).toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {(post.meta.subjectTags || post.meta.audienceTags) && (
                            <TagGroups
                              subjectTags={post.meta.subjectTags || []}
                              audienceTags={post.meta.audienceTags || []}
                            />
                          )}
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOpenDetail(post.slug, post.meta.type)}
                          >
                            {post.meta.type === "podcast" ? (
                              <>
                                <Headphones className="h-3 w-3 mr-2" />
                                Listen & View
                              </>
                            ) : (
                              <>
                                <FileText className="h-3 w-3 mr-2" />
                                Read More
                              </>
                            )}
                          </Button>
                          {(post.meta.type === "blog" || post.meta.type === "podcast" || post.meta.type === "guide") && (
                            <ShareButton title={post.meta.title} text={post.meta.summary} shareType={post.meta.type} slug={post.slug} className="flex-1" size="sm" variant="outline" />
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Archived */}
        {archivedPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-foreground">Archived</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedPosts.map((post) => {
                const status = getStatus(post.meta.date);
                const statusVariant = "outline";
                return (
                  <Card key={post.slug} className="hover:shadow-glow transition-all duration-300 h-full flex flex-col overflow-hidden">
                    {post.meta.promoImage && (
                      <MediaBanner src={post.meta.promoImage} alt={`${post.meta.title} promo image`} />
                    )}
                    <div className="flex flex-col flex-1">
                      <CardHeader className="pb-3 flex-shrink-0">
                        <div className="mb-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {post.meta.type}
                          </Badge>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg mb-0 font-semibold leading-tight line-clamp-2">
                            {post.meta.title}
                          </CardTitle>
                          <Badge variant={statusVariant} className="shrink-0 text-[10px] uppercase tracking-wide">
                            <Archive className="h-3 w-3 mr-1" />
                            {status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.meta.summary}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* No audio/video player in podcast cards; only in detail/content view */}
                          <div className="flex items-center justify-start text-sm text-muted-foreground">
                            <span>
                              {new Date(post.meta.date).toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {(post.meta.subjectTags || post.meta.audienceTags) && (
                            <TagGroups
                              subjectTags={post.meta.subjectTags || []}
                              audienceTags={post.meta.audienceTags || []}
                            />
                          )}
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOpenDetail(post.slug, post.meta.type)}
                          >
                            {post.meta.type === "podcast" ? (
                              <>
                                <Headphones className="h-3 w-3 mr-2" />
                                Listen & View
                              </>
                            ) : (
                              <>
                                <FileText className="h-3 w-3 mr-2" />
                                Read More
                              </>
                            )}
                          </Button>
                          {(post.meta.type === "blog" || post.meta.type === "podcast" || post.meta.type === "guide") && (
                            <ShareButton title={post.meta.title} text={post.meta.summary} shareType={post.meta.type} slug={post.slug} className="flex-1" size="sm" variant="outline" />
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found matching your filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSubjects([]);
                setSelectedAudience([]);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}