import { defineConfig } from 'vitest/config'
import transformLucideImports from 'vite-plugin-transform-lucide-imports'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), transformLucideImports()],
  test: { include: ['src/**/*.test.ts'] },
  server: {
    proxy: {
      '/assets': {
        target: 'https://res.cloudinary.com/dl5z4zgth/image/upload/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets\/?/, '').replace(/^([\w_,]+\/)?(.*)$/, '$1v1775485895/$2'),
      },
    },
  },
})
