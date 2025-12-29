export interface Props {
  value?: Value
  onchange?: (value: Value) => void | Promise<void>
}

export interface Value {
  name: string
  picture: string
}
