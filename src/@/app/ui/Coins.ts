export interface Props {
  id?: string
  amount?: number
  prefix?: string
  sign?: 'positive' | 'negative' | 'neutral' | 'highlight'
  class?: string
}
