import React, { useEffect, useMemo, useState } from "react";

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

function parseSitemap(xmlText: string): UrlEntry[] {
  const doc = new window.DOMParser().parseFromString(xmlText, "application/xml");
  const urls = Array.from(doc.getElementsByTagName("url"));
  return urls.map((u) => ({
    loc: u.getElementsByTagName("loc")[0]?.textContent || "",
    lastmod: u.getElementsByTagName("lastmod")[0]?.textContent || undefined,
    changefreq: u.getElementsByTagName("changefreq")[0]?.textContent || undefined,
    priority: u.getElementsByTagName("priority")[0]?.textContent || undefined,
  })).filter((u) => !!u.loc);
}

export default function SitemapPage() {
  const [entries, setEntries] = useState<UrlEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/sitemap.xml", { headers: { "accept": "application/xml,text/xml" } });
        if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
        const text = await res.text();
        if (!cancelled) setEntries(parseSitemap(text));
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(message || "Failed to load sitemap");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const groups = useMemo(() => {
    const by: Record<string, UrlEntry[]> = { Home: [], Profile: [], Blogs: [], Podcasts: [], Guides: [], Other: [] };
    for (const e of entries) {
      const url = e.loc;
      if (/\/$/.test(url) || /\/index?$/.test(url)) by.Home.push(e);
      else if (/\/profile\/?$/.test(url)) by.Profile.push(e);
      else if (/\/blog\//.test(url)) by.Blogs.push(e);
      else if (/\/podcast\//.test(url)) by.Podcasts.push(e);
      else if (/\/guide\//.test(url)) by.Guides.push(e);
      else by.Other.push(e);
    }
    return by;
  }, [entries]);

  if (loading) return <div className="container mx-auto p-6">Loading sitemap…</div>;
  if (error) return <div className="container mx-auto p-6 text-red-600">{error}</div>;

  const renderGroup = (title: string, items: UrlEntry[]) => (
    <div key={title} className="space-y-2">
      <h2 className="text-xl font-semibold">{title} ({items.length})</h2>
      <ul className="space-y-1 list-disc pl-6">
        {items.map((e) => (
          <li key={e.loc}>
            <a className="text-primary hover:underline" href={new URL(e.loc).pathname}>{e.loc}</a>
            {e.lastmod && <span className="ml-2 text-sm text-muted-foreground">lastmod: {new Date(e.lastmod).toLocaleDateString()}</span>}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Site Map</h1>
        <p className="text-muted-foreground">A human-friendly view of the generated sitemap.xml.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderGroup("Home", groups.Home)}
        {renderGroup("Profile", groups.Profile)}
        {renderGroup("Blogs", groups.Blogs)}
        {renderGroup("Podcasts", groups.Podcasts)}
        {renderGroup("Guides", groups.Guides)}
        {renderGroup("Other", groups.Other)}
      </div>
      <div className="pt-4">
        <a className="text-sm text-primary hover:underline" href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Open raw sitemap.xml</a>
      </div>
    </div>
  );
}
