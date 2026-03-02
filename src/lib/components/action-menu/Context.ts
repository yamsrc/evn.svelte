export interface Context {
  get opened(): boolean
  open: () => void
  close: () => void
  get id(): string
  setContentRef: (el: HTMLDivElement | undefined) => void
  setTriggerRef: (el: HTMLDivElement | undefined) => void
}

let current: Context | undefined

export const getContext = () => current!
export const setContext = (ctx: Context) => (current = ctx)
