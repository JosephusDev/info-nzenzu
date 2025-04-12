'use client'

import type { PostType, PostWithTotal } from '@/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const fetchPublishedPosts = async ({
  pageParam = 1,
  search = '',
  limit = 6,
}): Promise<PostType[]> => {
  const res = await fetch(
    `/api/posts/published?page=${pageParam}&limit=${limit}&search=${search}`,
  )
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}
const fetchPosts = async ({
  pageParam = 1,
  search = '',
  limit = 6,
}): Promise<PostWithTotal> => {
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
      fetchPublishedPosts({
        pageParam: context.pageParam as number,
        search,
        limit,
      }),
    getNextPageParam: (lastPage: any[], allPages) => {
      return lastPage.length === 6 ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export function usePostsForAdmin({ search = '', limit = 6, page = 1 }) {
  return useQuery<PostWithTotal, Error>({
    queryKey: ['posts', search, limit, page],
    queryFn: () => fetchPosts({ pageParam: page, search, limit }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}
