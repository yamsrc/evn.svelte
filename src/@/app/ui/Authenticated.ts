import type { Snippet } from 'svelte'
import type { Props as AuthenticatedProps } from '@/iam/ui/Authenticated'

export interface Props extends AuthenticatedProps {
  children: Snippet
}
