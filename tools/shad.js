#!/usr/bin/env node

import { spawn } from 'child_process'

spawn('npx', ['shadcn-svelte@next', 'add', ...process.argv.slice(2)], {
  stdio: 'inherit',
})
