import { Mail } from 'lucide-react'
import { InputIcon } from '../InputIcon'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

import imageFulltech from '../../assets/img/fulltech.jpg'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='flex flex-col px-60 w-full h-[56%] min-h-1/3 bg-gray-100 fixed bottom-0'>
      <div className='w-full h-[70%] flex flex-row mt-12 gap-2 justify-around'>
        {/* SOBRE */}
        <div className='flex flex-col gap-3 max-w-3xs'>
          <p className='font-semibold'>Sobre</p>
          <p className='text-[12px]'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            nesciunt eius omnis vitae commodi, iste architecto distinctio dolor
            libero quam pariatur dignissimos, voluptatibus quos assumenda
            ducimus, doloribus culpa. Earum, dolor.
          </p>
          <div className='flex flex-col text-[12px]'>
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
        <div className='flex flex-row justify-around w-3xs'>
          <div className='flex flex-col text-[12px] gap-2'>
            <p className='text-sm font-semibold mb-2'>Link Rápido</p>
            <span>Home</span>
            <span>Sobre</span>
            <span>Blog</span>
            <span>Arquivo</span>
            <span>Autor</span>
            <span>Contato</span>
          </div>
          <div className='flex flex-col text-[12px] gap-2'>
            <p className='text-sm font-semibold mb-2'>Categorias</p>
            <span>Estilo de vida</span>
            <span>Tecnologia</span>
            <span>Viagem</span>
            <span>Negócio</span>
            <span>Economia</span>
            <span>Esportes</span>
          </div>
        </div>
        {/* CONTATO */}
        <div>
          <Card className='w-full border-0 shadow-0 p-4 rounded-sm'>
            <CardContent className='flex flex-col items-center gap-2'>
              <h1 className='text-sm font-semibold'>Mensagem rapida</h1>
              <p className='text-[12px] mb-4'>
                escreva uma mensagem rapida para nos.
              </p>
              <InputIcon
                Icon={<Mail className='text-gray-400' />}
                placeholder='Digite seu email'
                className='w-full py-0.5'
              />
              <Button className='w-full'>Increva-se</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div className='w-full flex flex-row justify-between p-2 mt-2'>
        <div className='flex flex-row gap-1'>
          <Image
            src={imageFulltech}
            alt='FullTech'
            width={40}
            height={40}
            priority
            className='rounded-full'
          />
          <div className='flex flex-col'>
            <p>
              Full<span className='font-semibold'>Tech</span>
            </p>
            <span className='text-[12px]'>
              © 2025 FullTech. Todos os direitos reservados.
            </span>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <span>Termos de uso</span>
          <Separator orientation='vertical' />
          <span>Políticas de privacidade</span>
          <Separator orientation='vertical' />
          <span>Políticas de cookie</span>
        </div>
      </div>
    </footer>
  )
}
