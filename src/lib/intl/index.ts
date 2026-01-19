import { derived } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import { account } from '@/iam'
import type { Locale, Dictionary } from './types'
import { value } from 'svas'
import { defaultLocale } from '$config'
import { supported, resolveLocale } from './bcp'
import Negotiator from 'negotiator'

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
  if ($selected && $account?.locale === undefined) return resolveLocale($selected)

  if ($account?.locale !== undefined && supported($account?.locale))
    return resolveLocale($account.locale)
  else
    return preferred() ?? defaultLocale
})

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
export type { Locale, Translation, Plural, Dictionary }

export * from './bcp'
