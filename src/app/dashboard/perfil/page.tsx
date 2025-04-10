import DashboardContent from '@/components/Dashboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/models/User/useFetchUserById'
import { verifySession } from '@/lib/dal'
import { formatedName } from '@/utils'
import { Camera } from 'lucide-react'
import { ProfileForm } from '@/components/ProfileForm'

export default async function Perfil() {
  const { isAuth, userId } = await verifySession()
  const user = await getUser({ userId })

  return (
    <DashboardContent>
      <div className='container mx-auto py-8 px-4'>
        <Card className='max-w-2xl mx-auto'>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center space-y-6'>
              <div className='relative'>
                <Avatar className='h-24 w-24 border-1 border-gray-400'>
                  <AvatarImage src={user?.avatarImage!} />
                  <AvatarFallback>{formatedName(user?.name!)}</AvatarFallback>
                </Avatar>
                <Button
                  size='sm'
                  className='absolute -bottom-2 -right-2 rounded-full'
                >
                  <Camera className='h-4 w-4 rounded-full' />
                </Button>
              </div>

              <ProfileForm user={user!} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardContent>
  )
}
