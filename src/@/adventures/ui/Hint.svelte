<script lang="ts">
  import { Hint } from '@/app/ui'
  import { dict } from './intl'
</script>

<Hint.Root key="adventures">
  <Hint.Content>
    <p>{$dict.editor.info}</p>
    <Hint.Actions>
      <Hint.Action variant="outline" href="/adventures/editor/">
        {$dict.hint.action}
      </Hint.Action>
      <Hint.Later>{$dict.hint.dismiss}</Hint.Later>
    </Hint.Actions>
  </Hint.Content>
  <Hint.Dismissing>
    <p>{$dict.hint.dismissed}</p>
    <Hint.Dismiss>{$dict.hint.dismiss}</Hint.Dismiss>
  </Hint.Dismissing>
</Hint.Root>
