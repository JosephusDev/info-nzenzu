import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Subscriber } from '@prisma/client'

export async function useCreateSubscriber(data: Pick<Subscriber, 'email'>) {
  try {
    const user = await prisma.subscriber.create({ data })
    return user
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Este email já está cadastrado.')
    }

    throw new Error('Erro ao criar subscrição.')
  }
}
