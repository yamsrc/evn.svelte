<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { Loader } from '$com/loader'
  import { autofocus, onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import * as iam from '@/iam'
  import { dict } from '@/iam/ui/intl'
  import Password from './Password.svelte'
  import type { Props } from './Form'

  const { account }: Props = $props()

  let busy = $state(false)
  let username = $state('')
  let password = $state('')
  let otp = $state('')
  let error = $state(false)
  let passwordRef = $state<HTMLDivElement | null>(null)
  let mode = $state<'password' | 'otp'>('password')

  async function submit() {
    if (password.length === 0)
      if (mode === 'password') await sendOTP()
      else await useOTP()
    else await basic()
  }

  async function basic() {
    busy = true

    const result =
      account === undefined
        ? await iam.basic.verify(username, password)
        : await iam.basic.capture(account.id, { username, password })

    busy = false

    if (result instanceof Error) shake()
  }

  async function sendOTP() {
    busy = true

    const response =
      account === undefined ? await iam.otp.send(username) : await iam.otp.add(account.id, username)

    busy = false

    if (response instanceof Error) return

    mode = 'otp'
    requestAnimationFrame(() => focus())
  }

  async function useOTP() {
    if (username.length === 0) {
      console.error('username is required')

      return
    }

    if (otp.length !== 6) {
      shake()

      return
    }

    busy = true

    const response = await iam.otp.verify(username, otp)

    busy = false

    if (response instanceof Error) shake()
  }

  function shake() {
    error = true

    setTimeout(() => {
      error = false
      focus()
    }, 600)
  }

  function focus() {
    if (!autofocus) return

    passwordRef?.querySelector('input')?.focus()
  }
</script>

<form onsubmit={onsubmit(submit)}>
  <fieldset class="space-y-2">
    <Input
      id="iam-username-input"
      bind:value={username}
      name="username"
      type="email"
      autocomplete="username"
      required
      disabled={mode === 'otp' ? true : undefined}
      {autofocus}
      placeholder={$dict.auth.email} />
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <Password bind:ref={passwordRef} bind:password bind:otp bind:error {mode} />
        <Button size="icon" type="submit" class="size-12">
          {#if busy}
            <Loader />
          {:else}
            <ArrowRight class="size-5" />
          {/if}
          <span class="sr-only">{$dict.auth.login}</span>
        </Button>
      </div>
      <div class="text-sm text-muted-foreground px-1">
        {#if mode === 'password'}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html $dict.auth.passwordBlank}
        {:else}
          {$dict.auth.otpInstructions}
        {/if}
      </div>
    </div>
  </fieldset>
</form>
