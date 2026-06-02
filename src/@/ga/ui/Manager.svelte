<script lang="ts">
  import template from './gtm.txt?raw'

  const id = import.meta.env.VITE_GTM_ID

  const code = template.replace('{{ GTM_ID }}', id)
</script>

{#if id}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html code}
{/if}
