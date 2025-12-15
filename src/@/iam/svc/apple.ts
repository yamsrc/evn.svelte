import * as origin from './net'
import { providers } from './oidc'
import { iam, method } from './store'

const win = typeof window !== 'undefined' && (window as any)

async function apple() {
  await new Promise((resolve) => setTimeout(resolve, 10)) // render loader
  await init()

  const response = await win.AppleID.auth.signIn().catch((err: unknown) => console.error(err))

  if (!response || !response.authorization) {
    console.error(response)

    return
  }

  const auth = {
    code: response.authorization.code,
    iss: providers.apple.iss,
    for: window.location.origin + window.location.pathname,
  }

  const credentials = btoa(JSON.stringify(auth))
  const echo = await origin.get('Code ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
  method.set('apple')
}

function init() {
  return new Promise((resolve, reject) => {
    if (win.AppleID)
      return resolve(undefined)

    const script = document.createElement('script')

    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
    script.async = true
    script.defer = true

    script.onload = () => {
      win.AppleID.auth.init({
        clientId: providers.apple.client,
        scope: providers.apple.scope,
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
