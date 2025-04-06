import { verifySession } from '@/app/lib/dal'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getUser } from '@/useCases/User/useFetchUserById'

export default async function DashboardContent({
  children,
}: { children: React.ReactNode }) {
  const { isAuth, userId } = await verifySession()
  const user = await getUser({ userId })
  return (
    <SidebarProvider>
      <AppSidebar user={user!} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
