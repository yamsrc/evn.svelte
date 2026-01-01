import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  id?: string
  data: ShareData | Retriever
  label?: string | null
  onshare?: () => void
}

export type Retriever = () => ShareData | null | Promise<ShareData | null>

export { default as Share } from './Share.svelte'
