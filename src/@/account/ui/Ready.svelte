<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { Section } from '$com/section'
  import { assets } from '$config'
  import { dict, locale } from '$lib/intl'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import { set } from '@/account'
  import { Picture } from '@/account/ui'
  import { account } from '@/iam'
  import { logout } from '@/iam'
  import Name from './onboarding/Name.svelte'
  import type { Props } from './Ready'

  const { children }: Props = $props()

  let filled = $state(false)

  $effect(() => {
    if (filled) return

    filled = true

    const updates: { locale?: string; picture?: string } = {}

    if (!$account?.locale) updates.locale = $locale

    if (!$account?.picture) updates.picture = assets[Math.floor(Math.random() * assets.length)]

    if (Object.keys(updates).length > 0) set(updates)
  })

  const ready = $derived($account?.name && $account?.picture && $account?.locale)
</script>

{#if ready}
  {@render children()}
{:else if $account && !$account?.name}
  <Section class="flex-1 flex flex-col justify-center space-y-4">
    <Card.Root class="w-full max-w-sm mx-auto">
      <Card.Header class="flex flex-1 flex-col items-start justify-center gap-2 relative">
        <Picture
          account={$account}
          class="size-10 absolute top-0 right-6 border border-border rounded-full"
        />
        <Card.Title>{$dict.onboarding.name.title}</Card.Title>
        <Card.Description>{$dict.onboarding.name.description}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Name account={$account} />
      </Card.Content>
    </Card.Root>
    <Button onclick={logout} class="mx-auto">
      <LogOut />
      {$dict.actions.signout}
    </Button>
  </Section>
{/if}
