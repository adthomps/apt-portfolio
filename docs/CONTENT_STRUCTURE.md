# Project Content & Media Structure

Recommended organization without breaking existing paths. New assets should go to `/public/media/**`.

Public media (served as static files):
- /public/media/
  - blogs-podcasts/
  - photography/
    - stills/
    - drone/
    - video/
  - projects/
    - uiux/
  - coding/
  - testing/

Content (markdown, structured data):
- /src/content/
  - blogs-podcasts/        (existing)
  - projects/uiux/         (existing)
  - coding/                (content-driven)
  - photography/{stills,video,drone}/ (optional)
  - testing/               (content-driven)

Notes:
- We did not move existing assets to avoid breaking references.
- Future additions should follow the new structure.
- Image paths should be absolute, e.g., `/media/projects/uiux/card-thumb.jpg`.
- Keep filenames kebab-case; prefer WebP/JPG; <=200KB when possible.

## Blogs & Podcasts content

Front matter (YAML) fields for each markdown file under `src/content/blogs-podcasts/`:
- Title: string (required)
- Type: "blog" | "podcast" (required)
- Date: ISO string (required)
- Summary: short description (required)
- Promo Image: absolute path under `/media/blogs-podcasts/...` (recommended)
- Hero Image: absolute path under `/media/blogs-podcasts/...` (recommended)
- Subject Tags: array of strings (optional)
- Audience Tags: array of strings (optional)
- Duration: string like "32 min" (podcast only)
- AudioUrl: absolute media path to audio file (podcast only)
- GuideUrl: external link to companion guide (podcast optional)
- Read Time: string like "6 min read" (optional; auto-computed if omitted)

Tips:
- Use absolute paths starting with `/media/...` for all images and audio.
- Omit Read Time to let the system compute it from word count.
