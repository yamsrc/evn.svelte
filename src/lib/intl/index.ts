import { derived } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import { account } from '@/iam'
import { value } from 'svas'
import { defaultLocale } from '$config'
import { supported, resolveLocale } from './bcp'
import Negotiator from 'negotiator'
import type { Locale, Dictionary, Grammar } from './types'

type Translation<T = string> = Record<Locale, T>

interface PluralForms {
  other: string
  zero?: string
  one?: string
  two?: string
  few?: string
  many?: string
}

type Plural = Translation<PluralForms>

const selected = value<Locale | undefined>({
  persist: 'intl:selected',
})

const locale = derived([account, selected], ([$account, $selected]) => {
  if ($selected) return resolveLocale($selected)

  const system = preferred()
  if (system) return system

  if ($account?.locale !== undefined && supported($account.locale))
    return resolveLocale($account.locale)

  return defaultLocale
})

export const grammar = derived(account, ($account) => $account?.grammar ?? 'none')

function preferred(): Locale | null {
  for (const lang of navigator.languages) {
    if (supported(lang)) return resolveLocale(lang)
  }

  return null
}

export function acceptable(header: string | null): Locale {
  if (header === null)
    return defaultLocale

  const negotiator = new Negotiator({ headers: { 'accept-language': header } })
  const languages = negotiator.languages(locales) as Locale[]

  return languages[0] ?? defaultLocale
}

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, selected, locale }
export type { Locale, Translation, Plural, Dictionary, Grammar }

export * from './bcp'
