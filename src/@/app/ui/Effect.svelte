<script lang="ts">
  import type { Props } from './Effect'

  const { effect, mask, class: classes }: Props = $props()
</script>

<div
  class={[`effect-${effect}`, classes]}
  style={mask
    ? `-webkit-mask: ${mask}; mask: ${mask}; -webkit-mask-repeat: repeat; mask-repeat: repeat;`
    : undefined}>
</div>

<style>
  .effect-red {
    background: linear-gradient(to bottom, #ff00040d, #ff00041a);
  }
  .effect-orange {
    background: linear-gradient(to bottom, #ff4d000d, #ff4d002e);
  }
  .effect-lime {
    background: linear-gradient(to bottom, #e1ff000d, #e1ff002e);
  }
  .effect-green {
    background: linear-gradient(to bottom, #00ff9d0d, #00ff9d2e);
  }
  .effect-cyan {
    background: linear-gradient(to bottom, #00aaff0d, #00aaff2e);
  }
  .effect-blue {
    background: linear-gradient(to bottom, #0044ff0d, #0044ff2e);
  }
  .effect-violet {
    background: linear-gradient(to bottom, #3300ff0d, #3300ff2e);
  }
  .effect-magenta {
    background: linear-gradient(to bottom, #ea00ff0d, #ea00ff2e);
  }
</style>
