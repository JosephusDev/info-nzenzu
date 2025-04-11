'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Lock, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputIcon } from '../InputIcon'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { LabelError } from '../LabelError'
import { User as UserType } from '@prisma/client'
import { userSchema } from '@/types/schema'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof userSchema>

export function ModalAddUser() {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      level: 'USER',
      avatarImage: null,
      confirmPassword: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          password: data.password,
          level: data.level,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao cadastrar utilizador')
      }
      setLoading(false)
      toast.success('Utilizador cadastrado com sucesso!')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao cadastrar utilizador',
      )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-lg gap-2 w-full'>
          <Plus size={20} />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] top-20 translate-y-0 font-[family-name:var(--font-geist-sans)]'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold'>
            Adicionar novo usuário
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label>Nome Completo</Label>
                <InputIcon
                  icon={<User size={15} className='text-gray-400' />}
                  placeholder='Digite o nome completo'
                  {...register('name')}
                  className='py-0.5'
                />
                {errors.name && <LabelError message={errors.name.message!} />}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Utilizador</Label>
                <InputIcon
                  icon={<User size={15} className='text-gray-400' />}
                  placeholder='Digite o nome de utilizador'
                  {...register('username')}
                  className='py-0.5'
                />
                {errors.username && (
                  <LabelError message={errors.username.message!} />
                )}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Palavra-passe</Label>
                <InputIcon
                  icon={<Lock size={15} className='text-gray-400' />}
                  type='password'
                  placeholder='••••••••'
                  {...register('password')}
                  className='py-0.5'
                />
                {errors.password && (
                  <LabelError message={errors.password.message!} />
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirm-password'>Confirmar nova senha</Label>
                <InputIcon
                  icon={<Lock size={15} className='text-gray-400' />}
                  {...register('confirmPassword')}
                  id='confirm-password'
                  type='password'
                  placeholder='••••••••'
                  className='py-0.5'
                />
                {errors.confirmPassword && (
                  <LabelError message={errors.confirmPassword.message!} />
                )}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='level'>Nível de acesso</Label>
                <Controller
                  name='level'
                  control={control}
                  defaultValue='USER'
                  rules={{ required: 'Selecione o nível de acesso' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione o Nível de acesso' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='USER'>Usuário Normal</SelectItem>
                        <SelectItem value='ADMIN'>Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.level && <LabelError message={errors.level.message!} />}
              </div>
              <div className='flex flex-col gap-3'>
                <Button disabled={loading} type='submit' className='w-full'>
                  {loading ? <Loader2 className='animate-spin' /> : 'Cadastrar'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
