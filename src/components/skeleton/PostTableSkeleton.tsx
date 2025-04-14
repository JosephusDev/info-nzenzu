import { Skeleton } from '@/components/ui/skeleton'

export function PostTableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <div className='border-b'>
          <div className='grid grid-cols-6 gap-4 p-4'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='grid grid-cols-6 gap-4 p-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}
