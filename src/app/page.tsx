import { Button } from '@/components/ui/button'
import { useFetchPosts } from '@/useCases/Post/useFetchPosts'

export default async function Home() {
  //const posts = await useFetchPosts();
  return (
    <div className='p-0.5 flex flex-col justify-center items-center h-screen gap-2'>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title} - by {post.user.name}</li>
        ))}
      </ul> */}
      <h1>Home</h1>
      <Button>Click-me!</Button>
    </div>
  )
}
