// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(),
    react()
  ],
  // --- LA SOLUTION : un `base` conditionnel ---
  base: process.env.NODE_ENV === 'production' ? '/portfolio-2/' : '/',
  build: {
    outDir: 'dist'
  }
});