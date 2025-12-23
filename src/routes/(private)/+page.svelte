<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { logout } from '@/iam'
</script>

<div class="flex flex-col items-center justify-center h-screen gap-4">
  <Button onclick={logout}>
    <LogOut />
    Sign out
  </Button>
</div>
