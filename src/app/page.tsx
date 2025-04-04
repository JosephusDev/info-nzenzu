import { EmptyIcon } from '@/components/EmptyIcon'
import { Highlight } from '@/components/Highlight'
import { Main } from '@/components/Main'
import { PostsList } from '@/components/PostsList'
import { getPosts } from '@/useCases/Post/useFetchPosts'
import { Fragment } from 'react'

export default async function Home() {
  const posts = await getPosts()
  return (
    <Main>
      {posts.length > 0 && (
        <div className='flex flex-col w-screen lg:w-[60%] h-full gap-2'>
          <Highlight post={posts[0]} />
        </div>
      )}
      <div className='bg-background flex flex-col my-20 gap-5 py-5'>
        {posts.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <EmptyIcon title='Nenhuma publicação encontrada' />
          </div>
        ) : (
          <Fragment>
            <h1 className='text-2xl font-semibold px-6 md:px-20 lg:px-20'>
              Últimas postagens
            </h1>
            <PostsList posts={posts} />
          </Fragment>
        )}
      </div>
    </Main>
  )
}
