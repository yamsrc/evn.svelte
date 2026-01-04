import { derived, writable } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import { locale } from '$lib/intl'
import type { Locale, Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, locale }
export type { Locale, Dictionary }
