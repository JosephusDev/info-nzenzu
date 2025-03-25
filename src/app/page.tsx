import { InputIcon } from '@/components/InputIcon'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFetchPosts } from '@/useCases/Post/useFetchPosts'
import { formatDate } from '@/utils'
import { Mail, Search } from 'lucide-react'

export default async function Home() {
  const posts = await useFetchPosts()
  return (
    <div className='p-0.5 flex flex-col justify-center items-center h-screen gap-2'>
      {
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              {post.title} - by {post.user.name}
            </li>
          ))}
        </ul>
      }
      <h1>Home</h1>
      <Button className='w-36'>Subscribe</Button>
      <Button variant={'outline'} className='text-gray-400'>
        View all post
      </Button>
      <Badge>Tecnologia</Badge>
      <Badge variant={'outline'} className='text-primary'>
        Tecnologia
      </Badge>
      <Avatar>
        <AvatarFallback>JC</AvatarFallback>
        <AvatarImage src='https://github.com/josephusdev.png' />
      </Avatar>
      <InputIcon
        placeholder='Your Email'
        Icon={<Mail className='text-gray-400' />}
      />
      <Separator className='my-4' />
      <InputIcon
        className='border-gray-200 rounded-4xl py-0.5'
        placeholder='Search'
        Icon={<Search />}
      />
      <Label>{formatDate(new Date('2025-03-20'))}</Label>
    </div>
  )
}
