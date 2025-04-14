'use client'
import { Box, ChevronRight, Loader2, Mail, Send } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subscriberSchema } from '@/types/schema'
import { Fragment, useState } from 'react'
import { LabelError } from '../LabelError'
import { toast } from 'sonner'

const categories = ['Geral', 'Actividades', 'Calendários', 'Resultados']

export default function Footer() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<subscriberSchema>({
    resolver: zodResolver(subscriberSchema.pick({ email: true })),
  })

  const onSubmit: SubmitHandler<subscriberSchema> = async data => {
    setLoading(true)
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Erro desconhecido')
      }

      toast.success('Cadastrado com sucesso.')
      reset()
    } catch (error: any) {
      toast.error(error.message || 'Algo deu errado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className='flex flex-col px-6 md:px-20 lg:px-20 w-full bg-secondary bottom-0 py-8 mt-20'>
      <div
        id='sobre'
        className='w-full flex flex-col lg:flex-row mt-6 gap-2 md:gap-4 lg:gap-8 justify-between'
      >
        <div className='flex flex-col lg:flex-row sm:px-20 lg:px-0 justify-between gap-10'>
          <div className='flex flex-row justify-between w-full gap-14'>
            <div className='flex flex-col w-2/3 text-sm gap-2'>
              <p className='text-base font-semibold'>Sobre</p>
              <p className='text-sm'>
                O Info Nzenzu nasceu com o propósito de compartilhar
                conhecimento, promover diálogos enriquecedores. Somos um blog
                dedicado à disseminação de informação, criando um espaço de
                aprendizado e reflexão para todos estejam actualizados. Nosso
                blog é um ponto de encontro para estudantes, professores e
                visitantes.
              </p>
            </div>
            <div className='flex flex-col w-1/3 text-sm gap-1'>
              <p className='text-base font-semibold mb-2'>Categorias</p>
              <ul className='flex flex-col gap-4'>
                {categories.map(category => (
                  <li key={category} className='flex items-center'>
                    <ChevronRight size={15} /> {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='sm:w-full md:w-full lg:w-3/5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className='w-full border-0 shadow-0 rounded-xl'>
                <CardContent className='flex flex-col gap-2'>
                  <h1 className='text-base font-bold text-center'>
                    Newsletter
                  </h1>
                  <p className='text-sm mb-4 text-center'>
                    Informe seu email para receber novidades.
                  </p>
                  <InputIcon
                    icon={<Mail className='text-gray-400' />}
                    placeholder='Endereço de email'
                    className='w-full py-1'
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <LabelError message={errors.email.message!} />
                  )}
                  <Button
                    disabled={loading}
                    type='submit'
                    className='w-full mt-2'
                  >
                    {loading ? (
                      <Loader2 className='animate-spin' />
                    ) : (
                      <Fragment>
                        <Send size={20} /> Subscrever
                      </Fragment>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='w-full flex flex-col md:flex-row justify-between items-center p-2'>
        <div className='flex flex-col lg:flex-row md:flex-row gap-2 items-center'>
          <Box size={25} />
          <div className='flex flex-col text-center md:text-left gap-2'>
            <p>
              Info<span className='font-semibold'> Nzenzu</span>
            </p>
            <span className='text-sm'>
              © 2025 Info Nzenzu. Todos os direitos reservados.
            </span>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-center mt-4 md:mt-0'>
          <span className='text-sm'>Termos de uso</span>
          <Separator orientation='vertical' />
          <span className='text-sm'>Políticas de privacidade</span>
          <Separator orientation='vertical' />
          <span className='text-sm'>Políticas de cookie</span>
        </div>
      </div>
    </footer>
  )
}
