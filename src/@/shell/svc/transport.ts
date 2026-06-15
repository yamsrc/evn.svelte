export type Detail =
  | { kind: 'reply', id: string, result: unknown }
  | { kind: 'reply', id: string, error: { kind: string, message: string } }
  | { kind: 'event', label: string, payload: unknown }

const subs = new Map<string, (d: Detail) => void>()

let listening = false

function listen(): void {
  if (listening) return

  listening = true

  window.addEventListener('shell', (e) => {
    const d = e.detail
    const key = d.kind === 'reply' ? d.id : d.label
    const cb = subs.get(key)

    if (cb === undefined) return

    if (d.kind === 'reply') subs.delete(key)

    cb(d)
  })
}

export function on(key: string, cb: (d: Detail) => void): void {
  listen()
  subs.set(key, cb)
}

function publish(msg: { id: string, label: string, arguments?: unknown }): void {
  window.webkit?.messageHandlers?.shell?.postMessage(msg)
}

const TIMEOUT = 10_000

export function call(label: string, args: unknown, cb: (d: Detail) => void): void {
  const id = crypto.randomUUID()

  const timer = setTimeout(() => {
    if (subs.delete(id)) cb({ kind: 'reply', id, error: { kind: label, message: 'timeout' } })
  }, TIMEOUT)

  on(id, (d) => {
    clearTimeout(timer)
    cb(d)
  })

  publish({ id, label, arguments: args })
}

export function send(label: string, args?: unknown): void {
  publish({ id: crypto.randomUUID(), label, arguments: args })
}

export function available(): boolean {
  return typeof window !== 'undefined' && window.webkit?.messageHandlers?.shell != null
}

export function request<T>(label: string, args?: unknown): Promise<T | Error> {
  return new Promise((resolve) => {
    call(label, args, (d) => {
      if (d.kind !== 'reply') return

      // single IO boundary: the wire reply is `unknown`; facade labels its contract via T.
      resolve('error' in d ? new Error(`${d.error.kind}: ${d.error.message}`) : (d.result as T))
    })
  })
}
