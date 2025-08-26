import fm from "front-matter";

export interface ProjectMeta {
  title: string;
  date: string; // ISO
  summary: string;
  category?: string;
  tags: string[];
  promoImage?: string; // public path
  github?: string;
  demo?: string;
  uiMock?: string;
  figma?: string;
  lovable?: string;
  isLive?: boolean;
}

export interface ProjectItem {
  slug: string;
  meta: ProjectMeta;
  body: string;
}

// Load all markdown files under src/content/projects/uiux
const files = import.meta.glob("../content/projects/uiux/**/*.md", {
  as: "raw",
  eager: true,
});

function toSlug(path: string) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.md$/, "");
}

type ProjectFrontmatter = Partial<
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
    | "Demo"
    | "demo"
    | "UiMock"
    | "uiMock"
    | "Live"
    | "live"
    | "Environment"
    | "environment"
    | "figma"
    | "lovable"
    | "UiMock - Figma"
    | "UiMock - Lovable",
    unknown
  >
>;

export function getAllProjects(): ProjectItem[] {
  const items: ProjectItem[] = Object.entries(files).map(([path, raw]) => {
    const parsed = fm<ProjectFrontmatter>(raw as string);
    const data: ProjectFrontmatter = parsed.attributes || {};
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

    const meta: ProjectMeta = {
      title: data.Title || data.title || toSlug(path),
      date: data.Date || data.date || new Date().toISOString(),
      summary: data.Summary || data.summary || "",
      category: data.Category || data.category || undefined,
      tags: (data.Tags as string[] | undefined) || (data.tags as string[] | undefined) || [],
      promoImage:
        data["Promo Image"] ||
        data.promoImage ||
        data.promo ||
        (data["PromoImage"] as string | undefined) ||
        undefined,
      github: data.GitHub || data.Github || data.github || undefined,
      demo: data.Demo || data.demo || undefined,
      uiMock:
        data["UiMock - Lovable"] ||
        data["UiMock - Figma"] ||
        data.UiMock ||
        data.uiMock ||
        undefined,
      figma:
        data.figma ||
        data["UiMock-Figma"] ||
        data["UiMock_Figma"] ||
        data["UiMock - Figma"] ||
        data["UiMock_FIGMA"] ||
        undefined,
      lovable:
        data.lovable ||
        data["UiMock-Lovable"] ||
        data["UiMock_Lovable"] ||
        data["UiMock - Lovable"] ||
        data["UiMock_LOVABLE"] ||
        undefined,
      isLive: coerceLive(data.Live) ?? coerceLive(data.live) ?? coerceLive(data.Environment) ?? coerceLive(data.environment),
    } as ProjectMeta;

    return {
      slug: toSlug(path),
      meta,
      body: content.trim(),
    } as ProjectItem;
  });

  return items.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getAllProjects().find((i) => i.slug === slug);
}
