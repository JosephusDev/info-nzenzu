'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Post } from '@/components/Post'
import { PostType } from '@/types'

export function PostsList({ posts }: { posts: PostType[] }) {
  const [visibleCount, setVisibleCount] = useState(7)

  const handleToggle = () => {
    if (visibleCount >= posts.length) {
      setVisibleCount(7)
    } else {
      setVisibleCount(prev => Math.min(prev + 7, posts.length))
    }
  }

  const isAllPostsVisible = visibleCount >= posts.length

  return (
    <div>
      <div className='px-6 md:px-20 lg:px-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.slice(1, visibleCount).map((post, idx) => {
          return (
            <Link key={idx} href={`/post/${post.id}`}>
              <Post key={idx} post={post} />
            </Link>
          )
        })}
      </div>
      <div className='flex justify-center items-center mt-5'>
        <Button variant={'outline'} onClick={handleToggle}>
          {isAllPostsVisible ? 'Ver menos' : 'Ver mais'}
        </Button>
      </div>
    </div>
  )
}
