import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@components': resolve(__dirname, 'src/components'),
      '@sections': resolve(__dirname, 'src/sections'),
      '@base44/sdk/dist/utils/axios-client': resolve(__dirname, 'src/mocks/base44-axios-client.js'),
      '@base44/sdk': resolve(__dirname, 'src/mocks/base44-sdk.js'),
    }
  }
});
