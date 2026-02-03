import { derived } from 'svelte/store'
import { locale } from '$lib/intl'
import { dictionaries } from './built.js'
import type { Dictionary } from './types'
import type { Locale } from '$lib/intl'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries, locale }
export type { Locale, Dictionary }
