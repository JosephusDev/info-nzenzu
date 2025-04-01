import Footer from '@/components/Footer'
import { Highlight } from '@/components/Highlight'
import Navbar from '../components/ui/navbar'
import { Post } from '@/components/Post'
import { Posts } from '@/mock/posts'

export default async function Home() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Navbar />
      <div className='flex flex-col items-center w-screen h-screen gap-2 mx-auto'>
        <div className='flex flex-col w-screen lg:w-[60%] h-full gap-2'>
          <Highlight />
        </div>
        <div className='bg-secondary flex flex-col my-20 gap-5 py-5'>
          <h1 className='text-2xl font-semibold px-6 md:px-20 lg:px-20'>
            Últimas postagens
          </h1>
          <div className='px-6 md:px-20 lg:px-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Posts.map((post, idx) => {
              return (
                <Post
                  key={idx}
                  title={post.title}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                  category={post.category}
                  avatarImage={post.avatarImage}
                />
              )
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
