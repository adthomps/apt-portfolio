import fm from "front-matter";

export interface CodingMeta {
  title: string;
  date: string; // ISO
  summary: string;
  category?: string;
  tags: string[];
  promoImage?: string; // public path
  github?: string;
  demo?: string;
  uiMock?: string;
  status?: string;
  isLive?: boolean;
}

export interface CodingItem {
  slug: string;
  meta: CodingMeta;
  body: string;
}

// Load all markdown files under src/content/coding
const files = import.meta.glob("../content/coding/**/*.md", {
  as: "raw",
  eager: true,
});

function toSlug(path: string) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.md$/, "");
}

type CodingFrontmatter = Partial<
  Record<
    | "Title"
    | "title"
    | "Date"
    | "date"
    | "Summary"
    | "summary"
    | "Category"
    | "category"
    | "Tags"
    | "tags"
    | "Promo Image"
    | "promoImage"
    | "promo"
    | "GitHub"
    | "Github"
    | "github"
    | "LiveDemo"
    | "Demo"
    | "demo"
    | "UiMock"
    | "uiMock"
    | "Status"
    | "status"
    | "Live"
    | "live"
    | "Environment"
    | "environment",
    unknown
  >
>;

export function getAllCodingProjects(): CodingItem[] {
  const items: CodingItem[] = Object.entries(files).map(([path, raw]) => {
    const parsed = fm<CodingFrontmatter>(raw as string);
    const data: CodingFrontmatter = parsed.attributes || {};
    const content: string = parsed.body || "";

    const coerceLive = (v: unknown): boolean | undefined => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'string') {
        const s = v.trim().toLowerCase();
        if (s === 'true' || s === '1' || s === 'live' || s === 'production' || s === 'prod') return true;
        if (s === 'false' || s === '0' || s === 'dev' || s === 'development' || s === 'staging') return false;
      }
      return undefined;
    };

    const meta: CodingMeta = {
      title: data.Title || data.title || toSlug(path),
      date: data.Date || data.date || new Date().toISOString(),
      summary: data.Summary || data.summary || "",
      category: data.Category || data.category || undefined,
      tags: (data.Tags as string[] | undefined) || (data.tags as string[] | undefined) || [],
      promoImage: data["Promo Image"] || data.promoImage || data.promo || undefined,
      github: data.GitHub || data.Github || data.github || undefined,
      demo: data.LiveDemo || data.Demo || data.demo || undefined,
      uiMock: data.UiMock || data.uiMock || undefined,
      status: data.Status || data.status || undefined,
      isLive: coerceLive(data.Live) ?? coerceLive(data.live) ?? coerceLive(data.Environment) ?? coerceLive(data.environment),
    } as CodingMeta;

    return {
      slug: toSlug(path),
      meta,
      body: content.trim(),
    } as CodingItem;
  });

  return items.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getCodingProjectBySlug(slug: string): CodingItem | undefined {
  return getAllCodingProjects().find((i) => i.slug === slug);
}
