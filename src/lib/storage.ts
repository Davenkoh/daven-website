/** localStorage / sessionStorage helpers that never throw (private mode, blocked storage, SSR). */
export function readStorage(storage: 'local' | 'session', key: string): string | null {
  try {
    const s = storage === 'local' ? window.localStorage : window.sessionStorage
    return s.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(storage: 'local' | 'session', key: string, value: string) {
  try {
    const s = storage === 'local' ? window.localStorage : window.sessionStorage
    s.setItem(key, value)
  } catch {
    /* ignore */
  }
}
