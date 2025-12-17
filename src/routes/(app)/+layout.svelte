<script lang="ts">
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

<Authenticated>
  {#snippet screen({ authentication })}
    <Screen class="flex-1 flex flex-col justify-between">
      <Languages />
      <div class="flex-1 flex flex-col items-center px-4 max-w-sm mx-auto">
        <div class="py-[10vh]">
          <img src={Logo} alt="seed.me" class="h-10 mx-auto" />
        </div>
        {@render authentication()}
      </div>
      <Footer />
    </Screen>
  {/snippet}
  {@render children()}
  <Nav position="start" sections={sections($dict)} />
  <Actions />
</Authenticated>
