#!/usr/bin/env node
// Generate sitemap.xml into public/
// Requires: SITE_URL env var (e.g., https://yourdomain.com)

const fs = require('fs');
const path = require('path');
try {
  require('dotenv').config();
} catch (e) {
  console.warn('[sitemap] dotenv not found; attempting to read .env manually');
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const txt = fs.readFileSync(envPath, 'utf8');
      for (const rawLine of txt.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const idx = line.indexOf('=');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        // Strip surrounding quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = val;
        }
      }
      console.log('[sitemap] .env loaded via manual parser');
    }
  } catch (err) {
    console.warn('[sitemap] Failed to parse .env manually:', err.message);
  }
}

// Attempt to load TS content loader by using compiled paths from src via Vite's glob is not available in Node.
// Instead, read content folder manually and create slugs from filenames.

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blogs-podcasts');

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').trim();
if (!SITE_URL) {
  console.error('ERROR: SITE_URL is not set. Set it in .env or environment before running sitemap generation.');
  process.exit(1);
}

function walk(dir) {
  const res = [];
  if (!fs.existsSync(dir)) return res;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) res.push(...walk(p));
    else if (e.isFile() && p.endsWith('.md')) res.push(p);
  }
  return res;
}

function toSlug(filePath) {
  return path.basename(filePath, '.md');
}

function buildUrl(kind, slug) {
  return `${SITE_URL.replace(/\/$/, '')}/${kind}/${encodeURIComponent(slug)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function genSitemap(urls) {
  const urlset = urls.map(u => {
    const lastmod = u.lastmod ? `\n    <lastmod>${xmlEscape(u.lastmod)}</lastmod>` : '';
    const changefreq = `\n    <changefreq>${u.changefreq || 'monthly'}</changefreq>`;
    const priority = `\n    <priority>${u.priority || '0.6'}</priority>`;
    return `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urlset +
    `\n</urlset>\n`;
}

function main() {
  const urls = [];
  // Static routes
  urls.push({ loc: `${SITE_URL.replace(/\/$/, '')}/`, changefreq: 'weekly', priority: '1.0' });
  urls.push({ loc: `${SITE_URL.replace(/\/$/, '')}/profile`, changefreq: 'monthly', priority: '0.5' });

  // Content routes from files
  const blogsDir = path.join(CONTENT_DIR, 'blogs');
  const podcastsDir = path.join(CONTENT_DIR, 'podcasts');
  const guidesDir = path.join(CONTENT_DIR, 'guides');

  const blogFiles = walk(blogsDir);
  const podFiles = walk(podcastsDir);
  const guideFiles = walk(guidesDir);

  const readFrontMatterDate = (filePath) => {
    try {
      const txt = fs.readFileSync(filePath, 'utf8');
      const m = txt.match(/^---[\s\S]*?---/);
      if (!m) return undefined;
      const fm = m[0];
      const dateLine = fm.split(/\r?\n/).find((line) => /^\s*(Date|date)\s*:\s*/.test(line));
      if (!dateLine) return undefined;
      const value = dateLine.split(':').slice(1).join(':').trim();
      // Strip quotes if present
      const val = value.replace(/^['"]|['"]$/g, '');
      const d = new Date(val);
      if (isNaN(d.getTime())) return undefined;
      return d.toISOString();
    } catch {
      return undefined;
    }
  };

  for (const f of blogFiles) {
    urls.push({ loc: buildUrl('blog', toSlug(f)), changefreq: 'monthly', priority: '0.7', lastmod: readFrontMatterDate(f) });
  }
  for (const f of podFiles) {
    urls.push({ loc: buildUrl('podcast', toSlug(f)), changefreq: 'weekly', priority: '0.6', lastmod: readFrontMatterDate(f) });
  }
  for (const f of guideFiles) {
    urls.push({ loc: buildUrl('guide', toSlug(f)), changefreq: 'monthly', priority: '0.6', lastmod: readFrontMatterDate(f) });
  }

  const xml = genSitemap(urls);
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(outPath, xml);
  console.log(`Sitemap generated: ${outPath} with ${urls.length} urls`);

  // Optionally update robots.txt Sitemap URL if file exists
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    try {
      const robots = fs.readFileSync(robotsPath, 'utf8');
      const sitemapLine = `Sitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap.xml`;
      const updated = robots.replace(/Sitemap:\s*.*/i, sitemapLine);
      if (updated !== robots) {
        fs.writeFileSync(robotsPath, updated, 'utf8');
        console.log(`robots.txt updated with sitemap URL: ${sitemapLine}`);
      }
    } catch (e) {
      console.warn('Warning: Failed to update robots.txt:', e.message);
    }
  }
}

main();
