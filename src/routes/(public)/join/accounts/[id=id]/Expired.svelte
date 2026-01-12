<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import * as AlertDialog from '$ui/alert-dialog'
  import { buttonVariants } from '$ui/button'
</script>

<AlertDialog.Root open={true}>
  <AlertDialog.Content class="border-destructive">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.account.expired.title}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description>
        <p class="text-balance!">
          {$dict.account.expired.description}
        </p>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <div class="text-center">
      <p>{$dict.account.expired.content}</p>
    </div>
    <AlertDialog.Footer>
      <AlertDialog.Cancel
        class={buttonVariants({ size: 'lg', variant: 'secondary' })}
        onclick={() => goto('/')}
      >
        {$dict.actions.close}
      </AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
