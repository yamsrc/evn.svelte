<script lang="ts">
  import { AtSign, Fingerprint } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { cn } from '$lib/utils'
  import * as Tabs from '$ui/tabs'
  import { supported } from '@/passkeys'
  import { Authentication as OIDC } from './oidc'
  import { Authentication as Passkey } from './passkey'
  import { Authentication as Password } from './password'

  const { class: classes }: { class?: string } = $props()

  let tabsRef = $state<HTMLDivElement | null>(null)

  function onValueChange(value: string) {
    requestAnimationFrame(() => {
      tabsRef?.querySelector<HTMLInputElement>(`[data-value="${value}"] input[autofocus]`)?.focus()
    })
  }

  let value = $state<'passkey' | 'password'>('passkey')

  onMount(() => {
    value = supported ? 'passkey' : 'password'
  })
</script>

<Tabs.Root bind:value class={cn('w-full', classes)} {onValueChange} bind:ref={tabsRef}>
  <div class="flex justify-between gap-2">
    <Tabs.List>
      <Tabs.Trigger value="passkey"><Fingerprint /> Passkey</Tabs.Trigger>
      <Tabs.Trigger value="password"><AtSign /> Email</Tabs.Trigger>
    </Tabs.List>
    <OIDC />
  </div>
  <Tabs.Content value="passkey">
    <Passkey />
  </Tabs.Content>
  <Tabs.Content value="password">
    <Password />
  </Tabs.Content>
</Tabs.Root>
