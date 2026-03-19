<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { identities } from './identities'
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
    if (identities.length === 0) return

    onadd(identities)
    identities.length = 0
  })
</script>

<Button size="lg" variant="secondary" {onclick} {...props}>
  <UserPlus />
  <span>{$dict.participants.add.button}</span>
</Button>
