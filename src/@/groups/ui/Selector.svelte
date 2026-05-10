<script lang="ts">
  import { ok } from 'svas'
  import { Component } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { groups } from '@/groups'
  import { List, Avatars } from '@/app/ui'
  import { buttonVariants } from '$ui/button'
  import { Ellipsis } from '$com/text'
  import type { Props } from './Selector'

  const { id, onchange }: Props = $props()

  const active = $derived(ok($groups) ? $groups : [])
  const picked = $derived(id ? active.findIndex((group) => group.id === id) + 1 : 0)

  function onpick(index: number) {
    if (index === picked) return

    onchange?.(index === 0 ? undefined : active[index - 1].id)
  }

  const card = 'shrink-0 overflow-hidden rounded-lg'
  const base =
    'group-cover relative isolate overflow-hidden rounded-lg bg-cover bg-center py-3 px-4'
</script>

{#if active.length > 0}
  <List.Root {picked} {onpick} align="start" class="py-1 -my-1">
    <List.Option
      index={0}
      class={[
        buttonVariants({ variant: 'outline' }),
        card,
        'w-20! flex-col items-center justify-center text-muted-foreground',
      ]}>
      <Component />
      <!-- TODO: add intl -->
      <span class="text-sm">No group</span>
    </List.Option>

    {#each active as group, index (group.id)}
      <List.Option
        variant="outline"
        class={[card, 'p-0', picked !== index + 1 && 'ring-1 ring-border']}
        index={index + 1}>
        <div class={[base, 'size-full text-foreground']}>
          {#if group.picture}
            <Picture
              id={group.picture}
              alt={group.title ?? group.name}
              variant="700x500"
              class="absolute size-full inset-0 -z-1 object-cover" />
          {/if}
          <div
            class="relative z-10 flex h-full flex-col items-start gap-1.5 w-full justify-between">
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
      </List.Option>
    {/each}
  </List.Root>
{/if}

<style>
  :global(.group-cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: color-mix(in oklch, var(--background) 70%, transparent);
    backdrop-filter: blur(0.5px);
  }
</style>
