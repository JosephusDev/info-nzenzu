import prisma from "@/lib/prisma";

export async function useDeletePost({id}:{id:string}){
    try{
        await prisma.post.delete({
            where:{
                id
            }
        });
    }
    catch(error){
        throw new Error("Error deleting post");
    }
}