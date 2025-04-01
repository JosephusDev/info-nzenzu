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
import { Box, Lock, User } from 'lucide-react'
import { InputIcon } from '../InputIcon'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-col items-center gap-2'>
            <Box />
            <span className='text-xl text-gray-900 dark:text-white'>
              Info<span className='font-bold dark:text-white'>Nzenzu</span>
            </span>
          </CardTitle>
          <CardDescription className='text-center'>
            Informe suas credenciais de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Utilizador</Label>
                <InputIcon
                  icon={<User size={15} className='text-gray-400' />}
                  placeholder='Digite o nome de utilizador'
                  className='py-0.5'
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Palavra-passe</Label>
                <InputIcon
                  icon={<Lock size={15} className='text-gray-400' />}
                  type='password'
                  placeholder='Digite a palavra-passe'
                  className='py-0.5'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Entrar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
