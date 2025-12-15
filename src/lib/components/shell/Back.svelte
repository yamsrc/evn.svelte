<script lang="ts">
  import { ArrowLeft } from '@lucide/svelte'
  import { afterNavigate } from '$app/navigation'

  const { ref }: { ref: string } = $props()

  let href = $state(ref)

  afterNavigate(({ from }) => {
    if (from !== null) href = from.url.pathname
  })
</script>

<a {href}>
  <ArrowLeft />
</a>
