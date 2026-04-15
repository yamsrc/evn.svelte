<script lang="ts">
  import { dict } from '@/expenses/ui/intl'
  import { Switch } from '$ui/switch'
  import type { Props } from './Template'

  let { value = $bindable(false) }: Props = $props()
</script>

<label class="flex items-start gap-2">
  <div class="flex items-center h-lh">
    <Switch bind:checked={value} />
  </div>
  <div>
    <p>{$dict.template.toggle.label}</p>
    <p class="text-muted-foreground text-sm">{$dict.template.toggle.description}</p>
  </div>
</label>
