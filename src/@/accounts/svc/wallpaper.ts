import { ensure } from 'svas'
import { account } from '@/iam'
import { update } from './update'
import * as net from './net'

export async function set(id: string): Promise<void | Error> {
  const me = ensure(account)
  const wallpaper = { ...(me.wallpaper ?? {}), method: 'picture' as const, picture: id }
  const updated = await update(me.id, { wallpaper })

  if (updated instanceof Error) return updated
}

export async function upload(file: File): Promise<void | Error> {
  const entry = await net.pictures.post(file)

  if (entry instanceof Error) return entry

  return set(entry.id)
}
