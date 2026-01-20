export interface Props {
  value?: number
  placeholder?: string
  sign?: 'positive' | 'negative' | 'none'
  class?: string
  inputClass?: string
  oninput?: (value: number) => void
  id?: string
}
