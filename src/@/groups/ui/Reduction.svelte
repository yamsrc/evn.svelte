<script lang="ts">
  import { Toggle } from '@/app/ui'
  import { dict } from './intl'
  import type { Props } from './Reduction'

  let { enabled = $bindable(false), onchange }: Props = $props()
</script>

<Toggle
  id="reduction-switch"
  label={$dict.reduction.switch.label}
  bind:checked={enabled}
  onchange={() => onchange?.(enabled)}>
  <p class="text-muted-foreground leading-normal!">
    {$dict.reduction.switch.description}
  </p>
</Toggle>
