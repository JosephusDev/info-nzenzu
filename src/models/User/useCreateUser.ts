import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { scrypt, randomBytes } from 'crypto'
import { revalidateTag } from 'next/cache'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export async function createUser(data: Omit<User, 'id' | 'avatarImage'>) {
  try {
    const salt = randomBytes(16).toString('hex')
    const hashedPassword = (await scryptAsync(
      data.password,
      salt,
      64,
    )) as Buffer
    const user = await prisma.user.create({
      data: {
        ...data,
        password: `${hashedPassword.toString('hex')}.${salt}`,
      },
    })
    revalidateTag('get-users')
    return user
  } catch (error) {
    throw new Error('Error creating user')
  }
}
