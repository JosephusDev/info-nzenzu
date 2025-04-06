'use client'

import { deleteSession } from '@/app/lib/session'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <form action={deleteSession}>
      <button className='flex gap-2 items-center' type='submit'>
        <LogOut />
        Terminar sessão
      </button>
    </form>
  )
}
