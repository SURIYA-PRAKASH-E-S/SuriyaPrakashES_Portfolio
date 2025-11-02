import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Explicitly enable dark mode
      darkMode: 'class',
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes('.css')) {
            return 'assets/style.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})