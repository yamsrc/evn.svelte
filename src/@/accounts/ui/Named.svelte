<script lang="ts">
  import { dict } from '$lib/intl'
  import { Header } from '@/app/ui'
  import Section from '@/app/ui/Section.svelte'
  import { account } from '@/iam'
  import Name from './onboarding/Name.svelte'
  import type { Props } from './Named'

  const { children }: Props = $props()
</script>

{#if $account !== null}
  {#if $account.name}
    {@render children()}
  {:else}
    <Section class="h-0 m-0">
      <Header.Root class="items-start">
        <Header.Title>{$dict.onboarding.name.title}</Header.Title>
      </Header.Root>
    </Section>
    <Section class="m-auto max-w-sm">
      <Name account={$account} autofocus />
    </Section>
  {/if}
{/if}
