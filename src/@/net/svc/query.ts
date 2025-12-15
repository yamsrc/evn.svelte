function query(params: URLSearchParams, options?: Options): string {
  const parts: string[] = []
  const criteria: string[] = []

  for (const [key, value] of params.entries())
    if (SEPARATE.includes(key) || options?.separate?.includes(key) === true)
      parts.push(`${key}=${value}`)
    else
      criteria.push(`${key}==${value}`)

  if (criteria.length > 0)
    parts.unshift(`criteria=${criteria.join(';')}`)

  return parts.length === 0
    ? ''
    : '?' + parts.join('&')
}

const SEPARATE: string[] = ['omit', 'limit', 'search'] as const

interface Options {
  separate?: string[]
}

export { query }
