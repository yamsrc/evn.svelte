import { writable } from 'svelte/store'
import type { net } from '@/expenses/svc'

export const draft = writable<net.Editable>({
  title: '',
  location: '',
  participants: {},
  extras: [],
})
