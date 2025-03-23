import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function useUpdatePost({id, data}: {id: string, data: Post}){
    try {
        const post = await prisma.post.update({
            data,
            where: {
                id
            },
        });
        return post;
    } catch (error) {
        throw new Error("Error creating post");
    }
}