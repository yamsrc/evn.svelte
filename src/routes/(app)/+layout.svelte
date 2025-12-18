<script lang="ts">
  import { Section } from '$com/section'
  import { Nav, Screen } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Authenticated } from '@/iam/ui'
  import Languages from '@/iam/ui/Languages.svelte'
  import Actions from './Actions.svelte'
  import Footer from './Footer.svelte'
  import Logo from './logo.svg'
  import { sections } from './sections'

  const { children } = $props()
</script>

<Screen class="flex-1 flex flex-col justify-between">
  <Authenticated>
    {#snippet screen({ authentication })}
      <div class="pt-2">
        <Languages />
      </div>
      <Section class="flex-1 flex flex-col items-center max-w-sm mx-auto">
        <div class="py-[10vh]">
          <img src={Logo} alt="seed.me" class="h-10 mx-auto" />
        </div>
        {@render authentication()}
      </Section>
      <Footer />
    {/snippet}
    {@render children()}
    <Nav position="start" sections={sections($dict)} />
    <Actions />
  </Authenticated>
</Screen>
