<script lang="ts">
  import { dict } from '$lib/intl/dev'
  import { Section } from '@/app/ui'
</script>

<Section class="py-4">
  <ul class="space-y-2">
    <li>
      <a href="components/">{$dict.components.title}</a>
    </li>
    <li>
      <a href="transmission/">{$dict.transmission.title}</a>
    </li>
  </ul>
</Section>
