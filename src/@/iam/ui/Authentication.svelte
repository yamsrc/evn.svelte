<script lang="ts">
  import { onMount } from 'svelte'
  import { AtSign, FingerprintPattern } from '@lucide/svelte'
  import { supported } from '@/passkeys'
  import { dict } from '@/iam/ui/intl'
  import * as Tabs from '$ui/tabs'
  import { cn } from '$lib/utils'
  import { Authentication as Password } from './password'
  import { Authentication as Passkey } from './passkey'
  import { Authentication as OIDC } from './oidc'
  import type { Props } from './Authentication'

  const { class: classes, account, oidc, oncreate, onauthenticate }: Props = $props()

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
    <OIDC {account} apple={oidc?.apple !== false} google={oidc?.google !== false} {onauthenticate} />
  </div>
  <Tabs.Content value="passkey">
    <Passkey {account} oncreate={(account) => oncreate?.(account, 'passkey')} {onauthenticate} />
  </Tabs.Content>
  <Tabs.Content value="password">
    <Password {account} oncreate={(account) => oncreate?.(account, 'password')} {onauthenticate} />
  </Tabs.Content>
</Tabs.Root>
