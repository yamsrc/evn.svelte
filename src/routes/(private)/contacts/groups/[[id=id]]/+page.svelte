<script lang="ts">
  import { LogOut, Plus } from '@lucide/svelte'
  import { ok, ensure } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/hold'
  import Section from '$com/section/Section.svelte'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Separator } from '$ui/separator'
  import { accounts } from '@/account'
  import { Item } from '@/account/ui'
  import { contacts as contactsStore } from '@/contacts'
  import { groups, del } from '@/groups'
  import { Name } from '@/groups/ui'
  import { account } from '@/iam'
  import type { ContactWithAccount } from '@/contacts/ui'
  import type { Group } from '@/groups'

  type BalanceSummary = {
    from: number
    to: number
  }

  const id = $derived(page.params.id)

  function created(id: string) {
    goto(`/contacts/groups/${id}`)
  }

  async function leave() {
    if (!id) return

    del(id)

    goto('/contacts/')
  }

  const calc = (balances: number[]) => Math.abs(balances.reduce((acc, balance) => acc + balance, 0))

  const group: Group | undefined = $derived(
    ok($groups) ? $groups.find((group) => group.id === id) : undefined,
  )

  const contacts: ContactWithAccount[] = $derived.by(() => {
    if (!ok(contactsStore)) return []

    return $contactsStore.map((contact) => {
      const account = accounts.get(contact.identity)

      return { ...contact, account: ensure(account) }
    })
  })
  const members: string[] = $derived(group?.identities.filter((id) => id !== $account?.id) ?? [])

  const balance: BalanceSummary = $derived.by(() => {
    if (!contacts || !group) return { from: 0, to: 0 }

    const balances = members.map(
      (id) => contacts.find(({ identity }) => identity === id)?.balance ?? 0,
    )

    const from = calc(balances.filter((balance) => balance > 0))
    const to = calc(balances.filter((balance) => balance < 0))

    return { from, to }
  })
</script>

<Section class="flex flex-col gap-6">
  <header class="flex justify-between items-center relative">
    <Back href="/contacts/">{$dict.contacts.title}</Back>
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
  </header>
</Section>

<Section class="flex flex-col gap-2 items-center">
  <Name id={group?.id} name={group?.name} oncreated={created} />
  <p class="text-muted-foreground text-sm">{$dict.groups.name.description}</p>
</Section>

<Separator />

<Section class="text-center">
  <div>{$dict.groups.summary.balance.from(currency(balance.from))}</div>
  <div>{$dict.groups.summary.balance.to(currency(balance.to))}</div>
</Section>

<Section class="flex flex-col gap-2">
  <h2>{$dict.groups.members.title}</h2>
  {#if !members?.length}
    <p class="text-muted-foreground">
      {$dict.groups.members.empty}
    </p>
  {:else}
    {#each members as identity (identity)}
      {@const contact = contacts.find((contact) => contact.identity === identity)}
      {#if contact}
        <Item account={contact.account} balance={contact.balance} />
      {/if}
    {/each}
  {/if}
  <Button size="lg" class="w-full" href={`/contacts/groups/${id}/add`} disabled={!group}>
    <Plus />
    {$dict.groups.members.addMember}
  </Button>
</Section>
<!-- TODO: add history -->
