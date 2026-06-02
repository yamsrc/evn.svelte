export interface Props {
  class?: string
  total?: number
  balance?: number
  labeled?: boolean
  absolute?: boolean
  totalLabel?: string
  youOwe?: string
  youAreOwed?: string
  sign?: 'positive' | 'negative' | 'neutral'
}
