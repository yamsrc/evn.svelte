interface Uploading {
  thread: string
  status: 'uploading'
  since: number
}

interface Creating extends Omit<Uploading, 'status'> {
  status: 'creating'
  picture: string
}

export interface Created extends Omit<Creating, 'status'> {
  status: 'created'
  receipt: string
}

export type Progress = Uploading | Creating | Created
