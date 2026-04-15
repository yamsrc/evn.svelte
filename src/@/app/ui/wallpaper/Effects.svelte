<script lang="ts">
  import './effects.css'
  import { Palette } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import * as Dropdown from '$com/dropdown'
  import { effects, type Props } from './Effects'

  const { class: classes, variant = 'outline', ...rest }: Props = $props()
</script>

<Dropdown.Root>
  <Dropdown.Trigger id="wallpaper-effects-trigger" {variant} size="icon" class={classes} {...rest}>
    <Palette />
  </Dropdown.Trigger>
  <Dropdown.Content position="end-bottom">
    <Dropdown.Layer>
      {#each effects as effect (effect)}
        <Dropdown.Item class="pl-3">
          <div class="h-lh aspect-square rounded-sm effect-{effect}"></div>
          <div>{$dict.wallpapers.effects[effect]}</div>
        </Dropdown.Item>
      {/each}
    </Dropdown.Layer>
  </Dropdown.Content>
</Dropdown.Root>
