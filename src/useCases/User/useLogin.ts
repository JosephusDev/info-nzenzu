import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function useLogin({
  username,
  password,
}: Pick<User, 'username' | 'password'>) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (!user) {
      throw new Error('Utilizador não encontrado')
    }
    if (password !== user.password) {
      throw new Error('Palavra-passe incorreta')
    }
    return user
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : (error as string))
  }
}
