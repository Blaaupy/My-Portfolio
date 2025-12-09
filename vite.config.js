// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/portfolio-2/', // ← Ajoutez cette ligne
  plugins: [
    react(),
    svgr()
  ],
  build: {
    outDir: 'dist'
  }
});   