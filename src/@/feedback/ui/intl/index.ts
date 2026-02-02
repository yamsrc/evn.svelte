import { locale } from '$lib/intl'
import { derived } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import type { Dictionary } from './types'
import type { Locale } from '$lib/intl'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, locale }
export type { Locale, Dictionary }
