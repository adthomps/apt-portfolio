**Prompt:**

Reformat the following markdown file to match the structure and style of the provided blog template:

- Use YAML frontmatter at the top for metadata:  
  `Title`, `Type`, `Date`, `Summary`, `Promo Image`, `Hero Image`, `Subject Tags`, `Audience Tags`, `Read Time`
- Start with a top-level heading (`#`) for the blog title.
- Use blockquotes with `[!NOTE]`, `[!TIP]`, `[!WARNING]` for callouts.
- Include code blocks with proper language annotation.
- Add tables with headers and clear formatting.
- Include images with descriptive alt text.
- Ensure consistent spacing and blank lines between sections.
- End with a summary or closing statement.

**Example template for reference:**
```markdown
---
Title: Markdown Formatting Demo — Callouts & Code
Type: blog
Date: 2025-08-11T12:00:00-07:00
Summary: A sample post to validate Markdown rendering on the detail page, including callout boxes, syntax-highlighted code blocks, tables, and images.
Promo Image: /media/blogs-podcasts/blog1-hero-a.png
Hero Image: /media/blogs-podcasts/blog1-hero-b.png
Subject Tags:
  - Markdown
  - Docs UX
  - Code Samples
Audience Tags:
  - Developers
  - Technical Writers
Read Time: "6 min"
---

# Markdown Formatting Demo — Callouts & Code

This sample shows how your detail page renders rich Markdown.

> [!NOTE]
> This is a simple note callout using blockquote syntax with the `[!NOTE]` prefix.

## JSON Example

```json
{
  "decision": "approve",
  "score": 0.82,
  "reasons": ["velocity", "geo-distance"],
  "explainability": {
    "features": [{ "name": "amount", "weight": 0.22 }],
    "threshold": 0.78
  }
}
```

> [!TIP]
> Tips render with a subtle primary accent. Use them for best practices or quick wins.

## Table

| Field        | Type   | Description                      |
|--------------|--------|----------------------------------|
| decision     | enum   | approve | review | decline        |
| score        | number | Confidence score 0.0 - 1.0       |
| reasons      | array  | Short reason codes               |
| threshold    | number | Decision threshold used          |

> [!WARNING]
> Important or warning callouts use the destructive token to stand out.

## Image

![Demo image](/media/blogs-podcasts/blog1-hero-a.png)

That’s it — headings, callouts, code, tables, and images are supported.
```

---

Use this template as a guide to reformat other markdown files for consistent blog rendering.