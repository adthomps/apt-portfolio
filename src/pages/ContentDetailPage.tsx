import { CommentButtonModal } from "@/components/blogs/CommentButtonModal";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/blogs/MarkdownRenderer";
import { getContentBySlug } from "@/lib/content";
import { AudioPlayer } from "@/components/blogs/AudioPlayer";
import { MediaBanner } from "@/components/shared/MediaBanner";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ShareButton } from "@/components/shared/ShareButton";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "@/components/shared/SEO";

export function ContentDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [slugState, setSlug] = useState(() => typeof window !== "undefined" ? sessionStorage.getItem("selectedContentSlug") || "" : "");
  useEffect(() => {
    const handler = () => {
      setSlug(typeof window !== "undefined" ? sessionStorage.getItem("selectedContentSlug") || "" : "");
    };
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);
  useEffect(() => {
    const handler = () => {
      setSlug(typeof window !== "undefined" ? sessionStorage.getItem("selectedContentSlug") || "" : "");
    };
    window.addEventListener("slugchange", handler);
    return () => window.removeEventListener("slugchange", handler);
  }, []);
  const item = useMemo(() => (slug ? getContentBySlug(slug) : undefined), [slug]);

  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // SEO handled by <SEO /> below

  useEffect(() => {
    if (!slug) return;
    try {
      const raw = localStorage.getItem(`like:${slug}`);
      if (raw) {
        const obj = JSON.parse(raw);
        setLiked(!!obj.liked);
        setLikes(typeof obj.likes === "number" ? obj.likes : 0);
      }
    } catch {
      // no-op
    }
  }, [slug]);


  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20">
          <p className="text-muted-foreground mb-6">Content not found.</p>
          <Button onClick={() => navigate(-1)}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const backToList = () => {
    navigate(-1);
  };

  const stripLeadingTitle = (md: string, title: string) => {
    if (!md) return md;
    const lines = md.trimStart().split("\n");
    let i = 0;
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i < lines.length) {
      const first = lines[i].trim();
      if (/^#{1,2}\s+/.test(first)) {
        const headingText = first.replace(/^#{1,2}\s+/, "").trim();
        if (headingText.toLowerCase().includes(title.toLowerCase())) {
          lines.splice(i, 1);
          if (i < lines.length && lines[i].trim() === "") lines.splice(i, 1);
        }
      }
    }
    return lines.join("\n");
  };

  const bodyToRender = stripLeadingTitle(item.body, item.meta.title);
  const formattedDate = new Date(item.meta.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (item.meta.videoUrl) {
    console.log('Rendering video player with URL:', item.meta.videoUrl);
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${item.meta.title} | ${item.meta.type === 'podcast' ? 'Podcast' : item.meta.type === 'guide' ? 'Guide' : 'Blog'}`}
        description={item.meta.summary}
        og={{
          type: item.meta.type === 'podcast' ? 'podcast' : 'article',
          image: item.meta.heroImage || item.meta.promoImage,
          siteName: 'APT Portfolio'
        }}
        twitter={{ card: (item.meta.heroImage || item.meta.promoImage) ? 'summary_large_image' : 'summary' }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": item.meta.type === 'podcast' ? 'PodcastEpisode' : 'Article',
          ...(item.meta.type === 'podcast' ? { name: item.meta.title } : { headline: item.meta.title }),
          datePublished: item.meta.date,
          description: item.meta.summary,
          image: item.meta.heroImage || item.meta.promoImage,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
          ...(item.meta.type === 'podcast' && item.meta.audioUrl ? { associatedMedia: { "@type": "AudioObject", contentUrl: item.meta.audioUrl } } : {})
        }}
      />
      <header className="w-full bg-background">
        {item.meta.heroImage && (
          <div className="container mx-auto px-6 pt-6">
            <MediaBanner
              src={item.meta.heroImage}
              sizes="100vw"
              alt={`${item.meta.title} hero image`}
              className="rounded-md border max-h-[450px] w-full object-contain"
            />
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{item.meta.title}</h1>
          <Button variant="outline" onClick={backToList}>Back</Button>
        </div>

        <section className="rounded-lg border bg-card p-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Badge variant="secondary" className="capitalize">{item.meta.type}</Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {item.meta.guideUrl && (
              <a href={item.meta.guideUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                View Complete Guide
              </a>
            )}
          </div>
          {(item.meta.subjectTags?.length || item.meta.audienceTags?.length) ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.meta.subjectTags?.map((t) => (
                <Badge key={`s-${t}`} variant="outline">{t}</Badge>
              ))}
              {item.meta.audienceTags?.map((t) => (
                <Badge key={`a-${t}`} variant="outline">{t}</Badge>
              ))}
            </div>
          ) : null}
          {/* Related content link */}
          {item.meta.relatedPodcastSlug && item.meta.relatedPodcastSlug.trim() !== "" && (
            <div className="mt-4">
              <Button variant="secondary" onClick={() => navigate(`/podcast/${item.meta.relatedPodcastSlug}`)}>
                🎙️ Listen to the follow-up podcast
              </Button>
            </div>
          )}
          {item.meta.relatedBlogSlug && item.meta.relatedBlogSlug.trim() !== "" && (
            <div className="mt-4">
              <Button variant="secondary" onClick={() => navigate(`/blog/${item.meta.relatedBlogSlug}`)}>
                📖 Read the related blog post
              </Button>
            </div>
          )}
          {item.meta.relatedGuideSlug && item.meta.relatedGuideSlug.trim() !== "" && (
            <div className="mt-4">
              <Button variant="secondary" onClick={() => navigate(`/guide/${item.meta.relatedGuideSlug}`)}>
                📚 View the step-by-step guide
              </Button>
            </div>
          )}
        </section>

        {item.meta.type === "podcast" && item.meta.audioUrl && (
          <>
            <AudioPlayer audioUrl={item.meta.audioUrl} title={item.meta.title} />
            {item.meta.videoUrl && (
              <div className="mt-4">
                <video
                  controls
                  className="w-full rounded-md border bg-muted"
                  style={{ maxHeight: 400 }}
                  onError={e => {
                    const target = e.target as HTMLVideoElement;
                    console.error('Video error:', {
                      src: target.currentSrc,
                      error: target.error
                    });
                  }}
                  onPlay={e => {
                    const target = e.target as HTMLVideoElement;
                    console.log('Video play:', target.currentSrc);
                  }}
                  onLoadedData={e => {
                    const target = e.target as HTMLVideoElement;
                    console.log('Video loaded:', target.currentSrc);
                  }}
                >
                  <source src={item.meta.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag or the video format.
                </video>
              </div>
            )}
          </>
        )}

        <article className="md-content">
          <MarkdownRenderer markdown={bodyToRender} />
        </article>

        <section className="border-t pt-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                <b>Note on AI:</b> To explore ideas and accelerate my workflow, I use AI tools like OpenAI, Gemini, and NotebookLM for brainstorming, writing assistance, and generating audio/video content.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {(item.meta.type === "blog" || item.meta.type === "podcast" || item.meta.type === "guide") && (
              <ShareButton label="Share" title={item.meta.title} text={item.meta.summary} shareType={item.meta.type} slug={slug} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}