export type Message =
  | {
    event: string
    data: unknown
  }
  | string
