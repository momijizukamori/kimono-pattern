import { defineConfig } from 'vite'

export default defineConfig({
  base: '/kimono-pattern/',
  test: {
    environment: 'jsdom'
  }
})