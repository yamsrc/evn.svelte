<script lang="ts">
  import { CodeXml, LogOut } from '@lucide/svelte'
  import { Permission, Scopes } from '@/transmission/ui'
  import { subscribed } from '@/transmission'
  import { account, logout } from '@/iam'
  import { Feedback } from '@/feedback/ui'
  import { Section, Update, Header, Wallpaper, Action } from '@/app/ui'
  import { updateAvailable } from '@/app'
  import { Cosmetics, Delete, Grammar, Language } from '@/accounts/ui'
  import { clicks, shellVersion } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { version } from '$config/configuration'
  import { Actions } from '$com/shell'
  import { Separator } from '$com/separator'
  import { Clipboard, Hold } from '$com/buttons'
  import { goto } from '$app/navigation'
  import { dev } from '$app/environment'

  async function getout() {
    logout()
    void goto('/')
  }

  const onpress = clicks(5, () => goto('/dev/'))
</script>

{#if $account}
  <Section>
    <Header.Root>
      <Header.Title>{$dict.profile.title}</Header.Title>
      <Header.Actions>
        <Hold
          id="me-logout-button"
          name="logout"
          onclick={getout}
          {onpress}
          variant="ghost"
          size="icon"
          position="left"
          label={$dict.actions.holdToLogout}
          class="text-destructive">
          <LogOut />
        </Hold>
      </Header.Actions>
    </Header.Root>
  </Section>

  <Section>
    <Cosmetics
      account={$account}
      pictureStyle="view-transition-name: my-avatar; view-transition-class: transition-morph;" />
  </Section>

  <Separator class="mt-5" />

  <Section class="flex flex-col gap-4 flex-1 [&_p]:text-muted-foreground">
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
    <Wallpaper />
  </Section>

  <Section class="space-y-2">
    {#if $subscribed === false}
      <h2 style="view-transition-name: me-notifications-title;">
        {$dict.profile.notifications.title}
      </h2>
      <Permission name="transmission-settings" class="transmission-settings-morph" />
    {:else}
      <Scopes class="transmission-settings-morph" />
    {/if}
  </Section>

  <Separator />

  <Section class="flex justify-center">
    <Feedback />
  </Section>

  <Section class="space-y-2 mt-4">
    <footer class="text-muted-foreground text-sm">
      <div class="flex justify-between">
        <div class="px-2 flex-1 relative text-xs leading-8">
          v{version}/{shellVersion}
        </div>
        <!-- <p>
          &copy; <a href="https://seed.me" target="_blank">seed.me</a>
          2025–{new Date().getFullYear()}
        </p> -->
        <Clipboard
          text={$account.id}
          variant="ghost"
          size="sm"
          label={$account.id.slice(0, 8)}
          class="flex-row-reverse flex-1 font-normal" />
        <Delete class="py-0 underline underline-offset-3 font-normal flex-1" ondelete={getout} />
      </div>
      {#if $updateAvailable}
        <div class="px-2">
          <Update variant="outline" size="sm">
            {$dict.update.label}
          </Update>
        </div>
      {/if}
    </footer>
  </Section>
{/if}

{#if dev}
  <Actions>
    <Action id="me-dev-button" href="/dev/" variant="outline">
      <CodeXml />
    </Action>
  </Actions>
{/if}

<style>
  :global(.transmission-settings-morph) {
    view-transition-class: transition-morph;
  }
</style>
