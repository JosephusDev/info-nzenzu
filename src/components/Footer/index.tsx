import { Box, ChevronRight, Mail, Send } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

const categories = ['Geral', 'Actividades', 'Calendários', 'Resultados']

export default function Footer() {
  return (
    <footer className='flex flex-col px-6 md:px-20 lg:px-20 w-full bg-secondary bottom-0 py-8 mt-auto'>
      <div className='w-full flex flex-col lg:flex-row mt-6 gap-2 md:gap-4 lg:gap-8 justify-between'>
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
            <Card className='w-full border-0 shadow-0 rounded-sm'>
              <CardContent className='flex flex-col items-center gap-2'>
                <h1 className='text-base font-semibold'>Mensagem rápida</h1>
                <p className='text-sm mb-4'>
                  Escreva uma mensagem rápida para nós.
                </p>
                <InputIcon
                  icon={<Mail className='text-gray-400' />}
                  placeholder='Escreva sua mensagem'
                  className='w-full py-1'
                />
                <Button className='w-full'>
                  <Send size={20} /> Enviar
                </Button>
              </CardContent>
            </Card>
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
