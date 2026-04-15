<script lang="ts">
  import './effects.css'
  import { Palette } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import * as Dropdown from '$com/dropdown'
  import { effects, type Props } from './Effects'

  const { class: classes, variant = 'outline', ...rest }: Props = $props()
</script>

<Dropdown.Root>
  <Dropdown.Trigger id="wallpaper-effects-trigger" {variant} class={classes} {...rest}>
    <Palette />
  </Dropdown.Trigger>
  <Dropdown.Content position="start-bottom">
    <Dropdown.Layer>
      {#each effects as effect (effect)}
        <Dropdown.Item>
          <span class="effect-{effect}-text">{$dict.wallpapers.effects[effect]}</span>
        </Dropdown.Item>
      {/each}
    </Dropdown.Layer>
  </Dropdown.Content>
</Dropdown.Root>
