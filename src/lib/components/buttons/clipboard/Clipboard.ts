import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  text: string | (() => Promise<string>)
  labeled?: boolean
  oncopy?: () => void
}
