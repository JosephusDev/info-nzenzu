import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function useCreatePost(data: Post){
    try {
        const post = await prisma.post.create({
            data
        });
        return post;
    } catch (error) {
        throw new Error("Error creating post");
    }
}