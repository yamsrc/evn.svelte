export interface Entry {
  id: string
  value: number
  name?: string
  href?: string
}

export interface Props {
  entries: Entry[]
  absolute?: boolean
  top?: number
}
