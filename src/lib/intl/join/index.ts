import { derived } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import { locale, type Locale } from '$lib/intl'
import type { Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, locale }
export type { Locale, Dictionary }
