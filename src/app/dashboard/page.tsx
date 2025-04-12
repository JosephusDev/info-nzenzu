import DashboardContent from '@/components/Dashboard'
import { PostsTable } from '@/components/PostTable'
import { ModalAddPost } from '@/components/ModalAddPost'

export default function Page() {
  return (
    <DashboardContent>
      <div className='flex flex-col w-full h-full'>
        <div className='flex flex-row justify-between items-center w-full px-4 mb-4'>
          <div>
            <h1 className='text-2xl font-bold'>Posts</h1>
            <p className='text-muted-foreground'>
              Gerencie os posts do sistema.
            </p>
          </div>
          <ModalAddPost />
        </div>
        <div className='px-4'>
          <PostsTable />
        </div>
      </div>
    </DashboardContent>
  )
}
