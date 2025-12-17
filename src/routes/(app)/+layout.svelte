<script lang="ts">
  import { Screen } from '$lib/components/shell'
  import { Authenticated } from '@/iam/ui'
  import Languages from '@/iam/ui/Languages.svelte'
  import Footer from './Footer.svelte'
  import Logo from './logo.svg'

  const { children } = $props()
</script>

<Authenticated>
  {#snippet screen({ authentication })}
    <Screen>
      <div class="flex-1 flex flex-col justify-between">
        <Languages />
        <div class="flex-1 flex flex-col items-center px-4 max-w-sm mx-auto">
          <div class="py-[10vh]">
            <img src={Logo} alt="seed.me" class="h-10 mx-auto" />
          </div>
          {@render authentication()}
        </div>
        <Footer />
      </div>
    </Screen>
  {/snippet}
  {@render children()}
</Authenticated>
