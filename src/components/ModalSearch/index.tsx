'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BookOpen, Search } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { useState } from 'react'
import { EmptyIcon } from '../EmptyIcon'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'
import { Loader2 } from 'lucide-react'

export function ModalSearch() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = usePosts({ search })

  // Une todas as páginas da resposta do React Query
  const filteredPosts = data?.pages.flat() || []

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='rounded-xl gap-2 w-full text-gray-400'
        >
          <Search size={20} />
          Pesquisar...
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] top-20 translate-y-0 font-[family-name:var(--font-geist-sans)]'>
        <DialogHeader>
          <DialogTitle className='text-center font- text-sm sm:text-xl'>
            O que você procura?
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='items-center'>
            <InputIcon
              icon={<Search size={20} className='text-gray-400' />}
              placeholder='Pesquise...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full py-0.5'
            />
          </div>
        </div>

        <div>
          {search ? (
            <div>
              {isLoading ? (
                <div className='flex justify-center mt-5'>
                  <Loader2 className='animate-spin' />
                </div>
              ) : filteredPosts.length === 0 ? (
                <EmptyIcon title='Nenhum resultado encontrado' />
              ) : (
                <div className='flex flex-col gap-4 '>
                  <h2 className='font-bold text-lg'>Resultados</h2>
                  <div className='overflow-y-scroll max-h-60'>
                    <ul className='flex flex-col gap-2'>
                      {filteredPosts.map(post => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                          <li className='flex p-2 bg-muted gap-2 items-center rounded-lg font-semibold'>
                            <BookOpen size={20} className='text-gray-400' />
                            <p>{post.title}</p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className='text-center text-sm sm:text-base'>
              Nenhuma busca recente.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
