import { search } from '$lib/tools'
import type { Group } from '@/groups'

export function filter(groups: Group[], query?: string): Group[] {
  return search(groups, query, (group) => group.name)
}
