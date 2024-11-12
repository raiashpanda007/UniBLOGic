import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userexist = async (email: string, username: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                username: username
            }
        });
        if(user)
        return user;
    } catch (error) {
        console.log(error);
        
    }

    return null;
}
export default userexist;