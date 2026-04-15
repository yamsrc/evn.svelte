import { collection, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { browser } from '$app/environment'
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

if (browser)
  events.on('expenses.templates.sync', (template) => sync(templates, template))
