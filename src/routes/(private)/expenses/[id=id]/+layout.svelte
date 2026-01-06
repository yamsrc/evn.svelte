<script lang="ts">
  import { ok } from 'svas'
  import { onMount } from 'svelte'
  import { goto, afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { NEWID } from '$lib/tools'
  import { expenses } from '@/expenses'
  import { draft } from '@/expenses/ui'

  const { children } = $props()

  const id = $derived(page.params.id as string)

  let unsubscribe: (() => void) | undefined

  function init() {
    unsubscribe?.()

    if (id === NEWID) {
      draft.set({
        id,
        value: {
          title: '',
          location: '',
          participants: {},
          extras: [],
        },
      })

      return
    }

    unsubscribe = expenses.get(id).subscribe((expense) => {
      if (!ok(expense)) {
        goto('/expenses/', { replaceState: true })

        return
      }

      const { title, location, participants, extras } = structuredClone(expense)

      draft.set({
        id,
        value: {
          title,
          location,
          participants,
          extras,
        },
      })
    })
  }

  onMount(() => {
    init()

    return () => unsubscribe?.()
  })

  afterNavigate(() => {
    if ($draft?.id !== id) init()
  })
</script>

{@render children()}
