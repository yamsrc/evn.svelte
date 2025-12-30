<script lang="ts">
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { create } from '@/groups'
  import type { Props } from './Create'

  const { name: initial, class: classes, oncreated }: Props = $props()

  let ref = $state<HTMLInputElement | null>(null)
  // svelte-ignore state_referenced_locally
  let value = $state(initial ?? '')
  let busy = $state(false)

  async function submit() {
    if (!value?.trim()) return

    busy = true

    const res = await create({ name: value })

    busy = false

    if (res instanceof Error) return

    if (res !== undefined) {
      oncreated?.(res.id)
      value = ''
    }
  }
</script>

<form onsubmit={onsubmit(submit)} class="w-full flex flex-col gap-2 items-center">
  <Input
    bind:ref
    bind:value
    name="name"
    type="text"
    autocomplete="given-name"
    placeholder={$dict.form.enterName}
    class={cn('w-full max-w-sm text-3xl text-center', classes)}
    required
    disabled={busy}
  />

  <p class="text-muted-foreground text-sm">{$dict.groups.name.description}</p>

  <Button size="lg" class="w-full max-w-sm" type="submit" disabled={busy || !value?.trim()}>
    {$dict.groups.create}
  </Button>
</form>
