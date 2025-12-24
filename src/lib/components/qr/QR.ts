import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  data: string
  label?: string | null
  onshare?: () => void
}

export { default as QR } from './QR.svelte'
