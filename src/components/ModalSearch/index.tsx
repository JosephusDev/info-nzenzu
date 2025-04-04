import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search } from 'lucide-react'
import { InputIcon } from '../InputIcon'

export function ModalSearch() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='rounded-4xl gap-2 w-full text-gray-400'
        >
          <Search size={20} />
          Pesquisar...
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] top-20 translate-y-0 font-[family-name:var(--font-geist-sans)]'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold'>
            O que você procura?
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='items-center'>
            <InputIcon
              icon={<Search size={20} className='text-gray-400' />}
              placeholder='Pesquise...'
              className='w-full py-0.5'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
