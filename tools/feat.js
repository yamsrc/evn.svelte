#!/usr/bin/env node

import { spawn } from 'child_process'

const args = process.argv.slice(2)
const nameIndex = args.indexOf('--name')
const name = nameIndex !== -1 ? args[nameIndex + 1] : null

// Remove --name and its value from args
const filteredArgs = args.filter((arg, index) => {
  if (arg === '--name')
    return false

  if (nameIndex !== -1 && index === nameIndex + 1)
    return false

  return true
})

// First run bddgen
const bddgen = spawn('npx', ['bddgen'], { stdio: 'inherit' })

bddgen.on('close', (code) => {
  if (code !== 0)
    process.exit(code)

  // Then run playwright test
  const playwrightArgs = ['playwright', 'test']

  // Pass filename arguments directly
  if (filteredArgs.length > 0)
    playwrightArgs.push(...filteredArgs)

  // Add --grep if --name was provided
  if (name)
    playwrightArgs.push('--grep', name)

  const playwright = spawn('npx', playwrightArgs, { stdio: 'inherit' })

  playwright.on('close', (code) => {
    process.exit(code || 0)
  })
})
