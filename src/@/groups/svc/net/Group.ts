export interface Group {
  id: string
  name: string
  identities: string[]
  reduction?: boolean
  _created: number
  _version: number
}
