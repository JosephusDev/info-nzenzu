import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { scrypt } from 'crypto'
import { revalidateTag } from 'next/cache'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

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

    const [hashedPassword, salt] = user.password.split('.')
    const hashedPasswordBuffer = (await scryptAsync(
      password,
      salt,
      64,
    )) as Buffer

    if (hashedPasswordBuffer.toString('hex') !== hashedPassword) {
      throw new Error('Palavra-passe incorreta')
    }
    revalidateTag('get-user')
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
