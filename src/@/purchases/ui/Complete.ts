import type { CTA } from './store'

export interface Props {
  cta: CTA | null
  next: () => void
}
