import { AccessLevel } from '@prisma/client'
import { z } from 'zod'

export const userSchema = z
  .object({
    name: z
      .string({
        message: 'O nome é obrigatório',
      })
      .min(3, {
        message: 'O nome deve ter no mínimo 3 caracteres',
      })
      .max(50, {
        message: 'O nome não pode ter mais de 50 caracteres',
      }),

    avatarImage: z
      .string()
      .url({
        message: 'URL inválida para a imagem do avatar',
      })
      .nullable(),

    level: z.nativeEnum(AccessLevel, {
      errorMap: () => ({
        message: 'Nível de acesso inválido ou não selecionado',
      }),
    }),

    username: z
      .string({
        message: 'O nome de usuário é obrigatório',
      })
      .min(3, {
        message: 'O nome de usuário deve ter no mínimo 3 caracteres',
      })
      .max(20, {
        message: 'O nome de usuário não pode ter mais de 20 caracteres',
      }),

    password: z
      .string({
        message: 'A palavra-passe é obrigatória',
      })
      .min(4, {
        message: 'A palavra-passe deve ter no mínimo 4 caracteres',
      })
      .max(20, {
        message: 'A palavra-passe não pode ter mais de 20 caracteres',
      }),

    confirmPassword: z.string().optional(),
  })
  .refine(
    data => {
      if (data.password) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  )

export type UserFormData = z.infer<typeof userSchema>

export const loginSchema = z.object({
  username: z
    .string({
      message: 'O nome de usuário é obrigatório',
    })
    .min(3, {
      message: 'O nome de usuário deve ter no mínimo 3 caracteres',
    })
    .max(20, {
      message: 'O nome de usuário não pode ter mais de 20 caracteres',
    }),

  password: z
    .string({
      message: 'A palavra-passe é obrigatória',
    })
    .min(4, {
      message: 'A palavra-passe deve ter no mínimo 4 caracteres',
    })
    .max(20, {
      message: 'A palavra-passe não pode ter mais de 20 caracteres',
    }),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const subscriberSchema = z.object({
  email: z
    .string({
      message: 'O email é obrigatório',
    })
    .email({
      message: 'Informe um email válido',
    }),
})

export type subscriberSchema = z.infer<typeof subscriberSchema>
