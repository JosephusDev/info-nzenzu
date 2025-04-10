import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

export async function useCreateUser(data: Omit<User, 'id'>) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })
    return user
  } catch (error) {
    throw new Error('Error creating user')
  }
}
