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
    <Screen
      class="relative overflow-y-auto no-scrollbar h-full pb-8 bg-background"
      underlay={false}>
      <div class="absolute inset-0 overflow-hidden">
        <div class="rays absolute -inset-[10px] opacity-50"></div>
      </div>
      <Section
        class="relative space-y-4 h-full flex flex-col"
        style="view-transition-name: paywall; view-transition-class: transition-spring transition-morph fullscreen-content;">
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

<style>
  .rays {
    --stripes: repeating-linear-gradient(
      100deg,
      var(--background) 0%,
      var(--background) 5%,
      transparent 7%,
      transparent 8%,
      var(--background) 10%
    );
    --glow: repeating-linear-gradient(
      100deg,
      var(--primary) 10%,
      var(--warning) 12%,
      oklch(0.55 0.22 20) 14%,
      oklch(0.6 0.15 300) 16%,
      oklch(0.65 0.13 250) 18%,
      var(--primary) 20%,
      var(--warning) 22%,
      oklch(0.6 0.18 330) 24%,
      oklch(0.6 0.12 230) 26%,
      var(--primary) 28%
    );

    background-image: var(--stripes), var(--glow);
    background-size: 300%, 200%;
    background-position:
      50% 50%,
      50% 50%;
    filter: blur(6px) opacity(70%) saturate(200%);
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    pointer-events: none;
  }

  .rays::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--glow);
    background-size: 200%, 100%;
    background-attachment: fixed;
    mix-blend-mode: multiply;
    animation: rays 60s linear infinite;
  }

  @keyframes rays {
    from {
      background-position:
        50% 50%,
        50% 50%;
    }
    to {
      background-position:
        350% 50%,
        350% 50%;
    }
  }

  @media (prefers-color-scheme: dark) {
    .rays {
      filter: blur(10px) opacity(50%) saturate(200%);
    }

    .rays::after {
      mix-blend-mode: difference;
    }
  }
</style>
