import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssImport,
        postcssNested
      ]
    }
  },
  plugins: [react()]
});
