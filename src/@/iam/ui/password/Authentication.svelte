<script lang="ts">
  import { cn } from '$lib/utils'
  import * as Card from '$ui/card'
  import Form from './Form.svelte'

  const { class: classes }: { class?: string } = $props()
</script>

<Card.Root class={cn('pt-4 gap-4', classes)}>
  <Card.Header class="gap-0">
    <Card.Title>Hop in with password</Card.Title>
    <Card.Description>Create an account or sign in</Card.Description>
  </Card.Header>
  <Card.Content>
    <Form />
  </Card.Content>
</Card.Root>
