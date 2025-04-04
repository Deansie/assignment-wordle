import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/": "http://localhost:5081"
    }
  },
  build: {
    outDir: '../backend/ssr-dist',
    lib: {
      entry: {
        Highscores: './src/pages/Highscores/Highscores.tsx',
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});