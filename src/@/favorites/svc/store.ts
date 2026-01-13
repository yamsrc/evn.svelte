import { collection, sync, values } from 'svas'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type { Favorite } from './net'

export const favorites = collection({
  get,
  persist: 'favorites',
  bind: account,
  stale: true,
  values: values<Favorite>(),
})

events.on('default.favorites.sync', (favorite) => sync(favorites, favorite))
