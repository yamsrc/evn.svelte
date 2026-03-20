<script lang="ts">
  import { Section } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
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
    <li>
      <a href="receipts/">{$dict.components.receipts.title}</a>
    </li>
    <li>
      <!-- TODO: i18n -->
      <a href="joins/">Invitations</a>
    </li>
    <li>
      <a href="picture/">{$dict.components.picture.title}</a>
    </li>
    <li>
      <a href="participants/">{$dict.components.participants.title}</a>
    </li>
  </ul>
</Section>
