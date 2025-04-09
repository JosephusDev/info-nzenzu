import { Main } from '@/components/Main'
import { Post } from '@/components/Post'
import { getUniquePost } from '@/models/Post/useFetchPost'

export default async function IndividualPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getUniquePost({ id })
  return (
    <Main>
      <div className='w-full sm:w-[60%] h-auto flex flex-col gap-4 relative mb-14 sm:mt-14'>
        <Post className='border-0 shadow-none' isIndividual post={post!} />
      </div>
    </Main>
  )
}
