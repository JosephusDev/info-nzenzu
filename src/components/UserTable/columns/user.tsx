'use client'

import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'
import { ArrowsUpFromLine, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { formatedName } from '@/utils'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome Completo',
  },
  {
    accessorKey: 'username',
    header: 'Nome de usuario',
  },
  {
    accessorKey: 'level',
    header: 'Nivel de Acesso',
  },
  {
    accessorKey: 'avatar',
    header: 'Imagem',
    cell: ({ row }) => {
      const user = row.original
      return (
        <Avatar>
          <AvatarImage src={user.avatarImage!} alt={user.name} />
          <AvatarFallback>{formatedName(user.name)}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Ações',
    cell: ({ row }) => {
      const user = row.original
      const router = useRouter()

      const handlePromote = async () => {
        if (user.level === 'ADMIN') {
          toast.info('Usuário já é administrador')
          return
        }

        try {
          const response = await fetch('/api/users/promote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.id }),
          })

          if (!response.ok) {
            throw new Error('Erro ao promover usuário')
          }

          toast.success('Usuário promovido com sucesso')
          router.refresh()
        } catch (error) {
          toast.error('Erro ao promover usuário')
        }
      }

      const handleDelete = async () => {
        try {
          const response = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.id }),
          })

          if (!response.ok) {
            throw new Error('Erro ao eliminar usuário do banco de dados')
          }

          toast.success('Usuário eliminado com sucesso')
          router.refresh()
        } catch (error) {
          toast.error('Erro ao eliminar usuário cadastrado')
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
          <DropdownMenuContent
            className='font-[family-name:var(--font-geist-sans)]'
            align='end'
          >
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={handlePromote}>
              <ArrowsUpFromLine /> Promover
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
