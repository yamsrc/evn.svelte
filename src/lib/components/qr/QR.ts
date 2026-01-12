import QRCodeStyling from 'qr-code-styling'
import Logo from './logo.png'
import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  text: string | Retriever
  label?: string | null
  onshare?: () => void
}

type Retriever = () => Promise<string | null> | string | null

export async function createQR(arg: string | Retriever) {
  const data = typeof arg === 'function' ? await arg() : arg

  if (data === null) return null

  return new QRCodeStyling({
    type: 'svg',
    shape: 'square',
    width: 500,
    height: 500,
    data,
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'Q',
    },
    image: Logo,
    imageOptions: {
      saveAsBlob: true,
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
    },
    dotsOptions: {
      type: 'extra-rounded',
      color: '#2E231A',
    },
    backgroundOptions: {
      color: '#EDE0D4',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: '#EA580C',
    },
    cornersDotOptions: {
      type: 'rounded',
    },
  })
}
