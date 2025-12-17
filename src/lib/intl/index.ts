import { derived } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import { account } from '@/iam'
import type { Locale, Dictionary } from './types'
import { value } from 'svas'
import { DefaultLocale } from '$config'
import { supported, resolveLocale } from './bcp'

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
  if ($selected && $account?.language === undefined) return resolveLocale($selected)

  if ($account?.language !== undefined && supported($account?.language))
    return resolveLocale($account.language)
  else
    return preferred() ?? DefaultLocale
})

function preferred(): Locale | null {
  for (const lang of navigator.languages) {
    if (supported(lang)) return resolveLocale(lang)
  }

  return null
}

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, selected, locale }
export type { Locale, Translation, Plural, Dictionary }

export * from './bcp'
