export const expire = (ms: number) =>
  new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

export const cap = <T>(promise: Promise<T>, ms: number): Promise<T | null> =>
  Promise.race([promise, expire(ms)])
