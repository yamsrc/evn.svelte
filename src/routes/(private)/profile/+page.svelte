<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/hold'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Picture, Name, Language } from '@/account/ui'
  import { logout } from '@/iam'
  import { account } from '@/iam'

  async function getout() {
    logout()
    void goto('/')
  }
</script>

{#if $account}
  <Section class="flex flex-col gap-6">
    <header class="flex justify-between items-center relative">
      <h1>{$dict.profile.title}</h1>
      <Hold
        onclick={getout}
        variant="ghost"
        class="size-12 bg-accent/50 border border-border"
        position="left"
        label={$dict.actions.holdToLogout}
      >
        <LogOut class="size-5" />
      </Hold>
    </header>
    <Picture account={$account} size={150} class="mx-auto" />
    <Name account={$account} class="mx-auto w-3xs text-3xl font-bold" />
  </Section>

  <div class="w-full border-b border-border mt-5"></div>

  <Section class="flex flex-col gap-6 flex-1">
    <div class="flex flex-col gap-2">
      <h2>{$dict.profile.language.title}</h2>
      <p class="text-muted-foreground">{$dict.profile.language.description}</p>
      <Language />
    </div>
  </Section>

  <Section>
    <div class="w-full border-b border-border mb-5"></div>
    <footer class="flex flex-col gap-2 text-muted-foreground text-sm">
      {$dict.copyright}
      <div class="flex gap-2">
        <a href="/terms/">{$dict.terms}</a>
        &bull;
        <a href="/privacy/">{$dict.privacy}</a>
      </div>
    </footer>
  </Section>
{/if}
