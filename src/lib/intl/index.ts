import { derived, writable } from 'svelte/store'
import { dictionaries, locales } from './built.js'
import type { Locale, Dictionary } from './types'

const locale = writable<Locale>('en-US')
const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locales, locale }
export type { Locale, Dictionary }
