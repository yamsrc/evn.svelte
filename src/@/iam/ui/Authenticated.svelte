<script lang="ts">
  import { authenticated, greeting, account as iam, method, processing } from '@/iam'
  import { cn } from '$lib/utils'
  import { inApp } from '$lib/tools'
  import { locales } from '$lib/intl'
  import { Loader } from '$com/loader'
  import { browser } from '$app/environment'
  import Refresh from './Refresh.svelte'
  import Languages from './Languages.svelte'
  import InApp from './InApp.svelte'
  import Authentication from './Authentication.svelte'
  import type { Props } from './Authenticated'

  const { children, screen, account, oidc, oncreate, onauthenticate }: Props = $props()
</script>

{#snippet authentication()}
  {#if $iam}
    <Refresh account={$iam} method={$method} {onauthenticate} />
  {:else if inApp}
    <InApp />
  {:else}
    <Authentication
      class={cn('scale-0 transition-transform', browser && 'scale-100')}
      {account}
      {oidc}
      {oncreate}
      {onauthenticate}
    />
  {/if}
{/snippet}

{#if browser && $authenticated}
  {@render children()}
{:else if $greeting || $processing || !browser}
  <div class="flex items-center justify-center h-screen">
    <Loader />
  </div>
{:else if screen}
  {@render screen({ authentication })}
{:else}
  {#if locales.length > 1}
    <Languages />
  {/if}
  <div class="flex items-center justify-center pt-[14vh] px-4 max-w-sm mx-auto">
    {@render authentication()}
  </div>
{/if}
