import DashboardContent from '@/components/Dashboard'
import { DataTable } from '@/components/UserTable'
import { columns } from '@/components/UserTable/columns/user'
import { ModalAddUser } from '@/components/ModalAddUser'
import { verifySession } from '@/lib/dal'
import { useFetchUsers } from '@/models/User/useFetchUsers'
import { redirect } from 'next/navigation'
export default async function Page() {
  const userData = await useFetchUsers()
  const { level } = await verifySession()

  if (!level) {
    redirect('/dashboard')
  }

  return (
    <DashboardContent>
      <div className='flex flex-col w-full h-full'>
        <div className='flex flex-row justify-between items-center w-full px-4 mb-4'>
          <div>
            <h1 className='text-2xl font-bold'>Usuarios</h1>
            <p className='text-muted-foreground'>
              Faça a gestão dos usuarios do sistema.
            </p>
          </div>
          <div>
            <ModalAddUser />
          </div>
        </div>
        <div className='px-4'>
          <DataTable columns={columns} data={userData} filterColumn='name' />
        </div>
      </div>
    </DashboardContent>
  )
}
