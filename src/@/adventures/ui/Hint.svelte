<script lang="ts">
  import { Info } from '@lucide/svelte'
  import { Hint } from '@/app/ui'
  import { dict } from './intl'
</script>

<Hint.Root key="adventures">
  <Hint.Content>
    <div class="flex items-start gap-2">
      <Info class="size-5 shrink-0 text-muted-foreground mt-0.5" />
      <p class="text-sm">{$dict.editor.info}</p>
    </div>
    <Hint.Actions>
      <Hint.Action variant="outline" href="/adventures/editor/">
        {$dict.hint.action}
      </Hint.Action>
      <Hint.Later>{$dict.hint.dismiss}</Hint.Later>
    </Hint.Actions>
  </Hint.Content>
  <Hint.Dismissing>
    <p class="text-sm">{$dict.hint.dismissed}</p>
    <Hint.Dismiss>{$dict.hint.dismiss}</Hint.Dismiss>
  </Hint.Dismissing>
</Hint.Root>
