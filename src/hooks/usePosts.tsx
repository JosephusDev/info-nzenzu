'use client'

import type { PostType } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchPosts = async ({
  pageParam = 1,
  search = '',
  limit = 6,
}): Promise<PostType[]> => {
  const res = await fetch(
    `/api/posts?page=${pageParam}&limit=${limit}&search=${search}`,
  )
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}

export function usePosts({ search = '', limit = 6 }) {
  return useInfiniteQuery<PostType[], Error>({
    queryKey: ['posts', search, limit],
    queryFn: context =>
      fetchPosts({ pageParam: context.pageParam as number, search, limit }),
    getNextPageParam: (lastPage: any[], allPages) => {
      return lastPage.length === 6 ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: Number.POSITIVE_INFINITY,
  })
}
