<script lang="ts">
  import { Input } from '$ui/input'
  import { dict } from '$lib/intl'
  import type { Props } from './Description'

  let { title = $bindable(), location = $bindable() }: Props = $props()
</script>

<fieldset class="space-y-2">
  <Input
    id="adventures-expense-title-input"
    bind:value={title}
    name="title"
    autofocus={title === ''}
    required
    placeholder={$dict.expenses.form.title.placeholder}
    class="text-2xl font-bold" />
  <Input
    id="adventures-expense-location-input"
    bind:value={location}
    name="location"
    placeholder={$dict.expenses.form.location.placeholder} />
</fieldset>
