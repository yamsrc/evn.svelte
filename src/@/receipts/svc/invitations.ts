import * as net from './net'

export async function get(id: string): Promise<net.Invitation | Error> {
  return await net.invitations.get(id)
}

export async function accept(id: string): Promise<void | Error> {
  const res = await net.invitations.del(id)

  if (res instanceof Error)
    return res
}
