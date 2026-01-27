export function delay<T>(fn: () => Promise<T> | T, duration: number): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(async () => {
      resolve(await fn())
    }, duration),
  )
}
