import { dev } from '$app/environment'

function allowEditable(e: MouseEvent) {
  for (const n of e.composedPath()) {
    if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return true

    if (n instanceof HTMLElement && n.isContentEditable) return true
  }

  return false
}

export function suppressContextMenu(e: MouseEvent) {
  if (dev) return

  if (allowEditable(e)) return

  e.preventDefault()
}
