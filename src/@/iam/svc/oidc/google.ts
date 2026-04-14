import type { Descriptor } from './providers'

async function google(descriptor: Descriptor): Promise<string | Error> {
  await init()

  const response = await new Promise((resolve) => {
    const google = (window as any).google as any

    const client = google.accounts.oauth2.initCodeClient({
      client_id: descriptor.client,
      scope: descriptor.scope,
      ux_mode: 'popup',
      state: btoa(JSON.stringify({ idp: 'google' })),
      redirect_uri: window.location.origin + '/',
      callback: async (response: { code?: string; error?: string }) => {
        resolve(response)
      },
    })

    client.requestCode()
  }) as { code?: string; error?: string }

  if (response?.code === undefined)
    return new Error('NO_RESPONSE', { cause: response })

  return response.code
}

function init() {
  return new Promise((resolve, reject) => {
    const google = (window as any).google as any

    if (google?.accounts?.oauth2 !== undefined) return resolve(undefined)

    const script = document.createElement('script')

    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => resolve(undefined)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export { google }
