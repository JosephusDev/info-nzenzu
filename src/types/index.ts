export interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  author: string
  date: Date
  image?: string
  avatarImage?: string
  category: string
}
