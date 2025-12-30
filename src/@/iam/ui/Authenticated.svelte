<script lang="ts">
  import { browser } from '$app/environment'
  import { Loader } from '$com/loader'
  import { inApp } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { authenticated, greeting, account, method } from '@/iam'
  import Authentication from './Authentication.svelte'
  import InApp from './InApp.svelte'
  import Languages from './Languages.svelte'
  import Refresh from './Refresh.svelte'
  import type { Props } from './Authenticated'

  const { children, screen }: Props = $props()
</script>

{#snippet authentication()}
  {#if $account}
    <Refresh account={$account} method={$method} />
  {:else if inApp}
    <InApp />
  {:else}
    <Authentication class={cn('scale-0 transition-transform', browser && 'scale-100')} />
  {/if}
{/snippet}

{#if browser && $authenticated}
  {@render children()}
{:else if $greeting || !browser}
  <div class="flex items-center justify-center h-screen">
    <Loader />
  </div>
{:else if screen}
  {@render screen({ authentication })}
{:else}
  <Languages />
  <div class="flex items-center justify-center pt-[14vh] px-4 max-w-sm mx-auto">
    {@render authentication()}
  </div>
{/if}
