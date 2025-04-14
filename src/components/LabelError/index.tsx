export function LabelError({ message }: { message: string }) {
  return <span className='text-red-400 text-xs'>* {message}</span>
}
