<script lang="ts">
  import { Attachments } from '@/expenses/ui'
  import { attach as postFiles } from '@/expenses'
  import Form from './Form.svelte'
  import type { Props } from './Edit'

  const { adventure, expense }: Props = $props()

  let form = $state<ReturnType<typeof Form>>()
  // svelte-ignore state_referenced_locally
  let attachments = $state([...(expense.attachments ?? [])])
  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  export function attach() {
    input?.click()
  }

  async function upload(e: Event) {
    const target = e.target as HTMLInputElement

    if (target.files === null) return

    const files = Array.from(target.files)

    target.value = ''
    uploading = true

    const ids = await postFiles(files)

    uploading = false

    if (ids instanceof Error) return

    form?.attach(...ids)
  }

  export { form, uploading }
</script>

<input type="file" accept="image/*" bind:this={input} onchange={upload} multiple class="hidden" />

{#if attachments.length > 0}
  <Attachments bind:attachments />
{/if}

<Form bind:attachments bind:this={form} {adventure} {expense} />
