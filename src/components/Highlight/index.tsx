import Image from 'next/image'

import imageHighlight from '../../assets/img/highlight.png'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDate } from '@/utils'

export function Highlight() {
  return (
    <div className='w-full h-auto flex flex-col gap-4 relative mb-14'>
      <Image
        src={imageHighlight}
        alt='Highlight'
        priority
        className='w-full h-auto max-h-[500px] object-cover rounded-md'
      />
      <Card className='bg-white w-[90%] md:w-[480px] max-w-full absolute left-1/2 transform -translate-x-1/2 md:left-5 md:translate-x-0 lg:left-12 -bottom-12 shadow-lg p-4'>
        <CardContent className='gap-4'>
          <Badge>Tecnologia</Badge>
          <h1 className='text-xl md:text-xl font-bold'>
            O Impacto da Tecnologia no Local de Trabalho: Como a Tecnologia Está
            Mudando
          </h1>
          <div className='flex flex-row gap-2 items-center'>
            <Avatar>
              <AvatarFallback>OO</AvatarFallback>
              <AvatarImage
                src='https://github.com/oliveroliveira.png'
                alt='Avatar'
              />
            </Avatar>
            <div className='flex flex-row gap-3 text-xs md:text-sm text-gray-500 justify-between w-full'>
              <span>Oliver Oliveira</span>
              <span>{formatDate(new Date())}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
