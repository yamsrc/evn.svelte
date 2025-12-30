<script lang="ts">
  import { dict } from '$lib/intl'
  import { onsubmit as handleSubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Input } from '$ui/input'
  import type { Props } from './Name'

  let {
    value = $bindable(''),
    busy = $bindable(false),
    autocomplete = 'off',
    onchange,
    class: classes,
  }: Props = $props()

  const original = value
  const blank = value === ''

  let ref = $state<HTMLInputElement | null>(null)

  function submit() {
    const normalized = value.trim()

    if (normalized === '') return reset()

    if (normalized === original) return

    value = normalized
    onchange?.(normalized)
  }

  function reset() {
    value = original
  }

  function onblur() {
    if (!busy) submit()
  }
</script>

<form onsubmit={handleSubmit(submit)}>
  <Input
    bind:ref
    bind:value
    name="name"
    type="text"
    {autocomplete}
    placeholder={$dict.form.enterName}
    class={cn('text-center text-3xl font-bold', classes)}
    required
    disabled={busy}
    onblur={blank ? undefined : onblur}
  />
  <button type="submit" class="sr-only">Submit</button>
</form>
