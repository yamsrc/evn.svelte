<script lang="ts">
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import * as Card from '$ui/card'
  import { account } from '@/iam'
  import Name from './onboarding/Name.svelte'
  import type { Props } from './Ready'

  const { children }: Props = $props()

  const ready = $derived($account?.name && $account?.picture && $account?.locale)
</script>

{#if ready}
  {@render children()}
{:else if $account && !$account?.name}
  <Section class="flex-1 flex flex-col justify-center">
    <Card.Root class="w-full max-w-sm mx-auto">
      <Card.Header class="flex flex-col items-start justify-center gap-2">
        <Card.Title>{$dict.onboarding.name.title}</Card.Title>
        <Card.Description>{$dict.onboarding.name.description}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Name account={$account} />
      </Card.Content>
    </Card.Root>
  </Section>
{/if}
