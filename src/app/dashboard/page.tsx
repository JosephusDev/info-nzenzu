import DashboardContent from '@/components/Dashboard'

export default function Page() {
  return (
    <DashboardContent>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>
          This is the dashboard page. You can add your content here.
        </p>
      </div>
    </DashboardContent>
  )
}
