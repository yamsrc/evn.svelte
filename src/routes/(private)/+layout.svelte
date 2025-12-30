<script lang="ts">
  import { Section } from '$com/section'
  import { Nav, Screen } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Named } from '@/accounts/ui'
  import { Footer } from '@/app/ui'
  import { Authenticated } from '@/iam/ui'
  import { Languages } from '@/iam/ui'
  import Actions from './Actions.svelte'
  import { sections } from './sections'

  const { children } = $props()
</script>

<Screen class="flex-1 flex flex-col justify-between">
  <Authenticated>
    {#snippet screen({ authentication })}
      <Languages />
      <Section class="flex-1 flex flex-col items-center max-w-sm mx-auto">
        <div class="py-[10vh]">
          <img src="/logo.svg" alt="seed.me" class="h-10 mx-auto" />
        </div>
        {@render authentication()}
      </Section>
      <Footer />
    {/snippet}
    <Named>
      {@render children()}
      <Nav position="start" sections={sections($dict)} class="z-1000" />
      <Actions />
    </Named>
  </Authenticated>
</Screen>
