import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Forçar rebuild completo sem cache
    emptyOutDir: true,
    // Desabilitar cache completamente
    cache: false,
    rollupOptions: {
      output: {
        // Hash único baseado em timestamp para forçar atualização
        entryFileNames: `assets/[name]-${Date.now()}-[hash].js`,
        chunkFileNames: `assets/[name]-${Date.now()}-[hash].js`,
        assetFileNames: `assets/[name]-${Date.now()}-[hash].[ext]`
      }
    }
  },
  // Desabilitar cache do Vite
  server: {
    force: true
  }
})
