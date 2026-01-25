import { ensure, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function attach(files: File[], id?: string): Promise<string[] | Error> {
  const me = ensure(account)

  const ids = await Promise.all(files.map((file) => id === undefined ? create(me.id, file) : update(me.id, file, id)))
  const err = ids.find((i) => i instanceof Error)

  if (err !== undefined)
    return err

  return ids as string[]
}

async function create(identity: string, file: File): Promise<string | Error> {
  const entry = await net.attachments.post(identity, file)

  if (entry instanceof Error)
    return entry

  return entry.id
}

async function update(identity: string, file: File, id: string): Promise<string | Error> {
  const uploaded = await net.attachments.post(identity, file, id)

  if (uploaded instanceof Error)
    return uploaded

  const [entry, emitter] = uploaded

  return new Promise((resolve) => {
    emitter.on('attach', (expense) => {
      if (expense instanceof Error)
        return resolve(expense)

      sync(internal, expense)
      resolve(entry.id)
    })
  })
}
