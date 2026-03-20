import type { Adventure } from './Adventure'

export type Events = {
  'default.adventures.sync': Adventure
  'default.adventures.quit': Adventure
}
