<script lang="ts">
  import { ShieldCheck, ShieldOff } from '@lucide/svelte'
  import { supported } from '@/passkeys'
  import { dict } from '@/iam/ui/intl'
  import { passkeys } from '@/iam'
  import * as Card from '$ui/card'
  import { Button } from '$ui/button'
  import * as Alert from '$ui/alert'
  import { cn } from '$lib/utils'
  import { apple } from '$lib/tools/mq'
  import Form from './Form.svelte'
  import type { Props } from './Authentication'

  const { class: classes, account, oncreate, onauthenticate }: Props = $props()

  const href = apple
    ? 'https://support.apple.com/en-us/102195'
    : 'https://support.google.com/accounts/answer/13548313'

  async function login() {
    const result = await passkeys.login()

    if (!(result instanceof Error)) onauthenticate?.('passkey')
  }
</script>

{#snippet description()}
  <p>
    {$dict.auth.passkeysDescription}
    <a {href} target="_blank" class="text-nowrap">
      {$dict.auth.learnMore}
    </a>
  </p>
{/snippet}

<div class="space-y-4">
  <Card.Root class={cn('gap-4 bg-background/75', supported && 'pt-4', classes)}>
    {#if supported}
      <Card.Header class="gap-0">
        <Card.Title><h2>{$dict.auth.signupTitle}</h2></Card.Title>
      </Card.Header>
      <Card.Content>
        <Form {account} {oncreate} {onauthenticate} />
      </Card.Content>
    {/if}
    <Card.Footer>
      {#if supported}
        <Alert.Root>
          <ShieldCheck color="green" />
          <Alert.Title>{$dict.auth.betterSecurity}</Alert.Title>
          <Alert.Description>
            {@render description()}
          </Alert.Description>
        </Alert.Root>
      {:else}
        <Alert.Root>
          <ShieldOff color="red" class="animate-pulse" />
          <Alert.Title>{$dict.auth.passkeysNotSupported}</Alert.Title>
          <Alert.Description>
            <p>{$dict.auth.passkeysWarning}</p>
            {@render description()}
          </Alert.Description>
        </Alert.Root>
      {/if}
    </Card.Footer>
  </Card.Root>
  {#if supported}
    <div class="flex justify-center">
      <Button
        size="sm"
        variant="ghost"
        class="text-muted-foreground"
        onclick={login}>
        {$dict.auth.login}
      </Button>
    </div>
  {/if}
</div>
