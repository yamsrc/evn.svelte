import type { ClassValue } from 'svelte/elements'

export interface Props {
  attachments: string[]
  path?: string
  editable?: boolean
  class?: ClassValue
}
