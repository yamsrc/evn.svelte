export interface Props {
  id?: string
  amount?: number
  prefix?: string
  sign?: 'positive' | 'negative' | 'neutral' | 'highlight'
  /** @default true */
  absolute?: boolean
  class?: string
}
