import DashboardContent from '@/components/Dashboard'
import { DataTablePosts } from '@/components/DataTable/post-index'
import { columns } from '@/components/DataTable/post-columns'
import { getPosts } from '@/models/Post/useFetchPosts'

export default async function Page() {
  const posts = await getPosts({ limit: 10, search: '', skip: 0 })

  return (
    <DashboardContent>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>
          <DataTablePosts columns={columns} data={posts || []} />
        </p>
      </div>
    </DashboardContent>
  )
}
