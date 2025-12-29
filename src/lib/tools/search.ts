/**
 * Filters an array of items by a search string.
 * The search is case-insensitive and checks if the stringified item includes the search term.
 *
 * @param items - Array of items to filter
 * @param search - Search string (optional)
 * @param stringify - Function to extract the searchable text from each item
 * @returns Filtered array of items
 */
export function search<T>(
  items: T[],
  search: string | undefined,
  stringify: (item: T) => string | null | undefined = JSON.stringify,
): T[] {
  if (search === undefined || search === '')
    return items

  const lowercase = search.toLowerCase()

  return items.filter((item) => {
    const text = stringify(item)

    return text?.toLowerCase().includes(lowercase) ?? false
  })
}
