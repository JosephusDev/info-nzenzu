'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Book, BookOpen, File, Search } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { useEffect, useState } from 'react'
import { EmptyIcon } from '../EmptyIcon'
import Link from 'next/link'
import { PostType } from '@/types'

export function ModalSearch() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='rounded-4xl gap-2 w-full text-gray-400'
        >
          <Search size={20} />
          Pesquisar...
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] top-20 translate-y-0 font-[family-name:var(--font-geist-sans)]'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold'>
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
              {filteredPosts.length === 0 ? (
                <EmptyIcon title='Nenhum resultado encontrado' />
              ) : (
                <div className='flex flex-col gap-4 '>
                  <h2 className='font-bold text-lg'>Resultados</h2>
                  <div className='overflow-y-scroll max-h-60'>
                    <ul className='flex flex-col gap-2'>
                      {filteredPosts.map(post => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                          <li
                            className='flex p-2 bg-muted gap-2 items-center rounded-lg font-semibold'
                            key={post.id}
                          >
                            <BookOpen size={20} className='text-gray-400' />{' '}
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
            <p className='text-center'>Nenhuma busca recente.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
