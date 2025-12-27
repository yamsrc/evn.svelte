export interface Props {
  value?: string
  class?: string
  onsubmit?: (value: string) => Promise<string | undefined> | string | undefined
}
