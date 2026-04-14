import { collection, values } from 'svas'
import { account } from '@/iam'
import { get } from './get'
import type * as net from './net'

export const templates = collection<Template>({
  get,
  persist: 'templates',
  bind: account,
  stale: true,
  values: values<net.Template>(),
})

export type Template = net.Template
