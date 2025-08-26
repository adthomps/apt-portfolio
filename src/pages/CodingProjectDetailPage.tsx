import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/shared/SEO";
import { getCodingProjectBySlug } from "@/lib/coding";
import { MediaBanner } from "@/components/shared/MediaBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Figma, MonitorSmartphone, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExpandableTags } from "@/components/ui/expandable-tags";
import { ShareButton } from "@/components/shared/ShareButton";

export default function CodingProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = slug ? getCodingProjectBySlug(slug) : undefined;

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-20">
          <p className="text-muted-foreground mb-6">Project not found.</p>
          <Button onClick={() => navigate('/#coding')}>Back to Coding</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(item.meta.date).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });

  const isLive = item.meta.isLive ?? /\blive|prod|production\b/i.test(item.meta.demo || "");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${item.meta.title} | Coding Project`}
        description={item.meta.summary}
        og={{ type: 'article', image: item.meta.promoImage, siteName: 'APT Portfolio' }}
        twitter={{ card: item.meta.promoImage ? 'summary_large_image' : 'summary' }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: item.meta.title,
          datePublished: item.meta.date,
          description: item.meta.summary,
          image: item.meta.promoImage,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        }}
      />
      <Navigation />
      <header className="w-full bg-background">
        {item.meta.promoImage && (
          <div className="container mx-auto px-6 pt-6">
            <MediaBanner src={item.meta.promoImage} alt={`${item.meta.title} promo image`} sizes="100vw" className="rounded-md border max-h-[450px] w-full object-contain" />
          </div>
        )}
      </header>
      <TooltipProvider>
        <main className="container mx-auto px-6 py-10 max-w-5xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="link" asChild>
                <a href="/#coding">Back to Coding</a>
              </Button>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-3xl font-bold">{item.meta.title}</h1>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          </div>

          <Card>
            <CardContent className="py-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
                {item.meta.category && <Badge variant="secondary" className="ml-2">{item.meta.category}</Badge>}
                {item.meta.status && <Badge variant="outline" className="ml-2">{item.meta.status}</Badge>}
              </div>
              {(item.meta.tags?.length ?? 0) > 0 && (
                <ExpandableTags tags={item.meta.tags} variant="outline" size="sm" maxVisible={6} />
              )}
              <p className="leading-relaxed text-foreground/90">{item.meta.summary}</p>

              {(item.meta.github || item.meta.demo || item.meta.uiMock) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.meta.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button asChild variant="outline" className="w-full">
                          <a href={item.meta.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" /> Code
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Opens GitHub</TooltipContent>
                    </Tooltip>
                  )}
                  {item.meta.demo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button asChild className="w-full">
                          <a href={item.meta.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> {isLive ? 'Live' : 'Demo'}
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isLive ? 'Opens Live' : 'Opens Demo'}</TooltipContent>
                    </Tooltip>
                  )}
                  {item.meta.uiMock && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button asChild variant="ghost" className="w-full">
                          <a href={item.meta.uiMock} target="_blank" rel="noopener noreferrer">
                            {/^https?:\/\/[^\s]*figma\.com\//i.test(item.meta.uiMock) ? (
                              <Figma className="h-4 w-4 mr-2" />
                            ) : /lovable\.app/i.test(item.meta.uiMock) ? (
                              <MonitorSmartphone className="h-4 w-4 mr-2" />
                            ) : (
                              <ExternalLink className="h-4 w-4 mr-2" />
                            )}
                            UI Mock
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {/figma\.com/i.test(item.meta.uiMock) ? 'Opens in Figma' : /lovable\.app/i.test(item.meta.uiMock) ? 'Opens in Lovable' : 'Opens link'}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}

              <ShareButton title={item.meta.title} text={item.meta.summary} shareType="project" slug={`code/${item.slug}`} />
            </CardContent>
          </Card>
        </main>
      </TooltipProvider>
      <Footer />
    </div>
  );
}
