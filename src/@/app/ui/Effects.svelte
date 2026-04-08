<script lang="ts">
  import { account } from '@/iam'
  import { effects, type Effect as EffectId } from '@/app'
  import { update } from '@/accounts'
  import * as ToggleGroup from '$ui/toggle-group'
  import { backgrounds } from './wallpaper/Pattern'
  import Effect from './Effect.svelte'
  import type { Props } from './Effects'

  const { class: classes }: Props = $props()

  let busy = $state(false)
  const value = $derived($account?.wallpaper?.effect ?? '')
  const tiles = ['', ...effects] as const

  async function onValueChange(next: string) {
    if (!$account) return

    const effect = next === '' ? null : (next as EffectId)
    const pattern = $account.wallpaper?.pattern ?? $account.background ?? backgrounds[0].id

    busy = true

    await update($account.id, {
      wallpaper: { method: 'pattern', pattern, effect },
    })

    busy = false
  }

  function onclick(e: MouseEvent) {
    if (busy) e.preventDefault()
  }
</script>

<ToggleGroup.Root
  type="single"
  spacing={2}
  {value}
  {onValueChange}
  class={['grid grid-cols-3 gap-2 w-full', classes]}>
  {#each tiles as effect (effect || 'none')}
    <ToggleGroup.Item
      value={effect}
      {onclick}
      class="h-16 w-auto rounded-lg bg-input relative overflow-hidden data-[state=on]:ring-2 data-[state=on]:ring-accent-foreground/20">
      {#if effect}
        <Effect {effect} class="absolute inset-0" />
      {/if}
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
