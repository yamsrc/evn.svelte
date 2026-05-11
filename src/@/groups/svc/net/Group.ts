export interface Group {
  id: string
  name: string
  picture?: string
  identities: string[]
  reduction?: boolean
  _created: number
  _version: number
}
