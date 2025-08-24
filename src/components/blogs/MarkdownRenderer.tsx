import React, { lazy, Suspense } from "react";
import { useTheme } from "../ThemeProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeSlug from "rehype-slug";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import markdownLang from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MermaidRenderer = lazy(() => import("./MermaidRenderer"));

function MermaidPlaceholder() {
  return (
    <div className="my-4 p-4 rounded border border-border bg-muted/40" style={{ minHeight: 200 }}>
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading diagram...</p>
      </div>
    </div>
  );
}

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdownLang);

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const { theme } = useTheme();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective]}
      rehypePlugins={[
        rehypeSlug,
      ]}
        components={{
          h1({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
            // Demote H1 in markdown to H2 to keep a single page H1
            return (
              <h2 className="mt-10 border-b pb-2 text-2xl font-semibold tracking-tight" {...props}>
                {children}
              </h2>
            );
          },
          code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children: React.ReactNode; [key: string]: unknown }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline) {
              const language = match ? match[1] : "text";
              if (language === "mermaid") {
                return (
                  <Suspense fallback={<MermaidPlaceholder />}>
                    <MermaidRenderer chart={String(children)} />
                  </Suspense>
                );
              }
              return (
                <SyntaxHighlighter
                  PreTag="div"
                  language={language}
                  style={oneDark}
                  wrapLongLines
                  showLineNumbers
                  customStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--muted))",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
            return (
              <code
                className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
  blockquote({ children }: { children: React.ReactNode }) {
          // Support callout syntax like > [!NOTE] Your content...
          let label: string | null = null;
          let updatedChildren: React.ReactNode = children;
          const firstChild = Array.isArray(children) ? children[0] : children;
          if (React.isValidElement(firstChild)) {
            const inner = (firstChild.props as { children?: React.ReactNode }).children;
            const flat = Array.isArray(inner) ? inner.join("") : inner;
            if (typeof flat === "string") {
              const m = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|INFO)\]\s*/i.exec(flat);
              if (m) {
                label = m[1].toUpperCase();
                const replaced = flat.replace(m[0], "").trimStart();
                const newFirst = React.cloneElement(firstChild, {}, replaced);
                const rest = Array.isArray(children) ? children.slice(1) : [];
                updatedChildren = [newFirst, ...rest];
              }
            }
          }
          const base = "rounded-md border px-4 py-3";
          const variant = label === "TIP"
            ? "bg-primary/5 border-primary/30"
            : label === "IMPORTANT" || label === "WARNING"
            ? "bg-destructive/10 border-destructive/30"
            : "bg-muted/40 border-border";
          return (
            <div role="note" className={`${base} ${variant}`}>
              {label && (
                <div className="mb-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
                  {label}
                </div>
              )}
              <div className="text-muted-foreground [&_p]:m-0 [&_p+_*]:mt-2">
                {updatedChildren}
              </div>
            </div>
          );
        },
        table({ children }) {
          return (
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border-b border-border bg-muted/30 px-3 py-2 text-left font-semibold">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border-b border-border px-3 py-2 align-top">
              {children}
            </td>
          );
        },
        img({ src = "", alt = "", ...props }) {
          return (
            <img
              src={src}
              alt={alt || "blog image"}
              loading="lazy"
              decoding="async"
              className="my-4 rounded-md border bg-muted"
              {...props}
            />
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}