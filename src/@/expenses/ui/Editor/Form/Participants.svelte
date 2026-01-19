<script lang="ts">
  import { cn } from '$lib/utils'
  import * as Card from '$ui/card'
  import * as Tabs from '$ui/tabs'
  import { Section } from '@/app/ui'
  import { dict } from '@/expenses/ui/intl'
  import ByShare from './ByShare.svelte'
  import BySum from './BySum.svelte'
  import type { Props } from './Participants'

  let { value = $bindable(), error = $bindable(false), mode = $bindable('sums') }: Props = $props()
</script>

<Section class={cn('flex flex-col gap-1.5 -mt-3', { shake: error })}>
  <Card.Root class="bg-background p-4 relative">
    <Card.Content class="space-y-2 p-0">
      <Tabs.Root bind:value={mode} class="w-full">
        <Tabs.List class="w-full h-12">
          <Tabs.Trigger id="expenses-participants-tabs-sums" value="sums" class="text-base">
            {$dict.participants.tabs.sums}
          </Tabs.Trigger>
          <Tabs.Trigger id="expenses-participants-tabs-shares" value="shares" class="text-base">
            {$dict.participants.tabs.shares}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="sums">
          <BySum bind:value />
        </Tabs.Content>
        <Tabs.Content value="shares">
          <ByShare bind:value />
        </Tabs.Content>
      </Tabs.Root>
    </Card.Content>
  </Card.Root>
</Section>

<style>
  :global(.shake) {
    animation: shake 0.6s ease-in-out;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(-12px);
    }
    20% {
      transform: translateX(12px);
    }
    30% {
      transform: translateX(-8px);
    }
    40% {
      transform: translateX(8px);
    }
    50% {
      transform: translateX(-4px);
    }
    60% {
      transform: translateX(4px);
    }
    70% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(2px);
    }
    90% {
      transform: translateX(-1px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
