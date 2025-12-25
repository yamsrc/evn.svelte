<script lang="ts">
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Input } from '$ui/input'
  import { set, type Account } from '@/account'

  const { account, class: classes }: { account: Account; class?: string } = $props()

  let ref = $state<HTMLInputElement | null>(null)
  // svelte-ignore state_referenced_locally
  let value = $state(account.name)
  let busy = $state(false)

  async function submit() {
    const name = value?.trim()

    if (!name) return

    busy = true
    await set({ name })
    busy = false
  }

  function reset() {
    value = account.name
  }

  function onblur() {
    if (!value) reset()
    else if (!busy && value !== account.name) submit()
  }
</script>

<form onsubmit={onsubmit(submit)}>
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
