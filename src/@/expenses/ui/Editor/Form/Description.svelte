<script lang="ts">
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import type { Props } from './Description'

  let { title = $bindable(), location = $bindable() }: Props = $props()
</script>

<Section class="space-y-5">
  <fieldset class="space-y-2">
    <Input
      id="expenses-form-title-input"
      bind:value={title}
      name="title"
      required
      placeholder={$dict.expenses.form.title.placeholder}
      class="text-3xl font-bold"
    />
    <Input
      id="expenses-form-location-input"
      bind:value={location}
      name="location"
      placeholder={$dict.expenses.form.location.placeholder}
    />
  </fieldset>
</Section>
