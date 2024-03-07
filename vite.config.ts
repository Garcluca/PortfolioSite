import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { glslify } from "vite-plugin-glslify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify()],
  base:'https://garcluca.github.io/PortfolioSite/',
  assetsInclude: ["**/*.glb"],
});
