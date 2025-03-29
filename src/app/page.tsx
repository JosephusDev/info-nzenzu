import Footer from '@/components/Footer'
import { Highlight } from '@/components/Highlight'
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
    <div className='flex flex-col items-center w-screen h-screen gap-2 mx-auto'>
      <div className='flex flex-col w-screen lg:w-[60%] h-full gap-2'>
        <Highlight />
      </div>
      <Footer />
    </div>
  )
}
