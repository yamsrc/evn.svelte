<script lang="ts">
  import { AtSign, FingerprintPattern } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { cn } from '$lib/utils'
  import * as Tabs from '$ui/tabs'
  import { dict } from '@/iam/ui/intl'
  import { supported } from '@/passkeys'
  import { Authentication as OIDC } from './oidc'
  import { Authentication as Passkey } from './passkey'
  import { Authentication as Password } from './password'
  import type { Props } from './Authentication'

  const { class: classes, account }: Props = $props()

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
      <Tabs.Trigger value="passkey" data-marker="passkey-tab">
        <FingerprintPattern color="var(--muted-foreground)" />
        {$dict.auth.passkey}
      </Tabs.Trigger>
      <Tabs.Trigger value="password" id="iam-email-tab">
        <AtSign color="var(--muted-foreground)" />
        {$dict.auth.email}
      </Tabs.Trigger>
    </Tabs.List>
    <OIDC />
  </div>
  <Tabs.Content value="passkey">
    <Passkey {account} />
  </Tabs.Content>
  <Tabs.Content value="password">
    <Password />
  </Tabs.Content>
</Tabs.Root>
