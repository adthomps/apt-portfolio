import { useEffect } from "react";

export type SEOProps = {
  title?: string;
  description?: string;
  /** Absolute URL for canonical; if omitted, uses window.location.href */
  canonicalUrl?: string;
  /** OpenGraph specific overrides */
  og?: {
    type?: "website" | "article" | "profile" | "video.other" | "music.song" | "podcast";
    image?: string; // absolute or relative path
    siteName?: string;
  };
  /** Twitter card overrides */
  twitter?: {
    card?: "summary" | "summary_large_image" | "player" | "app";
    image?: string; // absolute or relative path
    site?: string; // @handle
    creator?: string; // @handle
  };
  /** Optional JSON-LD object to inject */
  jsonLd?: Record<string, unknown>;
};

function ensureMetaByName(name: string, content: string | undefined | null) {
  if (!content) return;
  let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function ensureMetaByProp(property: string, content: string | undefined | null) {
  if (!content) return;
  let tag = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function ensureLink(rel: string, href: string | undefined | null) {
  if (!href) return;
  let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function toAbsoluteUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    // If already absolute
    const maybe = new URL(url);
    return maybe.href;
  } catch {
    try {
      return new URL(url, window.location.origin).href;
    } catch {
      return undefined;
    }
  }
}

export function SEO({ title, description, canonicalUrl, og, twitter, jsonLd }: SEOProps) {
  // Stabilize JSON-LD dependency
  const jsonLdString = JSON.stringify(jsonLd ?? {});

  useEffect(() => {
    if (title) document.title = title;

    // Description
    if (description) ensureMetaByName("description", description);

    // Canonical
    ensureLink("canonical", canonicalUrl || (typeof window !== "undefined" ? window.location.href : undefined));

    const absOgImage = toAbsoluteUrl(og?.image || twitter?.image);
    const siteName = og?.siteName || "APT Portfolio";

    // OpenGraph tags
    ensureMetaByProp("og:title", title || document.title);
    ensureMetaByProp("og:description", description || "");
    ensureMetaByProp("og:type", og?.type === "podcast" ? "music.song" : (og?.type || "website"));
    ensureMetaByProp("og:url", canonicalUrl || (typeof window !== "undefined" ? window.location.href : ""));
    if (absOgImage) ensureMetaByProp("og:image", absOgImage);
    ensureMetaByProp("og:site_name", siteName);

    // Twitter tags
    ensureMetaByName("twitter:card", twitter?.card || (absOgImage ? "summary_large_image" : "summary"));
    if (twitter?.site) ensureMetaByName("twitter:site", twitter.site);
    if (twitter?.creator) ensureMetaByName("twitter:creator", twitter.creator);
    ensureMetaByName("twitter:title", title || document.title);
    ensureMetaByName("twitter:description", description || "");
    if (absOgImage) ensureMetaByName("twitter:image", absOgImage);

    // JSON-LD
    if (jsonLd) {
      let script = document.getElementById("jsonld-primary") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "jsonld-primary";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = jsonLdString;
    }
  }, [title, description, canonicalUrl, og?.type, og?.image, og?.siteName, twitter?.card, twitter?.image, twitter?.site, twitter?.creator, jsonLd, jsonLdString]);

  return null;
}

export default SEO;
