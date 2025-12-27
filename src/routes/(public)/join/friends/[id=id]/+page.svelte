<script lang="ts">
  import { page } from '$app/state'
  import { Loader } from '$com/loader'
  import { Screen } from '$com/shell'
  import { Footer } from '@/app'
  import { Authenticated } from '@/iam/ui'
  import { Languages } from '@/iam/ui'
  import Invitation from './Invitation.svelte'

  const id = page.params.id as string
</script>

<Screen class="flex-1 flex flex-col justify-between">
  <Authenticated>
    {#snippet screen({ authentication })}
      <Languages />
      <Invitation {id}>
        {@render authentication()}
      </Invitation>
      <Footer />
    {/snippet}

    <Invitation {id}>
      <Loader />
    </Invitation>
  </Authenticated>
</Screen>
