import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface InputIconProps extends React.ComponentProps<'input'> {
  icon: React.ReactNode
}

export function InputIcon({ icon, className, ...props }: InputIconProps) {
  return (
    <div
      className={cn(
        'border-[1px] rounded-lg flex flex-row items-center gap-2 pr-2 bg-background',
        className,
      )}
    >
      <Input
        className='text-sm shadow-background dark:bg-background border-0 focus-visible:ring-0 focus-visible:outline-none'
        {...props}
      />
      {icon}
    </div>
  )
}
