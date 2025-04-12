'use client'

import type { Post } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'user.name',
    header: 'Autor',
  },
  {
    accessorKey: 'published',
    header: 'Publicado',
    cell: ({ row }) => {
      const post = row.original
      return post.published ? 'Sim' : 'Não'
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Ações',
    cell: ({ row }) => {
      const post = row.original
      const router = useRouter()

      const handlePublishToggle = async () => {
        try {
          const response = await fetch('/api/posts/publish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: post.id,
              published: !post.published,
            }),
          })

          if (!response.ok) {
            throw new Error('Erro ao alterar status do post')
          }

          toast.success(
            post.published
              ? 'Post despublicado com sucesso'
              : 'Post publicado com sucesso',
          )
          router.refresh()
        } catch (error) {
          toast.error('Erro ao alterar status do post')
        }
      }

      const handleEdit = () => {
        router.push(`/dashboard/posts/edit/${post.id}`)
      }

      const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir este post?')) {
          return
        }

        try {
          const response = await fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            throw new Error('Erro ao excluir post')
          }

          toast.success('Post excluído com sucesso')
          router.refresh()
        } catch (error) {
          toast.error('Erro ao excluir post')
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={handlePublishToggle}>
              {post.published ? (
                <>
                  <EyeOff className='mr-2 h-4 w-4' />
                  Despublicar
                </>
              ) : (
                <>
                  <Eye className='mr-2 h-4 w-4' />
                  Publicar
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className='mr-2 h-4 w-4' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className='text-red-600 focus:text-red-600'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
