<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/buttons'
  import { Separator } from '$com/separator'
  import { version } from '$config'
  import { dict } from '$lib/intl'
  import { Cosmetics, Delete, Grammar, Language } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Background } from '@/app/ui'
  import { Feedback } from '@/feedback/ui'
  import { logout } from '@/iam'
  import { account } from '@/iam'

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
          id="me-logout-button"
          onclick={getout}
          variant="ghost"
          size="icon"
          position="left"
          label={$dict.actions.holdToLogout}>
          <LogOut class="size-5" />
        </Hold>
      </Header.Actions>
    </Header.Root>
  </Section>

  <Section>
    <Cosmetics account={$account} pictureStyle="view-transition-name: my-avatar;" />
  </Section>

  <Separator class="mt-5" />

  <Section class="flex flex-col gap-6 flex-1 [&_p]:text-muted-foreground">
    <div class="flex flex-col gap-2">
      <h2>{$dict.profile.language.title}</h2>
      <p>{$dict.profile.language.description}</p>
      <Language />
    </div>
    <div class="flex flex-col gap-2">
      <h3>{$dict.profile.grammar.title}</h3>
      <p>{$dict.profile.grammar.description}</p>
      <Grammar account={$account} />
    </div>
  </Section>

  <Section class="space-y-2">
    <h2>{$dict.profile.background.title}</h2>
    <div class="border h-40 rounded-lg bg-background">
      <Background scrollable />
    </div>
  </Section>

  <Section>
    <Feedback />
  </Section>

  <Section>
    <Separator class="mb-4" />
    <footer class="text-muted-foreground text-sm text-center">
      <p>{$dict.copyright(Date.now())}</p>
      <p>v{version}</p>
      <Delete class="py-0 underline underline-offset-3 font-normal" ondelete={getout} />
    </footer>
  </Section>
{/if}
