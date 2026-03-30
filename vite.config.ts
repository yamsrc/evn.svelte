import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import transformLucideImports from 'vite-plugin-transform-lucide-imports'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), transformLucideImports()],
  test: { include: ['src/**/*.test.ts'] },
})
