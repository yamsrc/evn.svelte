<script lang="ts">
  import { writable } from 'svelte/store'
  import { ensure } from 'svas'
  import { Component, UserPlus } from '@lucide/svelte'
  import { account } from '@/iam'
  import { actionVariants } from '@/app/ui'
  import { Action } from '@/app/ui'
  import { Actions } from '$com/shell'
  import { QR } from '$com/qr'
  import * as Dropdown from '$com/dropdown'
  import { Share } from '$com/buttons'
  import { dict } from './intl'

  const variant = [Dropdown.itemVariants({ direction: 'row' }), 'whitespace-nowrap']

  const active = writable(false)
  let dropdown = $state<Dropdown.Root | undefined>()

  function data(close = true) {
    const me = ensure(account)

    // closing breaks QR
    if (close) dropdown?.close()

    return { url: `${window.location.origin}/join/friends/${me.id}/` }
  }

  function text() {
    return data(false).url
  }
</script>

<Actions {active}>
  <Action id="nav-action-group" href="./groups/editor/" variant="secondary">
    <Component />
  </Action>
  <Dropdown.Root bind:this={dropdown} onopen={(o) => active.set(o)}>
    <Dropdown.Trigger id="contacts-actions-contact" class={[actionVariants(), 'rounded-s-none']}>
      <UserPlus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Group direction="col">
        <Dropdown.Item href="./managed/">
          <UserPlus />
          <span class="whitespace-nowrap">{$dict.invite.manually}</span>
        </Dropdown.Item>
      </Dropdown.Group>
      <Dropdown.Separator />
      <Dropdown.Group direction="row">
        <QR variant="ghost" class={variant} {text} label={$dict.invite.qr} />
        <Share variant="ghost" class={variant} {data} label={$dict.invite.link} />
      </Dropdown.Group>
    </Dropdown.Content>
  </Dropdown.Root>
</Actions>
