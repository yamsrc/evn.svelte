/**
 * Filters an array of items by a search string.
 * The search is case-insensitive and checks if the extracted text includes the search term.
 *
 * @param items - Array of items to filter
 * @param search - Search string (optional)
 * @param extractText - Function to extract the searchable text from each item
 * @returns Filtered array of items
 */
export function search<T>(
  items: T[],
  search: string | undefined,
  extractText: (item: T) => string | null | undefined,
): T[] {
  if (!search) return items

  const searchLower = search.toLowerCase()

  return items.filter((item) => {
    const text = extractText(item)

    return text?.toLowerCase().includes(searchLower) ?? false
  })
}
