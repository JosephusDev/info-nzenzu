import { useCreateUser } from '@/useCases/User/useCreateUser'
import { redirect } from 'next/navigation'

export default function SignUp() {
  async function createUser(formdata: FormData) {
    'use server'
    const username = formdata.get('username') as string
    const password = formdata.get('password') as string
    const name = formdata.get('name') as string
    await useCreateUser({ username, password, name })
    redirect('/users')
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Create User</h1>
      <form className='flex flex-col' action={createUser}>
        <label htmlFor='name'>Name</label>
        <input
          className='border-violet-500 border-2'
          type='text'
          id='name'
          name='name'
        />
        <label htmlFor='username'>Username</label>
        <input
          className='border-violet-500 border-2'
          type='text'
          id='username'
          name='username'
        />
        <label htmlFor='password'>Password</label>
        <input
          className='border-violet-500 border-2'
          type='password'
          id='password'
          name='password'
        />
        <button className='bg-violet-500 mt-2' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}
