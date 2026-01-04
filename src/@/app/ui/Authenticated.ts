import type { Props as AuthenticatedProps } from '@/iam/ui/Authenticated'
import type { Snippet } from 'svelte'

export interface Props extends AuthenticatedProps {
  children: Snippet
}
