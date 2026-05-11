<script lang="ts">
  import { Component } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { Avatars } from '@/app/ui'
  import { Ellipsis } from '$com/text'
  import type { Props } from './Card'

  const { group, class: classes }: Props = $props()

  const base =
    'group-cover relative isolate overflow-hidden rounded-lg bg-cover bg-center py-3 px-4'
</script>

<div class={[base, 'size-full', classes]}>
  {#if group.picture}
    <Picture
      id={group.picture}
      alt={group.title ?? group.name}
      variant="700x500"
      class="absolute size-full inset-0 -z-1 object-cover" />
  {/if}
  <div class="relative z-10 flex h-full flex-col items-start gap-1.5 w-full justify-between">
    <div class="flex items-center gap-2">
      {#if group.emoji}
        <span class="font-bold">{group.emoji}</span>
      {:else}
        <Component class="size-4" />
      {/if}
      <Ellipsis class="font-bold text-lg leading-6">{group.title ?? group.name}</Ellipsis>
    </div>
    <Avatars identities={group.identities} />
  </div>
</div>

<style>
  :global(.group-cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: color-mix(in oklch, var(--background) 70%, transparent);
    backdrop-filter: blur(0.5px);
  }
</style>
