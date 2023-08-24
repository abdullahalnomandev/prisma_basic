import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const inSertUser = async (data:User):Promise<User> =>{
    return await prisma.user.create({data})
}

const insertOrUpdateProfile = async (data:Profile):Promise<Profile> =>{

    // Update profile
    const isExist = await prisma.profile.findUnique({
        where:{
            userId: data.userId
        }
    })

    if(isExist){
       return await prisma.profile.update({
            where:{
                userId: data.userId
            },
            data:{
                bio:data.bio
            }
        })
    }

    // Create a new profile
    return await prisma.profile.create({data})

}

export const UserService ={
    inSertUser,
    insertOrUpdateProfile
}