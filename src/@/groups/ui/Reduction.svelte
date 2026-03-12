<script lang="ts">
  import { Panel } from '@/app/ui'
  import { Switch } from '$ui/switch'
  import { update } from '../svc'
  import { dict } from './intl'
  import type { Props } from './Reduction'

  let { group, enabled = $bindable(false) }: Props = $props()

  let busy = $state(false)

  async function toggle(e: MouseEvent) {
    e.preventDefault()

    enabled = !enabled

    busy = true

    if (!group) return

    const result = await update(group.id, { reduction: enabled })

    if (result instanceof Error) enabled = !enabled

    busy = false
  }
</script>

<button class="text-left" onclick={toggle}>
  <Panel>
    <div class="space-y-1">
      <h3 class="flex items-center justify-between gap-2">
        <label for="reduction-switch">{$dict.reduction.switch.label}</label>
        <Switch
          id="reduction-switch"
          checked={enabled}
          disabled={busy}
          class="border border-border" />
      </h3>
      <p class="text-muted-foreground leading-normal!">
        {$dict.reduction.switch.description}
      </p>
    </div>
  </Panel>
</button>
