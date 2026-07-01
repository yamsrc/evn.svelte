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

    if (cb === undefined) {
      if (d.kind === 'reply')
        console.debug('shell ← unmatched', d)

      return
    } else console.debug('shell ←', d)

    if (d.kind === 'reply') subs.delete(key)

    cb(d)
  })
}

/**
 * Subscribe to shell messages keyed by reply `id` or event `label`.
 * Replies are one-shot (auto-unsubscribed on delivery); events persist until overwritten.
 * @param key reply id or event label to match
 * @param cb invoked with the matching {@link Detail}
 */
export function on(key: string, cb: (d: Detail) => void): void {
  listen()
  subs.set(key, cb)
}

function publish(msg: { id: string, label: string, arguments?: unknown }): void {
  console.debug('shell →', msg)
  window.webkit?.messageHandlers?.shell?.postMessage(msg)
}

/**
 * Send a request to the shell and await its reply via callback.
 * @param label native method to invoke
 * @param args payload forwarded to the native side
 * @param cb invoked once with the reply
 */
export function call(label: string, args: unknown, cb: (d: Detail) => void): void {
  const id = crypto.randomUUID()

  on(id, (d) => cb(d))
  publish({ id, label, arguments: args })
}

/**
 * Fire-and-forget message to the shell; no reply is awaited.
 * @param label native method to invoke
 * @param args optional payload forwarded to the native side
 */
export function send(label: string, args?: unknown): void {
  publish({ id: crypto.randomUUID(), label, arguments: args })
}

/**
 * Whether the native shell bridge is reachable in the current environment.
 * @returns `true` when running inside the iOS WKWebView host
 */
export function available(): boolean {
  return typeof window !== 'undefined' && window.webkit?.messageHandlers?.shell != null
}

/**
 * Promise-based request to the shell; the sole IO boundary casting the wire reply to `T`.
 * @typeParam T expected result shape on success
 * @param label native method to invoke
 * @param args optional payload forwarded to the native side
 * @returns the typed result, or an `Error` on shell-side failure
 */
export function request<T>(label: string, args?: unknown): Promise<T | Error> {
  return new Promise((resolve) => {
    call(label, args, (d) => {
      if (d.kind !== 'reply') return

      // single IO boundary: the wire reply is `unknown`; facade labels its contract via T.
      resolve('error' in d ? new Error(`${d.error.kind}: ${d.error.message}`) : (d.result as T))
    })
  })
}
