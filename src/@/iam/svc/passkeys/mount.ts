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
    promise: login(undefined, { mediation: 'conditional', signal: ac.signal }),
    abort: () => ac.abort(),
  }

  expectation = current

  void current.promise.then((result) => {
    expectation = undefined

    if (!(result instanceof Error)) callback?.()
  })

  return current.abort
}
