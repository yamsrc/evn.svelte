<script>
  import { Offer } from '@/purchases/ui'
  import { Section } from '@/app/ui'
  import { goto } from '$app/navigation'
</script>

<Section>
  <Offer next={() => goto('/dev/')} />
</Section>
