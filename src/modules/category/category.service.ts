import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data:Category) :Promise<Category> =>{
    return prisma.category.create({data})
}


export const CategoryService ={
    insertIntoDB
}