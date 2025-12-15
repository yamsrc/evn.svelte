import { dashboard, type Status } from './store'

export function status(status: Status): void {
  dashboard.update((dashboard) => {
    dashboard.status = status

    if (status === 'connected' || status === 'disconnected')
      dashboard.events.push({ label: status })

    return dashboard
  })
}
