<script lang="ts">
  import { Input } from '$ui/input'
  import { cn } from '$lib/utils'
  import { onsubmit as handleSubmit } from '$lib/tools'
  import { dict } from '$lib/intl'
  import type { Props } from './NameForm'

  let {
    value = $bindable(''),
    busy = $bindable(false),
    autocomplete = 'off',
    autofocus,
    placeholder = $dict.form.enterName,
    onchange,
    class: classes,
  }: Props = $props()

  let original = $state(value)
  const blank = value === ''

  let ref = $state<HTMLInputElement | null>(null)

  async function submit() {
    const normalized = value.trim()

    if (normalized === '') return reset()

    if (normalized === original) return

    value = normalized

    const ok = await onchange?.(normalized)

    if (!(ok instanceof Error)) original = value
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
    id="app-cosmetics-name-input"
    bind:ref
    bind:value
    name="name"
    type="text"
    {autofocus}
    {autocomplete}
    {placeholder}
    class={cn('text-center text-3xl font-bold', classes)}
    required
    disabled={busy}
    onblur={blank ? undefined : onblur} />
  <button type="submit" class="sr-only">Submit</button>
</form>
