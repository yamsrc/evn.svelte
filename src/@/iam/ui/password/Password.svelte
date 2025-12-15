<script lang="ts">
  import { REGEXP_ONLY_DIGITS } from 'bits-ui'
  import { cn } from '$lib/utils'
  import { Input } from '$ui/input'
  import * as InputOTP from '$ui/input-otp'
  import type { Props } from './Password'

  let {
    ref = $bindable(null),
    mode = $bindable('password'),
    password = $bindable(''),
    otp = $bindable(''),
    error = $bindable(false),
  }: Props = $props()

  $effect(() => {
    if (error && otp.length === 6) otp = ''
  })
</script>

<div bind:this={ref} class={cn('w-full flex items-center', error && 'shake')}>
  {#if mode === 'password'}
    <Input
      bind:value={password}
      name="password"
      type="password"
      minlength={6}
      autocomplete="current-password"
      placeholder="Password"
      class="placeholder:text-sm"
    />
  {:else}
    <InputOTP.Root bind:value={otp} maxlength={6} pattern={REGEXP_ONLY_DIGITS} required>
      {#snippet children({ cells })}
        <InputOTP.Group>
          {#each cells.slice(0, 6) as cell, i (i)}
            <InputOTP.Slot {cell} class="size-[40px] bg-background" />
          {/each}
        </InputOTP.Group>
      {/snippet}
    </InputOTP.Root>
  {/if}
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
