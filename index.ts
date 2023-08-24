import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const getAllUsers = await prisma.user.findMany()
    console.log("getAllUsers",getAllUsers);

    const postUser = await prisma.user.create({

        data:{
            name:"Fahima Mahjabin",
            email:"fahimamehjabin@gamil.com",
            role:'admin'
        }
    })
    
    console.log("postUser",postUser);
    

}

main();