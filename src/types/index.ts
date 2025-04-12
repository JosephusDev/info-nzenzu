import type { Post, User } from '@prisma/client'

export type PostType = Post & { user: Pick<User, 'name' | 'avatarImage'> }

export interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: PostType
  isIndividual?: boolean
  hideImage?: boolean
}
export type PostWithTotal = {
  posts: PostType[]
  totalPosts: number
}
