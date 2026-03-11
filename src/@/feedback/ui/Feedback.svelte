<script lang="ts">
  import { Check, ChevronUp, Send } from '@lucide/svelte'
  import { transit } from '$lib/tools'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import Form from './Form.svelte'
  import { dict } from './intl'

  let open = $state(false)
  let card = $state<HTMLDivElement | null>(null)
  let success = $state(false)

  async function toggle(value: boolean) {
    await transit(() => (open = value))

    card?.scrollIntoView({ behavior: 'smooth' })
  }

  function onsend() {
    transit(() => {
      open = false
      success = true
    })

    setTimeout(() => (success = false), 3000)
  }
</script>

{#if open}
  <Card.Root class="bg-muted pt-4 relative w-full" bind:ref={card}>
    <Button
      variant="ghost"
      size="icon"
      onclick={() => toggle(false)}
      class="absolute right-0 top-0">
      <ChevronUp />
    </Button>
    <Card.Header>
      <Card.Title>
        <h2>
          {$dict.title}
        </h2>
      </Card.Title>
      <Card.Description>
        {$dict.description}
      </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-4">
      <Form {onsend} />
    </Card.Content>
  </Card.Root>
{:else}
  <Button
    size="lg"
    variant="secondary"
    class="w-full sm:w-auto"
    onclick={() => toggle(true)}
    style="view-transition-name: feedback-button;">
    {$dict.title}
    {#if success}
      <Check class="text-constructive" />
    {:else}
      <Send />
    {/if}
  </Button>
{/if}
