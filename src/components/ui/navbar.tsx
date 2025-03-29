'use client'

import Link from 'next/link'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/images/logo.png'
import Image from 'next/image'
import { InputIcon } from '../InputIcon'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1158)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image src={Logo} alt='Nzenzu Logo' width={80} height={80} />
            <span className='text-xl text-gray-900 dark:text-white'>
              Info<span className='font-bold dark:text-white'>Nzenzu</span>
            </span>
          </Link>

          {/* Menu Desktop adaptável */}
          {!isCompact && (
            <div className='hidden md:flex space-x-6'>
              <Link
                href='/'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600'
              >
                Home
              </Link>
              <Link
                href='/blog'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600'
              >
                Blog
              </Link>
              <Link
                href='/single-post'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600'
              >
                Single Post
              </Link>
              <Link
                href='/pages'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600'
              >
                Pages
              </Link>
              <Link
                href='/contact'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600'
              >
                Contact
              </Link>
            </div>
          )}

          {/* Ações */}
          <div className='flex items-center space-x-4'>
            <div className='relative hidden md:block'>
              <InputIcon
                className='border-gray-200 rounded-4xl py-0.5'
                placeholder='Search'
                Icon={<Search />}
              />
            </div>

            <Button variant='ghost' size='icon'>
              <Sun className='w-6 h-6' />
            </Button>

            {/* Botão de menu para mobile e telas menores */}
            {isCompact && (
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className='w-6 h-6 text-gray-900 dark:text-white' />
                ) : (
                  <Menu className='w-6 h-6 text-gray-900 dark:text-white' />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile e telas menores */}
      {isOpen && isCompact && (
        <div className='bg-white dark:bg-gray-900 shadow-md p-4 absolute top-16 left-0 w-full z-50'>
          <Link
            href='/'
            className='block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600'
          >
            Home
          </Link>
          <Link
            href='/blog'
            className='block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600'
          >
            Blog
          </Link>
          <Link
            href='/single-post'
            className='block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600'
          >
            Single Post
          </Link>
          <Link
            href='/pages'
            className='block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600'
          >
            Pages
          </Link>
          <Link
            href='/contact'
            className='block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600'
          >
            Contact
          </Link>
          <div className='mt-4'>
            <InputIcon
              className='border-gray-200 rounded-4xl py-0.5 w-full'
              placeholder='Search'
              Icon={<Search />}
            />
          </div>
        </div>
      )}
    </nav>
  )
}
