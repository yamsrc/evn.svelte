<script lang="ts">
  import { Picture } from '@/media/ui'
  import { account } from '@/iam'
  import Pattern from './Pattern.svelte'
  import { overriden } from './Pattern'
  import type { ClassValue } from 'svelte/elements'

  const { class: classes }: { class?: ClassValue } = $props()

  const method = $derived($overriden?.method ?? $account?.wallpaper?.method ?? 'pattern')
  const picture = $derived($overriden?.picture ?? $account?.wallpaper?.picture)
</script>

{#if method === 'picture' && picture}
  <div class={['overflow-hidden', classes]}>
    <Picture
      id={picture}
      variant="1280x2700"
      densities={[1]}
      class="size-full object-cover opacity-20" />
  </div>
{:else}
  <Pattern class={classes} />
{/if}
