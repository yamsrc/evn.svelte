<script lang="ts">
  import { Picture } from '@/accounts/ui'
  import { R } from './Canvas'
  import { D, FONT, NAME_Y } from './Nodes'
  import type { Props } from './Nodes'

  const { nodes, members, me }: Props = $props()
</script>

{#each nodes as node (node.id)}
  {@const member = members.get(node.id)}
  {@const isMe = me !== undefined && node.id === me}

  <circle
    cx={node.px}
    cy={node.py}
    r={R + 2}
    fill="none"
    stroke-width="2"
    class={isMe ? 'stroke-primary' : 'stroke-muted-foreground/50'} />

  <foreignObject x={node.px - R} y={node.py - R} width={D} height={D}>
    {#if member?.picture}
      <Picture account={{ ...member, picture: member.picture }} size={D} class="w-full h-full" />
    {:else}
      <div
        class="flex items-center justify-center w-full h-full rounded-full bg-muted text-muted-foreground"
        style="font-size: {FONT * 0.7}px;">
        {member?.name[0] ?? '?'}
      </div>
    {/if}
  </foreignObject>

  <text
    x={node.px}
    y={node.py + R + NAME_Y}
    text-anchor="middle"
    font-size={FONT}
    font-weight="bold"
    class="fill-foreground"
    stroke="var(--background)"
    stroke-width="4"
    paint-order="stroke">
    {member?.name.split(' ')[0] ?? ''}
  </text>
{/each}
