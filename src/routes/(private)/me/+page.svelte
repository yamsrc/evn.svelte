<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/hold'
  import { Section } from '$com/section'
  import { version } from '$config'
  import { dict } from '$lib/intl'
  import { Picture, Name, Language } from '@/account/ui'
  import { Delete } from '@/account/ui'
  import { Header } from '@/app/ui'
  import { Feedback } from '@/feedback/ui'
  import { logout } from '@/iam'
  import { account } from '@/iam'
  import { time } from '@/realtime'

  async function getout() {
    logout()
    void goto('/')
  }
</script>

{#if $account}
  <Section>
    <Header.Root>
      <Header.Title>{$dict.profile.title}</Header.Title>
      <Header.Actions>
        <Hold
          onclick={getout}
          variant="ghost"
          class="size-12 bg-accent/50 border border-border"
          position="left"
          label={$dict.actions.holdToLogout}
        >
          <LogOut class="size-5" />
        </Hold>
      </Header.Actions>
    </Header.Root>
  </Section>
  <Section class="flex flex-col gap-6">
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
    <Feedback />
  </Section>

  <Section>
    <div class="w-full border-b border-border mb-5"></div>
    <footer class="text-muted-foreground text-sm flex flex-col gap-2 items-center">
      <p>{$dict.copyright($time)}</p>
      <a href="/terms/">{$dict.terms}</a>
      <a href="/privacy/">{$dict.privacy}</a>
      <Delete class="inline-block p-0 font-normal h-auto" />
      <span>v{version}</span>
    </footer>
  </Section>
{/if}
