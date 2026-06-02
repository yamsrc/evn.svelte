<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$ui/button'
  import { goto } from '$app/navigation'
  import { identities, group } from './identities'
  import type { Props } from './Button'

  const { children, exclude, onadd, options, ...props }: Props = $props()

  function onclick() {
    void goto('add/', {
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

    const picked = group.id

    group.id = undefined

    onadd(identities, picked)
    identities.length = 0
  })
</script>

<Button {...props} {onclick}>
  {@render children?.()}
</Button>
