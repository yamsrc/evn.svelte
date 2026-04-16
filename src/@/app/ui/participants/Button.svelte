<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$ui/button'
  import { goto } from '$app/navigation'
  import { identities } from './identities'
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

    onadd(identities)
    identities.length = 0
  })
</script>

<Button {...props} {onclick}>
  {@render children?.()}
</Button>
