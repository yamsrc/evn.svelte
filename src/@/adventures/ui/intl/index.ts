import { derived } from 'svelte/store'
import { locale } from '$lib/intl'
import { dictionaries } from './built.js'
import type { Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])

export { dict, dictionaries }
export type { Dictionary }
