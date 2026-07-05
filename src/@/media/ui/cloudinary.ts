const base = 'https://res.cloudinary.com/dl5z4zgth/image/upload'
const version = 'v1775485895'

export function cloudinary(transformations: string, file: string): string {
  return `${base}/${transformations}/${version}/${file}`
}
