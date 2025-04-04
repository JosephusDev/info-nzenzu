import Footer from '../Footer'
import Navbar from '../Navbar'

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Navbar />
      <div className='flex flex-col items-center w-full h-dvh gap-2 mx-auto'>
        {children}
        <Footer />
      </div>
    </div>
  )
}
