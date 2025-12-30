export interface Props {
  value?: string
  note?: string
  submit?: string
  class?: string
  onsubmit?: (value: string) => Promise<string | undefined> | string | undefined
}
