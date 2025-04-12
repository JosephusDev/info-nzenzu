import { EmptyIcon } from '@/components/EmptyIcon'
import { Highlight } from '@/components/Highlight'
import { Main } from '@/components/Main'
import { PostsList } from '@/components/PostsList'
import { Fragment } from 'react'

export default async function Postagens() {
  return (
    <Main>
      <div className='bg-background flex flex-col my-20 gap-5 py-5'>
        <PostsList />
      </div>
    </Main>
  )
}
