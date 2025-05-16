import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  publicDir: 'public',
  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [["@babel/plugin-proposal-decorators", { "version": "2023-11" }]]
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true
  },
}));