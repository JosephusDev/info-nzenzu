'use client'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDateDistanceToNow, formatedName } from '@/utils'
import { PostProps } from '@/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { useEffect, useState } from 'react'

export function Post({
  post,
  isIndividual,
  hideImage = false,
  className,
  ...props
}: PostProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [post.image])

  return (
    <Card
      className={cn('bg-background p-0 relative h-full', className)}
      {...props}
    >
      <CardHeader className='w-full p-0'>
        {post.image && !hideImage && !error && (
          <Image
            src={post.image}
            width={150}
            height={100}
            onError={() => setError(true)}
            priority
            alt='Post'
            className={cn(
              'w-full h-[100px] rounded-t-xl object-cover',
              isIndividual && 'h-[250px]',
            )}
          />
        )}
      </CardHeader>
      <CardContent className='gap-4 pb-16 px-4'>
        <Badge>{post.category}</Badge>
        <h1
          className={cn(
            'sm:text-base text-sm my-2',
            isIndividual ? 'text-justify' : 'line-clamp-2',
          )}
        >
          {post.title}
        </h1>
        {isIndividual && (
          <p className='sm:text-base text-sm my-2 mt-10 text-justify'>
            {post.description}
          </p>
        )}
      </CardContent>
      <div
        className={cn(
          'flex flex-row gap-2 items-center p-4 bg-background absolute bottom-0 w-full',
          isIndividual ? 'rounded-b-none' : 'rounded-b-xl',
        )}
      >
        <Avatar className='border-2'>
          <AvatarFallback>{formatedName(post.user.name)}</AvatarFallback>
          <AvatarImage src={post.user.avatarImage!} alt='Avatar' />
        </Avatar>
        <div className='flex flex-col sm:flex-row text-xs md:text-sm justify-between w-full'>
          <span>{post.user.name}</span>
          <span>{formatDateDistanceToNow(post.created_at!)}</span>
        </div>
      </div>
    </Card>
  )
}
