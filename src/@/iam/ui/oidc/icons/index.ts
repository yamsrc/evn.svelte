import Apple from './Apple.svelte'
import Google from './Google.svelte'
import type { IDP } from '@/iam'
import type { Component } from 'svelte'

const icons: Record<IDP, Component> = {
  google: Google,
  apple: Apple,
} as const

export { icons }
