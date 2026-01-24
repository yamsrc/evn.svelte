import { get } from 'svelte/store'
import { locale } from '$lib/intl'
import { update } from '@/accounts'
import { origin } from '@/net'
import { account, challenge } from './svc/store'
import { sync } from './svc/sync'

function rc() {
  origin.events.on('challenge', (value) => challenge.set(value))

  origin.events.on('error', (error) => {
    if (error.code === 401) challenge.set(null)
  })

  challenge.subscribe((challenge) => origin.authenticate(challenge))

  void sync()

  account.subscribe((account) => {
    if (account !== null && account.locale === undefined) {
      const value = get(locale)

      void update(account.id, { locale: value })
    }
  })
}

export { rc }
