export interface Props {
  id?: string
  draft: { title: string; location?: string; attachments: string[] }
  onchange?: (id: string) => void
}
