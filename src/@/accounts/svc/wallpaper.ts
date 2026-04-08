import { having } from 'svas'
import * as iam from '@/iam'
import { update } from './update'
import * as net from './net'

export async function set(value: net.Wallpaper): Promise<void | Error> {
  const me = await having(iam.account)

  const wallpaper = {
    ...me.wallpaper,
    ...value,
  }

  // optimistic
  iam.update({ wallpaper })

  const updated = await update(me.id, { wallpaper })

  if (updated instanceof Error) return updated
}

export async function upload(file: File): Promise<{ id: string } | Error> {
  return await net.pictures.post(file)
}
