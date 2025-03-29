import { Mail } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

import imageFulltech from '../../assets/img/fulltech.jpg'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='flex flex-col px-6 md:px-20 lg:px-20 w-full bg-gray-100 bottom-0 py-8 mt-auto'>
      <div className='w-full flex flex-col lg:flex-row mt-6 gap-2 md:gap-4 lg:gap-8 justify-between'>
        {/* SOBRE */}
        <div className='flex flex-col gap-3 max-w-xs'>
          <p className='font-semibold'>Sobre</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            nesciunt eius omnis vitae commodi, iste architecto distinctio dolor
            libero quam pariatur dignissimos, voluptatibus quos assumenda
            ducimus, doloribus culpa. Earum, dolor.
          </p>
          <div className='flex flex-col text-sm'>
            <p>
              <span className='font-semibold'>Email: </span>
              filomenoolivetree@gmail.com
            </p>
            <p>
              <span className='font-semibold'>Telefone: </span>+244 97X XXX XXX
            </p>
          </div>
        </div>
        {/* LINKS */}
        <div className='flex flex-row justify-between w-full md:w-auto gap-6'>
          <div className='flex flex-col text-sm gap-2'>
            <p className='text-base font-semibold mb-2'>Link Rápido</p>
            <span>Home</span>
            <span>Sobre</span>
            <span>Blog</span>
            <span>Arquivo</span>
            <span>Autor</span>
            <span>Contato</span>
          </div>
          <div className='flex flex-col text-sm gap-2'>
            <p className='text-base font-semibold mb-2'>Categorias</p>
            <span>Estilo de vida</span>
            <span>Tecnologia</span>
            <span>Viagem</span>
            <span>Negócio</span>
            <span>Economia</span>
            <span>Esportes</span>
          </div>
        </div>
        {/* CONTATO */}
        <div className='w-full md:w-auto'>
          <Card className='w-full border-0 shadow-0 p-4 rounded-sm'>
            <CardContent className='flex flex-col items-center gap-2'>
              <h1 className='text-base font-semibold'>Mensagem rápida</h1>
              <p className='text-sm mb-4'>
                Escreva uma mensagem rápida para nós.
              </p>
              <InputIcon
                Icon={<Mail className='text-gray-400' />}
                placeholder='Digite seu email'
                className='w-full py-1'
              />
              <Button className='w-full'>Inscreva-se</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='w-full flex flex-col md:flex-row justify-between items-center p-2'>
        <div className='flex flex-row gap-2 items-center'>
          <Image
            src={imageFulltech}
            alt='FullTech'
            width={40}
            height={40}
            priority
            className='rounded-full'
          />
          <div className='flex flex-col text-center md:text-left'>
            <p>
              Full<span className='font-semibold'>Tech</span>
            </p>
            <span className='text-sm'>
              © 2025 FullTech. Todos os direitos reservados.
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
