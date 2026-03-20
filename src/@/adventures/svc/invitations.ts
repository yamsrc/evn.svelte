import * as net from './net'

export async function get(id: string): Promise<net.Invitation | Error> {
  return await net.invitations.get(id)
}

export async function accept(id: string): Promise<net.Adventure | Error> {
  return await net.invitations.del(id)
}
