export interface Props {
  id?: string
  value?: number
  placeholder?: string
  class?: string
  inputClass?: string
  oninput?: (value: number) => void
}
