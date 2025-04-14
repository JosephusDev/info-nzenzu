import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export function formatDate(date: Date): string {
  return format(date, "dd 'de' MMM 'de' yyyy", { locale: ptBR })
}

export const formatDateDistanceToNow = (date: Date): string => {
  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })
}

export const formatedName = (name: string) => {
  const names = name.split(' ')
  const firstName = names[0]
  if (names.length === 1) {
    return firstName.charAt(0)
  }
  const lastName = names.pop()
  return `${firstName.charAt(0)}${lastName?.charAt(0)}`.trim()
}
