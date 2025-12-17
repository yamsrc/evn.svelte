import * as origin from './net'
import { providers } from './oidc'
import { iam, method } from './store'

async function google() {
  await new Promise((resolve) => setTimeout(resolve, 10)) // render loader
  await init()

  const client = window.google.accounts.oauth2.initCodeClient({
    client_id: providers.google.client,
    scope: providers.google.scope,
    ux_mode: 'popup',
    state: btoa(JSON.stringify({ idp: 'google' })),
    redirect_uri: window.location.origin + '/',
    callback: async (response: { code?: string; error?: string }) => {
      if (!response || !response.code) {
        console.error(response)

        return
      }

      const auth = {
        code: response.code,
        iss: providers.google.iss,
        for: window.location.origin,
      }

      const credentials = btoa(JSON.stringify(auth))
      const echo = await origin.get('Code ' + credentials)

      if (echo instanceof Error) return echo

      iam(echo)
      method.set('google')
    },
  })

  client.requestCode()
}

function init() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve(undefined)

    const script = document.createElement('script')

    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve(undefined)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export { google }
