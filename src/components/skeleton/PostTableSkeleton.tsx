import ContentLoader from 'react-content-loader'

export function PostTableSkeleton() {
  return (
    <div className='rounded-md border w-full'>
      <ContentLoader
        speed={2}
        width='100%'
        height={200}
        viewBox='0 0 1000 200'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        {/* Header row */}
        <rect x='20' y='20' rx='3' ry='3' width='200' height='10' />
        <rect x='240' y='20' rx='3' ry='3' width='100' height='10' />
        <rect x='360' y='20' rx='3' ry='3' width='150' height='10' />
        <rect x='530' y='20' rx='3' ry='3' width='150' height='10' />
        <rect x='700' y='20' rx='3' ry='3' width='150' height='10' />

        {/* First row */}
        <rect x='20' y='60' rx='3' ry='3' width='200' height='10' />
        <rect x='240' y='60' rx='3' ry='3' width='100' height='10' />
        <rect x='360' y='60' rx='3' ry='3' width='150' height='10' />
        <rect x='530' y='60' rx='3' ry='3' width='150' height='10' />
        <rect x='700' y='60' rx='3' ry='3' width='150' height='10' />

        {/* Second row */}
        <rect x='20' y='100' rx='3' ry='3' width='200' height='10' />
        <rect x='240' y='100' rx='3' ry='3' width='100' height='10' />
        <rect x='360' y='100' rx='3' ry='3' width='150' height='10' />
        <rect x='530' y='100' rx='3' ry='3' width='150' height='10' />
        <rect x='700' y='100' rx='3' ry='3' width='150' height='10' />

        {/* Third row */}
        <rect x='20' y='140' rx='3' ry='3' width='200' height='10' />
        <rect x='240' y='140' rx='3' ry='3' width='100' height='10' />
        <rect x='360' y='140' rx='3' ry='3' width='150' height='10' />
        <rect x='530' y='140' rx='3' ry='3' width='150' height='10' />
        <rect x='700' y='140' rx='3' ry='3' width='150' height='10' />
      </ContentLoader>
    </div>
  )
}
