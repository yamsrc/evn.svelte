<script lang="ts">
  import { writable } from 'svelte/store'
  import { ensure, ok } from 'svas'
  import { ChartPie, Coins, Component, Fan, Plus, UserPlus } from '@lucide/svelte'
  import { Scan } from '@/receipts/ui'
  import { account } from '@/iam'
  import { dict as contactsDict } from '@/contacts/ui/intl'
  import { adventures } from '@/adventures'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { QR } from '$com/qr'
  import * as Dropdown from '$com/dropdown'
  import { Share } from '$com/buttons'
  import { goto } from '$app/navigation'
  import { actionVariants } from './Action'
  import type { Props } from './Actions'

  const { showContacts = true }: Props = $props()

  const active = writable(false)
  const variant = [Dropdown.itemVariants({ direction: 'row' }), 'whitespace-nowrap']

  let dropdown = $state<Dropdown.Root | undefined>()

  const adventure = $derived.by(() => {
    if (!ok($adventures)) return

    const active = $adventures.filter((a) => !a.archived)

    return active.length > 0
      ? active.reduce((a, b) => (a._created > b._created ? a : b))
      : undefined
  })

  function data(close = true) {
    const me = ensure(account)

    if (close) dropdown?.close()

    return { url: `${window.location.origin}/join/friends/${me.id}/` }
  }

  function text() {
    return data(false).url
  }
</script>

<Actions {active}>
  <Dropdown.Root bind:this={dropdown} onopen={(o) => active.set(o)}>
    <Dropdown.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Layer>
        <Dropdown.Group direction="col">
          {#if adventure}
            <Dropdown.Item
              id="nav-actions-adventure-expense-button"
              href={`/adventures/${adventure.id}/expenses/editor/`}>
              <Coins />
              {adventure.title}
            </Dropdown.Item>
          {/if}
          <Dropdown.Item id="nav-actions-adventures-new-button" href="/adventures/editor/">
            <Fan />
            {$dict.actions.adventures.adventure}
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        {#if showContacts}
          <Dropdown.Group direction="col">
            <Dropdown.Item id="nav-actions-contacts-new-button" layer="contacts">
              <UserPlus />
              {$dict.actions.contacts.contact}
            </Dropdown.Item>
            <Dropdown.Item id="nav-actions-contacts-groups-button" href="/contacts/groups/">
              <Component />
              {$dict.actions.contacts.group}
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
        {/if}
        <Dropdown.Group direction="row">
          <Dropdown.Item id="nav-actions-cheques-input-button" href="/expenses/editor/">
            <ChartPie />
            {$dict.actions.expenses.split}
          </Dropdown.Item>
          <Scan
            variant="ghost"
            class={[Dropdown.itemVariants({ direction: 'row' }), '[&_svg]:text-primary!']}
            oncomplete={(id: string) => goto(`/receipts/${id}/`)} />
        </Dropdown.Group>
      </Dropdown.Layer>
      <Dropdown.Layer name="contacts">
        <Dropdown.Group direction="col">
          <Dropdown.Back />
          <Dropdown.Item href="/contacts/managed/">
            <UserPlus />
            <span class="whitespace-nowrap">{$contactsDict.invite.manually}</span>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group direction="row">
          <QR variant="ghost" class={variant} {text} label={$contactsDict.invite.qr} />
          <Share variant="ghost" class={variant} {data} label={$contactsDict.invite.link} />
        </Dropdown.Group>
      </Dropdown.Layer>
    </Dropdown.Content>
  </Dropdown.Root>
</Actions>
