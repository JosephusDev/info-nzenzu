import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import { revalidateTag } from 'next/cache'

const scryptAsync = promisify(scrypt)

interface UpdateUserParams {
  id: string
  data: Partial<User>
}

export async function updateUser({ id, data }: UpdateUserParams) {
  try {
    if (data.password) {
      const salt = randomBytes(16).toString('hex')
      const hashedPassword = (await scryptAsync(
        data.password,
        salt,
        64,
      )) as Buffer
      data.password = `${hashedPassword.toString('hex')}.${salt}`
    }

    const user = await prisma.user.update({
      data,
      where: {
        id,
      },
    })

    revalidateTag('get-user')
    return user
  } catch (error) {
    throw new Error('Error updating user')
  }
}
