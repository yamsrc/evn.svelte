<script lang="ts">
  import * as Card from '$ui/card'
  import type { Props } from './Card'

  const { title, description, action }: Props = $props()
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>{title}</Card.Title>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <Card.Description>{@html description}</Card.Description>
  </Card.Header>
  <Card.Content class="flex justify-center">{@render action()}</Card.Content>
</Card.Root>
