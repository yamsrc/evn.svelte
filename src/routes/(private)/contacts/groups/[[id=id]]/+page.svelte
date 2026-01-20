<script lang="ts">
  import { LogOut, UserPlus } from '@lucide/svelte'
  import { Async, ok } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/buttons'
  import { Separator } from '$com/separator'
  import { Actions } from '$com/shell'
  import { locale } from '$lib/intl'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { accounts } from '@/accounts'
  import { Panel } from '@/accounts/ui'
  import { Action, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { groups, del } from '@/groups'
  import { Cosmetics } from '@/groups/ui'
  import { account } from '@/iam'
  import type { Group } from '@/groups'

  type BalanceSummary = {
    from: number
    to: number
  }

  const id = $derived(page.params.id)

  async function leave() {
    if (!id) return

    del(id)

    goto('/contacts/')
  }

  const calc = (balances: number[]) => Math.abs(balances.reduce((acc, balance) => acc + balance, 0))

  const group: Group | undefined = $derived(
    ok($groups) ? $groups.find((group) => group.id === id) : undefined,
  )

  const identities: string[] = $derived(group?.identities.filter((id) => id !== $account?.id) ?? [])

  const balance: BalanceSummary = $derived.by(() => {
    if (!ok($contacts) || !group) return { from: 0, to: 0 }

    const balances = identities.map(
      (id) => $contacts.find(({ identity }) => identity === id)?.balance ?? 0,
    )

    const from = calc(balances.filter((balance) => balance > 0))
    const to = calc(balances.filter((balance) => balance < 0))

    return { from, to }
  })
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.groups.create}</Header.Title>
    {#if id}
      <Header.Actions>
        <Hold
          onclick={leave}
          variant="ghost"
          class="size-12 bg-accent/50 border border-border"
          position="left"
          label={$dict.groups.leave}
          disabled={!group}>
          <LogOut class="size-5" />
        </Hold>
      </Header.Actions>
    {/if}
  </Header.Root>
</Section>

{#if group}
  <Section class="flex flex-col gap-2 items-center">
    <Cosmetics {group} />
  </Section>

  <Separator />

  {#if identities.length > 0}
    <Section class="text-center">
      {#if balance.from === 0 && balance.to === 0}
        <div>{$dict.groups.summary.balance.even}</div>
      {:else if balance.from > 0}
        <div>{$dict.groups.summary.balance.from(currency(balance.from, $locale))}</div>
      {:else if balance.to > 0}
        <div>{$dict.groups.summary.balance.to(currency(balance.to, $locale))}</div>
      {/if}
    </Section>
  {/if}

  <Async store={contacts}>
    {#snippet awaited(contacts)}
      <Section class="flex flex-col gap-2">
        <h2>{$dict.groups.members.title}</h2>
        {#if !identities?.length}
          <p class="text-muted-foreground">
            {$dict.groups.members.empty}
          </p>
        {:else}
          {#each identities as identity (identity)}
            {@const contact = contacts.find((contact) => contact.identity === identity)}
            {#if contact?.account && ok(contact.account)}
              <Panel account={contact.account} balance={contact.balance} />
            {:else}
              <Async store={accounts.get(identity)}>
                {#snippet awaited(account)}
                  <Panel {account} />
                {/snippet}
              </Async>
            {/if}
          {/each}
        {/if}
      </Section>
    {/snippet}
  </Async>

  <Actions>
    <Action href={`/contacts/groups/${id}/add`} disabled={!group}>
      <UserPlus />
      <span>{$dict.groups.members.addMember}</span>
    </Action>
  </Actions>
  <!-- TODO: add history -->
{:else}
  <Section class="flex flex-col gap-2 items-center">
    <Cosmetics />
  </Section>
{/if}
