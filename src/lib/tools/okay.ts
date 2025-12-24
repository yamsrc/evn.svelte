import { error } from '@sveltejs/kit'

/**
 * Asserts that the data is not an error.
 * @param data
 */
export function okay<T>(data: T | Error): asserts data is T {
  if (!(data instanceof Error)) return

  const code = Number.isInteger(data.cause) ? (data.cause as number) : 500

  error(code)
}
