<script lang="ts">
  import { Upload } from '$com/upload'
  import { upload } from '@/receipts'
  import type { Props } from './Upload'

  const { children, accept = 'image/*', onstart, ...rest }: Props = $props()

  async function onfiles(files: File[]) {
    const file = files[0]

    if (!file) return

    void upload(file)

    onstart?.()
  }
</script>

<Upload {accept} {onfiles} {...rest}>{@render children?.()}</Upload>
