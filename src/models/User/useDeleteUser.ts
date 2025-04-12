import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { scrypt, randomBytes } from 'crypto'
import { revalidateTag } from 'next/cache'

export async function deleteUser(id: string) {
  try {
  const user = await prisma.user.delete({
    where: { id },
  })
    revalidateTag('get-users')
    return user
  } catch (error) {
    throw new Error('Error creating user')
  }
}
