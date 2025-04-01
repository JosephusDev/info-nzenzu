import Image from 'next/image'
import imageHighlight from '@/assets/img/highlight.png'
import { Post } from '../Post'

export function Highlight() {
  return (
    <div className='w-full h-auto flex flex-col gap-4 relative mb-14 mt-14'>
      <Image
        src={imageHighlight}
        alt='Highlight'
        priority
        className='w-full h-auto max-h-[500px] object-cover'
      />
      <Post
        title='O Impacto da Tecnologia no Local de Trabalho: Como a Tecnologia Está Mudando'
        category='Tecnologia'
        author='Oliver Oliveira'
        date={new Date()}
        avatarImage='https://github.com/oliveroliveira.png'
        className='w-[90%] md:w-[480px] max-w-full absolute left-1/2 transform -translate-x-1/2 md:left-5 md:translate-x-0 lg:left-12 -bottom-20 shadow-lg'
      />
    </div>
  )
}
