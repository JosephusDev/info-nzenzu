'use client'
import React from 'react'
import Lottie from 'lottie-react'
import Empty from '@/assets/icon/Empty.json'

export function EmptyIcon({ title }: { title: string }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Lottie animationData={Empty} loop={true} className='w-40 h-40' />
      <h1 className='text-base sm:text-xl font-bold mb-4'>{title}</h1>
    </div>
  )
}
