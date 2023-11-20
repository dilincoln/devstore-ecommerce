import { env } from '@/env'

interface RequestInit {
  /**
   * The `revalidateTag` next function does not process requests made without a `revalidate` prop.
   * Therefore, we're making the `revalidate` prop mandatory.
   */
  next?: Required<NextFetchRequestConfig>
}

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = 'api/'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
