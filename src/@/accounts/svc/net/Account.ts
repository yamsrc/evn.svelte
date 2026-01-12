export interface Account {
  id: string
  name: string
  picture: string
  locale?: string
  overlord?: string | null
  _created: number
  _version: number
}
