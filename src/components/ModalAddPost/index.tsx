'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { LabelError } from '@/components/LabelError'
import { toast } from 'sonner'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostFormData } from '@/types/schema'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQueryClient } from '@tanstack/react-query'
import { ImageUpload } from '../UploadFiles'

export function ModalAddPost() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      image: null,
    },
  })

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Falha ao criar post')
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post criado com sucesso!')
      setOpen(false)
      reset()
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Falha ao criar post',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = async (url: string) => {
    setValue('image', url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] top-20 translate-y-0 font-[family-name:var(--font-geist-sans)]'>
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Título</Label>
            <Input id='title' {...register('title')} />
            {errors.title && <LabelError message={errors.title.message!} />}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea id='description' {...register('description')} />
            {errors.description && (
              <LabelError message={errors.description.message!} />
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='category'>Categoria</Label>
            <Controller
              name='category'
              control={control}
              defaultValue=''
              rules={{ required: 'Selecione a categoria' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione a categoria' />
                  </SelectTrigger>
                  <SelectContent className='font-[family-name:var(--font-geist-sans)]'>
                    <SelectItem value='Desporto'>Desporto</SelectItem>
                    <SelectItem value='Entretenimento'>
                      Entretenimento
                    </SelectItem>
                    <SelectItem value='Geral'>Geral</SelectItem>
                    <SelectItem value='Tecnologia'>Tecnologia</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <LabelError message={errors.category.message!} />
            )}
          </div>
          <ImageUpload path='posts' onUploadSuccess={handleUploadSuccess} />
          <Button type='submit' disabled={loading} className='w-full'>
            {loading ? <Loader2 className='animate-spin' /> : 'Adicionar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
