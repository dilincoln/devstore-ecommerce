import { api } from '@/data/api'
import { RotateCw } from 'lucide-react'
import { revalidateTag } from 'next/cache'

interface RevalidateCacheButtonProps {
  revalidateTag: string
}

async function handleRevalidateTag(formData: FormData) {
  'use server'

  const tag = formData.get('revalidateTag') as string

  revalidateTag(tag)
}

async function getCacheDate(tag: string): Promise<Date> {
  const [, path] = tag.split(':')

  const response = await api(path)

  const cachedAt = new Date(response.headers.get('date') || Date.now())

  return cachedAt
}

export async function RevalidateCacheButton({
  revalidateTag,
}: RevalidateCacheButtonProps) {
  const cachedAt = await getCacheDate(revalidateTag)

  return (
    <form
      className="flex items-center justify-end"
      action={handleRevalidateTag}
    >
      <input
        className="hidden"
        name="revalidateTag"
        readOnly
        type="text"
        value={revalidateTag}
      />
      <button className="flex items-center gap-2" type="submit">
        <span className="text-sm">
          updated {Math.floor((Date.now() - cachedAt.getTime()) / 1000 / 60)}m
          ago
        </span>
        <RotateCw className="h-4 w-4 hover:animate-[spin_1s_linear_forwards]" />
      </button>
    </form>
  )
}
