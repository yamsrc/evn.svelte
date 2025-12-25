/**
 * Matches 32-character hexadecimal string.
 */
export function match(param: string): boolean {
  return /^[0-9a-f]{32}$/.test(param)
}
