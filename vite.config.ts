import { defineConfig } from 'vitest/config'
import transformLucideImports from 'vite-plugin-transform-lucide-imports'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), transformLucideImports()],
  test: { include: ['src/**/*.test.ts'] },
})
