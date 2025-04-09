import prisma from "@/lib/prisma";

export async function useFetchPublishedPosts(){
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
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