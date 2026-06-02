<script lang="ts">
  import { onMount } from 'svelte'

  const id = import.meta.env.VITE_GTM_ID

  onMount(() => {
    if (!id) return

    window.dataLayer ??= []
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

    const script = document.createElement('script')

    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
    document.head.appendChild(script)
  })
</script>
