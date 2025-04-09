import { z } from 'zod'

export const userSchema = z.object({
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
    .optional(),

  level: z.enum(['USER', 'ADMIN']).default('USER'),

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

export type loginSchema = Pick<
  z.infer<typeof userSchema>,
  'password' | 'username'
>

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
