import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "../ThemeProvider";

function MermaidRenderer({ chart }: { chart: string }) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Always use dark mode theme variables for diagrams
    const themeVariables = {
      background: "#0a0f1c",
      primaryColor: "#e0e7ef",
      edgeLabelBackground: "#23293a",
      nodeTextColor: "#e0e7ef",
      labelColor: "#e0e7ef",
      clusterBkg: "#23293a",
      clusterBorder: "#e0e7ef",
  nodeBorder: "#e0e7ef", // keep only one occurrence
      fontFamily: "Inter, ui-sans-serif, system-ui",
      fontSize: "16px",
      lineHeight: "1.2",
      mainBkg: "#0a0f1c",
      nodeBkg: "#23293a",
      edgeColor: "#e0e7ef",
      arrowheadColor: "#e0e7ef",
    };
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables,
      flowchart: {
        curve: "linear",
        htmlLabels: true,
        useMaxWidth: true,
        diagramPadding: 16,
        padding: 12,
      },
    });
    let isMounted = true;
    async function renderMermaid() {
      if (mermaidRef.current) {
        try {
          const { svg } = await mermaid.render("mermaid", chart);
          if (isMounted && mermaidRef.current) {
            // Ensure SVG background matches container
            const svgWithBg = svg.replace(
              /<svg ([^>]+)>/,
              `<svg $1><rect width="100%" height="100%" fill="${themeVariables.background}" x="0" y="0"/>`
            );
            mermaidRef.current.innerHTML = svgWithBg;
          }
        } catch (e) {
          if (isMounted && mermaidRef.current) {
            mermaidRef.current.innerHTML = "<pre>" + chart + "</pre>";
          }
        }
      }
    }
    renderMermaid();
    return () => {
      isMounted = false;
    };
  }, [chart, theme]);

  return (
    <div className="my-4">
      <div
        className={[
          "rounded border border-border",
          theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "bg-[#0a0f1c]"
            : "bg-[#f8fafc]",
          "p-4",
          "overflow-x-auto",
          "max-w-2xl"
        ].join(" ")}
        style={{ minWidth: "320px" }}
      >
        <div
          className={[
            "mermaid",
            "[&>svg]:max-w-full",
            "[&>svg]:h-auto",
            "[&_foreignObject]:overflow-visible"
          ].join(" ")}
          ref={mermaidRef}
        />
      </div>
    </div>
  );
}

export default MermaidRenderer;
