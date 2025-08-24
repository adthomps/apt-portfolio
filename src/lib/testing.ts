import fm from "front-matter";

export interface TestLinkMeta {
  name: string;
  description?: string;
  type?: "production" | "sandbox" | "interactive" | string;
  url?: string; // external fallback
  route?: string; // internal onNavigate route key
}

export interface TestingMeta {
  title: string;
  date: string; // ISO
  summary: string;
  category?: string;
  status?: string;
  technologies: string[];
  environments: string[];
  features?: string[];
  goals?: string[];
  testingDetails?: string;
  promoImage?: string;
  diagram?: string;
  tags?: string[];
  testLinks?: TestLinkMeta[];
}

export interface TestingItem {
  slug: string;
  meta: TestingMeta;
  body: string;
}

// Load all markdown files under src/content/testing
const files = import.meta.glob("../content/testing/**/*.md", {
  as: "raw",
  eager: true,
});

function toSlug(path: string) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.md$/, "");
}

type TestingFrontmatter = Partial<
  Record<
    | "Title"
    | "title"
    | "Date"
    | "date"
    | "Summary"
    | "summary"
    | "Category"
    | "category"
    | "Status"
    | "status"
    | "Technologies"
    | "technologies"
    | "Environments"
    | "environments"
    | "Features"
    | "features"
    | "Goals"
    | "goals"
    | "Testing Details"
    | "testingDetails"
    | "Promo Image"
    | "promoImage"
    | "promo"
    | "Diagram"
    | "diagram"
    | "Tags"
    | "tags"
    | "Test Links"
    | "testLinks",
    unknown
  >
>;

type TestLinkInput =
  | TestLinkMeta
  | { Title?: string; title?: string; name?: string; description?: string; type?: TestLinkMeta["type"]; url?: string; route?: string };

function coerceTestLink(t: TestLinkInput): TestLinkMeta {
  const name = ("name" in t && t.name) || ("Title" in t && t.Title) || ("title" in t && t.title) || "";
  const description = "description" in t ? t.description : undefined;
  const type = "type" in t ? t.type : undefined;
  const url = "url" in t ? t.url : undefined;
  const route = "route" in t ? t.route : undefined;
  return { name, description, type, url, route };
}

export function getAllTestingProjects(): TestingItem[] {
  const items: TestingItem[] = Object.entries(files).map(([path, raw]) => {
    const parsed = fm<TestingFrontmatter>(raw as string);
    const data: TestingFrontmatter = parsed.attributes || {};
    const content: string = parsed.body || "";

    const meta: TestingMeta = {
      title: data.Title || data.title || toSlug(path),
      date: data.Date || data.date || new Date().toISOString(),
      summary: data.Summary || data.summary || "",
      category: data.Category || data.category || undefined,
      status: data.Status || data.status || "Active",
  technologies: (data.Technologies as string[] | undefined) || (data.technologies as string[] | undefined) || [],
  environments: (data.Environments as string[] | undefined) || (data.environments as string[] | undefined) || [],
  features: (data.Features as string[] | undefined) || (data.features as string[] | undefined) || [],
  goals: (data.Goals as string[] | undefined) || (data.goals as string[] | undefined) || [],
      testingDetails: data["Testing Details"] || data.testingDetails || undefined,
      promoImage: data["Promo Image"] || data.promoImage || data.promo || undefined,
      diagram: data.Diagram || data.diagram || undefined,
      tags: (data.Tags as string[] | undefined) || (data.tags as string[] | undefined) || [],
      testLinks: ((data["Test Links"] as TestLinkInput[] | undefined) || (data.testLinks as TestLinkInput[] | undefined) || []).map(coerceTestLink),
    } as TestingMeta;

    return {
      slug: toSlug(path),
      meta,
      body: content.trim(),
    } as TestingItem;
  });

  return items.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getTestingProjectBySlug(slug: string): TestingItem | undefined {
  return getAllTestingProjects().find((i) => i.slug === slug);
}
