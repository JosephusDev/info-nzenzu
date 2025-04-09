'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Box, Loader2, Lock, User } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { useForm, SubmitHandler } from 'react-hook-form'
import { loginSchema, userSchema } from '@/types/schema'
import { LabelError } from '../LabelError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(userSchema.pick({ username: true, password: true })),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<loginSchema> = async data => {
    setLoading(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Erro desconhecido')
      }

      window.location.href = '/dashboard'
    } catch (error: any) {
      toast.error(error.message || 'Algo deu errado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-col items-center gap-2'>
            <Box />
            <span className='text-xl text-gray-900 dark:text-white'>
              Info<span className='font-extrabold dark:text-white'>Nzenzu</span>
            </span>
          </CardTitle>
          <CardDescription className='text-center text-base'>
            Informe suas credenciais de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
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
              <div className='flex flex-col gap-3'>
                <Button disabled={loading} type='submit' className='w-full'>
                  {loading ? <Loader2 className='animate-spin' /> : 'Entrar'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
