import { useFetchUsers } from '@/useCases/User/useFetchUsers'

export default async function Home() {
  const users = await useFetchUsers()
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
