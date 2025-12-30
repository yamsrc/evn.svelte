<script lang="ts">
  import { LogOut, Plus } from '@lucide/svelte'
  import { Async, ok } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/hold'
  import { Section } from '$com/section'
  import { Separator } from '$com/separator'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Panel } from '@/accounts/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { groups, del } from '@/groups'
  import { Cosmetics, Create } from '@/groups/ui'
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

  const members: string[] = $derived(group?.identities.filter((id) => id !== $account?.id) ?? [])

  const balance: BalanceSummary = $derived.by(() => {
    if (!ok($contacts) || !group) return { from: 0, to: 0 }

    const balances = members.map(
      (id) => $contacts.find(({ identity }) => identity === id)?.balance ?? 0,
    )

    const from = calc(balances.filter((balance) => balance > 0))
    const to = calc(balances.filter((balance) => balance < 0))

    return { from, to }
  })
</script>

<Section>
  <Header.Root>
    <Back href="/contacts/">{$dict.contacts.title}</Back>
    <Header.Actions>
      <Hold
        onclick={leave}
        variant="ghost"
        class="size-12 bg-accent/50 border border-border"
        position="left"
        label={$dict.groups.leave}
        disabled={!group}
      >
        <LogOut class="size-5" />
      </Hold>
    </Header.Actions>
  </Header.Root>
</Section>

{#if group}
  <Section class="flex flex-col gap-2 items-center">
    <Cosmetics id={group.id} name={group.name} />
  </Section>

  <Separator />

  <Section class="text-center">
    <div>{$dict.groups.summary.balance.from(currency(balance.from))}</div>
    <div>{$dict.groups.summary.balance.to(currency(balance.to))}</div>
  </Section>

  <Async store={contacts}>
    {#snippet awaited(contacts)}
      <Section class="flex flex-col gap-2">
        <h2>{$dict.groups.members.title}</h2>
        {#if !members?.length}
          <p class="text-muted-foreground">
            {$dict.groups.members.empty}
          </p>
        {:else}
          {#each members as identity (identity)}
            {@const contact = contacts.find((contact) => contact.identity === identity)}
            {#if contact?.account && ok(contact.account)}
              <Panel account={contact.account} balance={contact.balance} />
            {/if}
          {/each}
        {/if}
        <Button size="lg" class="w-full" href={`/contacts/groups/${id}/add`} disabled={!group}>
          <Plus />
          {$dict.groups.members.addMember}
        </Button>
      </Section>
    {/snippet}
  </Async>
  <!-- TODO: add history -->
{:else}
  <Section class="flex flex-col gap-2 items-center">
    <Create />
  </Section>
{/if}
