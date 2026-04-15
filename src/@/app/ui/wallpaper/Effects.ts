import { dictionaries, type Dictionary } from '$lib/intl'
import type { ClassValue } from 'svelte/elements'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'id'> {
  class?: ClassValue
}

export type Effect = (keyof Dictionary['wallpapers']['effects'])

export const effects = Object.keys(dictionaries['en-US'].wallpapers.effects) as Effect[]
