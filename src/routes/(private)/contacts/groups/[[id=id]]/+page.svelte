<script lang="ts">
  import { LogOut, Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/hold'
  import Section from '$com/section/Section.svelte'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Separator } from '$ui/separator'
  import { Item } from '@/account/ui'
  import { contacts } from '@/contacts'
  import { groups, del } from '@/groups'
  import { Name } from '@/groups/ui'
  import { account } from '@/iam'

  const id = $derived(page.params.id)

  function created(id: string) {
    goto(`/contacts/groups/${id}`)
  }

  async function leave() {
    if (!id) return

    del(id)

    goto('/contacts/')
  }
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const group = groups.find((group) => group.id === id)}
    {@const members = group?.identities.filter((id) => id !== $account?.id)}
    <Section class="flex flex-col gap-6 pt-2">
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
      <!-- TODO: calculate balance -->
      <div>Members of this group owe 200 to you</div>
      <div>You owe 100 to them</div>
    </Section>

    <Section class="flex flex-col gap-2">
      <h2>{$dict.groups.members.title}</h2>
      {#if !members?.length}
        <p class="text-muted-foreground">
          Nobody here yet. Add some members to start using this group.
        </p>
      {:else}
        {#each members as identity (identity)}
          <Async store={contacts}>
            {#snippet awaited(contacts)}
              {@const contact = contacts.find((contact) => contact.identity === identity)}
              <Item id={identity} balance={contact?.balance ?? 0} />
            {/snippet}
          </Async>
        {/each}
      {/if}
      <Button size="lg" class="w-full" href={`/contacts/groups/${id}/add`} disabled={!group}>
        <Plus />
        {$dict.groups.members.addMember}
      </Button>
    </Section>
    <!-- TODO: add history -->
  {/snippet}
</Async>
