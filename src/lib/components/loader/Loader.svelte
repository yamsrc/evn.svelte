<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { cn } from '$lib/utils'

  const { class: classes = undefined, ...props } = $props()
</script>

<LoaderCircle class={cn('animate-spin opacity-50', classes)} {...props} />
