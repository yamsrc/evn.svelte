import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  text: Retriever
  label?: string
  oncopy?: () => void
}

export type Retriever = (() => Promise<string>) | string
