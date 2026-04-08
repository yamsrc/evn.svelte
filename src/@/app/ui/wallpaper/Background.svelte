<script lang="ts">
  import { Picture } from '@/media/ui'
  import { account } from '@/iam'
  import { browser } from '$app/environment'
  import Pattern from './Pattern.svelte'
  import { overriden } from './Pattern'
  import type { ClassValue } from 'svelte/elements'

  const { class: classes }: { class?: ClassValue } = $props()

  const method = $derived($overriden?.method ?? $account?.wallpaper?.method ?? 'pattern')
  const picture = $derived($overriden?.picture ?? $account?.wallpaper?.picture)
  const variant = browser ? `${screen.width}x${screen.height}` : '720x1280'
</script>

{#if method === 'picture' && picture}
  <div class={['overflow-hidden', classes]}>
    <Picture
      id={picture}
      alt=""
      {variant}
      class="size-full object-cover"
      style="opacity: 0.2" />
  </div>
{:else}
  <Pattern class={classes} />
{/if}
