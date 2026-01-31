import type { Locale } from '$lib/intl'

export interface Props {
  onselect?: (locale: Locale) => void
}
