import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import mdx from "@mdx-js/rollup";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx(),
    react(),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'recharts': ['recharts'],
          'mermaid': ['mermaid'],
          'react-markdown': [
            'react-markdown',
            'rehype-autolink-headings',
            'rehype-slug',
            'remark-directive',
            'remark-gfm',
            'react-syntax-highlighter'
          ],
          'react-query': ['@tanstack/react-query'],
          'reactflow': ['reactflow'],
          'ui-components': [
            'embla-carousel-react',
            'cmdk',
            'sonner',
            'vaul',
          ],
        },
      },
    },
    // No rollupOptions.input needed for SPA; Vite will use index.html by default
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
}));
