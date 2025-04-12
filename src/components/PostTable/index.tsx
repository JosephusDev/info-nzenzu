'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePostsForAdmin } from '@/hooks/usePosts'
import { PostTableSkeleton } from '../skeleton/PostTableSkeleton'
import { CheckIcon, XIcon, Trash2 } from 'lucide-react'
import MyPagination from '../Pagination'
import { formatDate } from '@/utils'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function PostsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const queryClient = useQueryClient()
  const { data, isLoading } = usePostsForAdmin({
    page: currentPage,
    limit: itemsPerPage,
    search: '',
  })

  const { posts, totalPosts } = data || { posts: [], totalPosts: 0 }
  const totalPages = Math.ceil(totalPosts / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !published }),
      })

      if (!response.ok) {
        throw new Error('Falha ao atualizar post')
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar post')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Falha ao excluir post')
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post excluído com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir post')
    }
  }

  if (isLoading) {
    return <PostTableSkeleton />
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Publicado</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  Nenhum post encontrado
                </TableCell>
              </TableRow>
            ) : (
              posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <span className='text-green-500'>Sim</span>
                    ) : (
                      <span className='text-red-500'>Não</span>
                    )}
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.user.name}</TableCell>
                  <TableCell>{formatDate(post.created_at!)}</TableCell>
                  <TableCell>
                    <div className='flex gap-8'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handlePublish(post.id, post.published!)}
                      >
                        {post.published ? (
                          <XIcon size={20} className='text-red-500' />
                        ) : (
                          <CheckIcon size={20} className='text-green-500' />
                        )}
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 size={20} className='text-red-500' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}
