import * as net from './net'

export const presets: string[] = [
  '31ab0842c23bf715e5530121f906e8d1',
  '4c1fb8ccb10e36a657165f6e7fef14db',
  '4dfbe40f32a4c9291edddbfa369dc0ed',
  '07c8828476e130498bbf887c7e3890f6',
  '086d4c4307d367e9a509fac889222744',
  'aa7477c08a19ca2b65e0ea57f7d69315',
  'f30973ad4ce0351838679fb50ee575b4',
  '87ab5c47e1d9b65caddf6db552d6144c',
  'e0ad1c06b16ae620071f255d44f650da',
  '331fab7f66146df587fd91eb32c727bf',
  'b09b1c31e5b9cd8b972bc3a8953201c5',
  'dd8271f1eb3c4962cea19c99f770650f',
  '412b95a60833e5d56c2765f8cf731237',
]

export async function upload(file: File): Promise<{ id: string } | Error> {
  return await net.pictures.post(file)
}
