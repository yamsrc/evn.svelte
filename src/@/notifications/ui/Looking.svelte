<script lang="ts">
  import { onMount } from 'svelte'
  import { seen, looking } from '@/notifications'
  import type { Props } from './Looking'

  const { domain, key }: Props = $props()

  onMount(() => {
    void seen(domain, key)
    looking.set({ domain, key })

    return () => {
      looking.set(null)
    }
  })
</script>
