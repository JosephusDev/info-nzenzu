import prisma from "@/lib/prisma";

export async function useFetchPosts(){
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                },
            }
        }
    });
    return posts;
}