'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userSchema } from '@/types/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LabelError } from '@/components/LabelError'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User } from '@prisma/client'
import { z } from 'zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { FileUpload } from '../UploadFiles'

type FormData = z.infer<typeof userSchema>

export function ProfileForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.avatarImage || null,
  )
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      level: user?.level || 'USER',
      avatarImage: user?.avatarImage || null,
    },
  })

  const updateUser = async (data: Partial<FormData>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          data: {
            ...data,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao atualizar perfil')
      }

      toast.success('Perfil atualizado com sucesso!')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao atualizar perfil',
      )
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (data.password && data.password !== data.confirmPassword) {
        toast.error('As senhas não coincidem')
        return
      }

      await updateUser({
        name: data.name,
        username: data.username,
        password: data.password || user.password,
        level: data.level,
        avatarImage: avatarUrl,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadSuccess = async (url: string) => {
    setAvatarUrl(url)
    setValue('avatarImage', url)
    await updateUser({ avatarImage: url })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nome completo</Label>
        <Input
          {...register('name')}
          id='name'
          placeholder='Seu nome completo'
          className='py-0.5'
        />
        {errors.name && <LabelError message={errors.name.message!} />}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='username'>Utilizador</Label>
        <Input
          {...register('username')}
          id='username'
          type='text'
          placeholder='Seu utilizador'
          className='py-0.5'
        />
        {errors.username && <LabelError message={errors.username.message!} />}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Nova senha</Label>
        <Input
          {...register('password')}
          id='password'
          type='password'
          placeholder='••••••••'
          className='py-0.5'
        />
        {errors.password && <LabelError message={errors.password.message!} />}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirm-password'>Confirmar nova senha</Label>
        <Input
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

      <FileUpload onUploadSuccess={handleUploadSuccess} />

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? <Loader2 className='animate-spin' /> : 'Salvar alterações'}
      </Button>
    </form>
  )
}
