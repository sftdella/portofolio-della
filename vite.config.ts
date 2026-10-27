import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Chunk generator PDF (@react-pdf/renderer, ±1,3 MB) hanya dimuat saat tombol
    // "Download portfolio PDF" diklik, jadi tidak membebani halaman awal.
    chunkSizeWarningLimit: 1400,
  },
})
