import { collection, values } from 'svas'
import { account } from '@/iam'
import { get } from './get'
import type { Group } from './net'

export const groups = collection<Group>({
  get,
  persist: 'groups',
  bind: account,
  stale: true,
  values: values<Group>(),
})
