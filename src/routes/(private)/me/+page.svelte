<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/hold'
  import { Section } from '$com/section'
  import { Separator } from '$com/separator'
  import { version } from '$config'
  import { dict } from '$lib/intl'
  import { Cosmetics, Delete, Language } from '@/accounts/ui'
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

  <Section>
    <Cosmetics account={$account} />
  </Section>

  <Separator class="mt-5" />

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
    <Separator class="mb-4" />
    <footer class="text-muted-foreground text-sm">
      <p>
        &copy; <a href="https://seed.me" target="_blank">seed.me</a>, 2025–{new Date(
          $time,
        ).getFullYear()}
      </p>
      <div>
        <a href="/terms/">{$dict.terms}</a>,
        <a href="/privacy/">{$dict.privacy}</a>,
        <Delete class="inline-block p-0 font-normal h-auto" />
      </div>
      <p>v{version}</p>
    </footer>
  </Section>
{/if}
