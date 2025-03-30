import Footer from '@/components/Footer'
import { Highlight } from '@/components/Highlight'
import Navbar from '../components/ui/navbar'

export default async function Home() {
  return (
    <div className='p-0.5 flex flex-col justify-center items-center h-screen gap-2'>
      <Navbar />
      <div className='flex flex-col items-center w-screen h-screen gap-2 mx-auto'>
        <div className='flex flex-col w-screen lg:w-[60%] h-full gap-2'>
          <Highlight />
        </div>
        <Footer />
      </div>
    </div>
  )
}
