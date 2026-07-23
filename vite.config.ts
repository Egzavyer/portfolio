import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
            },
            {
              name: "visualization-vendor",
              test: /node_modules[\\/](d3-delaunay|delaunator)[\\/]/,
              priority: 20,
            },
            {
              name: "i18n-vendor",
              test: /node_modules[\\/](i18next|react-i18next)[\\/]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
  plugins: [
    svgr(),
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
