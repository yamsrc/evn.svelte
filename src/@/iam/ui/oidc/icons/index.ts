import Apple from './Apple.svelte'
import Google from './Google.svelte'
import type { oidc } from '@/iam'
import type { Component } from 'svelte'

const icons: Record<oidc.IDP, Component> = {
  google: Google,
  apple: Apple,
} as const

export { icons }
