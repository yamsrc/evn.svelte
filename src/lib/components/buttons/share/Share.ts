import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  data: ShareData | Retriever
  label?: string
  onshare?: () => void
}

export type Retriever = () => ShareData | null | Promise<ShareData | null>
