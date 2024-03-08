import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { glslify } from "vite-plugin-glslify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify()],
  base:'/PortfolioSite/',
  assetsInclude: ["**/*.glb",'**/*.gltf',
    '**/*.glb',
    '**/*.fbx',
    '**/*.obj',
    '**/*.mtl',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',],



  build: {
    minify: false, // Disable minification
    cssCodeSplit: false, 
    assetsInlineLimit: 0,
    

  }
});
