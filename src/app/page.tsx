import { Highlight } from '@/components/Highlight'
import { Main } from '@/components/Main'

export default async function Home() {
  return (
    <Main>
      <div className='flex flex-col w-screen lg:w-[60%] h-full gap-2'>
        <Highlight />
      </div>
    </Main>
  )
}
