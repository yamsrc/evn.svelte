import { derived } from 'svelte/store'
import { dictionaries } from './built.js'
import { locale, type Locale } from '$lib/intl'
import type { Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locale }
export type { Locale, Dictionary }
