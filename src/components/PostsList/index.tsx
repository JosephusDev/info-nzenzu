'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Post } from '@/components/Post'
import { usePosts } from '@/hooks/usePosts'
import { motion } from 'framer-motion'
import { PostSkeleton } from '../skeleton/PostSkeleton'
import { EmptyIcon } from '../EmptyIcon'

export function PostsList({ search = '' }: { search?: string }) {
  // Hook customizado que faz o fetch paginado via useInfiniteQuery do React Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts({ search })

  // Junta todas as páginas de dados em um único array
  const posts = data?.pages.flat() || []

  // Ref que será observada para acionar o carregamento da próxima página
  const observerRef = useRef<HTMLDivElement | null>(null)

  // Configura o IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Quando o elemento entra na viewport, tenta buscar a próxima página
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '300px' }, // começa o fetch antes de o elemento aparecer totalmente
    )

    const el = observerRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 w-full px-6 md:px-20'>
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (posts.length == 0) {
    return <EmptyIcon title='Nenhuma publicação encontrada' />
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold px-6 md:px-20 lg:px-20 mb-5'>
        Últimas postagens
      </h1>
      {/* Grid com os cards dos posts */}
      <div className='px-6 md:px-20 lg:px-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            // Animação de entrada para cada post (fade + slide up)
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.02 }} // delay sequencial para efeito em cascata
          >
            <Link href={`/post/${post.id}`}>
              <Post post={post} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Loader ao final da lista para indicar carregamento da próxima página */}
      <div ref={observerRef} className='flex justify-center items-center mt-10'>
        {isFetchingNextPage && (
          // Mostra loader enquanto busca próxima página
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 md:px-20'>
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={`skeleton-next-${i}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
