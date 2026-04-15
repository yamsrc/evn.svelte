<script lang="ts">
  import './effects.css'
  import { Check, Palette } from '@lucide/svelte'
  import { account } from '@/iam'
  import { wallpaper } from '@/accounts'
  import { dict } from '$lib/intl'
  import * as Dropdown from '$com/dropdown'
  import { patterns } from './Pattern'
  import { effects, type Props, type Effect } from './Effects'

  const { class: classes, variant = 'outline', ...rest }: Props = $props()

  let dropdown = $state<Dropdown.Root | undefined>()

  async function pick(value: Effect) {
    if (!$account) return

    dropdown?.close()

    const pattern = $account.wallpaper?.pattern ?? $account.background ?? patterns[0].id
    const effect = value === 'classic' ? null : value

    await wallpaper.set({ method: 'pattern', pattern, effect })
  }
</script>

<Dropdown.Root bind:this={dropdown}>
  <Dropdown.Trigger id="wallpaper-effects-trigger" {variant} size="icon" class={classes} {...rest}>
    <Palette />
  </Dropdown.Trigger>
  <Dropdown.Content position="end-top">
    <Dropdown.Layer>
      {#each effects as effect (effect)}
        {@const selected = $account?.wallpaper?.effect === effect}
        <Dropdown.Item class="pl-3" onclick={() => pick(effect)}>
          <div
            class={[
              'h-lh aspect-square rounded-sm ',
              effect === 'classic' ? 'border border-muted-foreground' : `effect-${effect}`,
              selected ? '' : '',
            ]}>
          </div>
          <div class="flex items-center gap-2">
            {$dict.wallpapers.effects[effect]}
            {#if selected}
              <Check />
            {/if}
          </div>
        </Dropdown.Item>
      {/each}
    </Dropdown.Layer>
  </Dropdown.Content>
</Dropdown.Root>
