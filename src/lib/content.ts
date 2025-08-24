import fm from "front-matter";

export type ContentType = "blog" | "podcast" | "guide";

export interface ContentMeta {
  title: string;
  type: ContentType;
  date: string; // ISO string
  /** Optional content status override: scheduled|published|archived */
  status?: "scheduled" | "published" | "archived";
  summary: string;
  promoImage?: string; // public path
  heroImage?: string; // public path
  subjectTags?: string[];
  audienceTags?: string[];
  wordLength?: string;
  readTime?: string; // e.g., "15 minutes" or "8 min read"
  duration?: string; // for podcasts e.g., "25 min"
  audioUrl?: string;
  videoUrl?: string;
  guideUrl?: string; // external guide link if provided
  relatedPodcastSlug?: string;
  relatedBlogSlug?: string;
  relatedGuideSlug?: string;
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  body: string; // markdown body
}

// Load all markdown files under src/content/blogs-podcasts/blogs and src/content/blogs-podcasts/podcasts
// We import as raw strings and parse frontmatter with front-matter
const files = import.meta.glob([
  "../content/blogs-podcasts/blogs/**/*.md",
  "../content/blogs-podcasts/podcasts/**/*.md",
  "../content/blogs-podcasts/guides/**/*.md"
], {
  as: "raw",
  eager: true,
});

function toSlug(path: string) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.md$/, "");
}

function pickString(data: Record<string, unknown>, keys: string[], fallback?: string): string | undefined {
  for (const k of keys) {
    const v = data[k];
    if (typeof v === "string") {
      const s = v.trim();
      if (s) return s;
    }
  }
  return fallback;
}

function pickStringArray(data: Record<string, unknown>, keys: string[]): string[] | undefined {
  for (const k of keys) {
    const v = data[k];
    if (Array.isArray(v)) {
      const arr = v.filter((x) => typeof x === "string").map((x) => (x as string).trim()).filter(Boolean) as string[];
      if (arr.length) return arr;
    }
  }
  return undefined;
}

function pickDate(data: Record<string, unknown>, keys: string[], fallback?: string): string | undefined {
  for (const k of keys) {
    const v = data[k] as unknown;
    if (typeof v === "string") {
      const s = v.trim();
      if (s) return s;
    }
    if (v instanceof Date) {
      const t = v.getTime();
      if (!isNaN(t)) return new Date(t).toISOString();
    }
    if (typeof v === "number") {
      const d = new Date(v);
      const t = d.getTime();
      if (!isNaN(t)) return d.toISOString();
    }
  }
  return fallback;
}

function pickStatus(data: Record<string, unknown>, keys: string[]): "scheduled" | "published" | "archived" | undefined {
  for (const k of keys) {
    const v = data[k];
    if (typeof v === "string") {
      const s = v.trim().toLowerCase();
      if (s === "scheduled" || s === "published" || s === "archived") return s;
    }
  }
  return undefined;
}

export function getAllContent(): ContentItem[] {
  const items: ContentItem[] = Object.entries(files).map(([path, raw]) => {
    const parsed = fm<Record<string, unknown>>(raw as string);
    const data = (parsed.attributes || {}) as Record<string, unknown>;
    const content = (parsed.body || "");

    const meta: ContentMeta = {
      title: pickString(data, ["Title", "title"], toSlug(path))!,
      type: (pickString(data, ["Type", "type"], "blog") || "blog").toLowerCase() as ContentType,
      date: pickDate(data, ["Date", "date"], new Date().toISOString())!,
      status: pickStatus(data, ["Status", "status"]) || undefined,
      summary: pickString(data, ["Summary", "summary"], "")!,
      promoImage: pickString(data, ["Promo Image", "promoImage", "promo"]) || undefined,
      heroImage: pickString(data, ["Hero Image", "heroImage"]) || undefined,
      subjectTags: pickStringArray(data, ["Subject Tags", "subjectTags"]) || [],
      audienceTags: pickStringArray(data, ["Audience Tags", "audienceTags"]) || [],
      wordLength: pickString(data, ["Word Length", "wordLength"]) || undefined,
      readTime: pickString(data, ["Read Time", "readTime"]) || undefined,
      duration: pickString(data, ["Duration", "duration"]) || undefined,
      audioUrl: pickString(data, ["AudioUrl", "audioUrl"]) || undefined,
      videoUrl: pickString(data, ["VideoUrl", "videoUrl"]) || undefined,
      guideUrl: pickString(data, ["GuideUrl", "guideUrl"]) || undefined,
      relatedPodcastSlug: pickString(data, ["RelatedPodcastSlug", "relatedPodcastSlug"]) || undefined,
      relatedBlogSlug: pickString(data, ["RelatedBlogSlug", "relatedBlogSlug"]) || undefined,
      relatedGuideSlug: pickString(data, ["RelatedGuideSlug", "relatedGuideSlug"]) || undefined,
    };

    const body = (content as string).trim();
    if (!meta.readTime && body) {
      const words = body.split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.round(words / 200));
      meta.readTime = `${minutes} min read`;
    }
    return {
      slug: toSlug(path),
      meta,
      body,
    } as ContentItem;
  });

  // Sort by date desc (safe parse for consistency)
  const parseDateSafe = (raw: string): number => {
    const trimmed = (raw || "").trim();
    if (!trimmed) return NaN;
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return Date.parse(trimmed + "T00:00:00Z");
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(trimmed)) return Date.parse(trimmed + "Z");
    const t = Date.parse(trimmed);
    return isNaN(t) ? NaN : t;
  };
  return items.sort((a, b) => parseDateSafe(b.meta.date) - parseDateSafe(a.meta.date));
}

export function getContentBySlug(slug: string): ContentItem | undefined {
  return getAllContent().find((i) => i.slug === slug);
}