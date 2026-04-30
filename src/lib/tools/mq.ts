import { browser } from '$app/environment'

export const windows = browser && navigator.userAgent.toLowerCase().includes('windows')

export const apple = browser
  ? /mac ?os|ios|ipad ?os/i.test((navigator as any).userAgentData?.platform ?? '') ||
  /(Mac|iPhone|iPad|iPod)/.test(navigator.userAgent)
  : false

export const android = browser ? /android/i.test(navigator.userAgent) : false

export const ios = browser ? /(iPhone|iPad|iPod)/.test(navigator.userAgent) : false

export const safari = browser ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false

export const touch = browser ? 'ontouchstart' in window : false

export const standalone = browser ? window.matchMedia('(display-mode: standalone)').matches : false

export const shell = browser ? /PWAShell/i.test(navigator.userAgent) : false

// PWAShell/<version>
export const shellVersion = navigator.userAgent.match(/PWAShell\/(\S+)/)?.[1] ?? null

// do not autofocus on touch devices, as it's annoying
export const autofocus = browser ? !('ontouchstart' in window) : false

export const units = {
  lbs: ['en-US', 'en-LR', 'en-MM'].includes(navigator.language),
  inches: ['en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-IE', 'en-IN', 'en-LR', 'en-MM'].includes(navigator.language),
} as const

export function isInAppWebView(ua: string = navigator.userAgent): boolean {
  const inAppBrowserPatterns = [
    /FBAN|FBAV|FB_IAB/i, // Facebook
    /Instagram/i, // Instagram
    /Twitter/i, // Twitter
    /Line/i, // LINE Messenger
    /LinkedIn/i, // LinkedIn
    /Snapchat/i, // Snapchat
    /WhatsApp/i, // WhatsApp
    /WeChat/i, // WeChat
    /Messenger/i, // Facebook Messenger
    /QQ/i, // QQ Browser
    /Reddit/i, // Reddit
    /Puffin/i, // Puffin Browser
    /TikTok/i, // TikTok
    /musical.ly/i, // TikTok (older)
    /YouTube/i, // YouTube
    /Pinterest/i, // Pinterest
    /Discord/i, // Discord
    /Telegram/i, // Telegram
    /Viber/i, // Viber
    /Slack/i, // Slack
    /Signal/i, // Signal
    /KakaoTalk/i, // KakaoTalk (Popular in South Korea)
    /Baidu/i, // Baidu (Popular in China)
  ]

  const isInAppBrowser = () => inAppBrowserPatterns.some((pattern) => pattern.test(ua))

  const isGenericWebView = () => {
    const rules = [
      'WebView', // Generic WebView detection
      '(iPhone|iPod|iPad)(?!.*Safari/)', // iOS WebView without Safari
      'Android.*(wv)', // Android WebView
      '(AppleWebKit)(?!.*Safari)', // iOS Safari WebView (missing Safari in UA)
    ]

    const regex = new RegExp(`(${rules.join('|')})`, 'ig')

    return ua.match(regex) !== null
  }

  const isTelegram = () => (
    'TelegramWebviewProxy' in window ||
    'TelegramWebviewProxyProto' in window ||
    'TelegramWebview' in window
  )

  return browser && (isInAppBrowser() || isGenericWebView() || isTelegram())
}

export const inApp = isInAppWebView(navigator.userAgent)
