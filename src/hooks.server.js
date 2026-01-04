const HEADERS = ['content-type', 'date']

export const handle = async ({ event, resolve }) => {
  return await resolve(event, {
    filterSerializedResponseHeaders: (name) => HEADERS.includes(name),
  })
}
