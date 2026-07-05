<script lang="ts">
  import { cloudinary } from '@/media/ui'
  import * as Card from '$ui/card'
  import type { Props } from './Benefit'

  const { benefit, class: classes }: Props = $props()
</script>

<Card.Root class={['space-y-2 gap-0 pt-0', classes]}>
  <Card.Header class="p-0 gap-0">
    <img
      class="size-full object-cover aspect-[1.4]"
      alt={benefit.title}
      src={cloudinary('w_630,h_450', `${benefit.picture}.webp`)}
      srcset={`${cloudinary('w_630,h_450', `${benefit.picture}.webp`)} 1x, ${cloudinary('w_1260,h_900', `${benefit.picture}.webp`)} 2x`} />
  </Card.Header>
  <Card.Content>
    <Card.Title class="text-2xl">{benefit.title}</Card.Title>
    <Card.Description class="text-base">{benefit.description}</Card.Description>
  </Card.Content>
</Card.Root>
