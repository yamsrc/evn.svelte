<script lang="ts">
  import { dict } from '$lib/intl/dev'
  import { Section } from '@/app/ui'
</script>

<Section class="py-4">
  <ul class="space-y-2">
    <li>
      <a href="hold/">{$dict.components.hold.title}</a>
    </li>
    <li>
      <a href="stack/">{$dict.components.stack.title}</a>
    </li>
    <li>
      <a href="notifications/">{$dict.components.notifications.title}</a>
    </li>
    <li>
      <a href="graph/">{$dict.components.graph.title}</a>
    </li>
  </ul>
</Section>
