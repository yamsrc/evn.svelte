<script lang="ts">
  import { Send } from '@lucide/svelte'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import * as Field from '$ui/field'
  import { Input } from '$ui/input'
  import { Spinner } from '$ui/spinner'
  import { Textarea } from '$ui/textarea'
  import { send } from '@/feedback'
  import { dict } from './intl'
  import type { Props } from './Form'

  const { onsend }: Props = $props()

  let busy = $state(false)
  let form = $state<HTMLFormElement | null>(null)

  const input = $state({
    message: '',
    email: '',
  })

  const message = $derived(input.message.trim())
  const email = $derived(input.email.trim())
  const valid = $derived(message.length > 0)

  async function submit() {
    if (!valid) return

    busy = true

    const error = await send(message, email || undefined)

    busy = false

    if (error instanceof Error) {
      console.error('Failed to send feedback:', error)

      return
    }

    form?.reset()
    onsend?.()
  }
</script>

<form bind:this={form} class="space-y-4" onsubmit={onsubmit(submit)}>
  <Field.Field>
    <Textarea
      bind:value={input.message}
      autofocus
      required
      minlength={1}
      maxlength={1000}
      placeholder={$dict.form.message.placeholder}
      class="min-h-32" />
  </Field.Field>
  <Field.Field>
    <Input
      bind:value={input.email}
      type="email"
      inputmode="email"
      autocomplete="email"
      autocorrect="off"
      spellcheck="false"
      placeholder={$dict.form.email.placeholder} />
    <Field.Description>
      {$dict.form.email.description}
    </Field.Description>
  </Field.Field>
  <div class="flex justify-center">
    <Button
      type="submit"
      class="w-full md:w-auto"
      disabled={busy}
      style="view-transition-name: feedback-button;">
      {$dict.send}
      {#if busy}
        <Spinner />
      {:else}
        <Send />
      {/if}
    </Button>
  </div>
</form>
