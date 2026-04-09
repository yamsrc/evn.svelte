<script lang="ts">
  import { Section } from '@/app/ui'
  import { Screen } from '@/app/ui'
  import { Fullscreen } from '$com/fullscreen'
  import { open } from './store'
  import { cta } from './store'
  import { dict } from './intl'
  import Offer from './Offer.svelte'
  import Complete from './Complete.svelte'

  const steps = ['offer', 'complete'] as const
  let step = $state<(typeof steps)[number]>(steps[0])

  function next() {
    step = steps[(steps.indexOf(step) + 1) % steps.length]
  }
</script>

<Fullscreen bind:open={$open}>
  {#snippet content()}
    <Screen class="overflow-y-auto no-scrollbar h-full pb-8">
      <Section class="space-y-4 h-full flex flex-col">
        <h1>{$dict.paywall.title}</h1>
        {#if step === 'offer'}
          <Offer {next} />
        {:else if step === 'complete'}
          <Complete cta={$cta} {next} />
        {/if}
      </Section>
    </Screen>
  {/snippet}
  <div></div>
</Fullscreen>
