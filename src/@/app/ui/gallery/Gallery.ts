import type { ClassValue } from 'svelte/elements'

interface Entry {
  id: string
}

export interface Props {
  picture: string
  /** @default true */
  active?: boolean
  presets: readonly string[]
  upload: (file: File) => Promise<Entry | Error>
  variant: string
  densities?: number[]
  card: ClassValue
  /** @default 'end' */
  placement?: 'start' | 'end'
  /** wrap pick/upload actions (paywall); source is element id for VT morph */
  gate?: (source: string, callback: () => void) => void
  onpick?: (picture: string) => void
}
