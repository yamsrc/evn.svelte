import { conditional } from '@/passkeys'
import { login } from './login'

interface Expectation {
  promise: Promise<void | Error>
  abort: () => void
}

export let expectation: Expectation | undefined

/**
 * Starts a conditional mediation request, so the browser
 * shows a passkey hint in the input autofill.
 * Returns a callback aborting the request (for onMount).
 */
export function mount(callback?: () => void): () => void {
  if (expectation !== undefined)
    return expectation.abort

  const ac = new AbortController()

  const current: Expectation = {
    promise: start(ac.signal),
    abort: () => ac.abort(),
  }

  expectation = current

  void current.promise.then((result) => {
    expectation = undefined

    if (!(result instanceof Error)) callback?.()
  })

  return current.abort
}

/**
 * Browsers without conditional mediation support execute
 * such a request modally, scaring users with a system dialog
 * on page load, so the request must not be started at all.
 */
async function start(signal: AbortSignal): Promise<void | Error> {
  const available = await conditional()

  if (!available || signal.aborted) return new Error('Conditional mediation is not available')

  return login(undefined, { mediation: 'conditional', signal })
}
