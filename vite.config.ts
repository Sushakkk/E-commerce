import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: "/E-commerce",
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'config': path.resolve(__dirname, 'src/config'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'stores': path.resolve(__dirname, 'src/stores'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'enums': path.resolve(__dirname, 'src/enums'),
      'hooks': path.resolve(__dirname, 'src/hooks')
    }
  }
});
