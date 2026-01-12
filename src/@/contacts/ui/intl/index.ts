import { derived } from 'svelte/store'
import { locale } from '$lib/intl'
import { dictionaries, locales } from './built.js'
import type { Locale, Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, locale }
export type { Locale, Dictionary }
