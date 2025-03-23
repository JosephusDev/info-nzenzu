import { useFetchPost } from '@/useCases/Post/useFetchPost'
import { notFound } from 'next/navigation'

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await useFetchPost({ id })
  if (!post) return notFound()
  return <div>Post: {post?.title}</div>
}
