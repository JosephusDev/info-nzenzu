import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function useUpdateUser({id, data}: {id: string, data: User}){
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.update({
            data: {
                ...data,
                password: hashedPassword,
            },
            where: {
                id
            },
        });
        return user;
    } catch (error) {
        throw new Error("Error creating user");
    }
}