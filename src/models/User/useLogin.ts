import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function useLogin({
  username,
  password,
}: Pick<User, 'username' | 'password'>) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error('Utilizador não encontrado')
    }

    if (password !== user.password) {
      throw new Error('Palavra-passe incorreta')
    }

    return user
  } catch (error: any) {
    // Se o erro já tem uma mensagem conhecida, repasse-a
    if (error instanceof Error && error.message) {
      throw new Error(error.message)
    }

    // Caso contrário, erro genérico
    throw new Error('Erro ao fazer login')
  }
}
