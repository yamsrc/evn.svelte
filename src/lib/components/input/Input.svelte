<script lang="ts">
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Input } from '$ui/input'
  import type { Props } from './Input'

  const { value: initial, class: classes, onsubmit: callback }: Props = $props()

  let ref = $state<HTMLInputElement | null>(null)
  // svelte-ignore state_referenced_locally
  let value = $state(initial)
  let busy = $state(false)

  async function submit() {
    if (!value?.trim()) return

    busy = true

    const res = await callback?.(value)

    busy = false

    if (res !== undefined) value = res
  }

  function reset() {
    value = initial
  }

  function onblur() {
    if (!value) reset()
    else if (!busy && value !== initial) submit()
  }
</script>

<form onsubmit={onsubmit(submit)} class="w-full flex items-center justify-center">
  <Input
    bind:ref
    bind:value
    name="name"
    type="text"
    autocomplete="given-name"
    placeholder={$dict.form.enterName}
    class={cn('text-center', classes)}
    required
    disabled={busy}
    {onblur}
  />
  <button type="submit" class="sr-only">Submit</button>
</form>
