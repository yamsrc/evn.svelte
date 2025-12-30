import { assets } from '$config'
import { deterministic } from '$lib/tools'

export function pickpic(id?: string) {
  const i = id === undefined ? Math.floor(Math.random() * assets.length) : deterministic(id, assets.length)

  return assets[i]
}
