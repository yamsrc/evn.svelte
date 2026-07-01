<script lang="ts">
  import { create, type Code } from '@/codes'
  import { Spinner } from '$ui/spinner'
  import * as Select from '$ui/select'
  import { Label } from '$ui/label'
  import { Button } from '$ui/button'
  import { onsubmit } from '$lib/tools'
  import { Clipboard } from '$com/buttons'
  import { dict } from './intl'
  import type { Props } from './Create'

  const { class: classes }: Props = $props()

  const intervals = ['P1M', 'P3M', 'P6M', 'P1Y'] as const

  let interval = $state<string>('P1M')
  let busy = $state(false)
  let created = $state<Code | null>(null)
  let error = $state<string | null>(null)

  async function submit() {
    busy = true
    error = null
    created = null

    const res = await create({ interval })

    busy = false

    if (res instanceof Error) error = res.message
    else created = res
  }
</script>

<form onsubmit={onsubmit(submit)} class={['space-y-4', classes]}>
  <div class="space-y-2">
    <Label for="codes-interval">{$dict.create.interval}</Label>
    <Select.Root type="single" bind:value={interval}>
      <Select.Trigger id="codes-interval" class="w-full">
        {$dict.create.intervals[interval as keyof typeof $dict.create.intervals] ?? interval}
      </Select.Trigger>
      <Select.Content>
        {#each intervals as value (value)}
          <Select.Item {value}>{$dict.create.intervals[value]}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>

  <div class="flex justify-center">
    <Button id="codes-create-button" type="submit" size="lg" class="min-w-24" disabled={busy}>
      {#if busy}
        <Spinner />
      {:else}
        {$dict.create.submit}
      {/if}
    </Button>
  </div>

  {#if error}
    <p class="text-sm text-destructive">{error}</p>
  {/if}

  {#if created}
    <div class="flex items-center justify-center">
      <code class="text-xs">{created.id}</code>
      <Clipboard text={created.id} variant="ghost" size="icon-sm" />
    </div>
  {/if}
</form>
