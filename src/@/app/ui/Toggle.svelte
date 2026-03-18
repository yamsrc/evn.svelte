<script lang="ts">
  import { Switch } from '$ui/switch'
  import Panel from './Panel.svelte'
  import type { Props } from './Toggle'

  let { id, label, children, checked = $bindable(false), onchange }: Props = $props()

  let busy = $state(false)

  async function onclick(e: MouseEvent) {
    e.preventDefault()

    checked = !checked

    busy = true
    await onchange?.(!checked)
    busy = false
  }
</script>

<button class="text-left" {onclick}>
  <Panel>
    <div class="space-y-1">
      <h3 class="flex items-center justify-between gap-2">
        <label for={id}>{label}</label>
        <Switch {id} {checked} disabled={busy} class="border border-border" />
      </h3>
      {@render children?.()}
    </div>
  </Panel>
</button>
