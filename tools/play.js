#!/usr/bin/env node

/**
 * Run bddgen and then playwright.
 */

import { spawn } from 'child_process'

const args = process.argv.slice(2)

const bddged = spawn('npx', ['bddgen'], { stdio: 'inherit' })

bddged.on('close', (code) => {
  if (code !== 0)
    process.exit(code)

  const playwright = spawn('npx', ['playwright', 'test', ...args], { stdio: 'inherit' })

  playwright.on('close', (code) => {
    process.exit(code || 0)
  })
})
