<script lang="ts">
  import { Switch } from '$ui/switch'
  import Panel from './Panel.svelte'
  import type { Props } from './Toggle'

  let {
    id,
    label,
    children,
    checked = $bindable(false),
    class: classes,
    onchange,
  }: Props = $props()

  let busy = $state(false)

  async function onclick(e: MouseEvent) {
    e.preventDefault()

    checked = !checked

    busy = true
    await onchange?.(!checked)
    busy = false
  }
</script>

<button class={['text-left', classes]} {onclick}>
  <Panel>
    <div class="space-y-1">
      <h3 class="flex items-center justify-between gap-2">
        <label for={id} data-slot="label">{label}</label>
        <Switch {id} {checked} disabled={busy} class="border border-border" />
      </h3>
      {@render children?.()}
    </div>
  </Panel>
</button>
