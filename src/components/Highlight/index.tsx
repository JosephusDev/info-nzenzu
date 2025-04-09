'use client'

import { usePosts } from '@/hooks/usePosts'
import { Post } from '../Post'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { EmptyIcon } from '../EmptyIcon'
import { HighlightSkeleton } from '../skeleton/HighlightSkeleton'

export function Highlight() {
  const { data, isLoading } = usePosts({})

  const post = data?.pages[0]?.[0]

  if (!post && !isLoading)
    return (
      <div className='my-20'>
        <EmptyIcon title='Nenhuma publicação encontrada' />
      </div>
    )

  return (
    <div className='w-full h-auto flex flex-col gap-4 relative mb-14 sm:mt-14'>
      {isLoading ? (
        <HighlightSkeleton />
      ) : (
        <div>
          <Image
            src={post!.image!}
            width={150}
            height={200}
            priority
            alt='Topo'
            className='w-full h-[200px] sm:rounded-b-2xl object-cover'
          />
          <Link href={`/post/${post!.id}`}>
            <Post
              post={post!}
              hideImage
              className='w-[90%] h-fit md:w-[480px] max-w-full absolute left-1/2 transform -translate-x-1/2 md:left-5 md:translate-x-0 lg:left-12 -bottom-20 shadow-lg'
            />
          </Link>
        </div>
      )}
    </div>
  )
}
