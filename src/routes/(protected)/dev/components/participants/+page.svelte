<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl/dev'
  import * as Card from '$ui/card'
  import { Checkbox } from '$ui/checkbox'
  import { Input } from '$ui/input'
  import { Label } from '$ui/label'
  import { accounts } from '@/accounts'
  import { Panel as AccountPanel } from '@/accounts/ui'
  import { Participants } from '@/app/ui'
  import { Header, Section } from '@/app/ui'
  import { getContext } from './Context'

  const ctx = getContext()
  const identities = $derived(ctx.value.identities)
  const options = $state({ managedContactsCreation: false, shareUrl: undefined })

  function onadd(ids: string[]) {
    ctx.value.identities = [...identities, ...ids]
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.participants.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Card.Root class="bg-background">
    <Card.Header>
      <Card.Title>Settings</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-6">
      <Label>
        <Checkbox class="bg-input" bind:checked={options.managedContactsCreation} />
        {$dict.components.participants.managedContactsCreation}
      </Label>

      <Label class="flex-col items-start">
        {$dict.components.participants.shareUrl}
        <Input class="bg-input" bind:value={options.shareUrl} placeholder="/join/[domain]/:id/" />
      </Label>
    </Card.Content>
  </Card.Root>
</Section>

<Section class="space-y-2">
  <ul class="flex flex-col gap-1.5">
    {#each identities as identity (identity)}
      <li>
        <Async store={accounts.get(identity)}>
          {#snippet awaited(account)}
            <AccountPanel {account} />
          {/snippet}
        </Async>
      </li>
    {/each}
  </ul>
  <Participants.Add class="w-full" exclude={identities} {onadd} {options} />
</Section>
