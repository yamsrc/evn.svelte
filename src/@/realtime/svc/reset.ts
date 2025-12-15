import { dashboard } from './store'

export function reset(): void {
  dashboard.update(() => ({ status: 'disconnected', events: [] }))
}
