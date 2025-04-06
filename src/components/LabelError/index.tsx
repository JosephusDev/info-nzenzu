export function LabelError({ message }: { message: string }) {
  return <span className='text-red-500 text-xs sm:text-sm'>* {message}</span>
}
