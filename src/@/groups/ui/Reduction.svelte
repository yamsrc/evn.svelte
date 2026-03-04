<script lang="ts">
  import { Switch } from '$ui/switch'
  import { update } from '../svc'
  import { dict } from './intl'
  import type { Props } from './Reduction'

  let { group, enabled = $bindable(false) }: Props = $props()

  let busy = $state(false)

  async function onCheckedChange(checked: boolean) {
    busy = true

    if (group) await update(group.id, { reduction: checked })

    busy = false
  }
</script>

<div class="space-y-2">
  <div class="flex items-center gap-2">
    <Switch
      id="reduction-switch"
      bind:checked={enabled}
      {onCheckedChange}
      disabled={busy}
      class="border border-border" />
    <label for="reduction-switch">{$dict.reduction.switch.label}</label>
  </div>
  <p class="text-muted-foreground">
    {$dict.reduction.switch.description}
  </p>
</div>
