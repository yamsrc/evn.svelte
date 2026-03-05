<script lang="ts">
  import { Switch } from '$ui/switch'
  import { Panel } from '@/app/ui'
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

<Panel>
  <div>
    <h3 class="flex items-center justify-between gap-2">
      <label for="reduction-switch">{$dict.reduction.switch.label}</label>
      <Switch
        id="reduction-switch"
        bind:checked={enabled}
        {onCheckedChange}
        disabled={busy}
        class="border border-border" />
    </h3>
    <p class="text-muted-foreground">
      {$dict.reduction.switch.description}
    </p>
  </div>
</Panel>
