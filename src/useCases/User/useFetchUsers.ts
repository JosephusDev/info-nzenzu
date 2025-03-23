import prisma from "@/lib/prisma";

export async function useFetchUsers(){
    const users = await prisma.user.findMany();
    return users;
}