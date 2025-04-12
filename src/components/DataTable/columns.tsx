'use client'

import type { User } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
            <DropdownMenuItem onClick={handlePromote}>
              Promover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
