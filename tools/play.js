#!/usr/bin/env node

/**
 * Run bddgen and then playwright.
 */

import { spawn } from 'child_process'

const args = process.argv.slice(2)

// Parse --slow-mo argument (supports both --slow-mo=500 and --slow-mo 500)
let slowMo = null
const filteredArgs = []

for (let i = 0; i < args.length; i++) {
  const arg = args[i]

  if (arg.startsWith('--slow-mo='))
    slowMo = arg.split('=')[1]
  else if (arg === '--slow-mo')
    slowMo = args[++i]
  else
    filteredArgs.push(arg)
}

const env = slowMo ? { ...process.env, PLAYWRIGHT_SLOW_MO: slowMo } : process.env

const bddged = spawn('npx', ['bddgen'], { stdio: 'inherit' })

bddged.on('close', (code) => {
  if (code !== 0)
    process.exit(code)

  const playwright = spawn('npx', ['playwright', 'test', ...filteredArgs], {
    stdio: 'inherit',
    env,
  })

  playwright.on('close', (code) => {
    process.exit(code || 0)
  })
})
