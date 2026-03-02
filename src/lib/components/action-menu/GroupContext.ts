import { getContext as svelteGetContext, setContext as svelteSetContext } from 'svelte'

const KEY = Symbol('action-menu-group')

export interface GroupContext {
  get direction(): 'col' | 'row'
}

export function setGroupContext(ctx: GroupContext) {
  svelteSetContext(KEY, ctx)
}

export function getGroupContext(): GroupContext | undefined {
  return svelteGetContext<GroupContext | undefined>(KEY)
}
