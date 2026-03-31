<script lang="ts">
  import { Section } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
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
