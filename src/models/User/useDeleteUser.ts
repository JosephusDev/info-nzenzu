import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { deleteImage } from '@/hooks/use-supabase-delete'

export async function deleteUser(id: string) {
  try {
    // Primeiro, buscar o usuário para verificar se tem imagem
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Se o usuário tiver uma imagem, deletar do Supabase
    if (user.avatarImage) {
      await deleteImage(user.avatarImage, 'avatars')
    }

    // Deletar o usuário do banco de dados
    const deletedUser = await prisma.user.delete({
      where: { id },
    })

    revalidateTag('get-users')
    return deletedUser
  } catch (error) {
    throw new Error('Erro ao deletar usuário')
  }
}
