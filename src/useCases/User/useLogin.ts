import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"

export async function useLogin({username, password}: Pick<User, 'username' | 'password'>) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const hashedPassword = bcrypt.compare(password, user.password);
        if (!hashedPassword) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        throw new Error("Error logging in");
    }
}