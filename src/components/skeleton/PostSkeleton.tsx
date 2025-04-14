'use client'

import ContentLoader from 'react-content-loader'
import { useTheme } from '@/contexts/ThemeContext'

export function PostSkeleton() {
  const { theme } = useTheme()
  const backgroundColor = theme === 'dark' ? '#111111' : '#9ca3af'
  const foregroundColor = theme === 'dark' ? '#1a1a1a' : '#f3f4f6'

  return (
    <div className='rounded-xl border bg-background shadow-sm overflow-hidden'>
      <ContentLoader
        speed={2}
        width='100%'
        height={220}
        viewBox='0 20 400 250'
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        className='w-full'
      >
        {/* Top image */}
        <rect x='0' y='0' rx='0' ry='0' width='400' height='140' />

        {/* Category */}
        <rect x='16' y='155' rx='6' ry='6' width='60' height='16' />

        {/* Title */}
        <rect x='16' y='180' rx='4' ry='4' width='280' height='20' />

        {/* Avatar */}
        <circle cx='32' cy='230' r='12' />
        {/* Author */}
        <rect x='50' y='225' rx='4' ry='4' width='80' height='12' />
        {/* Date */}
        <rect x='300' y='225' rx='4' ry='4' width='70' height='12' />
      </ContentLoader>
    </div>
  )
}
