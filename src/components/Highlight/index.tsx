import { Post } from '../Post'
import { Posts } from '@/mock/posts'
import { PostType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export function Highlight({ post }: { post: PostType }) {
  return (
    <div className='w-full h-auto flex flex-col gap-4 relative mb-14 sm:mt-14'>
      <Image
        src={post.image!}
        width={150}
        height={200}
        priority
        alt='Topo'
        className='w-full h-[200px] sm:rounded-b-2xl'
      />
      <Link href={`/post/${post.id}`}>
        <Post
          post={post}
          hideImage
          className='w-[90%] h-fit md:w-[480px] max-w-full absolute left-1/2 transform -translate-x-1/2 md:left-5 md:translate-x-0 lg:left-12 -bottom-20 shadow-lg'
        />
      </Link>
    </div>
  )
}
