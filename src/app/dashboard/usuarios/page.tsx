import DashboardContent from '@/components/Dashboard'
import { DataTable } from '@/components/DataTable'
import { columns } from '@/components/DataTable/columns'
import { ModalAddUser } from '@/components/ModalAddUser'
import { useFetchUsers } from '@/models/User/useFetchUsers'

export default async function Page() {
  const userData = await useFetchUsers()
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
          <DataTable columns={columns} data={userData} />
        </div>
      </div>
    </DashboardContent>
  )
}
