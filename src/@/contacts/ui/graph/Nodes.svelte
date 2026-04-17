<script lang="ts">
  import { Avatar } from '@/accounts/ui'
  import * as accounts from '@/accounts'
  import { D, FONT, NAME_Y, PAD } from './Nodes'
  import { R } from './Canvas'
  import type { Props } from './Nodes'

  const { nodes, members, me, showNames = true }: Props = $props()
</script>

{#each nodes as node (node.id)}
  {@const member = members.get(node.id)}
  {@const isMe = me !== undefined && node.id === me}
  {@const premium = member !== undefined && accounts.premium(member)}

  {#if !premium}
    <circle
      cx={node.px}
      cy={node.py}
      r={R + 2}
      fill="none"
      stroke-width="2"
      class={isMe ? 'stroke-primary' : 'stroke-muted-foreground/50'} />
  {/if}

  <foreignObject
    x={node.px - R - PAD}
    y={node.py - R - PAD}
    width={D + PAD * 2}
    height={D + PAD * 2}>
    <div class="flex items-center justify-center size-full">
      {#if member?.picture}
        <Avatar account={{ ...member, picture: member.picture }} size={D} />
      {:else}
        <div
          class="flex items-center justify-center rounded-full bg-muted text-muted-foreground"
          style="width: {D}px; height: {D}px; font-size: {FONT * 0.7}px;">
          {member?.name[0] ?? '?'}
        </div>
      {/if}
    </div>
  </foreignObject>

  {#if showNames}
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
  {/if}
{/each}
