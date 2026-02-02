import { derived, writable } from 'svelte/store'
import { dictionaries } from './built.js'
import type { Locale } from '$lib/intl'
import type { Dictionary } from './types'

const locale = writable<Locale>('en-US')
const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locale }
export type { Locale, Dictionary }
