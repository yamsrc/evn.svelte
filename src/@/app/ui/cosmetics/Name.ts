export interface Props {
  name: string
  busy: boolean
  class?: string
  onchange?: (value: string) => void
}
