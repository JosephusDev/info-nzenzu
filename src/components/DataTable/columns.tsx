'use client'

import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { MoreHorizontal } from 'lucide-react'
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { ArrowsUpFromLine, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
>>>>>>> Stashed changes

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
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
<<<<<<< Updated upstream
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Usuário
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.password)}
            >
              Administrador
=======
            <DropdownMenuItem onClick={handlePromote}>
              <ArrowsUpFromLine /> Promover
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash /> Eliminar
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
