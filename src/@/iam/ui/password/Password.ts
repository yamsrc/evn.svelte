export interface Props {
  ref?: HTMLElement | null
  mode?: 'password' | 'otp'
  password?: string
  otp?: string
  error?: boolean
}
