'use client'
import * as React from 'react'
import { Send, Users } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import { User } from '@prisma/client'

// This is sample data.
const data = {
  items: [
    {
      title: 'Postagens',
      url: '/dashboard',
      icon: Send,
    },
    {
      title: 'Usuários',
      url: '/dashboard/usuarios',
      icon: Users,
    },
  ],
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
