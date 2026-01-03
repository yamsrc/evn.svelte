<script lang="ts">
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import * as Card from '$ui/card'
  import { Avatar } from '@/accounts/ui'
  import { account } from '@/iam'
  import Name from './onboarding/Name.svelte'
  import type { Props } from './Named'

  const { children }: Props = $props()
</script>

{#if $account !== null}
  {#if $account.name}
    {@render children()}
  {:else}
    <Section class="flex-1 flex flex-col justify-center space-y-4">
      <Card.Root class="w-full max-w-sm mx-auto">
        <Card.Header class="flex flex-1 flex-col items-start justify-center gap-2 relative">
          <Avatar class="size-10 absolute top-0 right-6 border border-border rounded-full" />
          <Card.Title>{$dict.onboarding.name.title}</Card.Title>
          <Card.Description>{$dict.onboarding.name.description}</Card.Description>
        </Card.Header>
        <Card.Content>
          <Name account={$account} autofocus class="text-left" />
        </Card.Content>
      </Card.Root>
    </Section>
  {/if}
{/if}
