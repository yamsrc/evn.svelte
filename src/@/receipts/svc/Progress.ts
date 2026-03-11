interface Uploading {
  thread: string
  status: 'uploading'
  since: number
}

interface Creating extends Omit<Uploading, 'status'> {
  status: 'creating'
  picture: string
}

interface Processing extends Omit<Creating, 'status'> {
  status: 'processing'
  receipt: string
}

interface Ready extends Omit<Processing, 'status'> {
  status: 'ready'
}

export type Progress = Uploading | Creating | Processing | Ready
