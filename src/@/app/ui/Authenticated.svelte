<script lang="ts">
  import { Named } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { Footer } from '@/app/ui'
  import { Authenticated } from '@/iam/ui'
  import { Languages } from '@/iam/ui'
  import type { Props } from './Authenticated'

  const { children, ...rest }: Props = $props()
</script>

<Authenticated {...rest}>
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
  </Named>
</Authenticated>
