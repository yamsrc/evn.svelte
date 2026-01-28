<script>
  import { dict } from '$lib/intl/err'
  import { Button } from '$ui/button'
</script>

<div class="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
  <section class="text-center">
    <p>{$dict.message}</p>
    <p class="text-muted-foreground">{$dict.background}</p>
  </section>
  <Button href="/">{$dict.action}</Button>
</div>
