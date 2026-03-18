<script lang="ts">
  import { Toggle } from '@/app/ui'
  import { update } from '../svc'
  import { dict } from './intl'
  import type { Props } from './Reduction'

  let { group, enabled = $bindable(false) }: Props = $props()

  async function onchange() {
    if (!group) return

    const updated = await update(group.id, { reduction: enabled })

    if (updated instanceof Error) enabled = !enabled
  }
</script>

<Toggle
  id="reduction-switch"
  label={$dict.reduction.switch.label}
  bind:checked={enabled}
  {onchange}>
  <p class="text-muted-foreground leading-normal!">
    {$dict.reduction.switch.description}
  </p>
</Toggle>
