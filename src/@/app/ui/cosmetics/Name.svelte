<script lang="ts">
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Input } from '$ui/input'
  import type { Props } from './Name'

  let {
    name = $bindable(''),
    busy = $bindable(false),
    autocomplete,
    onchange,
    class: classes,
  }: Props = $props()

  let value = $derived(name)
  const blank = name === ''

  let ref = $state<HTMLInputElement | null>(null)

  function submit() {
    const normalized = value.trim()

    if (normalized === '') return reset()

    if (normalized === name) return

    name = normalized
    onchange?.(normalized)
  }

  function reset() {
    value = name
  }

  function onblur() {
    if (!busy) submit()
  }
</script>

<form onsubmit={onsubmit(submit)}>
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
