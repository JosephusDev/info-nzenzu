import { useFetchPosts } from "@/useCases/Post/useFetchPosts";

export default async function Home() {
  const posts = await useFetchPosts();
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title} - by {post.user.name}</li>
        ))}
      </ul>
    </div>
  );
}
