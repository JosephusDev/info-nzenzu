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
import { LoaderIcon, Lock, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputIcon } from '../InputIcon'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '@/types/schema'
import { Label } from '../ui/label'
import { LabelError } from '../LabelError'
import { User as UserType } from '@prisma/client'

export function ModalAddUser() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<UserType, 'id' | 'avatarImage'>>({
    resolver: zodResolver(userSchema.omit({ avatarImage: true })),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<
    Omit<UserType, 'id' | 'avatarImage'>
  > = async data => {
    setLoading(true)
    await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).finally(() => {
      setLoading(false)
      window.location.href = '/dashboard/usuarios'
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='rounded-lg gap-2 w-full text-gray-400'
        >
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
                  {...register('name', { required: true })}
                  className='py-0.5'
                />
                {errors.name && <LabelError message={errors.name.message!} />}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Utilizador</Label>
                <InputIcon
                  icon={<User size={15} className='text-gray-400' />}
                  placeholder='Digite o nome de utilizador'
                  {...register('username', { required: true })}
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
                  placeholder='Digite a palavra-passe'
                  {...register('password', { required: true })}
                  className='py-0.5'
                />
                {errors.password && (
                  <LabelError message={errors.password.message!} />
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
                <Button
                  disabled={loading ? true : false}
                  type='submit'
                  className='w-full'
                >
                  {loading ? (
                    <LoaderIcon className='animate-spin' />
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
