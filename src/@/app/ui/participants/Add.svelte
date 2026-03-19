<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { identities as store } from './store'
  import type { Props } from './Add'

  const { exclude, onadd, options, ...props }: Props = $props()

  function onclick() {
    goto('add/', {
      state: {
        participants: {
          identities: [...exclude],
          ...(options && { options: { ...options } }),
        },
      },
    })
  }

  onMount(() => {
    const identities = get(store)

    if (identities.length === 0) return

    onadd(identities)
    store.set([])
  })
</script>

<Button size="lg" variant="secondary" {onclick} {...props}>
  <UserPlus />
  <span>{$dict.participants.add.button}</span>
</Button>
