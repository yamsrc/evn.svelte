<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { update, type Account } from '@/accounts'

  const {
    account,
    autofocus,
    class: classes,
  }: { account: Account; autofocus?: boolean; class?: string } = $props()

  let ref = $state<HTMLInputElement | null>(null)
  let value = $derived(account.name)
  let busy = $state(false)

  async function submit() {
    const name = value?.trim()

    if (!name) return

    busy = true
    await update(account.id, { name })
    busy = false
  }

  function reset() {
    value = account.name
  }

  function onblur() {
    if (!value) reset()
  }
</script>

<form onsubmit={onsubmit(submit)} class="flex items-center gap-2">
  <Input
    bind:ref
    bind:value
    name="name"
    type="text"
    {autofocus}
    autocomplete="given-name"
    placeholder={$dict.form.enterName}
    class={cn('text-center', classes)}
    required
    disabled={busy}
    {onblur}
    data-marker="name-input"
  />
  <Button size="icon" type="submit" class="size-12" disabled={busy}>
    <ArrowRight class="size-5" />
  </Button>
</form>
