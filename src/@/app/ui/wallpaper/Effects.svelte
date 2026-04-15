<script lang="ts">
  import './effects.css'
  import { Palette } from '@lucide/svelte'
  import { account } from '@/iam'
  import { wallpaper } from '@/accounts'
  import { dict } from '$lib/intl'
  import * as Dropdown from '$com/dropdown'
  import { backgrounds } from './Pattern'
  import { effects, type Props, type Effect } from './Effects'

  const { class: classes, variant = 'outline', ...rest }: Props = $props()

  let dropdown = $state<Dropdown.Root | undefined>()

  async function pick(value: Effect) {
    if (!$account) return

    dropdown?.close()

    const pattern = $account.wallpaper?.pattern ?? $account.background ?? backgrounds[0].id
    const effect = value === 'classic' ? null : value

    await wallpaper.set({ method: 'pattern', pattern, effect })
  }
</script>

<Dropdown.Root bind:this={dropdown}>
  <Dropdown.Trigger id="wallpaper-effects-trigger" {variant} size="icon" class={classes} {...rest}>
    <Palette />
  </Dropdown.Trigger>
  <Dropdown.Content position="end-bottom">
    <Dropdown.Layer>
      {#each effects as effect (effect)}
        <Dropdown.Item class="pl-3" onclick={() => pick(effect)}>
          <div class="h-lh aspect-square rounded-sm effect-{effect}"></div>
          <div>{$dict.wallpapers.effects[effect]}</div>
        </Dropdown.Item>
      {/each}
    </Dropdown.Layer>
  </Dropdown.Content>
</Dropdown.Root>
