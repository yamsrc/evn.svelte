<script lang="ts">
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui'
  import { claim } from '@/codes'
  import * as InputOTP from '$ui/input-otp'
  import { cn } from '$lib/utils'
  import type { Props } from './Apply'

  const { class: classes, oncomplete }: Props = $props()

  let value = $state('')
  let busy = $state(false)
  let error = $state(false)

  async function submit() {
    if (busy) return

    busy = true

    const res = await claim(value)

    busy = false
    value = ''

    if (res instanceof Error) shake()
    else oncomplete?.()
  }

  function shake() {
    error = true

    setTimeout(() => (error = false), 600)
  }
</script>

<div class={['flex flex-col items-center gap-4', classes]}>
  <div class={cn(error && 'shake')}>
    <InputOTP.Root
      bind:value
      maxlength={8}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      onComplete={submit}
      disabled={busy}
      required
      autofocus>
      {#snippet children({ cells })}
        <InputOTP.Group>
          {#each cells.slice(0, 4) as cell, i (i)}
            <InputOTP.Slot {cell} class="uppercase" />
          {/each}
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          {#each cells.slice(4, 8) as cell, i (i)}
            <InputOTP.Slot {cell} class="uppercase" />
          {/each}
        </InputOTP.Group>
      {/snippet}
    </InputOTP.Root>
  </div>
</div>

<style>
  .shake {
    animation: shake 0.6s ease-in-out;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(-12px);
    }
    20% {
      transform: translateX(12px);
    }
    30% {
      transform: translateX(-8px);
    }
    40% {
      transform: translateX(8px);
    }
    50% {
      transform: translateX(-4px);
    }
    60% {
      transform: translateX(4px);
    }
    70% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(2px);
    }
    90% {
      transform: translateX(-1px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
