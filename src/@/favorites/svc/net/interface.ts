import { origin } from '@/net'
import type { Favorite } from './Favorite'

const favorites = origin.resource<Favorite>('/favorites/', { credentials: 'include' })

export async function get(identity: string): Promise<Favorite[] | Error> {
  return favorites.json(identity)
}

export type Post = { favorite: string }

export async function post(identity: string, body: Post): Promise<Favorite | Error> {
  return favorites.json(identity, { method: 'POST', body })
}

export async function del(identity: string, id: string): Promise<void | Error> {
  return favorites.json(`${identity}/${id}`, { method: 'DELETE' })
}
