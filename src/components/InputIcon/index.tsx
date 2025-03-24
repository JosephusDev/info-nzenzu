import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface InputIconProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string
  Icon: React.ReactNode
}

export function InputIcon({
  placeholder,
  Icon,
  className,
  ...props
}: InputIconProps) {
  return (
    <div
      className={cn(
        'border-[1px] rounded-lg border-gray-400 flex flex-row items-center gap-2 p-2',
        className,
      )}
      {...props}
    >
      <Input
        placeholder={placeholder}
        className='shadow-background border-0 focus-visible:ring-0 focus-visible:outline-none'
      />
      {Icon}
    </div>
  )
}
