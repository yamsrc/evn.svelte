import type { Domain, Event } from '@/transmission'

export type Props<D extends Domain = Domain> = {
  domain: D
  event?: Event<D>
  key: string
}
