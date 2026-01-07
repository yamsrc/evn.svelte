import type { Descriptor } from './providers'

const win = typeof window !== 'undefined' && (window as any)

async function apple(descriptor: Descriptor): Promise<string | Error> {
  await init(descriptor)

  const response = await win.AppleID.auth.signIn().catch((err: unknown) => console.error(err))

  if (!response || !response.authorization)
    return new Error('NO_RESPONSE', { cause: response })

  return response.authorization.code
}

function init(descriptor: Descriptor) {
  if (win.AppleID !== undefined)
    return undefined

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
    script.async = true

    script.onload = () => {
      win.AppleID.auth.init({
        clientId: descriptor.client,
        scope: descriptor.scope,
        redirectURI: window.location.origin + '/',
        state: btoa(JSON.stringify({ idp: 'apple' })),
        usePopup: true,
      })

      resolve(undefined)
    }

    script.onerror = reject

    document.head.appendChild(script)
  })
}

export { apple }
