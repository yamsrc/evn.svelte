import { get } from '@/groups'
import type { PageLoad } from './$types.js'

export const load: PageLoad = async () => {
  const list = await get()

  if (list instanceof Error || list.length === 0)
    return { group: null }

  return { group: list[Math.floor(Math.random() * list.length)] }
}
