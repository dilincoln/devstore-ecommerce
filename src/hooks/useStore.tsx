import { useEffect, useState } from 'react'

/**
 * Workaround to use Zustand with SSR without hydration errors.
 * If you are not using SSR or you are not using the data in your HTML directly,
 * you can use the Zustand hook directly.
 *
 * @param store Zustand store.
 * @param callback Callback function to get the data from the store.
 */
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
