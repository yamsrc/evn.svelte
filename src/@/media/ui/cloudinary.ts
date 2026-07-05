const base = 'https://pic.evnly.com'

export function cloudinary(transformations: string, file: string): string {
  return `${base}/${transformations}/${file}`
}
