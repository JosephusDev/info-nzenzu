'use client'

import ContentLoader from 'react-content-loader'

export function HighlightSkeleton() {
  return (
    <ContentLoader
      speed={2}
      viewBox='0 0 400 200'
      backgroundColor='#e0e0e0'
      foregroundColor='#f5f5f5'
      className='w-full my-10'
    >
      <rect x='0' y='10' rx='6' ry='6' width='100%' height='12' />
      <rect x='0' y='34' rx='6' ry='6' width='90%' height='12' />
      <rect x='0' y='58' rx='6' ry='6' width='75%' height='12' />
    </ContentLoader>
  )
}
