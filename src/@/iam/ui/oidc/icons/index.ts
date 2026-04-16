import Google from './Google.svelte'
import Apple from './Apple.svelte'
import type { Component } from 'svelte'
import type { oidc } from '@/iam'

const icons: Record<oidc.IDP, Component> = {
  google: Google,
  apple: Apple,
} as const

export { icons }
