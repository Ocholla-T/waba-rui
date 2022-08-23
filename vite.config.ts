import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/components/utils"),
      "@components": path.resolve(__dirname, "./src/components"),

      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
