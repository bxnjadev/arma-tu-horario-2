import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      'numerous-trinity-tables-comfortable.trycloudflare.com',
      '.trycloudflare.com',
      'https://ron-fat-midlands-kruger.trycloudflare.com'
    ]
  }
})