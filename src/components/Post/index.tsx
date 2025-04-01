import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDate, formatedName } from '@/utils'
import { PostProps } from '@/types'
import { cn } from '@/lib/utils'

export function Post({
  author,
  category,
  date,
  title,
  image,
  avatarImage,
  className,
  ...props
}: PostProps) {
  return (
    <Card className={cn('bg-background p-4', className)} {...props}>
      {image && (
        <img
          src={image}
          alt='Post'
          className='w-full h-auto max-h-[400px] object-cover rounded-md'
        />
      )}
      <CardContent className='gap-4'>
        <Badge>{category}</Badge>
        <h1 className='sm:text-lg text-sm font-bold my-2'>{title}</h1>
        <div className='flex flex-row gap-2 items-center'>
          <Avatar className='border-2'>
            <AvatarFallback>{formatedName(author)}</AvatarFallback>
            <AvatarImage src={avatarImage} alt='Avatar' />
          </Avatar>
          <div className='flex flex-col sm:flex-row text-xs md:text-sm text-gray-500 justify-between w-full'>
            <span>{author}</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
