<script lang="ts">
  import * as Card from '$ui/card'
  import type { Props } from './Benefit'

  const { benefit, class: classes }: Props = $props()
</script>

<Card.Root class={['space-y-2 gap-0 pt-0', classes]}>
  <Card.Header class="p-0">
    <img
      alt={benefit.title}
      src={`/assets/w_630,h_450/${benefit.picture}.webp`}
      srcset={`/assets/w_630,h_450/${benefit.picture}.webp 1x, /assets/w_1260,h_900/${benefit.picture}.webp 2x`} />
  </Card.Header>
  <Card.Content>
    <Card.Title class="text-2xl">{benefit.title}</Card.Title>
    <Card.Description class="text-base">{benefit.description}</Card.Description>
  </Card.Content>
</Card.Root>
